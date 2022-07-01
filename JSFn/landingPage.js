export const usersInput = document.querySelector("#user");
const artistFilter = document.querySelector("#artist-filter");

export function getAndPrintUsersLogin() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((user) => {
        usersInput.innerHTML += `<option value="${user.name}">${user.name}</option>`;
        artistFilter.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      });
    });
}

export function routingToArtistHomePage() {
  location.hash = "#artists";
  const user = usersInput.value;
  localStorage.setItem("user", user);
  location.reload();
}
export let activeUser = localStorage.getItem("user");
