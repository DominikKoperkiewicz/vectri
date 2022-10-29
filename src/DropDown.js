const dropdowns = document.querySelectorAll('.top-button');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (event) => {
        document.querySelectorAll(".selected").forEach((el) => { el.classList.remove("selected"); });
        dropdown.classList.toggle("selected");
        dropdown.children[0].classList.toggle("selected");
        event.stopPropagation();
    });
});

document.body.addEventListener('click', () => {
    document.querySelectorAll(".selected").forEach((el) => { el.classList.remove("selected"); });
});