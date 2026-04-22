// ======================
// MENU MOBILE
// ======================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Fecha o menu ao clicar em algum link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// ======================
// TROCAR TEMA
// ======================

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {

    const temaAtual = html.getAttribute("data-theme");

    if (temaAtual === "dark") {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }

});

// Carrega o tema salvo
window.addEventListener("load", () => {

    const temaSalvo = localStorage.getItem("theme");

    if (temaSalvo) {
        html.setAttribute("data-theme", temaSalvo);
    }

});

// ======================
// EFEITO DIGITAÇÃO
// ======================

const texto = "Cristina Bisol Orso";
const typing = document.getElementById("typing");

let i = 0;

function escreverNome() {

    if (i < texto.length) {
        typing.textContent += texto.charAt(i);
        i++;
        setTimeout(escreverNome, 85);
    }

}

window.addEventListener("load", escreverNome);

// ======================
// BOTÃO TOPO
// ======================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ======================
// MENU ATIVO
// ======================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let secaoAtual = "";

    sections.forEach(sec => {

        const topo = window.scrollY;
        const inicio = sec.offsetTop - 180;
        const fim = inicio + sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (topo >= inicio && topo < fim) {
            secaoAtual = id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("active");
        }

    });

});

// ======================
// ANIMAÇÃO AO APARECER
// ======================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.10
});

const elementos = document.querySelectorAll(
".card, .card-big, section h2, section p"
);

elementos.forEach(item => {
    item.classList.add("hidden");
    observer.observe(item);
});
