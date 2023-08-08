// Make sure this accessKey is valid and working
const accessKey = "t7awpx6wNLao9vCy5BLLlSPQmVrrTgEZtJaWXk_ycGk";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result"); // Corrected variable name
const showMore = document.getElementById("show-more-btn"); // Added 'getElementById'

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url); // Corrected variable name
  const data = await response.json(); // Corrected variable name

  const results = data.results;
  if (page === 1) {
    searchResult.innerHTML = ""; // Use the correct variable name
  }
  results.map((result) => {
    const imgWrapper = document.createElement("div"); // Corrected variable name
    imgWrapper.classList.add("search-results"); // Corrected class name
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const imgLink = document.createElement("a");
    imgLink.href = result.links.html; // Corrected property name
    imgLink.target = "_blank";
    imgLink.textContent = result.alt_description;
    imgWrapper.appendChild(img);
    imgWrapper.appendChild(imgLink);
    searchResult.appendChild(imgWrapper); // Use the correct variable name
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
