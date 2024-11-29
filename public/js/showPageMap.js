maptilersdk.config.apiKey = maptilerApiKey;
const map = new maptilersdk.Map({
  container: "single-map",
  style: maptilersdk.MapStyle.BRIGHT,
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new maptilersdk.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new maptilersdk.Popup({ offset: 40 }).setHTML(
      `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
  )
  .addTo(map);

// Activate & Deactivate map overlay/controls
const mapOverlay = document.querySelector(".show-map-activate-overlay");
let elements = document.querySelectorAll(".show-map-container *");
let mapElements = [];
const scan = () => {
  elements = document.querySelectorAll(".show-map-container *");
  return elements;
};

window.addEventListener("mousedown", (e) => {
  if (e.target === mapOverlay) {
    mapOverlay.style.display = "none";
  }
  if (elements.length < 52) {
    scan();
    mapElements = [];
    elements.forEach((e) => {
      mapElements.push(e);
    });
  } else if (!mapElements.includes(e.target)) {
    mapOverlay.style.display = "flex";
  }
});
