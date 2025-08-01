const form = document.getElementById('login-form');
const errorMessage = document.getElementById('login-error');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\-_$#%&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    errorMessage.textContent =
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (*-_#$%&).';
    return;
  }

  try {
    const res = await fetch("https://guitars-api.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password })
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = data.message || "Credenciales incorrectas";
    }

  } catch (error) {
    console.error("Error de conexión:", error);
    errorMessage.textContent = "Error en la petición. Inténtalo más tarde.";
  }
});


