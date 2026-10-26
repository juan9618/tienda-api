const contenedor = document.getElementById("productos");
const detalles = document.getElementById("detalles");
const contenidoDetalles = document.getElementById("contenido-detalles");
const botonCerrar = document.getElementById("cerrar");

// GET: obtener todos los productos
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(productos => {
        contenedor.innerHTML = "";

        productos.forEach(producto => {
            contenedor.innerHTML += `
                <div class="card" onclick="verProducto(${producto.id})">
                    <img src="${producto.image}" alt="${producto.title}">
                    <h3>${producto.title}</h3>
                    <p>Precio: $${producto.price}</p>
                </div>
            `;
        });
    })
    .catch(error => {
        contenedor.innerHTML = "<p>No se pudieron cargar los productos.</p>";
        console.log("Error:", error);
    });

// GET: obtener un producto por su ID
function verProducto(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(producto => {
            contenidoDetalles.innerHTML = `
                <h2>${producto.title}</h2>
                <img src="${producto.image}" alt="${producto.title}">
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Categoría:</strong> ${producto.category}</p>
                <p><strong>Descripción:</strong> ${producto.description}</p>
            `;

            detalles.classList.remove("oculto");
            detalles.scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => console.log("Error:", error));
}

// Cerrar la ventana de detalles
botonCerrar.addEventListener("click", () => {
    detalles.classList.add("oculto");
});