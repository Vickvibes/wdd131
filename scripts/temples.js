const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const menuIcon = document.querySelector(".menu-icon");
const yearElement = document.querySelector("#currentyear");
const modifiedElement = document.querySelector("#lastModified");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}

if (menuButton && navigation && menuIcon) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuIcon.textContent = isOpen ? "\u00d7" : "\u2630";
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuIcon.textContent = "\u2630";
        }
    });
}
