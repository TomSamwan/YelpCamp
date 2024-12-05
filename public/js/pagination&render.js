// create card component to render
const cardComponent = (i) => {
  const cardContainer = document.querySelector(".card-container");
  const cardAnchor = document.createElement("A");
  const card = document.createElement("LI");
  const cardImageContainer = document.createElement("FIGURE");
  const cardImage = document.createElement("IMG");
  const cardContent = document.createElement("DIV");
  const cardTitle = document.createElement("H2");
  const cardDescription = document.createElement("P");
  const cardPrice = document.createElement("P");

  cardContainer.appendChild(cardAnchor);
  cardAnchor.appendChild(card);
  card.appendChild(cardImageContainer);
  cardImageContainer.appendChild(cardImage);
  card.appendChild(cardContent);
  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(cardPrice);

  const campground = campgrounds.features[i];

  cardAnchor.className = "card-anchor";
  let cardLink = campground._id;
  cardAnchor.setAttribute("href", "/campgrounds/" + cardLink);

  card.className = "card";

  cardImageContainer.setAttribute("class", "card-image-container");

  cardImage.className = "card-image";
  if (!campground.images) {
    cardImage.setAttribute("src", campground.defaultImage.url);
  } else if (campground.images) {
    cardImage.setAttribute("src", campground.images[0].url);
  }
  cardImage.setAttribute("alt", "");

  cardContent.className = "card-content";

  cardTitle.innerText = campground.title;
  cardDescription.innerText = campground.description;
  cardPrice.innerText = `£${campground.price} per night`;
};

// pagination
let page = parseInt(window.location.search.split("=")[1]) || 1;
let limit;
if (window.location.search.includes("limit=")) {
  limit = parseInt(window.location.search.split("limit=")[1]);
} else {
  limit = 10;
}
let indexRange = page * limit;
let startIndex = indexRange - limit;
let totalPages = campgrounds.features.length / limit;

const prevBtn = document.querySelector(".prev-page");
const nextBtn = document.querySelector(".next-page");

const renderComponents = (page) => {
  newPage = page;
  indexRange = newPage * limit;
  startIndex = indexRange - limit;
  if (newPage === 1) {
    prevBtn.style.display = "none";
  } else if (newPage === totalPages) {
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }
  for (let i = startIndex; i < indexRange; i++) {
    cardComponent(i);
  }
};
renderComponents(page);

const deleteComponents = () => {
  const cardContainer = document.querySelector(".card-container");
  while (cardContainer.firstChild) {
    cardContainer.firstChild.replaceWith();
  }
};

const paginationScrollTo = document.querySelector(".grid-content-container");
const paginationControl = document.querySelectorAll(".page-to");

const changePageNumber = () => {
  const pageNumber = document.querySelector(".page-number");
  pageNumber.innerHTML = page;
};

const scrollToElement = () => {
  paginationScrollTo.scrollIntoView({ behavior: "smooth" });
};

for (let control of paginationControl) {
  control.addEventListener("click", (e) => {
    if (e.target.classList.contains("prev-page")) {
      page -= 1;
      changePageNumber();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
    if (e.target.classList.contains("next-page")) {
      page += 1;
      changePageNumber();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
  });
}