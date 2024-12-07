// create card component to render
const cardComponent = (i, matchQuery) => {
  const campground = matchQuery ? matchQuery[i] : campgrounds.features[i];

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

  cardAnchor.className = "card-anchor";
  let cardLink = campground._id;

  cardAnchor.setAttribute("href", "/campgrounds/" + cardLink);

  card.className = "card";

  cardImageContainer.setAttribute("class", "card-image-container");

  cardImage.className = "card-image";
  if (campground.images.length === 0) {
    cardImage.setAttribute("src", campground.defaultImage.url);
  } else if (campground.images.length > 0) {
    cardImage.setAttribute("src", campground.images[0].url);
  }
  cardImage.setAttribute("alt", "");

  cardContent.className = "card-content";

  cardTitle.innerText = campground.title;
  cardDescription.innerText = campground.description;
  cardPrice.innerText = `£${campground.price} per night`;
};

const url = new URL(window.location);
const qParams = new URLSearchParams(url.search);

// pagination
let page = parseInt(qParams.get("page")) || 1;
let limit;
if (qParams.has("limit")) {
  limit = parseInt(window.location.search.split("limit=")[1]);
} else {
  limit = 10;
}
let indexRange = page * limit;
let startIndex = indexRange - limit;
let totalPages = Math.ceil(campgrounds.features.length / limit);

const firstBtn = document.querySelector(".first-page");
const prevBtn = document.querySelector(".prev-page");
const nextBtn = document.querySelector(".next-page");
const lastBtn = document.querySelector(".last-page");

const renderComponents = (page) => {
  qParams.set("page", page);

  newPage = page;

  indexRange = newPage * limit;
  startIndex = indexRange - limit;
  totalPages = Math.ceil(campgrounds.features.length / limit);

  const renderAll = () => {
    for (let i = startIndex; i < indexRange; i++) {
      if (campgrounds.features[i]) {
        cardComponent(i);
      }
    }
  };
  if (qParams.size === 0 || (qParams.has("page") && qParams.size === 1)) {
    renderAll();
  }

  const matchQuery = [];
  const filterRender = (query) => {
    for (let campground of campgrounds.features) {
      let campLoc = campground.location.toLowerCase();
      if (campLoc.includes(query)) {
        matchQuery.push(campground);
      }
    }
    for (let i = startIndex; i < indexRange; i++) {
      if (matchQuery[i]) {
        cardComponent(i, matchQuery);
      }
    }
  };
  if (qParams.has("location")) {
    const query = qParams.get("location");

    filterRender(query);
    totalPages = Math.ceil(matchQuery.length / limit);
  }

  if (newPage === 1) {
    firstBtn.style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "flex";
    lastBtn.style.display = "flex";
  } else if (newPage === totalPages) {
    firstBtn.style.display = "flex";
    prevBtn.style.display = "flex";
    nextBtn.style.display = "none";
    lastBtn.style.display = "none";
  } else {
    firstBtn.style.display = "flex";
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
    lastBtn.style.display = "flex";
  }
};
renderComponents(page);

const paginationScrollTo = document.querySelector(".index-content-container");
const paginationControl = document.querySelectorAll(".page-to");

const changePageNumber = () => {
  const pageNumber = document.querySelector(".page-number");
  pageNumber.innerHTML = page;
};

const changeQuery = () => {
  if (qParams.has("page")) {
    qParams.delete("page");
  }
  qParams.append("page", page);
  window.history.pushState("", "", `/campgrounds?${qParams}`);
};

const deleteComponents = () => {
  const cardContainer = document.querySelector(".card-container");
  while (cardContainer.firstChild) {
    cardContainer.firstChild.replaceWith();
  }
};

const scrollToElement = () => {
  paginationScrollTo.scrollIntoView({ behavior: "smooth" });
};


// filter search
const filterSearch = document.querySelector("#search-filter");
const locationSearch = document.querySelector("#location-filter");
filterSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  if (locationSearch.value) {
    qParams.set("location", locationSearch.value);
  } else {
    qParams.delete("location");
  }
  changeQuery()
  deleteComponents();
  renderComponents(1);
});

for (let control of paginationControl) {
  control.addEventListener("click", (e) => {
    if (e.target.classList.contains("first-page")) {
      page = 1;
      changePageNumber();
      changeQuery();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
    if (e.target.classList.contains("prev-page")) {
      page -= 1;
      console.log(totalPages);
      changePageNumber();
      changeQuery();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
    if (e.target.classList.contains("next-page")) {
      page += 1;
      changePageNumber();
      changeQuery();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
    if (e.target.classList.contains("last-page")) {
      page = totalPages;
      changePageNumber();
      changeQuery();
      deleteComponents();
      renderComponents(page);
      scrollToElement();
      return page;
    }
  });
}
