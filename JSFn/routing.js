import { allSections } from "./selectors.js";
import { homeSection } from "./selectors.js";
import { visitorSection } from "./selectors.js";
import { visitorListing } from "./selectors.js";
import { getAndPrintUsersLogin } from "./landingPage.js";
import { artistHomePage } from "./selectors.js";
import { artistsItems } from "./selectors.js";
import { initVisitorFilters } from "./visitorListing.js";
import { items } from "./data.js";
import { usersInput } from "./landingPage.js";
import { routingToArtistHomePage } from "./landingPage.js";
import { initArtistHomePage } from "./artistHomePage.js";
import { addNewItem } from "./selectors.js";
import { createItemCardArtist } from "./addEditItem.js";
import { activeUser } from "./landingPage.js";

export let itemsLS = JSON.parse(localStorage.getItem("itemsLS")) || items;

if (localStorage.getItem("itemsLS") === null) {
  localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
}
let itemsPerArtist = itemsLS.filter((i) => i.artist === activeUser);
function hideAllSections() {
  allSections.forEach((section) => (section.style.display = "none"));
}

const handleRounte = function (e) {
  e.preventDefault();
  let hash = location.hash;

  switch (hash) {
    case "":
      hideAllSections();
      homeSection.style.display = "block";
      localStorage.removeItem("user");

      break;
    case "#visitor":
      hideAllSections();
      visitorSection.style.display = "block";
      break;
    case "#visitor/listing":
      hideAllSections();
      visitorListing.style.display = "block";
      initVisitorFilters();

      break;
    case "#visitor/filter":
      hideAllSections();

      break;
    case "#artists":
      hideAllSections();
      artistHomePage.style.display = "block";
      initArtistHomePage();

      break;
    case "#artist/items":
      hideAllSections();
      artistsItems.style.display = "block";

      break;
    case "#add/new/item":
      hideAllSections();
      addNewItem.style.display = "block";

      break;

    default:
      location.hash = "";

      break;
  }
};
getAndPrintUsersLogin();
usersInput.addEventListener("change", routingToArtistHomePage);

window.addEventListener("load", handleRounte);
window.addEventListener("hashchange", handleRounte);
