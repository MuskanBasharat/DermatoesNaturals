

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
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    const cartDropdown = document.getElementById('cartDropdown');
    const addToCartButtons = document.querySelectorAll('#Product-det');
    const cartItemsList = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    
    let cart = [];
    
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
        button.addEventListener('click', function() {
            const productCard = this.closest('.product');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('p').textContent;
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
            
            updateCart();
            
            // Show confirmation
            const confirmation = document.createElement('div');
            confirmation.textContent = `${productName} added to cart!`;
            confirmation.style.position = 'fixed';
            confirmation.style.bottom = '20px';
            confirmation.style.left = '50%';
            confirmation.style.transform = 'translateX(-50%)';
            confirmation.style.backgroundColor = '#4a8f29';
            confirmation.style.color = 'white';
            confirmation.style.padding = '10px 20px';
            confirmation.style.borderRadius = '5px';
            confirmation.style.zIndex = '1000';
            confirmation.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            document.body.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.style.opacity = '0';
                confirmation.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(confirmation);
                }, 500);
            }, 2000);
        });
    });
    
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items list
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li style="font-style: italic">Your cart is empty.</li>';
        } else {
            cartItemsList.innerHTML = '';
            cart.forEach(item => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.marginBottom = '10px';
                li.style.paddingBottom = '10px';
                li.style.borderBottom = '1px solid #eee';
                
                const img = document.createElement('img');
                img.src = item.img;
                img.style.width = '50px';
                img.style.height = '50px';
                img.style.objectFit = 'cover';
                img.style.marginRight = '10px';
                img.style.borderRadius = '4px';
                
                const infoDiv = document.createElement('div');
                infoDiv.style.flex = '1';
                
                const name = document.createElement('div');
                name.textContent = item.name;
                name.style.fontWeight = 'bold';
                
                const price = document.createElement('div');
                price.textContent = item.price;
                price.style.color = '#4a8f29';
                price.style.margin = '5px 0';
                
                const quantity = document.createElement('div');
                quantity.textContent = `Qty: ${item.quantity}`;
                
                const removeBtn = document.createElement('button');
                removeBtn.textContent = '×';
                removeBtn.style.background = 'none';
                removeBtn.style.border = 'none';
                removeBtn.style.fontSize = '1.2rem';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.color = '#ff4444';
                removeBtn.addEventListener('click', () => {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                    updateCart();
                });
                
                infoDiv.appendChild(name);
                infoDiv.appendChild(price);
                infoDiv.appendChild(quantity);
                
                li.appendChild(img);
                li.appendChild(infoDiv);
                li.appendChild(removeBtn);
                
                cartItemsList.appendChild(li);
            });
        }
    }
    
   
    
    
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

 