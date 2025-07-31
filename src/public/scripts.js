// scripts.js

const API_URL = "https://tudominio.vercel.app"; // Ajustá según tu deploy

async function getGuitars() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/guitars`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const guitars = await res.json();
    const container = document.getElementById("guitars-container");
    container.innerHTML = "";

    guitars.forEach(guitar => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";
      card.innerHTML = `
        <div class="card p-3">
          <h5>${guitar.name}</h5>
          <p>Marca: ${guitar.brand}</p>
          <p>Precio: $${guitar.price}</p>
          <button onclick="editGuitar('${guitar.id}')" class="btn btn-warning btn-sm me-2">Editar</button>
          <button onclick="deleteGuitar('${guitar.id}')" class="btn btn-danger btn-sm">Eliminar</button>
        </div>`;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener guitarras:", error);
  }
}

document.getElementById("submit-btn")?.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const name = document.getElementById("name").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const price = document.getElementById("price").value.trim();

  if (!name || !brand || !price) {
    alert("Completa todos los campos");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/guitars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, brand, price })
    });

    if (res.ok) {
      document.getElementById("name").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("price").value = "";
      getGuitars();
    } else {
      const err = await res.json();
      alert(err.message || "Error al guardar");
    }
  } catch (error) {
    console.error("Error al crear guitarra:", error);
  }
});

async function deleteGuitar(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/guitars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      getGuitars();
    }
  } catch (error) {
    console.error("Error al eliminar guitarra:", error);
  }
}

async function editGuitar(id) {
  // Implementación pendiente (abrir modal o rellenar el form con los datos)
  alert("Función de editar aún no implementada.");
}



