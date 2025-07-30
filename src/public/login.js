const form = document.getElementById('login-form');
const errorMessage = document.getElementById('login-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
;

  if (!passwordRegex.test(password)) {
    errorMessage.textContent =
      'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (*-_#$%&).';
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Credenciales incorrectas";
    }

  } catch (error) {
    errorMessage.textContent = "Error en la petición";
  }
});
