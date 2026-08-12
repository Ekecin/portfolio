const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {

        menuBtn.innerHTML = '<i class="ri-close-line"></i>';

    } else {

        menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';

    }

});

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.innerHTML = '<i class="ri-menu-3-line"></i>';

    });

});