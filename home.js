/* =========================================================
   RIBHIKA COFFEE LOUNGE
   HOME PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const introScreen = document.getElementById("introScreen");
    const mainContent = document.getElementById("mainContent");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const cartCount = document.getElementById("cartCount");


    /* =====================================================
       BODY INTRO STATE
    ====================================================== */

    document.body.classList.add("intro-active");


    /* =====================================================
       CINEMATIC INTRO
    ====================================================== */

    const introDuration = 5500;

    setTimeout(() => {

        introScreen.classList.add("hide");

        mainContent.classList.add("visible");

        document.body.classList.remove("intro-active");

    }, introDuration);


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active");

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ====================================================== */

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("active");

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ====================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       CART COUNT
    ====================================================== */

    function updateCartCount() {

        let cart = [];

        try {

            cart = JSON.parse(
                localStorage.getItem("ribhikaCart")
            ) || [];

        } catch (error) {

            cart = [];

        }


        let totalItems = 0;

        if (Array.isArray(cart)) {

            cart.forEach(item => {

                if (item && item.quantity) {

                    totalItems += Number(item.quantity);

                }

            });

        }


        cartCount.textContent = totalItems;

    }


    updateCartCount();


    /* =====================================================
       UPDATE CART WHEN USER RETURNS TO PAGE
    ====================================================== */

    window.addEventListener("storage", () => {

        updateCartCount();

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       PARALLAX HERO EFFECT
    ====================================================== */

    const hero = document.querySelector(".hero");
    const heroCup = document.querySelector(".hero-cup");

    window.addEventListener("scroll", () => {

        if (!hero || !heroCup) {
            return;
        }

        const scrollPosition = window.scrollY;

        if (scrollPosition < window.innerHeight) {

            heroCup.style.transform =
                `translateY(calc(-50% + ${scrollPosition * 0.12}px))`;

        }

    });


    /* =====================================================
       NAVBAR BACKGROUND ON SCROLL
    ====================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(16, 8, 5, 0.82)";

            navbar.style.backdropFilter =
                "blur(12px)";

        } else {

            navbar.style.background =
                "transparent";

            navbar.style.backdropFilter =
                "none";

        }

    });


    /* =====================================================
       CURSOR GLOW FOR DESKTOP
    ====================================================== */

    if (window.innerWidth > 900) {

        const cursorGlow = document.createElement("div");

        cursorGlow.className = "cursor-glow";

        document.body.appendChild(cursorGlow);


        const glowStyle = document.createElement("style");

        glowStyle.textContent = `

            .cursor-glow {

                position: fixed;

                width: 180px;
                height: 180px;

                border-radius: 50%;

                pointer-events: none;

                z-index: 999;

                background:
                    radial-gradient(
                        circle,
                        rgba(198, 155, 97, 0.08),
                        transparent 70%
                    );

                transform:
                    translate(-50%, -50%);

                transition:
                    left 0.12s ease,
                    top 0.12s ease;

            }

        `;

        document.head.appendChild(glowStyle);


        document.addEventListener("mousemove", event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        });

    }


    /* =====================================================
       IMAGE LOAD EFFECT
    ====================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("load", () => {

            image.classList.add("loaded");

        });

    });


    /* =====================================================
       ACTIVE PAGE
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    navigationItems.forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });

});