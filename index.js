const product = [
    {
        id: 0,
        image: './item_images/parai.jpg',
        title: 'Parai',
        price: 120,
        description: 'Parai fish is high in protein, which can help with weight loss. Parai fish is a great source of vitamin D, which is good for eye and brain health. Parai fish contains antibiotics.'
    },
    {
        id: 1,
        image: "./item_images/ooli.jpg",
        title: 'ooli',
        price: 60,
        description: 'Ooli fish is high in omega-3 fatty acids, which can help reduce the risk of heart disease Ooli fish can help prevent eye problems. Ooli fish can help with asthma and other respiratory issues.'
    },
    {
        id: 2,
        image: './item_images/vaaval.jpg',
        title: 'vaaval',
        price: 230,
        description:'Contains calcitriol, which can boost immunity A great source of protein, which can boost metabolism.'
    },
    {
        id: 3,
        image: './item_images/prawns.jpg',
        title: 'Prawns',
        price: 100,
        description:'Prawns are a complete protein, containing all nine essential amino acids. Prawns contain many minerals that support bone health, immunity, and tissue repair.'
    },
    {
        id: 4,
        image: './item_images/squid.jpg',
        title: 'Squid',
        price: 100,
        description:'Squid, also known as calamari, is a nutritious seafood that contains many vitamins and minerals, including protein, potassium, vitamin B12, iron, phosphorus, and copper. squid are a good source of calcium.'
    },
    {
        id: 5,
        image: './item_images/tiger_prawn.jpg',
        title: 'singa Irral',
        price: 100,
        description:'Tiger prawns are high in protein, which helps build body tissues, maintain cells, and support metabolism. Tiger prawns contain high levels of omega-3 fatty acids, which can help lower blood pressure.'
    },
    {
        id: 6,
        image: './item_images/challai.jpg',
        title: 'Challai',
        price: 50,
        description:'Chaulai is a good source of protein, and contains more protein than other grains. It also contains theamino acid lysine, which helps build proteins and maintain good health. Chaulai is high in dietary fiber, which can help you feel full for longer and may aid in weight loss.'
    },
    {
        id: 7,
        image: './item_images/sheela.jpg',
        title: 'Sheela',
        price: 100,
        description:'Sheela fish, also known as Ooli fish, Pilinjan, Cheela, Goli, Gola, and Oozha, has many health benefits, including: Sheela fish is high in protein and low in carbs. Protein is essential for human health and can provide energy.'
    },
    {
        id: 8,
        image: './item_images/vallai.jpg',
        title: 'Vaalai Fish',
        price: 1000,
        description:'Omega-3 fatty acids in vaalai fish can help lower blood pressure, reduce blood clotting, and lower the risk of heart disease and strokes. Omega-3 fatty acids, especially DHA, can help with brain health and cognitive function.'
    }
];

const categories = [...new Set(product.map((item) => { return item }))];
let i = 0;

// Initialize cart array
let cart = [];

// Add these at the top with your other variables
let likedProducts = [];

// Render products
function renderProducts() {
    document.getElementById('root').innerHTML = categories.map((item) => {
        var { image, title, price, description, id } = item;
        const isLiked = likedProducts.some(product => product.id === id);
        return (
            `<div class="item item2">
                <div class="image_relative">
                    <p class="floatleft">40% OFF</p>
                    <button class="like-button ${isLiked ? 'active' : ''}" onclick="toggleLikeProduct(${id})">
                        <span class="heart">&hearts;</span>
                    </button>
                </div>
                <div class="item_image">
                    <img src=${image} alt="">
                </div>
                <div class="name_rate">
                    <h3>${title}</h3>
                    <div class="price-section">
                        <span class="old-price">₹100</span>
                        <span class="new-price" id="discounted-price"> &#8377; ${price}.00</span>
                    </div>
                </div>
                <p class="weight">570 - 520 gms</br>Gross weight</p>
                <p class="description"> ${description}</p>

                <div class="last_two_button">
                    <h2 style="display:none;">$ ${price}.00</h2>` +
                    "<button onclick='addtocart(" + (i++) + ")' type='button' class='cart_btn button'>Add Cart</button>" +
                    `<button onclick="" type="button" class="buy_button button">Buy Now</button>
                </div>
            </div>`
        );
    }).join('');
}

// Cart functions
function addtocart(a) {
    cart.push({ ...categories[a] });
    displaycart();
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}

function displaycart() {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty</p>
                <span>Add some products to start shopping</span>
                <button onclick="toggleCart()" class="continue-btn">
                    <i class="fa-solid fa-arrow-left"></i> Start Shopping
                </button>
            </div>`;
        document.getElementById("total").innerHTML = "₹0.00";
        document.getElementById("finalTotal").innerHTML = "₹0.00";
        document.getElementById("savingsTotal").innerHTML = "₹0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items, index) => {
            var { image, title, price } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "₹" + total + ".00";
            document.getElementById("finalTotal").innerHTML = "₹" + total + ".00";
            
            return `
                <div class='cart-item'>
                    <div class='item-image'>
                        <img src=${image} alt=${title}>
                    </div>
                    <div class='item-details'>
                        <h3>${title}</h3>
                        <div class="quantity-controls">
                            <button class="qty-btn minus-btn" onclick="updateQuantity(${index}, 'decrease')">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <span class="quantity">1</span>
                            <button class="qty-btn plus-btn" onclick="updateQuantity(${index}, 'increase')">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="price-delete">
                            <h4>₹${price}.00</h4>
                            <button class="delete-btn" onclick='delElement(${index})' title="Remove item">
                                <i class='fa-solid fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>`;
        }).join('');
    }
    calculateSavings();
}

function updateQuantity(index, action) {
    const quantityElement = document.querySelectorAll('.quantity')[index];
    let quantity = parseInt(quantityElement.textContent);
    
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    
    quantityElement.textContent = quantity;
    updateTotal();
}

function updateTotal() {
    let total = 0;
    cart.forEach((item, index) => {
        const quantity = parseInt(document.querySelectorAll('.quantity')[index].textContent);
        total += item.price * quantity;
    });
    
    document.getElementById("total").innerHTML = "₹" + total + ".00";
    document.getElementById("finalTotal").innerHTML = "₹" + total + ".00";
    calculateSavings();
}

function calculateSavings() {
    let savings = 0;
    cart.forEach((item, index) => {
        const quantity = parseInt(document.querySelectorAll('.quantity')[index].textContent);
        const originalPrice = 100; // Original price before discount
        savings += (originalPrice - item.price) * quantity;
    });
    document.getElementById("savingsTotal").innerHTML = "₹" + savings + ".00";
}

function toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.toggle('active');
}

function toggleLikeProduct(productId) {
    const product = categories.find(item => item.id === productId);
    const likeButton = document.querySelector(`[onclick="toggleLikeProduct(${productId})"]`);
    
    const index = likedProducts.findIndex(item => item.id === productId);
    if (index === -1) {
        likedProducts.push(product);
        likeButton.classList.add('active');
        // Show success message
        alert('Item added to wishlist!');
    } else {
        likedProducts.splice(index, 1);
        likeButton.classList.remove('active');
    }
    
    updateLikedItems();
    updateLikeCount();
}

function toggleLike() {
    const likeSidebar = document.getElementById("likeSidebar");
    if (!likeSidebar) {
        console.error("Like sidebar not found!");
        return;
    }
    
    // Force refresh liked items
    updateLikedItems();
    
    // Toggle sidebar visibility
    likeSidebar.style.right = likeSidebar.style.right === '0px' ? '-400px' : '0px';
}

function updateLikedItems() {
    const likedItemsContainer = document.getElementById('likedItems');
    if (!likedItemsContainer) {
        console.error("Liked items container not found!");
        return;
    }
    
    let totalValue = 0;
    
    if (likedProducts.length === 0) {
        likedItemsContainer.innerHTML = `
            <div class="empty-likes">
                <i class="fa-regular fa-heart"></i>
                <p>Your wishlist is empty</p>
                <span>Save items you love here</span>
                <button onclick="toggleLike()" class="continue-btn">
                    <i class="fa-solid fa-arrow-left"></i> Continue Shopping
                </button>
            </div>`;
    } else {
        likedProducts.forEach(item => {
            totalValue += item.price;
        });
        
        likedItemsContainer.innerHTML = likedProducts.map((item, index) => `
            <div class="liked-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p class="description">${item.description}</p>
                    <div class="price-actions">
                        <h4>₹${item.price}.00</h4>
                        <div class="action-buttons">
                            <button class="add-to-cart-btn" onclick="addToCartFromLikes(${item.id})" title="Add to cart">
                                <i class="fa-solid fa-cart-plus"></i> Add to Cart
                            </button>
                            <button class="remove-like-btn" onclick="removeLikedItem(${index})" title="Remove from wishlist">
                                <i class="fa-solid fa-heart-broken"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update counts and totals
    const likedItemCount = document.getElementById('likedItemCount');
    const likedItemsValue = document.getElementById('likedItemsValue');
    
    if (likedItemCount) likedItemCount.textContent = likedProducts.length;
    if (likedItemsValue) likedItemsValue.textContent = `₹${totalValue}.00`;
}

function addToCartFromLikes(productId) {
    const product = categories.find(item => item.id === productId);
    if (product) {
        addtocart(categories.findIndex(item => item.id === productId));
        // Optionally show a success message
        alert('Item added to cart!');
    }
}

function removeLikedItem(index) {
    const productId = likedProducts[index].id;
    likedProducts.splice(index, 1);
    // Remove active class from the product's like button
    const likeButton = document.querySelector(`[onclick="toggleLikeProduct(${productId})"]`);
    if (likeButton) likeButton.classList.remove('active');
    updateLikedItems();
}

function addAllToCart() {
    likedProducts.forEach(product => {
        if (!cart.some(item => item.id === product.id)) {
            addToCartFromLikes(product.id);
        }
    });
    toggleLike(); // Close the likes sidebar
    toggleCart(); // Open the cart sidebar
}

// Update the initialization
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateLikedItems();
    
    // Close sidebars when clicking outside
    document.addEventListener('click', function(event) {
        const likeSidebar = document.getElementById("likeSidebar");
        const cartSidebar = document.getElementById("cartSidebar");
        
        if (!event.target.closest('#likeSidebar') && 
            !event.target.closest('.like-link') && 
            !event.target.closest('.like-button')) {
            likeSidebar.classList.remove('active');
        }
        
        if (!event.target.closest('#cartSidebar') && 
            !event.target.closest('.cart') && 
            !event.target.closest('.cart_btn')) {
            cartSidebar.classList.remove('active');
        }
    });
    
    // Initialize liked products array if stored in localStorage
    const storedLikes = localStorage.getItem('likedProducts');
    if (storedLikes) {
        likedProducts = JSON.parse(storedLikes);
        updateLikedItems();
        updateLikeCount();
    }
    
    // Add event listeners for sidebar closing
    document.addEventListener('click', function(event) {
        const likeSidebar = document.getElementById("likeSidebar");
        if (!event.target.closest('#likeSidebar') && 
            !event.target.closest('.like-link') && 
            !event.target.closest('.like-button')) {
            likeSidebar.style.right = '-400px';
        }
    });
    
    // Prevent clicks inside sidebar from closing it
    document.getElementById('likeSidebar').addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Add this new function to update the like count
function updateLikeCount() {
    const likeCount = document.querySelector('.like-count');
    if (likeCount) {
        likeCount.textContent = `(${likedProducts.length})`;
    }
}

// Store likes in localStorage when updated
function saveLikes() {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

// Add these functions for filter functionality
function toggleFilterSidebar() {
    const sidebar = document.getElementById('filterSidebar');
    const overlay = document.querySelector('.filter-overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when filter is open
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function applyFilters() {
    const priceRange = document.getElementById('priceRange').value;
    const selectedCategories = Array.from(document.querySelectorAll('.filter-option input:checked'))
        .map(checkbox => checkbox.value);
    const sortValue = document.querySelector('input[name="sort"]:checked').value;

    // Filter products based on selected criteria
    let filteredProducts = categories.filter(product => {
        if (product.price > priceRange) return false;
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.title.toLowerCase())) return false;
        return true;
    });

    // Sort products
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            // Add your popular sorting logic here
            break;
    }

    // Render filtered products
    renderProducts(filteredProducts);
    toggleFilterSidebar();
}

function resetFilters() {
    document.getElementById('priceRange').value = 1000;
    document.querySelectorAll('.filter-option input').forEach(checkbox => checkbox.checked = false);
    document.querySelector('input[name="sort"][value="popular"]').checked = true;
    
    // Reset to original products
    renderProducts(categories);
    toggleFilterSidebar();
}

// Update price value display
document.getElementById('priceRange')?.addEventListener('input', function() {
    document.getElementById('priceValue').textContent = `₹${this.value}`;
});
// Close filter when clicking overlay
document.querySelector('.filter-overlay')?.addEventListener('click', toggleFilterSidebar);

