const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ensureAuthenticated } = require('../middleware/isAuthenticated');
const Memory = require('../models/memory');
const Image = require('../models/image');
const { Op } = require('sequelize');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Get all memories
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const memories = await Memory.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
      include: [{ model: Image }]
    });
    
    res.render('index', { memories });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error retrieving memories');
    res.redirect('/');
  }
});

// Add memory form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add-memory');
});

// Add memory handle
router.post('/add', ensureAuthenticated, upload.array('images', 10), async (req, res) => {
  try {
    const { title, caption, date } = req.body;
    
    // Create memory
    const memory = await Memory.create({
      title,
      caption,
      date,
      userId: req.user.id
    });
    
    // Save uploaded images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await Image.create({
          filename: file.filename,
          path: `/uploads/${file.filename}`,
          memoryId: memory.id
        });
      }
    }
    
    req.flash('success_msg', 'Memory added successfully');
    res.redirect('/memories');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error adding memory');
    res.redirect('/memories/add');
  }
});

// Edit memory form
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  try {
    const memory = await Memory.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      },
      include: [{ model: Image }]
    });
    
    if (!memory) {
      req.flash('error_msg', 'Memory not found');
      return res.redirect('/memories');
    }
    
    res.render('edit-memory', { memory });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error retrieving memory');
    res.redirect('/memories');
  }
});

// Update memory
router.post('/edit/:id', ensureAuthenticated, upload.array('images', 10), async (req, res) => {
  try {
    const { title, caption, date } = req.body;
    
    // Find memory
    const memory = await Memory.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });
    
    if (!memory) {
      req.flash('error_msg', 'Memory not found');
      return res.redirect('/memories');
    }
    
    // Update memory
    await memory.update({
      title,
      caption,
      date
    });
    
    // Save new uploaded images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await Image.create({
          filename: file.filename,
          path: `/uploads/${file.filename}`,
          memoryId: memory.id
        });
      }
    }
    
    req.flash('success_msg', 'Memory updated successfully');
    res.redirect('/memories');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating memory');
    res.redirect(`/memories/edit/${req.params.id}`);
  }
});

// Delete image
router.post('/delete-image/:id', ensureAuthenticated, async (req, res) => {
  try {
    const image = await Image.findOne({
      where: { id: req.params.id },
      include: [{ 
        model: Memory,
        where: { userId: req.user.id }
      }]
    });
    
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    
    // Store memory ID before deleting the image
    const memoryId = image.memoryId;
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '../public', image.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete from database
    await image.destroy();
    
    // Return success response with memory ID
    return res.json({ 
      success: true, 
      message: 'Image deleted successfully',
      memoryId: memoryId
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error deleting image' });
  }
});

// Delete memory
router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    const memory = await Memory.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      },
      include: [{ model: Image }]
    });
    
    if (!memory) {
      req.flash('error_msg', 'Memory not found');
      return res.redirect('/memories');
    }
    
    // First delete all images manually to ensure file cleanup
    if (memory.Images && memory.Images.length > 0) {
      for (const image of memory.Images) {
        // Delete file from filesystem
        const filePath = path.join(__dirname, '../public', image.path);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (fileErr) {
            console.error('Error deleting image file:', fileErr);
            // Continue even if file deletion fails
          }
        }
        
        // Delete image from database
        await image.destroy().catch(imgErr => {
          console.error('Error deleting image from database:', imgErr);
          // Continue even if image deletion fails
        });
      }
    }
    
    // Now delete the memory
    await memory.destroy();
    
    req.flash('success_msg', 'Memory deleted successfully');
    res.redirect('/memories');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error deleting memory');
    res.redirect('/memories');
  }
});

// Get memory details for modal
router.get('/details/:id', ensureAuthenticated, async (req, res) => {
  try {
    const memory = await Memory.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      },
      include: [{ model: Image }]
    });
    
    if (!memory) {
      return res.status(404).json({ success: false, message: 'Memory not found' });
    }
    
    // Format the memory data for the modal
    const formattedMemory = {
      id: memory.id,
      title: memory.title,
      caption: memory.caption,
      date: memory.date,
      formattedDate: new Date(memory.date).toLocaleDateString(),
      images: memory.Images.map(img => ({
        id: img.id,
        path: img.path
      }))
    };
    
    return res.json({ success: true, memory: formattedMemory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error retrieving memory details' });
  }
});

// Filter memories by date
router.get('/filter', ensureAuthenticated, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let whereClause = { userId: req.user.id };
    
    if (startDate && endDate) {
      whereClause.date = {
        [Op.between]: [startDate, endDate]
      };
    } else if (startDate) {
      whereClause.date = {
        [Op.gte]: startDate
      };
    } else if (endDate) {
      whereClause.date = {
        [Op.lte]: endDate
      };
    }
    
    const memories = await Memory.findAll({
      where: whereClause,
      order: [['date', 'DESC']],
      include: [{ model: Image }]
    });
    
    res.render('index', { 
      memories,
      startDate,
      endDate
    });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error filtering memories');
    res.redirect('/memories');
  }
});

module.exports = router;
