document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function showCart() {
        const cartElement = document.querySelector(".cart");
        if (cartElement.style.right <= "-100vw") {
            cartElement.style.right = "0px";
        } else {
            cartElement.style.right = "-100vw";
        }

        if (cart.length <= 0) {
            console.log('Carrinho vazio :(');
        } else {
            console.dir(localStorage.getItem('cart'));
        }
    }

    function addItem(e) {
        const value = e.getAttribute('value');
        const popup = document.getElementById("sucessPopUp");

        if (!value) {
            console.error('Valor não definido!');
            return;
        }
        document.querySelectorAll('a').forEach(function (element) {
            element.style.pointerEvents = "none";
        });
        const [itemName, itemValue, photoUrl] = value.split(';');

        const product = {
            name: itemName,
            value: parseFloat(itemValue.replace(',', '.')),
            url: photoUrl,
            key: itemName,
            quantity: 1
        };

        const existingProductIndex = cart.findIndex(item => item.name === itemName);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        console.log(cart);

        const total = () => {
            return cart.reduce((sum, item) => sum + (item.value * item.quantity), 0);
        };
        console.log(`Valor total: R$ ${total().toFixed(2)}`);

        if (popup) {
            popup.classList.add("animatePopUp");

            setTimeout(() => {
                popup.classList.remove("animatePopUp");
                document.querySelectorAll('a').forEach(function (element) {
                    element.style.pointerEvents = "all";
                });
            }, 2500);
        }

        renderCart();
    }

    function renderCart() {
        const cartlist = document.querySelector(".clist");
        const totalValueHTML = document.getElementById("cartTotalValue");

        if (!cartlist) {
            console.error("Elemento .clist não encontrado!");
            return;
        }
        cartlist.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                cartlist.innerHTML += `
                    <li class="cartItem">
                        <div class="cartItemImage">
                            <img src="${item.url}" alt="foto de ${item.name}">
                        </div>
                        <div class="cartItemInfo">
                            <span class="itemNameAndPrice">
                                <h1>${item.name}</h1>
                                <h1 class="cartItemPrice">R$ ${(item.value * item.quantity).toFixed(2)}</h1>
                            </span>
                            <p>Quantidade: ${item.quantity}</p>
                        </div>
                        <button onclick="removeItem('${item.key}')">Remover item</button>
                    </li>
                `.trim();
            });

            let total = () => {
                return cart.reduce((sum, item) => sum + (item.value * item.quantity), 0);
            };
            totalValueHTML.innerText = `Valor total: R$ ${total().toFixed(2)}`;
        } else {
            cartlist.innerHTML = '<h1>Carrinho vazio :(</h1>';
            totalValueHTML.innerText = ``;
        }
    }

    function removeItem(key) {
        const itemIndex = cart.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    renderCart();

    window.showCart = showCart;
    window.addItem = addItem;
    window.renderCart = renderCart;
    window.removeItem = removeItem;
});
