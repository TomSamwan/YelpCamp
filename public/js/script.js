const ta = document.querySelectorAll(".form-input").forEach((el) => {
  window.addEventListener("load", function () {
    el.style.height = `${el.scrollHeight + 6}px`;
  });

  el.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight + 6}px`;
  });

  el.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight + 6}px`;
  });
});

const price = document.querySelector("#price-input");
const priceSpan = document.querySelector(".price-span");

const inputPages = ["new", "edit"];
const path = window.location.pathname.toString().split("/");
const slug = path[path.length - 1];

if (inputPages.includes(slug)) {
  window.addEventListener("load", function () {
    price.style.width = `${price.getAttribute("placeholder").length + 3}ch`;
  });

  price.addEventListener("input", function () {
    if (this.textLength == 0) {
      this.style.width = `${this.getAttribute("placeholder").length + 3}ch`;
    } else {
      this.style.width = `${this.textLength + 3}ch`;
    }
  });

  price.addEventListener("focus", function () {
    priceSpan.classList.add("active");
    price.addEventListener("focusout", function () {
      priceSpan.classList.remove("active");
    });
  });

  document.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("focus", function () {
      this.classList.add("active");
      input.addEventListener("focusout", function () {
        this.classList.remove("active");
      });
    });
  });
}

// back button
const prevPage = document.querySelector(".back-button");
prevPage.addEventListener("click", () => {
  window.history.back();
});

// flash messages

const flashMsg = document.querySelector(".flash-msg");
const flashDismiss = document.querySelector(".flash-dismiss");
if (flashDismiss) {
  flashDismiss.addEventListener("click", () => {
    flashMsg.style.display = "none";
  });
}

// Image carousel
if (slug.length === 24) {
  // if slug length is 24, it means you're on the show page of a single campground
  const carousel = document.querySelector(".slides");
  const buttons = document.querySelectorAll(".carousel-button");
  const slides = Array.from(document.querySelectorAll(".slide"));

  carousel.scrollTo(0, 0);

  if (slides.length > 1) {
    const bubbles = document.querySelector(".bubbles");
    bubbles.innerHTML = `<div class="bubble"></div>`.repeat(slides.length); // add 'bubbles' based on 'slides.length'

    document.querySelector(".slide").classList.add("currentSlide"); // sets 'active' class on first slide
    document.querySelector(".bubble").classList.add("currentSlide"); // sets 'active' class on bubble element

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const offset = button.classList.contains("next") === true ? 1 : -1;

        slides.forEach((slide) => {
          if (slide.classList.contains("currentSlide")) {
            return (activeSlide = slides.indexOf(slide));
          }
        });

        var newIndex = activeSlide + offset;

        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;

        carousel.scrollTo({
          top: 0,
          left: newIndex * 400,
          behavior: "smooth",
        });

        slides[newIndex].classList.add("currentSlide");
        slides[activeSlide].classList.remove("currentSlide");
        bubbles.children[newIndex].classList.add("currentSlide");
        bubbles.children[activeSlide].classList.remove("currentSlide");
      });
    });
  }

  // dummy 'pay' button
  const priceBtn = document.querySelector(".pay-button");
  priceBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}
