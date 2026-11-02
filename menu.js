/* =========================================================
   RIBHIKA COFFEE LOUNGE
   MENU JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.getElementById("menuIntro");

    const page =
        document.getElementById("menuPage");

    const toggle =
        document.getElementById("menuToggle");

    const nav =
        document.querySelector(".menu-nav");

    const cartCount =
        document.getElementById("cartCount");


    /* =====================================================
       PAGE INTRO
    ====================================================== */

    document.body.classList.add("menu-loading");


    setTimeout(() => {

        intro.classList.add("hide");

        page.classList.add("visible");

        document.body.classList.remove("menu-loading");

    }, 4300);


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (toggle && nav) {

        toggle.addEventListener("click", () => {

            nav.classList.toggle("open");

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

            });

        });

    }


    /* =====================================================
       CATEGORY FILTER
    ====================================================== */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const menuItems =
        document.querySelectorAll(".menu-item");


    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            const selectedCategory =
                button.dataset.category;


            menuItems.forEach(item => {

                const itemCategory =
                    item.dataset.category;


                if (
                    selectedCategory === "all" ||
                    itemCategory === selectedCategory
                ) {

                    item.classList.remove("filtered-out");

                } else {

                    item.classList.add("filtered-out");

                }

            });

        });

    });


    /* =====================================================
       CART
    ====================================================== */

    let cart =
        JSON.parse(
            localStorage.getItem("ribhikaCart")
        ) || [];


    function updateCartCount() {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }

    }


    updateCartCount();


    /* =====================================================
       ADD TO CART
    ====================================================== */

    const addButtons =
        document.querySelectorAll(".add-cart");


    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);


            const existingItem =
                cart.find(
                    item =>
                        item.name === name
                );


            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            localStorage.setItem(
                "ribhikaCart",
                JSON.stringify(cart)
            );


            updateCartCount();


            /* BUTTON FEEDBACK */

            const originalText =
                button.innerHTML;


            button.innerHTML =
                "Added ✓";


            button.style.background =
                "#c59a5d";

            button.style.color =
                "#100604";


            setTimeout(() => {

                button.innerHTML =
                    originalText;

                button.style.background =
                    "";

                button.style.color =
                    "";

            }, 1200);

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const sections =
        document.querySelectorAll(
            ".signature-card, .coffee-card, .pairing-item"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    sections.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        observer.observe(element);

    });


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const heroCoffee =
        document.querySelector(".hero-coffee");


    window.addEventListener("scroll", () => {

        if (
            heroCoffee &&
            window.innerWidth > 800
        ) {

            const movement =
                window.scrollY * 0.08;

            heroCoffee.style.transform =
                `translateY(calc(-50% + ${movement}px))`;

        }

    });


    /* =====================================================
       MOUSE MOVEMENT EFFECT
    ====================================================== */

    const signatureImages =
        document.querySelectorAll(
            ".signature-image"
        );


    signatureImages.forEach(container => {

        container.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    container.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -3;


                const rotateY =
                    ((x / rect.width) - 0.5) * 3;


                container.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        container.addEventListener(
            "mouseleave",
            () => {

                container.style.transform =
                    "perspective(800px) rotateX(0) rotateY(0)";

            }
        );

    });


    /* =====================================================
       ACTIVE PAGE
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(".menu-nav a")
        .forEach(link => {

            if (
                link.getAttribute("href") ===
                currentPage
            ) {

                link.classList.add("active");

            }

        });

});