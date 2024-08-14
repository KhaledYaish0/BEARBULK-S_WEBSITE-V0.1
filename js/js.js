

    document.querySelectorAll('.social-icon').forEach(item => {
        item.addEventListener('mouseover', event => {
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.innerText = item.getAttribute('data-tooltip');
            item.appendChild(tooltip);
        });

        item.addEventListener('mouseout', event => {
            const tooltip = item.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

$(document).ready(function() {
    $('.fas.fa-shopping-cart.cart').click(function() {
        var productId = $(this).data('product-id');
        $.post('order.php', { action: 'add_to_cart', product_id: productId }, function(response) {
            alert('Product added to cart!');
        });
    });
});

$('#navbar-toggle').click(function() {
    $('#navbar').toggleClass('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        document.getElementById('cart-count').innerText = cart.length;
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price} NIS</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity">
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)} NIS</td>
                    <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
                </tr>
            `;
        });
        document.getElementById('cart-total').innerText = `Total: ${total.toFixed(2)} NIS`;
    }

    document.getElementById('cart-button').addEventListener('click', () => {
        $('#cart-modal').modal('show');
        renderCartItems();
    });

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        }
    });

    document.getElementById('cart-items').addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity')) {
            const index = event.target.getAttribute('data-index');
            const quantity = parseInt(event.target.value);
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    window.addToCart = function(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    updateCartCount();
});

function checkout() {
    alert('Proceeding to checkout!');
    // Add your checkout logic here
}




document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = button.closest('.product');
            const color = productCard.querySelector('input[name="color"]:checked').value;
            const size = productCard.querySelector('.product-size').value;

            console.log(`Added to cart: Color - ${color}, Size - ${size}`);
            
            // You can now send this data to your backend or handle it as needed
        });
    });
});



    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = button.closest('.product');
                const color = productCard.querySelector('input[name="color"]:checked').value;
                const size = productCard.querySelector('input[name="size"]:checked').value;

                console.log(`Added to cart: Color - ${color}, Size - ${size}`);
                
                // You can now send this data to your backend or handle it as needed
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const productCard = button.closest('.product');
                const productName = productCard.querySelector('h5').innerText;
                const productDescription = productCard.querySelector('h6').innerText;
                const productPrice = productCard.querySelector('h4').innerText;
                const productImageSrc = productCard.querySelector('img').src;
                const color = productCard.querySelector('input[name="color"]:checked').value;
                const size = productCard.querySelector('input[name="size"]:checked').value;

                // Create a query string with the product details
                const queryString = `?name=${encodeURIComponent(productName)}&description=${encodeURIComponent(productDescription)}&price=${encodeURIComponent(productPrice)}&image=${encodeURIComponent(productImageSrc)}&color=${encodeURIComponent(color)}&size=${encodeURIComponent(size)}`;

                // Redirect to the order page with the query string
                window.location.href = 'shopping_cart.php' + queryString;
            });
        });
    });

