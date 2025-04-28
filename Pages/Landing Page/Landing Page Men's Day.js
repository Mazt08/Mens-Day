document.addEventListener('DOMContentLoaded', function() {
  // Cart Sidebar
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCartBtn = document.getElementById('closeCart');
  const cartButton = document.getElementById('cartButton'); 
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  
  // Modal Elements
  const productModal = document.getElementById('productModal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const quantityInput = document.getElementById('quantity');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const minusBtn = document.querySelector('.minus');
  const plusBtn = document.querySelector('.plus');
  
  let currentProduct = null;
  let cart = [];
  
  // Initialize cart from localStorage
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCart();
  }

  // Toggle Cart Sidebar
  function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
  }
  
  // Open Product Modal
  function openModal(product) {
    currentProduct = product;
    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    quantityInput.value = 1; // Default quantity is 1
    productModal.style.display = 'flex';
    overlay.style.display = 'block';
  }

  // Close Modal
  function closeModal() {
    productModal.style.display = 'none';
    overlay.style.display = 'none';
  }
  
  closeModalBtn.addEventListener('click', closeModal);
  
  // Update Quantity
  minusBtn.addEventListener('click', function() {
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  });
  
  plusBtn.addEventListener('click', function() {
    quantityInput.value++;
  });

  // Add to Cart Button
  addToCartBtn.addEventListener('click', function() {
    if (currentProduct) {
      const quantity = parseInt(quantityInput.value);
      addToCart(currentProduct, quantity);
      closeModal(); // Close the modal after adding
      toggleCart(); // Optionally, you can open the cart immediately after adding
    }
  });

  // Add Product to Cart
  function addToCart(product, quantity = 1) {
    if (!product.id) {
      product.id = 'prod-' + Math.random().toString(36).substr(2, 9); // Generate unique ID
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity if item exists
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    updateCart();
    saveCartToLocalStorage();
  }

  // Remove Item from Cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
  }

  // Update Quantity in Cart
  function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        updateCart();
        saveCartToLocalStorage();
      }
    }
  }

  // Update Cart UI
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
      cartTotalElement.textContent = '$0.00';
      return;
    }

    cart.forEach(item => {
      const priceValue = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      const itemTotal = priceValue * item.quantity;
      total += itemTotal;

      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${item.price}</div>
          <div class="cart-item-quantity">
            <button class="decrement">-</button>
            <input type="number" value="${item.quantity}" min="1">
            <button class="increment">+</button>
          </div>
          <div class="remove-item">Remove</div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItemElement);

      const decrementBtn = cartItemElement.querySelector('.decrement');
      const incrementBtn = cartItemElement.querySelector('.increment');
      const quantityInput = cartItemElement.querySelector('input');
      const removeBtn = cartItemElement.querySelector('.remove-item');
      
      decrementBtn.addEventListener('click', function() {
        updateQuantity(item.id, parseInt(quantityInput.value) - 1);
      });
      
      incrementBtn.addEventListener('click', function() {
        updateQuantity(item.id, parseInt(quantityInput.value) + 1);
      });
      
      quantityInput.addEventListener('change', function() {
        updateQuantity(item.id, parseInt(quantityInput.value));
      });

      removeBtn.addEventListener('click', function() {
        removeFromCart(item.id);
      });
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Save Cart to LocalStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
  }

  // Update Cart Icon
  function updateCartIcon() {
    const cartIcon = document.querySelector('#cartButton');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const existingBadge = cartIcon.querySelector('.cart-count');
    if (existingBadge) {
      existingBadge.remove();
    }

    if (itemCount > 0) {
      const countBadge = document.createElement('span');
      countBadge.className = 'cart-count';
      countBadge.style.position = 'absolute';
      countBadge.style.top = '-8px';
      countBadge.style.right = '-8px';
      countBadge.style.backgroundColor = 'black';
      countBadge.style.color = 'white';
      countBadge.style.borderRadius = '50%';
      countBadge.style.width = '20px';
      countBadge.style.height = '20px';
      countBadge.style.display = 'flex';
      countBadge.style.alignItems = 'center';
      countBadge.style.justifyContent = 'center';
      countBadge.style.fontSize = '12px';
      cartIcon.style.position = 'relative';
      cartIcon.appendChild(countBadge);
      countBadge.textContent = itemCount;
    }
  }

  // Set up Product Click Handlers
  function setupProductClickHandlers() {
    document.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('featured-btn')) {
          const img = card.querySelector('img');
          const title = card.querySelector('.featured-title').textContent;
          openModal({
            id: 'featured-' + title.toLowerCase().replace(/\s+/g, '-'),
            title: title,
            price: '$99.00',
            image: img.src
          });
        }
      });
    });
  }

  setupProductClickHandlers();
  updateCartIcon();
});
