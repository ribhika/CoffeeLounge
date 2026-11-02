/* =========================================================
   RIBHIKA COFFEE LOUNGE
   GALLERY JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    const intro =
        document.getElementById("galleryIntro");


    const page =
        document.getElementById("galleryPage");


    const menuButton =
        document.getElementById(
            "galleryMenuButton"
        );


    const nav =
        document.querySelector(".gallery-nav");


    const cartCount =
        document.getElementById("cartCount");


    /* =====================================================
       PAGE INTRO
    ====================================================== */

    document.body.classList.add(
        "gallery-loading"
    );


    setTimeout(() => {

        intro.classList.add("hide");

        page.classList.add("visible");

        document.body.classList.remove(
            "gallery-loading"
        );

    }, 4200);



    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuButton && nav) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle("open");

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
                    sum + item.quantity,
                0
            );


        if (cartCount) {

            cartCount.textContent =
                total;

        }

    }


    updateCartCount();



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );



    /* =====================================================
       PARALLAX HERO IMAGE
    ====================================================== */

    const heroPhoto =
        document.querySelector(
            ".hero-photo"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                heroPhoto &&
                window.innerWidth > 800
            ) {

                const movement =
                    window.scrollY * 0.06;


                heroPhoto.style.transform =
                    `translateY(${movement}px)`;

            }

        }
    );



    /* =====================================================
       GALLERY LIGHTBOX
    ====================================================== */

    const galleryCards =
        document.querySelectorAll(
            ".gallery-card"
        );


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxTitle =
        document.getElementById(
            "lightboxTitle"
        );


    const lightboxNumber =
        document.getElementById(
            "lightboxNumber"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    galleryCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.dataset.image;


                const title =
                    card.dataset.title;


                const number =
                    card.dataset.number;


                lightboxImage.src =
                    image;


                lightboxImage.alt =
                    title;


                lightboxTitle.textContent =
                    title;


                lightboxNumber.textContent =
                    number;


                lightbox.classList.add(
                    "open"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });



    /* =====================================================
       CLOSE LIGHTBOX
    ====================================================== */

    function closeLightbox() {

        lightbox.classList.remove(
            "open"
        );


        document.body.style.overflow =
            "";

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "open"
                )
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================================
       IMAGE TILT EFFECT
    ====================================================== */

    galleryCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5)
                    * -2;


                const rotateY =
                    ((x / rect.width) - 0.5)
                    * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });



    /* =====================================================
       ACTIVE NAV
    ====================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".gallery-nav a"
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