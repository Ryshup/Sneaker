// Login/Signup Popup Logic
window.onload = function () {
  openPopup();  // Open the popup automatically when the page loads
};

function openPopup() {
  document.getElementById('popupContainer').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popupContainer').style.display = 'none';
}

function skipPopup() {
  document.getElementById('popupContainer').style.display = 'none';
}

function showSignup() {
  document.getElementById('loginPopup').style.display = 'none';
  document.getElementById('signupPopup').style.display = 'block';
}

function showLogin() {
  document.getElementById('signupPopup').style.display = 'none';
  document.getElementById('loginPopup').style.display = 'block';
}

// Product Slider Logic
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
{
  id: 1,
  title: "Air Force",
  price: 119,
  colors: [
    {
      code: "black",
      img: "./img/air.png",
    },
    {
      code: "darkblue",
      img: "./img/air2.png",
    },
  ],
},
{
  id: 2,
  title: "Air Jordan",
  price: 149,
  colors: [
    {
      code: "lightgray",
      img: "./img/jordan.png",
    },
    {
      code: "green",
      img: "./img/jordan2.png",
    },
  ],
},
{
  id: 3,
  title: "Blazer",
  price: 109,
  colors: [
    {
      code: "lightgray",
      img: "./img/blazer.png",
    },
    {
      code: "green",
      img: "./img/blazer2.png",
    },
  ],
},
{
  id: 4,
  title: "Crater",
  price: 129,
  colors: [
    {
      code: "black",
      img: "./img/crater.png",
    },
    {
      code: "lightgray",
      img: "./img/crater2.png",
    },
  ],
},
{
  id: 5,
  title: "Hippie",
  price: 99,
  colors: [
    {
      code: "gray",
      img: "./img/hippie.png",
    },
    {
      code: "black",
      img: "./img/hippie2.png",
    },
  ],
},
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
item.addEventListener("click", () => {
  // Change the current slide
  wrapper.style.transform = `translateX(${-100 * index}vw)`;

  // Change the chosen product
  choosenProduct = products[index];

  // Update product details
  currentProductTitle.textContent = choosenProduct.title;
  currentProductPrice.textContent = "$" + choosenProduct.price;
  currentProductImg.src = choosenProduct.colors[0].img;

  // Assign new colors
  currentProductColors.forEach((color, index) => {
    color.style.backgroundColor = choosenProduct.colors[index].code;
  });
});
});

currentProductColors.forEach((color, index) => {
color.addEventListener("click", () => {
  currentProductImg.src = choosenProduct.colors[index].img;
});
});

currentProductSizes.forEach((size) => {
size.addEventListener("click", () => {
  currentProductSizes.forEach((size) => {
    size.style.backgroundColor = "white";
    size.style.color = "black";
  });
  size.style.backgroundColor = "black";
  size.style.color = "white";
});
});

// Payment Popup Logic
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
payment.style.display = "flex";
});

close.addEventListener("click", () => {
payment.style.display = "none";
});

let cart = [];

function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: price, quantity: 1 });
    }
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const fullCartItems = document.getElementById('fullCartItems');
    const fullCartTotalAmount = document.getElementById('fullCartTotalAmount');

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    let cartHTML = '';
    let fullCartHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartHTML += `<div>${item.name} - $${item.price} x ${item.quantity}</div>`;
        fullCartHTML += `
            <div class="cartItem">
                <img src="./img/${item.id}.png" alt="${item.name}">
                <div class="cartItemDetails">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                </div>
                <div class="cartItemQuantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="removeItem" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotalAmount.textContent = total.toFixed(2);

    if (fullCartItems) {
        fullCartItems.innerHTML = fullCartHTML;
        fullCartTotalAmount.textContent = total.toFixed(2);
    }
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}

function viewCart() {
    window.location.href = 'cart.html';
}

function checkout() {
    alert('Proceeding to checkout...');
    // Implement checkout logic here
}

// Add this to your existing product display logic
function displayProducts() {
    products.forEach(product => {
        // ... existing product display code ...
        productCard.innerHTML += `
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
    });
}

// Call this when the page loads
updateCartDisplay();