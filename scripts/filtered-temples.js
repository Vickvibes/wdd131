const localImageBase = new URL("../images/", document.currentScript.src);

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl: new URL("accra_ghana_temple_lds.jpeg", localImageBase).href
    },
    {
        templeName: "Atlanta Georgia",
        location: "Atlanta, Georgia, United States",
        dedicated: "1983, June, 1",
        area: 34500,
        imageUrl: new URL("atlanta_georgia.jpeg", localImageBase).href
    },
    {
        templeName: "Paris France",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 44175,
        imageUrl: new URL("paris_france_temple.jpeg", localImageBase).href
    }
];

const gallery = document.querySelector("#gallery");
const heading = document.querySelector("#page-heading");
const resultCount = document.querySelector("#result-count");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const menuIcon = document.querySelector(".menu-icon");
const yearElement = document.querySelector("#currentyear");
const modifiedElement = document.querySelector("#lastModified");

function renderTemples(templeList) {
    gallery.replaceChildren(...templeList.map((temple) => {
        const card = document.createElement("article");
        card.className = "temple-card";

        const title = document.createElement("h2");
        title.textContent = temple.templeName;

        const details = document.createElement("dl");
        details.className = "temple-details";

        const detailRows = [
            ["Location", temple.location],
            ["Dedicated", temple.dedicated],
            ["Size", `${temple.area.toLocaleString()} sq ft`]
        ];

        detailRows.forEach(([label, value]) => {
            const row = document.createElement("div");
            const term = document.createElement("dt");
            const description = document.createElement("dd");
            term.textContent = `${label}:`;
            description.textContent = value;
            row.append(term, description);
            details.append(row);
        });

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} temple`;
        image.loading = "lazy";
        image.addEventListener("error", () => image.classList.add("image-unavailable"), { once: true });

        card.append(title, details, image);
        return card;
    }));

    resultCount.textContent = `${templeList.length} ${templeList.length === 1 ? "temple" : "temples"}`;
}

function getTemplesForFilter(filter) {
    switch (filter) {
        case "old":
            return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) < 1900);
        case "new":
            return temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) > 2000);
        case "large":
            return temples.filter((temple) => temple.area > 90000);
        case "small":
            return temples.filter((temple) => temple.area < 10000);
        default:
            return temples;
    }
}

function selectFilter(filter, label) {
    renderTemples(getTemplesForFilter(filter));
    heading.textContent = label;
    navigation.querySelectorAll("a[data-filter]").forEach((link) => {
        if (link.dataset.filter === filter) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}

selectFilter("home", "Home");

navigation.addEventListener("click", (event) => {
    const filterLink = event.target.closest("a[data-filter]");
    if (!filterLink) return;

    event.preventDefault();
    selectFilter(filterLink.dataset.filter, filterLink.textContent.trim());

    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuIcon.textContent = "\u2630";
});

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuIcon.textContent = isOpen ? "\u00d7" : "\u2630";
});