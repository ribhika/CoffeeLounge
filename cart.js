/* =========================================================
   RIBHIKA COFFEE LOUNGE
   CART PAGE JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================== */

        const opening =
            document.getElementById(
                "cartOpening"
            );


        const page =
            document.getElementById(
                "cartPage"
            );


        const cartItemsContainer =
            document.getElementById(
                "cartItems"
            );


        const emptyCart =
            document.getElementById(
                "emptyCart"
            );


        const subtotalElement =
            document.getElementById(
                "subtotal"
            );


        const taxElement =
            document.getElementById(
                "tax"
            );


        const serviceElement =
            document.getElementById(
                "service"
            );


        const totalElement =
            document.getElementById(
                "total"
            );


        const itemCountElement =
            document.getElementById(
                "itemCount"
            );


        const navCartCount =
            document.getElementById(
                "navCartCount"
            );


        const checkoutButton =
            document.getElementById(
                "checkoutButton"
            );


        const menuButton =
            document.getElementById(
                "cartMenu"
            );


        const navigation =
            document.querySelector(
                ".cart-nav"
            );



        /* =================================================
           OPENING ANIMATION
        ================================================== */

        document.body.classList.add(
            "loading"
        );


        setTimeout(
            () => {

                opening.classList.add(
                    "hide"
                );

                page.classList.add(
                    "visible"
                );

                document.body.classList.remove(
                    "loading"
                );

            },
            4000
        );



        /* =================================================
           MOBILE MENU
        ================================================== */

        if (
            menuButton &&
            navigation
        ) {

            menuButton.addEventListener(
                "click",
                () => {

                    navigation.classList.toggle(
                        "open"
                    );

                }
            );


            navigation
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                navigation.classList.remove(
                                    "open"
                                );

                            }
                        );

                    }
                );

        }



        /* =================================================
           GET CART
        ================================================== */

        function getCart() {

            return (
                JSON.parse(
                    localStorage.getItem(
                        "ribhikaCart"
                    )
                ) || []
            );

        }



        /* =================================================
           SAVE CART
        ================================================== */

        function saveCart(cart) {

            localStorage.setItem(
                "ribhikaCart",
                JSON.stringify(cart)
            );

        }



        /* =================================================
           FORMAT PRICE
        ================================================== */

        function formatPrice(price) {

            return "₹" +
                Number(price)
                    .toLocaleString(
                        "en-IN"
                    );

        }



        /* =================================================
           RENDER CART
        ================================================== */

        function renderCart() {


            const cart =
                getCart();


            cartItemsContainer.innerHTML =
                "";


            let totalItems = 0;

            let subtotal = 0;



            /* ---------------------------------------------
               EMPTY CART
            --------------------------------------------- */

            if (
                cart.length === 0
            ) {

                emptyCart.classList.add(
                    "show"
                );

            }

            else {

                emptyCart.classList.remove(
                    "show"
                );

            }



            /* ---------------------------------------------
               CREATE ITEMS
            --------------------------------------------- */

            cart.forEach(
                (item, index) => {


                    const quantity =
                        Number(
                            item.quantity
                        ) || 1;


                    const price =
                        Number(
                            item.price
                        ) || 0;


                    totalItems +=
                        quantity;


                    subtotal +=
                        price * quantity;



                    const itemElement =
                        document.createElement(
                            "article"
                        );


                    itemElement.className =
                        "cart-item";


                    itemElement.innerHTML = `

                        <div class="item-image">

                            <img
                                src="${item.image || "images/coffee1.jpg"}"
                                alt="${item.name || "Coffee"}"
                                onerror="this.style.display='none'"
                            >

                        </div>


                        <div class="item-info">

                            <span>
                                RIBHIKA SELECTION
                            </span>

                            <h4>
                                ${item.name || "Coffee"}
                            </h4>

                            <p>
                                ${item.speciality || "Crafted specially for you."}
                            </p>


                            <div class="quantity-controls">

                                <button
                                    class="minus"
                                    data-index="${index}">
                                    −
                                </button>

                                <span>
                                    ${quantity}
                                </span>

                                <button
                                    class="plus"
                                    data-index="${index}">
                                    +
                                </button>

                            </div>


                            <button
                                class="remove-item"
                                data-index="${index}">
                                Remove
                            </button>

                        </div>


                        <div class="item-price">

                            ${formatPrice(
                                price * quantity
                            )}

                        </div>

                    `;


                    cartItemsContainer.appendChild(
                        itemElement
                    );

                }
            );



            /* =================================================
               PRICES
            ================================================== */

            const tax =
                subtotal * 0.05;


            const service =
                subtotal > 0
                    ? 20
                    : 0;


            const total =
                subtotal +
                tax +
                service;



            subtotalElement.textContent =
                formatPrice(
                    subtotal
                );


            taxElement.textContent =
                formatPrice(
                    tax
                );


            serviceElement.textContent =
                formatPrice(
                    service
                );


            totalElement.textContent =
                formatPrice(
                    total
                );


            itemCountElement.textContent =
                totalItems;


            navCartCount.textContent =
                totalItems;



            addCartEvents();

        }



        /* =================================================
           CART BUTTON EVENTS
        ================================================== */

        function addCartEvents() {


            const plusButtons =
                document.querySelectorAll(
                    ".plus"
                );


            const minusButtons =
                document.querySelectorAll(
                    ".minus"
                );


            const removeButtons =
                document.querySelectorAll(
                    ".remove-item"
                );



            plusButtons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            changeQuantity(
                                Number(
                                    button.dataset.index
                                ),
                                1
                            );

                        }
                    );

                }
            );



            minusButtons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            changeQuantity(
                                Number(
                                    button.dataset.index
                                ),
                                -1
                            );

                        }
                    );

                }
            );



            removeButtons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            removeItem(
                                Number(
                                    button.dataset.index
                                )
                            );

                        }
                    );

                }
            );

        }



        /* =================================================
           CHANGE QUANTITY
        ================================================== */

        function changeQuantity(
            index,
            amount
        ) {


            const cart =
                getCart();


            if (!cart[index]) {

                return;

            }


            cart[index].quantity =
                Number(
                    cart[index].quantity
                ) + amount;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(
                    index,
                    1
                );

            }


            saveCart(
                cart
            );


            renderCart();

        }



        /* =================================================
           REMOVE ITEM
        ================================================== */

        function removeItem(
            index
        ) {


            const cart =
                getCart();


            cart.splice(
                index,
                1
            );


            saveCart(
                cart
            );


            renderCart();

        }



        /* =================================================
           CHECKOUT
        ================================================== */

        if (
            checkoutButton
        ) {

            checkoutButton.addEventListener(
                "click",
                () => {


                    const cart =
                        getCart();


                    if (
                        cart.length === 0
                    ) {

                        alert(
                            "Your cart is empty. Add a beautiful coffee first ☕"
                        );

                        return;

                    }


                    alert(
                        "Thank you for choosing Ribhika Coffee Lounge! Your checkout is ready. ☕"
                    );

                }
            );

        }



        /* =================================================
           INITIAL RENDER
        ================================================== */

        renderCart();



        /* =================================================
           SCROLL REVEAL
        ================================================== */

        const sections =
            document.querySelectorAll(
                ".benefit"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                            }

                        }
                    );

                },
                {
                    threshold: 0.2
                }
            );



        sections.forEach(
            section => {

                section.style.opacity =
                    "0";

                section.style.transform =
                    "translateY(40px)";

                section.style.transition =
                    "opacity 0.8s ease, transform 0.8s ease";


                observer.observe(
                    section
                );

            }
        );

    }
);