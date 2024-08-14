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

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetch('checkout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Order processed successfully') {
            localStorage.removeItem('cart');
            document.getElementById('cart-count').innerText = 0;
            $('#cart-modal').modal('hide');
        }
    })
    .catch(error => console.error('Error:', error));
}