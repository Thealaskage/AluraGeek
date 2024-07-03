document.addEventListener('DOMContentLoaded', () => {
    const productoForm = document.getElementById('producto-form');
    const productoLista = document.querySelector('.producto-lista');

    // Función para obtener productos de la API simulada
    const obtenerProductos = async () => {
        const respuesta = await fetch('http://localhost:3000/productos');
        const productos = await respuesta.json();
        renderizarProductos(productos);
    };

    // Función para renderizar productos en el DOM
    const renderizarProductos = (productos) => {
        productoLista.innerHTML = '';
        productos.forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <button class="delete-btn" data-id="${producto.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            productoLista.appendChild(productoCard);
        });
    };

    // Manejar el envío del formulario
    productoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const imagen = document.getElementById('imagen').value;

        const nuevoProducto = { nombre, precio, imagen };

        await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProducto),
        });

        productoForm.reset();
        obtenerProductos();  
    });

    // Manejar el clic en el botón de eliminar
    productoLista.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            const productoId = e.target.closest('.delete-btn').getAttribute('data-id');
            eliminarProducto(productoId);
        }
    });

    // Función para eliminar un producto
    const eliminarProducto = async (id) => {
        await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE',
        });
        obtenerProductos(); 
    };

    obtenerProductos();
});
