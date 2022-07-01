const addNewItemBtn = document.querySelector(".add-btn");
const addNewItemDiv = document.querySelector(".resetForm");
const allCardsWrapper = document.getElementById("artist_cards");
const addNewItemForm = document.querySelector("#addNewItemForm");
const addEditItem = document.querySelector("#addEditItem");
const addNewItemCheckBox = document.querySelector("#is_published");
const inputTitleItem = document.querySelector("#new-item_title");
const textAreaDescItem = document.querySelector("#new-item_desc");
const selectType = document.querySelector("#new-item_type");
const inputPriceItem = document.querySelector("#new-item_price");
const inputUrlItem = document.querySelector("#new-item_img-url");
const alertScreen = document.querySelector(".alert-screen-overlay");
const alertPopup = document.querySelector(".alert-popup");
const alertBtn = document.querySelector(".alert-read-btn");
const artistNameItems = document.querySelector(".artist-name-items");
const artistNameAdd = document.querySelector(".artist-name-add");

import { activeUser } from "./landingPage.js";
import { itemTypes } from "./data.js";
import { items } from "./data.js";

let itemsLS = JSON.parse(localStorage.getItem("itemsLS")) || items;
if (localStorage.getItem("itemsLS") === null) {
  localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
}
let editingCard = false;
let idEdit;
let cameraImg;
let newObj = [];

itemTypes.forEach(
  (type) =>
    (selectType.innerHTML += `<option value="${type}">${type}</option>`),
);

export let itemsPerArtist = itemsLS.filter((i) => i.artist === activeUser);

export function createItemCardArtist(arr = []) {
  allCardsWrapper.innerHTML = "";
  artistNameItems.innerHTML = activeUser;
  artistNameItems.classList.add("artist-name");
  artistNameAdd.innerHTML = activeUser;
  artistNameAdd.classList.add("artist-name");
  arr.forEach(function ({
    id,
    image,
    dateCreated,
    price,
    description,
    title,
    isPublished,
  }) {
    const publishedItem = isPublished ? "Published" : "Unpublish";

    const date = dateCreated.split("T")[0];

    const artistCardWrapper = document.createElement("div");
    artistCardWrapper.classList.add("card-wrapper");

    const artistCard = document.createElement("div");
    artistCard.classList.add("card", "light");

    const artistImg = document.createElement("img");
    artistImg.src = image;

    const artistText = document.createElement("div");
    artistText.classList.add("card-text");

    const namePrice = document.createElement("div");
    namePrice.classList.add("name-price");
    const namePriceSub = document.createElement("div");
    const namePriceSubH5 = document.createElement("h5");
    namePriceSubH5.classList.add("item-title");
    namePriceSubH5.innerHTML = title;
    const namePriceSubPara = document.createElement("p");
    namePriceSubPara.classList.add("datum");
    namePriceSubPara.innerHTML = date;
    const namePriceSpan = document.createElement("span");
    namePriceSpan.classList.add("price");
    namePriceSpan.innerHTML = price;
    const artistDesc = document.createElement("p");
    artistDesc.classList.add("desc");
    artistDesc.innerHTML = description;
    const cardsBtns = document.createElement("div");
    cardsBtns.classList.add("card-btns");

    const sendToAuc = document.createElement("button");
    sendToAuc.classList.add("send-to-auc");
    sendToAuc.innerHTML = "Send to Auction";
    const publishBtn = document.createElement("button");
    publishBtn.classList.add(isPublished);
    publishBtn.setAttribute("data-id", id);
    publishBtn.innerHTML = publishedItem;
    isPublished
      ? publishBtn.classList.add("publish")
      : publishBtn.classList.add("unpublish");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.setAttribute("data-id", id);
    editBtn.innerHTML = "edit";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.setAttribute("data-id", id);
    removeBtn.innerHTML = "remove";

    cardsBtns.append(sendToAuc, publishBtn, removeBtn, editBtn);
    namePriceSub.append(namePriceSubH5, namePriceSubPara);
    namePrice.append(namePriceSub, namePriceSpan);
    artistText.append(namePrice, artistDesc);
    artistCard.append(artistImg, artistText, cardsBtns);
    artistCardWrapper.appendChild(artistCard);

    allCardsWrapper.append(artistCardWrapper);

    removeBtn.addEventListener("click", function (e) {
      const isConfirmed = confirm(
        `Are you sure you want to delete "${title}" item`,
      );

      if (isConfirmed) {
        let indexDelete = +e.target.dataset.id;
        const idDelete = itemsLS.filter((item) => item.id === indexDelete);
        const res = arrayRemove(itemsLS, idDelete[0]);
        itemsLS = res;
        localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
        let itemsPerArtist = itemsLS.filter(
          (item) => item.artist === activeUser,
        );

        createItemCardArtist(itemsPerArtist);
      }
    });
    editBtn.addEventListener("click", function (e) {
      location.hash = "#add/new/item";
      let indexEdit = +e.target.dataset.id;
      idEdit = itemsLS.filter((item) => item.id === indexEdit);

      editingCard = true;

      inputTitleItem.value = idEdit[0].title;
      textAreaDescItem.value = idEdit[0].description;
      selectType.value = idEdit[0].type;
      inputPriceItem.value = idEdit[0].price;
      inputUrlItem.value = idEdit[0].image;
      addNewItemCheckBox.checked = idEdit[0].isPublished;
      addNewItemBtn.innerHTML = "Edit";
      addEditItem.innerHTML = "Edit Item";
    });

    publishBtn.addEventListener("click", function (e) {
      let indexPublish = +e.target.dataset.id;

      const idPublish = itemsLS.filter((item) => item.id === indexPublish);

      idPublish[0].isPublished = !idPublish[0].isPublished;

      if (idPublish[0].isPublished) {
        publishBtn.innerHTML = "Published";
        publishBtn.classList.remove("unpublish");
        publishBtn.classList.add("publish");
      } else {
        publishBtn.innerHTML = "Unpublish";
        publishBtn.classList.remove("publish");
        publishBtn.classList.add("unpublish");
      }

      localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
    });
  });
}
function editItem() {
  const title = inputTitleItem.value;
  const desc = textAreaDescItem.value;
  const type = selectType.value;
  const price = +inputPriceItem.value;
  const url = inputUrlItem.value;
  const checkbox = addNewItemCheckBox.checked;

  if (editingCard) {
    editingCard = false;
    idEdit[0].title = title;
    idEdit[0].description = desc;
    idEdit[0].type = type;
    idEdit[0].price = price;
    idEdit[0].image = url || cameraImg;
    idEdit[0].isPublished = checkbox;

    addNewItemBtn.innerText = "Edit";
    addEditItem.innerHTML = "Edit Item";
    location.hash = "#artist/items";
    addNewItemBtn.innerText = "Add new Item";
    addEditItem.innerHTML = "Add new Item";

    addNewItemForm.reset();
    localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
    let itemsPerArtist = JSON.parse(localStorage.getItem("itemsLS")).filter(
      (item) => item.artist === activeUser,
    );
    createItemCardArtist(itemsPerArtist);
  } else {
    addNewItemFn();
  }
}
function addNewItemFn() {
  if (
    inputTitleItem.value &&
    textAreaDescItem.value &&
    selectType.value &&
    inputPriceItem.value &&
    (inputUrlItem.value || cameraImg)
  ) {
    const titleVal = inputTitleItem.value;
    const textAreaVal = textAreaDescItem.value;
    const typeVal = selectType.value;
    const priceItemVal = +inputPriceItem.value;
    const urlItem = inputUrlItem.value;
    const checkBoxVal = addNewItemCheckBox.checked;
    const todaysDate = new Date().toLocaleDateString("en-GB");
    const id = new Date().getTime();
    {
      newObj.push({
        id: id,
        artist: localStorage.getItem("user"),
        dateCreated: todaysDate,
        description: textAreaVal,
        image: urlItem || cameraImg,
        isAuctioning: false,
        isPublished: checkBoxVal,
        price: priceItemVal,
        title: titleVal,
        type: typeVal,
      });
      localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
      let itemsPerArtist = JSON.parse(localStorage.getItem("itemsLS")).filter(
        (item) => item.artist === activeUser,
      );
      createItemCardArtist(itemsPerArtist);

      itemsPerArtist.push(newObj[0]);
      itemsLS.push(newObj[0]);
      location.hash = "#artist/items";
      addNewItemForm.reset();

      localStorage.setItem("itemsLS", JSON.stringify(itemsLS));
      createItemCardArtist(itemsPerArtist);
    }
  } else {
    alertPopup.classList.add("active");
    alertScreen.classList.add("active");
    alertBtn.addEventListener("click", () => {
      alertPopup.classList.remove("active");
      alertScreen.classList.remove("active");
    });
  }
}

addNewItemBtn.addEventListener("click", editItem);

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

createItemCardArtist(itemsPerArtist);

// reset form for add and edit cards
function resetFromFn() {
  addNewItemForm.reset();
}
addNewItemDiv.addEventListener("click", resetFromFn);

const camera_button = document.querySelector("#startCamera");
const video = document.querySelector("#video");
const click_button = document.querySelector("#takePhoto");
const canvas = document.querySelector("#canvas");
camera_button.addEventListener("click", async function (e) {
  e.preventDefault();
  video.style.display = "block";
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

click_button.addEventListener("click", function (e) {
  e.preventDefault();
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  cameraImg = canvas.toDataURL("image/jpeg'");
  inputUrlItem.value = cameraImg;
});
