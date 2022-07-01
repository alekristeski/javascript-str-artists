import { visitorsCards } from "./selectors.js";
import { itemsLS } from "./routing.js";
const filters = document.querySelector(".filters");

export function initVisitorListing(arr) {
  visitorsCards.innerHTML = "";

  arr.forEach((item, index) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-wrapper");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardImg = document.createElement("img");
    cardImg.src = item.image;

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const cardPrice = document.createElement("div");
    cardPrice.classList.add("name-price");

    const cardArtistName = document.createElement("h4");
    cardArtistName.classList.add("artist-name");
    cardArtistName.innerHTML = item.artist;

    const cardSpanPrice = document.createElement("span");
    cardSpanPrice.classList.add("price");
    cardSpanPrice.innerHTML = `$ ${item.price}`;

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("item-title");
    cardTitle.innerHTML = item.title;

    const cardDesc = document.createElement("p");
    cardDesc.classList.add("desc");
    cardDesc.innerHTML = item.description;

    cardPrice.append(cardArtistName, cardSpanPrice);
    cardText.append(cardPrice, cardTitle, cardDesc);
    card.append(cardImg, cardText);
    cardWrapper.appendChild(card);
    visitorsCards.appendChild(cardWrapper);

    if (index % 2 == 0) {
      card.classList.add("light");
    } else {
      card.classList.add("dark");
    }
  });
}

const visitorInputTitle = document.querySelector("#item-title");
const artistFilter = document.querySelector("#artist-filter");
const minPrice = document.querySelector("#min-price");
const maxPrice = document.querySelector("#max-price");
const selectByType = document.querySelector("#type");
const filterBtn = document.querySelector(".apply-btn");

export function initVisitorFilters() {
  const queryTitle = visitorInputTitle.value.toLowerCase();
  const queryMinVal = minPrice.value;
  const queryMaxVal = maxPrice.value;
  const queryArtist = artistFilter.value;
  const queryTypeArt = selectByType.value;

  const publishedItemsFilter = itemsLS.filter((item) => item.isPublished);
  const filteredItems = publishedItemsFilter.filter(
    (item) =>
      (queryTitle ? item.title.toLowerCase().includes(queryTitle) : true) &&
      (queryMinVal ? item.price >= queryMinVal : true) &&
      (queryMaxVal ? item.price <= queryMaxVal : true) &&
      (queryArtist ? item.artist === queryArtist : true) &&
      (queryTypeArt ? item.type === queryTypeArt : true),
  );
  filters.style.transform = "translateX(100%)";
  visitorsCards.innerHTML = "";
  initVisitorListing(filteredItems);
}

filterBtn.addEventListener("click", initVisitorFilters);
