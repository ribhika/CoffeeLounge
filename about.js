/* =========================================================
   RIBHIKA COFFEE LOUNGE
   ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const intro = document.getElementById("aboutIntro");
    const page = document.getElementById("aboutPage");
    const menuButton = document.getElementById("aboutMenuButton");
    const navigation = document.querySelector(".about-nav");


    /* =====================================================
       BODY LOCK DURING INTRO
    ====================================================== */

    document.body.classList.add("intro-running");


    /* =====================================================
       ABOUT CINEMATIC INTRO
    ====================================================== */

    setTimeout(() => {

        intro.classList.add("finished");

        page.classList.add("visible");

        document.body.classList.remove("intro-running");

    }, 5200);


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("open");

            menuButton.classList.toggle("open");

        });


        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuButton.classList.remove("open");

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    const navbar =
        document.querySelector(".about-navbar");


    window.addEventListener("scroll", () => {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(16, 8, 5, 0.88)";

            navbar.style.backdropFilter =
                "blur(14px)";

        } else {

            navbar.style.background =
                "transparent";

            navbar.style.backdropFilter =
                "none";

        }

    });


    /* =====================================================
       IMAGE PARALLAX
    ====================================================== */

    const founderImage =
        document.querySelector(".founder-photo-frame img");


    window.addEventListener("scroll", () => {

        if (!founderImage) {
            return;
        }

        const section =
            document.querySelector(".founder-section");

        if (!section) {
            return;
        }


        const rect =
            section.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;


        if (
            rect.top < windowHeight &&
            rect.bottom > 0
        ) {

            const progress =
                (windowHeight - rect.top) /
                (windowHeight + rect.height);

            const movement =
                (progress - 0.5) * 18;

            founderImage.style.transform =
                `translateY(${movement}px) scale(1.02)`;

        }

    });


    /* =====================================================
       STAFF IMAGE HOVER TILT
    ====================================================== */

    const staffCards =
        document.querySelectorAll(".staff-member");


    staffCards.forEach(card => {

        const image =
            card.querySelector(".staff-photo img");


        if (!image) {
            return;
        }


        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 800) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 60;

            const rotateY =
                (centerX - x) / 60;


            image.style.transform =
                `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            image.style.transform =
                "scale(1) rotateX(0) rotateY(0)";

        });

    });


    /* =====================================================
       PHILOSOPHY PARALLAX
    ====================================================== */

    const philosophyWord =
        document.querySelector(".philosophy-word");


    window.addEventListener("scroll", () => {

        if (!philosophyWord) {
            return;
        }


        const scroll =
            window.scrollY;


        philosophyWord.style.transform =
            `translateX(${scroll * 0.025}px)`;

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");


                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);


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
       IMAGE LOADING
    ====================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener("load", () => {

                image.classList.add("loaded");

            });

        });


    /* =====================================================
       CURSOR LIGHT
    ====================================================== */

    if (window.innerWidth > 900) {

        const cursorLight =
            document.createElement("div");


        cursorLight.className =
            "about-cursor-light";


        document.body.appendChild(cursorLight);


        const style =
            document.createElement("style");


        style.textContent = `

            .about-cursor-light {

                position: fixed;

                width: 220px;
                height: 220px;

                border-radius: 50%;

                pointer-events: none;

                z-index: 999;

                transform:
                    translate(-50%, -50%);

                background:
                    radial-gradient(
                        circle,
                        rgba(197,154,93,0.07),
                        transparent 70%
                    );

                transition:
                    left 0.12s ease,
                    top 0.12s ease;

            }

        `;


        document.head.appendChild(style);


        document.addEventListener(
            "mousemove",
            event => {

                cursorLight.style.left =
                    `${event.clientX}px`;

                cursorLight.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document.querySelectorAll(".about-nav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (href === currentPage) {

                link.classList.add("active");

            }

        });

});