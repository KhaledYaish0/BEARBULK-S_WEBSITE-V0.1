<?php
// Retrieve product details from the query string
$productName = htmlspecialchars($_GET['name']);
$productDescription = htmlspecialchars($_GET['description']);
$productPrice = htmlspecialchars($_GET['price']);
$productImage = htmlspecialchars($_GET['image']);
$productColor = htmlspecialchars($_GET['color']);
$productSize = htmlspecialchars($_GET['size']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <style>
        .cart-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        .cart-item img {
            width: 100px;
            height: 100px;
            margin-right: 20px;
        }

        .cart-item-details {
            flex-grow: 1;
        }

        .cart-item-quantity {
            display: flex;
            align-items: center;
        }

        .cart-item-quantity button {
            padding: 5px 10px;
            margin: 0 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Shopping Cart</h1>
    <div class="cart-item">
        <img src="<?php echo $productImage; ?>" alt="Product Image">
        <div class="cart-item-details">
            <h2><?php echo $productName; ?></h2>
            <p><?php echo $productDescription; ?></p>
            <p>Color: <?php echo $productColor; ?></p>
            <p>Size: <?php echo $productSize; ?></p>
            <p>Price: <?php echo $productPrice; ?></p>
        </div>
        <div class="cart-item-quantity">
            <button onclick="decrementQuantity()">-</button>
            <input type="number" id="quantity" value="1" min="1" style="width: 50px;">
            <button onclick="incrementQuantity()">+</button>
        </div>
    </div>

    <script>
        function incrementQuantity() {
            const quantityInput = document.getElementById('quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }

        function decrementQuantity() {
            const quantityInput = document.getElementById('quantity');
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        }
    </script>
</body>
</html>
