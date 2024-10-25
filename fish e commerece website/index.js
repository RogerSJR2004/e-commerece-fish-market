function price() {
    let originalPrice = 100; // Old price
    let discountRate = 40; // Discount in percentage
    let discountedPrice = originalPrice - (originalPrice * (discountRate / 100));
    
    // Select all elements with class 'discounted-price'
    let priceElements = document.querySelectorAll(".new-price");
    
    priceElements.forEach(element => {
        element.innerHTML = '₹' + discountedPrice.toFixed(2);
    });
}

window.onload = price;
