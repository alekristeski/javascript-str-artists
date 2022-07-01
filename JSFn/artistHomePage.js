const itemsSold = document.querySelector(".items-sold-val");
const totalIncomeArtists = document.querySelector(".total-income-val");
const artistName = document.querySelector(".artist-name");
const take7 = document.querySelector("#last7");
const take14 = document.querySelector("#last14");
const take30 = document.querySelector("#last30");

import { itemsLS } from "./routing.js";
import { activeUser } from "./landingPage.js";

let myChart = null;

export function initArtistHomePage() {
  let itemsPerArtist = itemsLS.filter((i) => i.artist === activeUser);
  artistName.innerHTML = activeUser;

  if (itemsPerArtist.length >= 1) {
    const arrOfSoldItems = itemsPerArtist.filter((item) => item.priceSold);
    const mapSoldItems = arrOfSoldItems.map((item) => item.priceSold);
    const sumSoldItems = mapSoldItems.reduce((a, b) => a + b);

    totalIncomeArtists.innerHTML = `$ ${sumSoldItems}`;

    const lenItems = itemsPerArtist.length;
    const lenSoldItems = arrOfSoldItems.length;

    itemsSold.innerHTML = `${lenSoldItems}/${lenItems}`;
  }

  const labels = generateDates(14);

  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "Amount",
        data: [...itemsPerArtist],
        fill: false,
        backgroundColor: ["#a26a5e"],
        borderColor: ["#a26a5e"],
        borderWidth: 1,
        barThickness: 8,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
    },
  };
  if (myChart != null) {
    myChart.destroy();
  }
  myChart = new Chart(document.getElementById("myChart"), config);

  take7.addEventListener("click", function () {
    const last7DaysLabels = generateDates(7);

    myChart.data.labels = last7DaysLabels;

    const last7DaysData = last7DaysLabels.map((label) => {
      let sum = 0;

      itemsPerArtist.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = last7DaysData;

    myChart.update();
  });

  take14.addEventListener("click", function () {
    const last14DaysLabels = generateDates(14);
    myChart.data.labels = last14DaysLabels;
    const last14DaysData = last14DaysLabels.map((label) => {
      let sum = 0;

      itemsPerArtist.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = last14DaysData;
    myChart.update();
  });

  take30.addEventListener("click", function () {
    const last30DaysLabels = generateDates(30);
    myChart.data.labels = last30DaysLabels;
    const last30DaysData = last30DaysLabels.map((label) => {
      let sum = 0;

      itemsPerArtist.forEach((item) => {
        if (formatDate(item.dateSold) === label) {
          sum += item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = last30DaysData;
    myChart.update();
  });
  myChart.clear();
}

function generateDates(daysAgo) {
  const arr = [];

  for (let i = 0; i < daysAgo; i++) {
    const now = new Date();
    const d = now.setDate(now.getDate() - i);
    arr.push(formatDate(d));
  }

  return arr;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}

take7.addEventListener("focus", () => {
  take7.classList.add("active");
});
take7.addEventListener("blur", () => {
  take7.classList.remove("active");
});
take14.addEventListener("focus", () => {
  take14.classList.add("active");
});
take14.addEventListener("blur", () => {
  take14.classList.remove("active");
});
take30.addEventListener("focus", () => {
  take30.classList.add("active");
});
take30.addEventListener("blur", () => {
  take30.classList.remove("active");
});
