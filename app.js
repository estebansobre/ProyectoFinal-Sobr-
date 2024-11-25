let carrito = [];

document.addEventListener("DOMContentLoaded", function() {
  cargarProductos(); 
});

function cargarProductos() {
  fetch('./productos.json')
    .then(response => response.json())  
    .then(productos => {
      mostrarProductos(productos); // Pasar los productos a la función para mostrarlos
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
}


function mostrarProductos(productos) {
  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = ''; 
  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');
    
    productoElement.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <h4>$${producto.precio}</h4>
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Añadir al carrito</button>
    `;
    
    productosContainer.appendChild(productoElement); 
  });
}


function agregarAlCarrito(nombre, precio, imagen) {
  const producto = { nombre, precio, imagen };
  carrito.push(producto);
  mostrarCarrito();
  mostrarAlerta(`Añadido al carrito: ${nombre}`);
}


function mostrarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';
  
  if (carrito.length === 0) {
    document.getElementById('carrito-vacio').style.display = 'block';
    document.getElementById('total').style.display = 'none';
  } else {
    document.getElementById('carrito-vacio').style.display = 'none';
    let total = 0;
    carrito.forEach(item => {
      total += item.precio;
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 30px; height: auto;">
        ${item.nombre} - $${item.precio}
        <button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
      `;
      listaCarrito.appendChild(li);
    });
    document.getElementById('total').innerHTML = `Total: $${total}`;
    document.getElementById('total').style.display = 'block';
  }
}


function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  mostrarCarrito();
}


function mostrarAlerta(mensaje) {
  const alerta = document.getElementById('alerta');
  alerta.innerHTML = mensaje;
  alerta.style.display = 'block';
  setTimeout(() => {
    alerta.style.display = 'none';
  }, 2000);
}


function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarAlerta('El carrito está vacío');
  } else {
    mostrarAlerta('Compra finalizada');
    carrito = [];
    mostrarCarrito();
  }
}


