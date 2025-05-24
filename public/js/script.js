// Memory Vault - Modern Client-side JavaScript

$(document).ready(function() {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  // Image preview functionality for file uploads with modern styling
  $('#images').on('change', function() {
    const imagePreviewContainer = $('#imagePreviewContainer');
    imagePreviewContainer.empty();
    
    if (this.files && this.files.length > 0) {
      // Show the preview container with a fade-in effect
      imagePreviewContainer.hide().fadeIn(300);
      
      // Process each file
      Array.from(this.files).forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
          const html = `
            <div class="col-md-4 col-sm-6 col-12" style="opacity: 0; transform: translateY(10px);">
              <div class="image-preview">
                <img src="${event.target.result}" alt="Preview image">
                <div class="remove-btn" data-index="${index}">
                  <i class="fas fa-times"></i>
                </div>
                <div class="image-info">
                  <span class="image-name">${file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}</span>
                </div>
              </div>
            </div>
          `;
          
          const $element = $(html).appendTo(imagePreviewContainer);
          
          // Animate each preview item with a staggered delay
          setTimeout(() => {
            $element.css({
              'opacity': '1',
              'transform': 'translateY(0)',
              'transition': 'all 0.3s ease'
            });
          }, index * 100);
        };
        
        reader.readAsDataURL(file);
      });
    }
  });
  
  // Remove image preview with animation
  $(document).on('click', '.remove-btn', function() {
    const $parent = $(this).closest('.col-md-4');
    
    // Animate removal
    $parent.css({
      'opacity': '0',
      'transform': 'translateY(10px)',
      'transition': 'all 0.3s ease'
    });
    
    setTimeout(() => {
      $parent.remove();
      
      // If no more previews, hide the container
      if ($('#imagePreviewContainer').children().length === 0) {
        $('#imagePreviewContainer').fadeOut(300);
      }
    }, 300);
  });
  
  // Handle direct image deletion in edit mode
  $(document).on('click', '.delete-image-btn', function(e) {
    e.preventDefault();
    
    const imageId = $(this).data('image-id');
    const memoryId = $(this).data('memory-id');
    const $imageCard = $(this).closest('.col-md-4');
    
    // Create and show confirmation modal
    const modalHtml = `
      <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this image? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmImageDelete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove any existing modal
    $('#deleteConfirmModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
    
    // Handle confirm button click
    $('#confirmImageDelete').on('click', function() {
      modal.hide();
      
      // Show loading state
      $imageCard.css('opacity', '0.5');
      
      // Make AJAX request to delete the image
      $.ajax({
        url: `/memories/delete-image/${imageId}`,
        type: 'POST',
        data: { memoryId: memoryId },
        success: function(response) {
          if (response.success) {
            // Animate removal of the image card
            $imageCard.css({
              'opacity': '0',
              'transform': 'translateY(10px)',
              'transition': 'all 0.3s ease'
            });
            
            setTimeout(() => {
              $imageCard.remove();
              
              // Show success toast
              const toastHtml = `
                <div class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="d-flex">
                    <div class="toast-body">
                      <i class="fas fa-check-circle me-2"></i>
                      Image deleted successfully
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                </div>
              `;
              
              $('body').append(toastHtml);
              const toastElement = document.querySelector('.toast');
              const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
              toast.show();
              
              // If no more images, show empty state
              if ($('.card.h-100.border-0.shadow-sm').length === 0) {
                $('.mb-4:has(label:contains("Current Photos"))').html(
                  '<label class="form-label">Current Photos</label><p class="text-muted">No photos attached to this memory.</p>'
                );
              }
            }, 300);
          } else {
            // Show error toast
            const toastHtml = `
              <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error deleting image
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
              </div>
            `;
            
            $('body').append(toastHtml);
            const toastElement = document.querySelector('.toast');
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
            
            // Reset opacity
            $imageCard.css('opacity', '1');
          }
        },
        error: function() {
          // Show error toast
          const toastHtml = `
            <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="d-flex">
                <div class="toast-body">
                  <i class="fas fa-exclamation-circle me-2"></i>
                  Error deleting image
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
            </div>
          `;
          
          $('body').append(toastHtml);
          const toastElement = document.querySelector('.toast');
          const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
          toast.show();
          
          // Reset opacity
          $imageCard.css('opacity', '1');
        }
      });
    });
  });
  
  // Confirm delete actions with custom modal instead of browser confirm
  $(document).on('submit', '.delete-form', function(e) {
    e.preventDefault();
    
    const form = this;
    const itemType = $(this).data('item-type') || 'item';
    const isImageDelete = itemType === 'image';
    
    // Create and show modal
    const modalHtml = `
      <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this ${itemType}? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirmDelete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove any existing modal
    $('#deleteConfirmModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
    
    // Handle confirm button
    $('#confirmDelete').on('click', function() {
      modal.hide();
      
      // If it's an image delete, handle it with AJAX
      if (isImageDelete) {
        const formAction = $(form).attr('action');
        
        // Show loading state
        const $imageCard = $(form).closest('.col-md-4');
        $imageCard.css('opacity', '0.5');
        
        // Make AJAX request to delete the image
        $.ajax({
          url: formAction,
          type: 'POST',
          success: function(response) {
            if (response.success) {
              // Animate removal of the image card
              $imageCard.css({
                'opacity': '0',
                'transform': 'translateY(10px)',
                'transition': 'all 0.3s ease'
              });
              
              setTimeout(() => {
                $imageCard.remove();
                
                // Show success toast
                const toastHtml = `
                  <div class="toast align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                      <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i>
                        Image deleted successfully
                      </div>
                      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                  </div>
                `;
                
                $('body').append(toastHtml);
                const toastElement = document.querySelector('.toast');
                const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
                toast.show();
                
                // If no more images, show empty state
                if ($('.card.h-100.border-0.shadow-sm').length === 0) {
                  $('.mb-4:has(label:contains("Current Photos"))').html(
                    '<label class="form-label">Current Photos</label><p class="text-muted">No photos attached to this memory.</p>'
                  );
                }
              }, 300);
            } else {
              // Show error toast
              const toastHtml = `
                <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="d-flex">
                    <div class="toast-body">
                      <i class="fas fa-exclamation-circle me-2"></i>
                      Error deleting image
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                </div>
              `;
              
              $('body').append(toastHtml);
              const toastElement = document.querySelector('.toast');
              const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
              toast.show();
              
              // Reset opacity
              $imageCard.css('opacity', '1');
            }
          },
          error: function() {
            // Show error toast
            const toastHtml = `
              <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Error deleting image
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
              </div>
            `;
            
            $('body').append(toastHtml);
            const toastElement = document.querySelector('.toast');
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
            
            // Reset opacity
            $imageCard.css('opacity', '1');
          }
        });
      } else {
        // For regular form submissions (not image deletion)
        form.submit();
      }
    });
  });
  
  // Date filter validation with better UX
  $('#filterForm').on('submit', function(e) {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      e.preventDefault();
      
      // Create toast notification instead of alert
      const toastHtml = `
        <div class="toast align-items-center text-white bg-danger border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <i class="fas fa-exclamation-circle me-2"></i>
              Start date cannot be after end date
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
      
      // Add toast to body
      $('body').append(toastHtml);
      
      // Show toast
      const toastElement = document.querySelector('.toast');
      const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
      toast.show();
      
      // Highlight the date fields
      $('#startDate, #endDate').addClass('is-invalid');
      setTimeout(() => {
        $('#startDate, #endDate').removeClass('is-invalid');
      }, 3000);
    }
  });
  
  // Add smooth scrolling for all links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 800);
        return false;
      }
    }
  });
  
  // Add hover effect to memory cards
  $('.memory-card').hover(
    function() {
      $(this).find('.card-img-top').css('transform', 'scale(1.05)');
    },
    function() {
      $(this).find('.card-img-top').css('transform', 'scale(1)');
    }
  );
  
  // Memory card click to show detail modal
  $(document).on('click', '.memory-card-content', function(e) {
    // Don't trigger modal when clicking buttons or forms
    if ($(e.target).closest('button').length || $(e.target).closest('form').length || $(e.target).closest('a').length) {
      return;
    }
    
    const memoryId = $(this).closest('.memory-card').data('memory-id');
    const modal = new bootstrap.Modal(document.getElementById('memoryDetailModal'));
    
    // Show modal with loading spinner
    modal.show();
    
    // Fetch memory details
    $.ajax({
      url: `/memories/details/${memoryId}`,
      type: 'GET',
      success: function(response) {
        if (response.success) {
          const memory = response.memory;
          
          // Update edit button link
          $('.edit-memory-btn').attr('href', `/memories/edit/${memory.id}`);
          
          // Build modal content
          let modalContent = '';
          
          // Image carousel
          if (memory.images && memory.images.length > 0) {
            modalContent += `
              <div class="modal-image-container">
                <div id="modalCarousel" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
            `;
            
            memory.images.forEach((image, index) => {
              modalContent += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                  <img src="${image.path}" class="d-block w-100" alt="Memory image" style="height: 400px; object-fit: cover;">
                </div>
              `;
            });
            
            modalContent += `
                  </div>
            `;
            
            if (memory.images.length > 1) {
              modalContent += `
                <button class="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              `;
            }
            
            modalContent += `
                <div class="position-absolute bottom-0 end-0 p-2">
                  <span class="badge bg-dark bg-opacity-75">
                    <i class="fas fa-images me-1"></i> ${memory.images.length}
                  </span>
                </div>
              </div>
            </div>
            `;
          } else {
            modalContent += `
              <div class="no-image-placeholder" style="height: 300px;">
                <i class="fas fa-image"></i>
                <p>No images</p>
              </div>
            `;
          }
          
          // Memory details
          modalContent += `
            <div class="p-4">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h3 class="modal-memory-title mb-0">${memory.title}</h3>
                <span class="badge bg-light text-dark rounded-pill fs-6">
                  <i class="far fa-calendar-alt me-1"></i>${memory.formattedDate}
                </span>
              </div>
              <p class="modal-memory-caption">${memory.caption}</p>
            </div>
          `;
          
          // Update modal content
          $('.memory-modal-content').html(modalContent);
          
          // Update modal title
          $('#memoryDetailModalLabel').text(memory.title);
        } else {
          $('.memory-modal-content').html(`
            <div class="p-5 text-center">
              <i class="fas fa-exclamation-circle text-danger mb-3" style="font-size: 3rem;"></i>
              <h4>Error Loading Memory</h4>
              <p class="text-muted">Unable to load memory details. Please try again.</p>
            </div>
          `);
        }
      },
      error: function() {
        $('.memory-modal-content').html(`
          <div class="p-5 text-center">
            <i class="fas fa-exclamation-circle text-danger mb-3" style="font-size: 3rem;"></i>
            <h4>Error Loading Memory</h4>
            <p class="text-muted">Unable to load memory details. Please try again.</p>
          </div>
        `);
      }
    });
  });
});
