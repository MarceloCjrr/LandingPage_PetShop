//  NAVBAR

const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
    navbar.classList.toggle("sticky", window.scrollY > 0)
);

<<<<<<< HEAD
const menu = document.querySelector(".menu");
const toggleMenu = () => { if (menu) menu.classList.toggle("active"); };
=======
/* * CORREÇÃO DE BUG 1:
 * Você estava tentando selecionar a tag <menu>, que não existe no seu HTML.
 * O correto é selecionar a DIV com a *classe* ".menu".
*/
const menu = document.querySelector(".menu"); // <-- MUDANÇA AQUI
const toggleMenu = () => menu.classList.toggle("active");
>>>>>>> f61b036f8a147a9f14796a5aa443b8b2aa87638b

const menuBtn = document.querySelector(".menu-btn");
if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
const closeBtn = document.querySelector(".close-btn");
if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

document
    .querySelectorAll(".menu a")
    .forEach((link) => link.addEventListener("click", toggleMenu));

// Lenis Smooth Scrolling
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// Scroll Reveal
const sr = ScrollReveal({
    origin: "bottom",
    distance: "40px",
    duration: 800,
    delay: 200,
    easing: "ease-in-out",
});

gsap.to("nav", {
    opacity: 1,
    duration: 2,
});
sr.reveal(".hero-headlines h1");
sr.reveal(".hero-headlines p", { delay: 500 });
sr.reveal(".hero-headlines-buttons", { delay: 1000 });
gsap.from(".hero-imagens img", {
    opacity: 0,
    duration: 1,
    stagger: 0.5,
});
sr.reveal(".requirements-headlines h1");
sr.reveal(".requirements-headlines p", { delay: 500 });
sr.reveal(".requirements img", { delay: 500 });
sr.reveal(".r-item-container", { delay: 1000 });
sr.reveal(".pets-headlines");
sr.reveal(".pet-item h3");
sr.reveal(".sobre-headlines");
sr.reveal(".sobre img");
sr.reveal(".testimunhas h1", { delay: 500 });
sr.reveal(".testimunhas h6");
sr.reveal(".testimunhas-item", { delay: 1000 });
sr.reveal(".footer-brand");
sr.reveal(".footer-links", { delay: 500, origin: "left" });
// MUDANÇA: Adicionando a animação para a nova seção de doação
sr.reveal(".footer-doacao", { delay: 500, origin: "bottom" });
sr.reveal(".footer-contato-info", { delay: 500, origin: "right" });
sr.reveal(".copyright", { delay: 600 });


// GSAP Hero Animation
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
    trigger: ".heropage",
    start: "top center",
    end: "center center",
    scrub: 1,
    onToggle: (self) => {
        if (self.isActive) {
            gsap.to(".hero-imagens img", { scale: 1, gap: "664px", duration: 0.5 });
        } else {
            gsap.to(".hero-imagens img", {
                scale: "1.2",
                gap: "35px",
                duration: 0.5,
            });
        }
    },
});


// GSAP Text Reveal
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;

<<<<<<< HEAD
    const text = new SplitType(char, { type: "chars" });
=======
    /* * CORREÇÃO DE BUG 2:
     * O nome da biblioteca que você importou é "SplitType" (no singular).
     * Usar "SplitTypes" (com 's') causaria um erro.
    */
    const text = new SplitType(char, { type: "chars" }); // <-- MUDANÇA AQUI
>>>>>>> f61b036f8a147a9f14796a5aa443b8b2aa87638b

    gsap.fromTo(
        text.chars,
        {
            color: bg,
        },
        {
            
            color: fg,
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
                trigger: char,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                markers: false,
                toggleActions: "play play reverse reverse",
            },
        }
    );
});