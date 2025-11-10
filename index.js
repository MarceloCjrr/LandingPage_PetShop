// NAVBARR
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
    navbar.classList.toggle("sticky", window.scrollY > 0)
);

const menu = document.querySelector(".menu"); // Presumindo que 'menu' é o elemento correto para o seu menu
const toggleMenu = () => menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
document.querySelector(".close-btn").addEventListener("click", toggleMenu);

document
    .querySelectorAll(".menu a")
    .forEach((link) => link.addEventListener("click", toggleMenu));

// =========================================================
// CONFIGURAÇÃO OTIMIZADA LENIS + GSAP/ScrollTrigger
// (Removendo o loop duplicado e o lagSmoothing)
// =========================================================
gsap.registerPlugin(ScrollTrigger); // Garanta que ScrollTrigger está registrado primeiro

const lenis = new Lenis();

// Conecta o Lenis ao ScrollTrigger do GSAP para que ScrollTrigger saiba
// onde está a rolagem.
lenis.on("scroll", ScrollTrigger.update);

// Registra o Lenis no ticker do GSAP. Esta é a ÚNICA função de loop que
// deve rodar o lenis.raf().
gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Multiplica por 1000 para converter o tempo do GSAP (segundos) para Lenis (milissegundos)
});

// Removido: gsap.ticker.lagSmoothing(0); - Deixe o GSAP gerenciar o suavizador de lag!

// =========================================================
// ANIMAÇÕES COM GSAP E SCROLLTRIGGER (Substituindo ScrollReveal)
// =========================================================

// Animação da Navbar (já estava com GSAP, mantido)
gsap.to("nav", {
    opacity: 1,
    duration: 2,
    ease: "power2.out" // Adicionado para um efeito mais suave
});

// Função auxiliar para criar animações de "revelar" semelhantes ao ScrollReveal
// Usaremos uma timeline para animar os elementos individualmente, com delay e escalonamento
const createRevealAnimation = (selector, options = {}) => {
    gsap.from(selector, {
        opacity: 0,
        y: options.y || 40, // Corresponde ao 'distance: "40px"' do ScrollReveal
        duration: options.duration || 0.8, // Corresponde ao 'duration: 800' do ScrollReveal
        delay: options.delay || 0.2, // Corresponde ao 'delay: 200' do ScrollReveal
        ease: options.ease || "power2.out", // Corresponde ao 'easing: "ease-in-out"'
        stagger: options.stagger, // Para múltiplos elementos
        scrollTrigger: {
            trigger: options.trigger || selector,
            start: options.start || "top 85%", // Começa a animar quando o elemento está 85% visível
            // end: "bottom 20%", // Opcional: define um ponto final para a animação
            // scrub: true, // Opcional: animação "presa" à rolagem
            toggleActions: "play none none none", // Anima apenas na entrada
            // markers: true // Descomente para ver os marcadores do ScrollTrigger
        }
    });
};

// Replicando as animações do ScrollReveal:

// Hero Section
createRevealAnimation(".hero-headlines h1");
createRevealAnimation(".hero-headlines p", { delay: 0.5 }); // Corresponde ao delay 500ms
createRevealAnimation(".hero-headlines-buttons", { delay: 1 }); // Corresponde ao delay 1000ms

// Hero Images (já estava com GSAP, ajustado o trigger)
gsap.from(".hero-imagens img", {
    opacity: 0,
    duration: 1,
    stagger: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".hero-imagens", // O trigger agora é o container das imagens
        start: "top 90%",
        toggleActions: "play none none none",
    }
});

// Requirements Section
createRevealAnimation(".requirements-headlines h1");
createRevealAnimation(".requirements-headlines p", { delay: 0.5 });
createRevealAnimation(".requirements img", { delay: 0.5 });
createRevealAnimation(".r-item-container", { delay: 1 }); // Se for um container com múltiplos itens, use stagger
// Se "r-item-container" for um *único* container e os itens dentro dele precisam animar um por um,
// você pode fazer: createRevealAnimation(".r-item-container .item-individual", { delay: 0.2, stagger: 0.2 });

// Pets Section
createRevealAnimation(".pets-headlines");
createRevealAnimation(".pet-item h3", { stagger: 0.1 }); // Se houver múltiplos 'pet-item h3'

// Sobre Section
createRevealAnimation(".sobre-headlines");
createRevealAnimation(".sobre img");

// Testimonials Section
createRevealAnimation(".testimunhas h1", { delay: 0.5 });
createRevealAnimation(".testimunhas h6");
createRevealAnimation(".testimunhas-item", { delay: 1, stagger: 0.2 }); // Se houver múltiplos 'testimunhas-item'

// Footer
createRevealAnimation(".footer-brand");
createRevealAnimation(".footer-links", { delay: 0.5, x: -40, y: 0, origin: "left" }); // 'origin: left' significa animar da esquerda
createRevealAnimation(".footer-contato-info", { delay: 0.5, x: 40, y: 0, origin: "right" }); // 'origin: right' significa animar da direita
createRevealAnimation(".copyright", { delay: 0.6 });

// Animação do ScrollTrigger para .heropage (já estava com GSAP, mantido)
ScrollTrigger.create({
    trigger: ".heropage",
    start: "top center",
    end: "center center",
    scrub: 1,
    onToggle: (self) => {
        if (self.isActive) {
            gsap.to(".hero-imagens img", { scale: 1, gap: "664px", duration: 0.5, ease: "power2.out" });
        } else {
            gsap.to(".hero-imagens img", {
                scale: "1.2",
                gap: "35px",
                duration: 0.5,
                ease: "power2.out",
            });
        }
    },
});

// Animação de SplitText (já estava com GSAP, mantido)
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;

    // Garanta que SplitType.js está importado e disponível
    // Se você estiver usando um bundler como Webpack/Vite, pode ser:
    // import SplitType from 'split-type';
    const text = new SplitType(char, { type: "chars" });

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
                // markers: false, // Removido para limpeza
                toggleActions: "play play reverse reverse",
            },
        }
    );
});