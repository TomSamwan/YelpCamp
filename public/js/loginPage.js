document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.classList.add("active");
    input.addEventListener("focusout", function () {
      this.classList.remove("active");
    });
  });
});

const toggleSlide = document.querySelector(".toggle-slide");
toggleSlide.addEventListener("click", () => {
  toggleSlide.classList.toggle("toggle");
  toggleSlide.innerHTML = toggleSlide.classList.contains("toggle")
    ? "<p>Already registered?</p><p>Click here to login now!</p>"
    : "<p>Create an account?</p><p>Click to register a new account!</p>";
});
