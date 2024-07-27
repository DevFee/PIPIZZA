document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            console.error("Erro ao analisar os dados do carrinho do localStorage:", e);
        }
    }

    function showCart() {
        const cartElement = document.querySelector(".cart");
        if (cartElement.style.right === "-110vw" || cartElement.style.right === "") {
            cartElement.style.right = "0px";
        } else {
            cartElement.style.right = "-110vw";
        }

        if (cart.length <= 0) {
            console.log('Carrinho vazio :(');
        } else {
            console.dir(cart);
        }
    }

    function closeCart() {
        const cartElement = document.querySelector(".cart");
        cartElement.style.right = "-110vw";
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
            amount: 1
        };

        const existingProductIndex = cart.findIndex(item => item.name === itemName);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].amount += 1;
        } else {
            cart.push(product);
        }

        console.log(product.key);

        const total = () => {
            return cart.reduce((sum, item) => sum + (item.value * item.amount), 0);
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

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        const cartStats = document.querySelector(".cartStats");
        const cartlist = document.querySelector(".clist");
        const paybtn = document.getElementById("cartPayButton");
        const emptyCartdiv = document.querySelector(".cartEmpty");

        if (!cartlist) {
            console.error("Elemento .clist não encontrado!");
            return;
        }
        cartlist.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                cartlist.innerHTML += `
                    <li class="cartItem">
                        <article>
                            <img src="${item.url}" alt="Pizza de ${item.name}" srcset="">
                            <section>
                                <article class="cartItemName">
                                    <h4>${item.name}</h4>
                                </article>
                                <article class="cartItemInfo">
                                    <h6>15 min</h6>
                                    <h6 class="cartItemIsReady">Pronto para entrega!</h6>
                                </article>
                                <article class="cartItemValueAndOp">
                                    <p>R$ ${(item.value.toFixed(2) * item.amount).toFixed(2)}</p>
                                    <article class="cartItemOptions">
                                            <h5>${item.amount}</h5>
                                            <button onclick="removeItem('${item.key}')">-1</button>
                                            <button value="${item.name};${item.value};${item.url}" onclick="addItem(this)">+1</button>
                                    </article>
                                </article>
                            </section>
                        </article>
                    </li>
                `;
            });

            const total = cart.reduce((sum, item) => sum + (item.value * item.amount), 0);
            emptyCartdiv.style.display = 'none';
            paybtn.style.display = 'block';
            paybtn.innerText = `Pagar R$ ${total.toFixed(2)}`;
        } else {
            paybtn.style.display = 'none';
            emptyCartdiv.style.display = 'flex';
        }
    }

    function removeItem(key) {
        const itemIndex = cart.findIndex(item => item.key === key);
        if (itemIndex !== -1) {
            if (cart[itemIndex].amount > 1) {
                cart[itemIndex].amount -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    renderCart();

    window.showCart = showCart;
    window.addItem = addItem;
    window.renderCart = renderCart;
    window.removeItem = removeItem;
    window.clearCart = clearCart;
    window.closeCart = closeCart;
});
