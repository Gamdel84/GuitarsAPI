const API_URL = "https://guitars-api.vercel.app/api/guitars";
const AUTH_URL = "https://guitars-api.vercel.app/auth/login";
const container = document.getElementById("guitarsContainer");

const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");

// Mostrar tarjetas
async function getGuitars() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    container.innerHTML = "";
    data.forEach((guitar) => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${guitar.name}</h5>
            <p class="card-text">${guitar.description || "Sin descripción"}</p>
            <p class="text-muted">Stock: ${guitar.stock}</p>
          </div>
        </div>`;
      container.appendChild(card);
    });

    toggleUI(true);
  } catch (err) {
    container.innerHTML = `<p class="text-danger">Error al cargar guitarras.</p>`;
    console.error(err);
    toggleUI(false);
  }
}

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
      getGuitars();
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  } catch (err) {
    alert("Error de conexión");
    console.error(err);
  }
});

// Agregar guitarra
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("guitarName").value;
  const description = document.getElementById("guitarDesc").value;
  const stock = parseInt(document.getElementById("guitarStock").value);

  const token = localStorage.getItem("token");
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, stock }),
    });

    if (res.ok) {
      bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
      getGuitars();
    } else {
      const data = await res.json();
      alert(data.message || "Error al guardar guitarra");
    }
  } catch (err) {
    alert("Error de red");
    console.error(err);
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});

// Mostrar u ocultar UI según login
function toggleUI(loggedIn) {
  logoutBtn.style.display = loggedIn ? "inline-block" : "none";
  addBtn.style.display = loggedIn ? "inline-block" : "none";
}

// Al cargar
getGuitars();

