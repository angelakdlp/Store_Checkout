
    document.addEventListener('DOMContentLoaded', function() {
        //List all products and values
            const products = {
                "689145740844": { name: "JavaScript Textbook", price: 34.95 },
                "4549292070248": { name: "Xerox Paper", price: 10.99 },
                "092265222983": { name: "First Aid Kit", price: 20.99 },
                "X002ELVL3J": { name: "Box of Pencils (50ct.)", price: 15.99 },
                "686024002468": { name: "Sanitizing Wipes", price: 10.99 },
                "860004186236": { name: "N95 Face Masks", price: 15.99 },
                "036000214000": { name: "Kleenex", price: 3.99 },
                "8809693254156": { name: "Hand Sanitizer", price: 7.99 },
                "036500060480": { name: "Printer Paper", price: 9.99 },
                "085014561877": { name: "Brush Pens", price: 10.99 },
                "X0032YGP2T": { name: "Multiport Adapter", price: 25.99 },
                "B07G6JT1XS": { name: "Scissors (20ct.)", price: 23.99 },
                "9780134682334": { name: "iOS Programming Textbook", price: 119.99 },
                "718103230759": { name: "Spiral Notebook", price: 1.99 }
            };
    
       const cart = {};

    const barcodeInput = document.getElementById('barcodeInput');
    const quantityInput = document.getElementById('quantityInput');
    const addToCartButton = document.getElementById('addToCart');
    const cartContainer = document.getElementById('cart');

    addToCartButton.addEventListener('click', function() {
        const barcode = barcodeInput.value;
        const quantity = parseInt(quantityInput.value) || 1;

        if (products.hasOwnProperty(barcode)) {
            if (cart.hasOwnProperty(barcode)) {
                // Item already in cart, update quantity
                cart[barcode].quantity += quantity;
            } else {
                // Add new item to cart
                cart[barcode] = {
                    name: products[barcode].name,
                    price: products[barcode].price,
                    quantity: quantity
                };
            }

            // Update the HTML display of the cart
            updateCartDisplay();
        } else {
            alert('Invalid barcode. Please scan a valid product.');
        }

        // Clear input fields
        barcodeInput.value = '';
        quantityInput.value = '';
    });

    function updateCartDisplay() {
        const cartElement = document.getElementById("cart");

        // Clear the cart display
        cartElement.innerHTML = `
            <div class="CartRow">
                <span class="Header Item">Item</span>
                <span class="Header Price">Price</span>
                <span class="Header Quantitys">Quantity</span>
            </div>
        `;

        let isFirstRow = true;
        let totalAmount = 0;

        // Populate the cart display with items
        for (const barcode in cart) {
            const item = cart[barcode];
            const total = item.price * item.quantity;

            const itemElement = document.createElement("div");
            itemElement.classList.add("CartItemContainer"); 
            itemElement.innerHTML = `
                <span class="${isFirstRow ? 'Header ' : ''}Item">${item.name}</span>
                <span class="${isFirstRow ? 'Header ' : ''}Price">$${total.toFixed(2)}</span>
                <span class="${isFirstRow ? 'Header ' : ''}Quantitys">${item.quantity}</span>
            `;

            cartElement.appendChild(itemElement);

            totalAmount += total;
            isFirstRow = false;
        }

        // Update the total display
        const totalDisplay = document.getElementById('totalDisplay');
        totalDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }

    const checkoutButton = document.getElementById('checkoutButton');
    const totalDisplay = document.getElementById('totalDisplay');
    const grandTotalDisplay = document.getElementById('grandTotalDisplay');

    checkoutButton.addEventListener('click', function() {
        // Calculate grand total including tax (9.25%)
        const taxRate = 0.0925;
        const totalAmount = calculateTotal();
        const grandTotal = totalAmount * (1 + taxRate);

        // Display the total and grand total
        totalDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;
        grandTotalDisplay.textContent = `Your grand total (including tax, 9.25%) is $${grandTotal.toFixed(2)}`;
    });

    function calculateTotal() {
        let total = 0;
        for (const barcode in cart) {
            const item = cart[barcode];
            total += item.price * item.quantity;
        }
        return total;
    }
});