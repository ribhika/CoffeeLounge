/* =========================================================
   RIBHIKA COFFEE LOUNGE
   CONTACT PAGE JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const intro =
        document.getElementById(
            "contactIntro"
        );


    const page =
        document.getElementById(
            "contactPage"
        );


    const menuButton =
        document.getElementById(
            "contactMenuButton"
        );


    const nav =
        document.querySelector(
            ".contact-nav"
        );


    const form =
        document.getElementById(
            "contactForm"
        );


    const status =
        document.getElementById(
            "formStatus"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    /* =====================================================
       OPENING ANIMATION
    ====================================================== */

    document.body.classList.add(
        "loading"
    );


    setTimeout(() => {

        intro.classList.add(
            "hide"
        );

        page.classList.add(
            "visible"
        );

        document.body.classList.remove(
            "loading"
        );

    }, 4000);



    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "open"
                );

            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }



    /* =====================================================
       CART COUNT
    ====================================================== */

    function updateCartCount() {

        const cart =
            JSON.parse(
                localStorage.getItem(
                    "ribhikaCart"
                )
            ) || [];


        const total =
            cart.reduce(
                (sum, item) =>
                    sum + (item.quantity || 0),
                0
            );


        if (cartCount) {

            cartCount.textContent =
                total;

        }

    }


    updateCartCount();



    /* =====================================================
       FORM SUBMISSION
    ====================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    status.textContent =
                        "Please fill in all required fields.";

                    return;

                }


                status.textContent =
                    "Your message is being prepared...";


                setTimeout(() => {

                    status.textContent =
                        `Thank you, ${name}. Your message has been received. ☕`;

                    form.reset();

                }, 1200);

            }
        );

    }



    /* =====================================================
       INPUT FOCUS EFFECT
    ====================================================== */

    const inputs =
        document.querySelectorAll(
            ".input-group input, .input-group textarea, .input-group select"
        );


    inputs.forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input.parentElement.classList.add(
                    "focused"
                );

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.parentElement.classList.remove(
                    "focused"
                );

            }
        );

    });



    /* =====================================================
       LOCATION BUTTON
    ====================================================== */

    const mapButton =
        document.getElementById(
            "mapButton"
        );


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            () => {

                const query =
                    encodeURIComponent(
                        "Ribhika Coffee Lounge"
                    );


                window.open(
                    `https://www.google.com/maps/search/?api=1&query=${query}`,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const giantText =
        document.querySelector(
            ".hero-giant-text"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                giantText &&
                window.innerWidth > 800
            ) {

                giantText.style.transform =
                    `translateY(${window.scrollY * 0.08}px)`;

            }

        }
    );



    /* =====================================================
       EXPERIENCE CARD REVEAL
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".experience-card"
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

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(40px)";

        card.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";


        observer.observe(card);

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".contact-nav a"
        )
        .forEach(link => {

            if (
                link.getAttribute("href") ===
                currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

});