const API_BASE = "https://guitars-api.vercel.app/api";
let token = localStorage.getItem("token");
let editingId = null;

// Elementos
const loginSection = document.getElementById("login-section");
const mainSection = document.getElementById("main-section");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const submitBtn = document.getElementById("submit-btn");
const guitarsContainer = document.getElementById("guitars-container");
const formTitle = document.getElementById("form-title");

// Mostrar/Ocultar secciones
function updateUI() {
  if (token) {
    loginSection.classList.add("d-none");
    mainSection.classList.remove("d-none");
    loadGuitars();
  } else {
    loginSection.classList.remove("d-none");
    mainSection.classList.add("d-none");
  }
}

// Login
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) return alert("Completa email y contraseña");

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      token = data.token;
      localStorage.setItem("token", token);
      updateUI();
    } else {
      alert(data.message || "Login incorrecto");
    }
  } catch (err) {
    alert("Error al iniciar sesión");
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  token = null;
  updateUI();
});

// Cargar guitarras
async function loadGuitars() {
  guitarsContainer.innerHTML = "<p>Cargando...</p>";
  try {
    const res = await fetch(`${API_BASE}/guitars`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const guitars = await res.json();

    guitarsContainer.innerHTML = "";
    guitars.forEach(g => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${g.name}</h5>
            <p class="card-text">Marca: ${g.brand}</p>
            <p class="card-text">Precio: $${g.price}</p>
            <button class="btn btn-sm btn-warning me-2" onclick="editGuitar('${g.id}', '${g.name}', '${g.brand}', '${g.price}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteGuitar('${g.id}')">Eliminar</button>
          </div>
        </div>
      `;
      guitarsContainer.appendChild(card);
    });
  } catch (err) {
    guitarsContainer.innerHTML = "<p>Error al cargar guitarras</p>";
  }
}

// Crear o actualizar guitarra
submitBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const brand = brandInput.value.trim();
  const price = Number(priceInput.value.trim());

  if (!name || !brand || !price) return alert("Completa todos los campos");

  try {
    const res = await fetch(`${API_BASE}/guitars${editingId ? `/${editingId}` : ""}`, {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, brand, price }),
    });

    const data = await res.json();

    if (!res.ok) return alert(data.message || "Error");

    resetForm();
    loadGuitars();
  } catch (err) {
    alert("Error al guardar guitarra");
  }
});

function editGuitar(id, name, brand, price) {
  nameInput.value = name;
  brandInput.value = brand;
  priceInput.value = price;
  editingId = id;
  formTitle.textContent = "Editar guitarra";
  submitBtn.textContent = "Actualizar";
}

function resetForm() {
  nameInput.value = "";
  brandInput.value = "";
  priceInput.value = "";
  editingId = null;
  formTitle.textContent = "Agregar guitarra";
  submitBtn.textContent = "Guardar";
}

// Eliminar guitarra
async function deleteGuitar(id) {
  if (!confirm("¿Estás seguro de eliminar esta guitarra?")) return;

  try {
    const res = await fetch(`${API_BASE}/guitars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Error al eliminar");

    loadGuitars();
  } catch (err) {
    alert("Error al eliminar guitarra");
  }
}

// Inicializar
updateUI();
