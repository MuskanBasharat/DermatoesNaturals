

//Filters:
// Mobile Navigation Toggle
function toggleNav() {
    const navLinks = document.getElementById('navs');
    navLinks.classList.toggle('active');
}

function hideNav() {
    const navLinks = document.getElementById('navs');
    navLinks.classList.remove('active');
}

// Cart Functionality
function toggleNav() {
    const navLinks = document.getElementById('navs');
    navLinks.classList.toggle('active');
}

function hideNav() {
    const navLinks = document.getElementById('navs');
    navLinks.classList.remove('active');
}

// Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Delivery charges
    const DELIVERY_CHARGES = 50;
    
    // Load cart from localStorage if available
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Toggle cart dropdown
    cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('hidden');
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', function() {
        cartDropdown.classList.add('hidden');
    });
    
    // Prevent cart from closing when clicking inside
    cartDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product');
            const productName = productCard.querySelector('h4').textContent;
            
            // Improved price extraction that handles both regular and discounted prices
            let priceElement = productCard.querySelector('.special') || 
                  productCard.querySelector('p');
            
            // Handle cases where price might be in a strike element first
            if (!priceElement) {
                priceElement = productCard.querySelector('strike + p');
            }
            
            const priceText = priceElement ? priceElement.textContent : '0';
            // Extract only digits from price text (handles cases like "Rs. 900" or "1,000")
            const numericPrice = priceText.replace(/[^\d]/g, '');
            const productPrice = parseFloat(numericPrice);
            const productImg = productCard.querySelector('.proimg').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            updateCart();
            
            // Show confirmation
            showConfirmation(`${productName} added to cart!`);
        });
    });
    
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items list
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li style="font-style: italic">Your cart is empty.</li>';
            if (cartTotalElement) {
                cartTotalElement.textContent = 'Rs. 0';
            }
        } else {
            cartItemsList.innerHTML = '';
            
            // Calculate subtotal
            let subtotal = 0;
            
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.marginBottom = '10px';
                li.style.paddingBottom = '10px';
                li.style.borderBottom = '1px solid #eee';
                
                // Product Image
                const img = document.createElement('img');
                img.src = item.img;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.objectFit = 'cover';
                img.style.marginRight = '10px';
                img.style.borderRadius = '4px';
                
                // Product Info Container
                const infoDiv = document.createElement('div');
                infoDiv.className = 'cart-item-info';
                infoDiv.style.flex = '1';
                
                // Product Name
                const name = document.createElement('div');
                name.className = 'cart-item-title';
                name.textContent = item.name;
                name.style.fontWeight = 'bold';
                
                // Product Price
                const price = document.createElement('div');
                price.className = 'cart-item-price';
                price.textContent = `Rs. ${(item.price * item.quantity).toLocaleString()}`;
                price.style.color = '#4a8f29';
                price.style.margin = '5px 0';
                
                // Quantity Controls
                const quantityControls = document.createElement('div');
                quantityControls.className = 'cart-item-quantity';
                quantityControls.style.display = 'flex';
                quantityControls.style.alignItems = 'center';
                quantityControls.style.gap = '5px';
                
                // Decrease Quantity Button
                const decreaseBtn = document.createElement('button');
                decreaseBtn.textContent = '-';
                decreaseBtn.style.width = '25px';
                decreaseBtn.style.height = '25px';
                decreaseBtn.style.border = '1px solid #ddd';
                decreaseBtn.style.borderRadius = '4px';
                decreaseBtn.style.cursor = 'pointer';
                decreaseBtn.style.backgroundColor = '#f8f8f8';
                decreaseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        // Remove item if quantity reaches 0
                        cart = cart.filter(cartItem => cartItem.name !== item.name);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });
                
                // Quantity Display
                const quantityDisplay = document.createElement('span');
                quantityDisplay.textContent = item.quantity;
                quantityDisplay.style.minWidth = '20px';
                quantityDisplay.style.textAlign = 'center';
                
                // Increase Quantity Button
                const increaseBtn = document.createElement('button');
                increaseBtn.textContent = '+';
                increaseBtn.style.width = '25px';
                increaseBtn.style.height = '25px';
                increaseBtn.style.border = '1px solid #ddd';
                increaseBtn.style.borderRadius = '4px';
                increaseBtn.style.cursor = 'pointer';
                increaseBtn.style.backgroundColor = '#f8f8f8';
                increaseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });
                
                // Remove Button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-item';
                removeBtn.innerHTML = '&times;';
                removeBtn.style.background = 'none';
                removeBtn.style.border = 'none';
                removeBtn.style.fontSize = '1.2rem';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.color = '#ff4444';
                removeBtn.style.marginLeft = '10px';
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                    showConfirmation(`${item.name} removed from cart!`);
                });
                
                // Assemble quantity controls
                quantityControls.appendChild(decreaseBtn);
                quantityControls.appendChild(quantityDisplay);
                quantityControls.appendChild(increaseBtn);
                
                // Assemble product info
                infoDiv.appendChild(name);
                infoDiv.appendChild(price);
                infoDiv.appendChild(quantityControls);
                
                // Assemble entire cart item
                li.appendChild(img);
                li.appendChild(infoDiv);
                li.appendChild(removeBtn);
                
                cartItemsList.appendChild(li);
                
                // Add to subtotal
                subtotal += item.price * item.quantity;
            });
            
            // Create order button
            const orderButton = document.createElement('button');
            orderButton.textContent = 'Proceed to Order';
            orderButton.style.width = '100%';
            orderButton.style.padding = '12px';
            orderButton.style.backgroundColor = '#4a8f29';
            orderButton.style.color = 'white';
            orderButton.style.border = 'none';
            orderButton.style.borderRadius = '4px';
            orderButton.style.cursor = 'pointer';
            orderButton.style.fontWeight = 'bold';
            orderButton.style.fontSize = '1em';
            orderButton.style.marginTop = '15px';
            
            orderButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showOrderForm(subtotal);
            });
            
            cartItemsList.appendChild(orderButton);
            
            // Update cart total display
            if (cartTotalElement) {
                cartTotalElement.textContent = `Rs. ${(subtotal + DELIVERY_CHARGES).toLocaleString()}`;
            }
        }
    }
    
    // Function to show order form as a modal
    function showOrderForm(subtotal) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'orderModalOverlay';
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.zIndex = '1000';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.id = 'orderModalContent';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '500px';
        modalContent.style.maxHeight = '90vh';
        modalContent.style.overflowY = 'auto';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '1.5rem';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#666';
        
        closeButton.addEventListener('click', function() {
            modalOverlay.remove();
        });
        
        // Create order form
        const orderForm = document.createElement('form');
        orderForm.id = 'orderForm';
        orderForm.style.marginTop = '15px';
        
        // Form title
        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Order Details';
        formTitle.style.marginBottom = '15px';
        formTitle.style.textAlign = 'center';
        orderForm.appendChild(formTitle);
        
        // Name field
        const nameField = document.createElement('div');
        nameField.style.marginBottom = '10px';
        
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Your Name:';
        nameLabel.style.display = 'block';
        nameLabel.style.marginBottom = '5px';
        nameLabel.style.fontWeight = 'bold';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.required = true;
        nameInput.style.width = '100%';
        nameInput.style.padding = '12px';
        nameInput.style.border = '1px solid #ddd';
        nameInput.style.borderRadius = '4px';
        
        nameField.appendChild(nameLabel);
        nameField.appendChild(nameInput);
        orderForm.appendChild(nameField);
        
        // Address field
        const addressField = document.createElement('div');
        addressField.style.marginBottom = '10px';
        
        const addressLabel = document.createElement('label');
        addressLabel.textContent = 'Delivery Address:';
        addressLabel.style.display = 'block';
        addressLabel.style.marginBottom = '5px';
        addressLabel.style.fontWeight = 'bold';
        
        const addressInput = document.createElement('textarea');
        addressInput.name = 'address';
        addressInput.required = true;
        addressInput.rows = 3;
        addressInput.style.width = '100%';
        addressInput.style.padding = '12px';
        addressInput.style.border = '1px solid #ddd';
        addressInput.style.borderRadius = '4px';
        addressInput.style.resize = 'vertical';
        
        addressField.appendChild(addressLabel);
        addressField.appendChild(addressInput);
        orderForm.appendChild(addressField);
        
        // Phone field
        const phoneField = document.createElement('div');
        phoneField.style.marginBottom = '10px';
        
        const phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Phone Number:';
        phoneLabel.style.display = 'block';
        phoneLabel.style.marginBottom = '5px';
        phoneLabel.style.fontWeight = 'bold';
        
        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.name = 'phone';
        phoneInput.required = true;
        phoneInput.style.width = '100%';
        phoneInput.style.padding = '12px';
        phoneInput.style.border = '1px solid #ddd';
        phoneInput.style.borderRadius = '4px';
        
        phoneField.appendChild(phoneLabel);
        phoneField.appendChild(phoneInput);
        orderForm.appendChild(phoneField);
        
        // Payment summary
        const summaryDiv = document.createElement('div');
        summaryDiv.style.margin = '15px 0';
        summaryDiv.style.padding = '10px';
        summaryDiv.style.backgroundColor = '#fff';
        summaryDiv.style.borderRadius = '5px';
        summaryDiv.style.border = '1px solid #eee';
        
        const subtotalRow = document.createElement('div');
        subtotalRow.style.display = 'flex';
        subtotalRow.style.justifyContent = 'space-between';
        subtotalRow.style.marginBottom = '5px';
        subtotalRow.textContent = `Subtotal: Rs. ${subtotal.toLocaleString()}`;
        
        const deliveryRow = document.createElement('div');
        deliveryRow.style.display = 'flex';
        deliveryRow.style.justifyContent = 'space-between';
        deliveryRow.style.marginBottom = '5px';
        deliveryRow.textContent = `Delivery Charges: Rs. ${DELIVERY_CHARGES.toLocaleString()}`;
        
        const totalRow = document.createElement('div');
        totalRow.style.display = 'flex';
        totalRow.style.justifyContent = 'space-between';
        totalRow.style.fontWeight = 'bold';
        totalRow.style.fontSize = '1.1em';
        totalRow.style.marginTop = '10px';
        totalRow.style.paddingTop = '10px';
        totalRow.style.borderTop = '1px solid #eee';
        totalRow.textContent = `Total: Rs. ${(subtotal + DELIVERY_CHARGES).toLocaleString()}`;
        
        summaryDiv.appendChild(subtotalRow);
        summaryDiv.appendChild(deliveryRow);
        summaryDiv.appendChild(totalRow);
        orderForm.appendChild(summaryDiv);
        
        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Confirm Order via WhatsApp';
        submitBtn.style.width = '100%';
        submitBtn.style.padding = '12px';
        submitBtn.style.backgroundColor = '#25D366';
        submitBtn.style.color = 'white';
        submitBtn.style.border = 'none';
        submitBtn.style.borderRadius = '4px';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.fontWeight = 'bold';
        submitBtn.style.fontSize = '1em';
        submitBtn.style.marginTop = '10px';
        
        orderForm.appendChild(submitBtn);
        
        // Form submission
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = nameInput.value.trim();
            const address = addressInput.value.trim();
            const phone = phoneInput.value.trim();
            
            if (!name || !address || !phone) {
                showConfirmation('Please fill in all fields!', '#ff4444');
                return;
            }
            
            // Format WhatsApp message
            let message = `*New Order Request*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Phone:* ${phone}%0A`;
            message += `*Address:* ${address}%0A%0A`;
            message += `*Order Details:*%0A`;
            
            cart.forEach(item => {
                message += `- ${item.name} (Qty: ${item.quantity}) - Rs.${(item.price * item.quantity).toLocaleString()}%0A`;
            });
            
            message += `%0A`;
            message += `Subtotal: Rs.${subtotal.toLocaleString()}%0A`;
            message += `Delivery Charges: Rs.${DELIVERY_CHARGES.toLocaleString()}%0A`;
            message += `*Total Amount: Rs.${(subtotal + DELIVERY_CHARGES).toLocaleString()}*%0A%0A`;
            message += `Please confirm this order.`;
            
            // Replace with your WhatsApp business number
            const whatsappNumber = '923026673345'; // Example number - replace with yours
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Close modal
            modalOverlay.remove();
        });
        
        // Assemble modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(orderForm);
        modalOverlay.appendChild(modalContent);
        
        // Close modal when clicking outside
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
        
        // Add to document
        document.body.appendChild(modalOverlay);
        
        // Focus on first input
        nameInput.focus();
    }
    
    // Helper function to show confirmation messages
    function showConfirmation(message, bgColor = '#4a8f29') {
        // Remove any existing confirmation
        const existingConfirmation = document.querySelector('.confirmation-message');
        if (existingConfirmation) {
            existingConfirmation.remove();
        }
        
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.textContent = message;
        confirmation.style.position = 'fixed';
        confirmation.style.bottom = '20px';
        confirmation.style.left = '50%';
        confirmation.style.transform = 'translateX(-50%)';
        confirmation.style.backgroundColor = bgColor;
        confirmation.style.color = 'white';
        confirmation.style.padding = '12px 24px';
        confirmation.style.borderRadius = '5px';
        confirmation.style.zIndex = '1000';
        confirmation.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        confirmation.style.maxWidth = '90%';
        confirmation.style.textAlign = 'center';
        confirmation.style.animation = 'fadeIn 0.3s ease-out';
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                confirmation.remove();
            }, 300);
        }, 2000);
    }
    
    // Initialize cart on page load
    updateCart();
});
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filters input[type="checkbox"]');
  const products = document.querySelectorAll('.product');

  filters.forEach(filter => {
      filter.addEventListener('change', () => {
          const selectedFilters = Array.from(filters)
              .filter(f => f.checked)
              .map(f => f.value);

          products.forEach(product => {
              const matchesFilter = selectedFilters.some(filter =>
                  product.classList.contains(filter)
              );
              product.style.display = (selectedFilters.length === 0 || matchesFilter) ? 'block' : 'none';
          });
      });
  });

// sliders:

  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function showNextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
  }

  setInterval(showNextSlide, 2000);

  carousel.addEventListener('transitionend', () => {
      if (currentIndex === slides.length - 1) {
          currentIndex = 0;
          carousel.style.transition = 'none';
          updateCarousel();
          setTimeout(() => {
              carousel.style.transition = 'transform 0.5s ease-in-out';
          }, 10);
      }
  });





});

window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

  const track = document.getElementById('carousel');
  const cards = Array.from(track.children);
  let index = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function slide(direction) {
    const visibleCount = getVisibleCount();
    const totalCards = cards.length;
    const maxIndex = totalCards - visibleCount;

    index += direction;

    if (index > maxIndex) {
      index = 0; // loop back to start
    } else if (index < 0) {
      index = maxIndex; // loop to end
    }

    updateSlider();
  }

  window.addEventListener('resize', updateSlider);
  window.addEventListener('load', updateSlider);

 