// app.js

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("login-section").classList.add("d-none");
    document.getElementById("main-section").classList.remove("d-none");
    getGuitars();
  }

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    document.getElementById("main-section").classList.add("d-none");
    document.getElementById("login-section").classList.remove("d-none");
  });
});


