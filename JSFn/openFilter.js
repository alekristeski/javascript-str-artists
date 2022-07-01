const openFilter = document.querySelector(".filter-icon");
const filters = document.querySelector(".filters");
const dropDownNav = document.querySelectorAll(".dropdown-nav");
const hamBar = document.querySelectorAll(".bars-button");
const closeBtn = document.querySelector(".close-btn");

function openFilterFn() {
  filters.style.transform = "translateX(0px)";
}

openFilter.addEventListener("click", openFilterFn);

function closeFilterFn() {
  filters.style.transform = "translateX(100%)";
}
closeBtn.addEventListener("click", closeFilterFn);

function dropDownNavFn() {
  dropDownNav.forEach((nav) => {
    nav.classList.toggle("active");
  });
}
hamBar.forEach((ham) => {
  ham.addEventListener("click", dropDownNavFn);
});
