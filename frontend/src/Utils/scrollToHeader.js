export function scrollToHeader() {
    const header = document.querySelector("#header");
    header?.scrollIntoView({ behavior: "smooth" });
};