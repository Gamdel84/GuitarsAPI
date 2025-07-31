// login.js

const API_URL = "https://tudominio.vercel.app"; // Cambiá esto si tu backend está en otro dominio

document.getElementById("login-btn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      document.getElementById("login-section").classList.add("d-none");
      document.getElementById("main-section").classList.remove("d-none");
      getGuitars(); // Llama a función del archivo scripts.js
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión");
  }
});


