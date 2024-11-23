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

const singleMap = document.querySelector("#single-map");
const mapOverlay = document.querySelector(".show-map-activate-overlay");

window.addEventListener("mousedown", (e) => {
  if (e.target === mapOverlay) {
    mapOverlay.style.display = "none";
  } else if (!e.target.getAttribute("class").includes("maplibregl")) {
    mapOverlay.style.display = "flex";
  }
});