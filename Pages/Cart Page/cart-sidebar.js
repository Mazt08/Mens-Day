// Product Data
const products = {
    'organic-cotton': {
      id: 'organic-cotton',
      name: 'Organic Cotton Long-Sleeve',
      variant: 'Medium | Black',
      price: 35.00,
      image: 'images/long-sleeve.jpg'
    },
    'shirt-jacket': {
      id: 'shirt-jacket',
      name: 'RevVool® Over-sized Shirt Jacket',
      variant: 'Small | Black',
      price: 167.00,
      image: 'images/shirt-jacket.jpg'
    },
    'merino-beanie': {
      id: 'merino-beanie',
      name: 'Merino Wool Beanie',
      variant: 'One Size | Chambray Blue',
      price: 35.00,
      image: 'images/beanie.jpg'
    },
    'classic-jeans': {
      id: 'classic-jeans',
      name: 'Classic Fit Jeans',
      variant: '32x34 | Dark Wash',
      price: 89.00,
      image: 'images/jeans.jpg'
    }
  };
  
  // Initialize Cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItems');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  // Initialize Cart
  function initCart() {
    updateCartDisplay();
    setupEventListeners();
  }
  
  // Update Cart Display
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
      updateCartSummary();
      return;
    }
    
    cart.forEach((item, index) => {
      const product = products[item.id];
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${product.name}</div>
          <div class="cart-item-variant">${product.variant}</div>
          <div class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</div>
          <div class="quantity-controls">
            <button class="quantity-btn minus" data-index="${index}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            <button class="quantity-btn plus" data-index="${index}">+</button>
          </div>
          <div class="remove-item" data-index="${index}">Remove</div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
    
    updateCartSummary();
    setupCartItemEvents();
  }
  
  // Update Cart Summary (Subtotal, Tax, Total)
  function updateCartSummary() {
    const itemCountElement = document.getElementById('itemCount');
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const taxAmountElement = document.getElementById('taxAmount');
    const cartTotalElement = document.getElementById('cartTotal');
    
    const subtotal = cart.reduce((sum, item) => {
      return sum + (products[item.id].price * item.quantity);
    }, 0);
    
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    itemCountElement.textContent = itemCount;
    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxAmountElement.textContent = `$${tax.toFixed(2)}`;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  // Setup Event Listeners
  function setupEventListeners() {
    // Close Cart
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    // Checkout Button
    checkoutBtn.addEventListener('click', proceedToCheckout);
  }
  
  // Setup Cart Item Events
  function setupCartItemEvents() {
    // Quantity Buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        updateQuantity(index, cart[index].quantity - 1);
      });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        updateQuantity(index, cart[index].quantity + 1);
      });
    });
    
    // Quantity Input
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const index = parseInt(this.closest('.quantity-controls').querySelector('.minus').dataset.index);
        const newQuantity = parseInt(this.value);
        updateQuantity(index, newQuantity);
      });
    });
    
    // Remove Item
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.dataset.index);
        removeItem(index);
      });
    });
  }
  
  // Update Item Quantity
  function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return;
    
    cart[index].quantity = newQuantity;
    if (newQuantity === 0) {
      cart.splice(index, 1);
    }
    
    saveCart();
    updateCartDisplay();
  }
  
  // Remove Item
  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
  }
  
  // Toggle Cart Visibility
  function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    document.body.classList.toggle('cart-open');
  }
  
  // Proceed to Checkout
  function proceedToCheckout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // In a real implementation, redirect to checkout page
    alert(`Proceeding to checkout with ${document.getElementById('itemCount').textContent} items. Total: ${document.getElementById('cartTotal').textContent}`);
    
    // Example checkout flow:
    // window.location.href = '/checkout.html';
  }
  
  // Save Cart to LocalStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initCart);
  
  // Public function to add items to cart (can be called from other pages)
  function addToCart(productId, quantity = 1) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity
      });
    }
    
    saveCart();
    updateCartDisplay();
    toggleCart();
  }