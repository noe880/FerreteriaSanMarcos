const productosDestacados = [
  { nombre: "Martillo Demo", imagen: "./img/martillo.png",estado: "block", precio: 120, descripcion: "Martillo de alta calidad para trabajos de demolición." },
  { nombre: "Taladro Profesional", imagen: "./img/taladro.jpeg", precio: 250, descripcion: "Taladro potente y duradero para proyectos de construcción." },
  { nombre: "Sierra Circular", imagen: "./img/SierraCircular.jpeg", precio: 180, descripcion: "Sierra eléctrica para cortes precisos en madera y metal." },
  { nombre: "Destornillador de Precisión", imagen: "./img/destornillador.jpeg",estado: "block", precio: 15, descripcion: "Herramienta ideal para trabajos delicados en aparatos electrónicos." },
];

const productos = [
  { nombre: "Martillo Demo", imagen: "./img/martillo.png", estado: "block",precio: 120, descripcion: "Martillo de alta calidad para trabajos de demolición." },
  { nombre: "Taladro Profesional", imagen: "./img/taladro.jpeg", precio: 250, descripcion: "Taladro potente y duradero para proyectos de construcción." },
  { nombre: "Sierra Circular", imagen: "./img/SierraCircular.jpeg", estado: "block",precio: 180, descripcion: "Sierra eléctrica para cortes precisos en madera y metal." },
  { nombre: "Destornillador de Precisión", imagen: "./img/destornillador.jpeg", precio: 15, descripcion: "Herramienta ideal para trabajos delicados en aparatos electrónicos." },
  { nombre: "Llave Inglesa Ajustable", imagen: "./img/LlaveInglesaAjustable.jpeg",estado: "block", precio: 30, descripcion: "Llave ajustable para diversos usos en mecánica y fontanería." },
  { nombre: "Martillo de Carpintero", imagen: "./img/MartillodeCarpintero.png", precio: 90, descripcion: "Martillo especializado para trabajos de carpintería." },
  { nombre: "Destornillador Phillips", imagen: "./img/DestornilladorPhillips.jpg", precio: 12, descripcion: "Destornillador con cabeza tipo Phillips para montajes rápidos." },
  { nombre: "Cinta Métrica", imagen: "./img/CintaMétrica.jpg", precio: 20, estado: "block",descripcion: "Cinta métrica flexible para mediciones precisas en trabajos de construcción." },
  { nombre: "Alicate de Corte", imagen: "./img/AlicatedeCorte.jpg", precio: 35, descripcion: "Alicate robusto para cortes limpios en alambre y cables." },
  { nombre: "Llave de Torsión", imagen: "./img/LlavedeTorsión.jpeg", precio: 40, descripcion: "Llave ajustable con mecanismo de torsión para trabajos pesados." },
];

function generarProductoHTML(producto) {
  function generarEstrellas(calificacion) {
    const maxEstrellas = 5;
    let estrellasHTML = '';
    for (let i = 1; i <= maxEstrellas; i++) {
      if (i <= calificacion) {
        estrellasHTML += '<span class="estrella activa">&#9733;</span>';
      } else {
        estrellasHTML += '<span class="estrella">&#9734;</span>';
      }
    }
    return estrellasHTML;
  }
  return `
    <section class="producto">
      <h3>${producto.nombre}</h3>
      <div class="offsale" style="display: ${producto.estado};"></div>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      ${generarEstrellas(3)}
      <span class="precio">$${producto.precio}</span>
      <p>${producto.descripcion}</p><br>
      <button class="boton boton-agregar-carrito"></button>
    </section>
  `;
}

function renderizarProductos(contenedor, productos) {
  contenedor.innerHTML = '';
  productos.forEach(producto => {
    const productoHTML = generarProductoHTML(producto);
    contenedor.insertAdjacentHTML('beforeend', productoHTML);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const contenedorProductosDestacados = document.getElementById("contenedor-productos-destacados");
  const ProductosDestacados = document.getElementById("productos-destacados");
  const miBoton = document.getElementById('buscar-producto');
  renderizarProductos(contenedorProductosDestacados, productosDestacados);

  const contenedorProductos = document.getElementById("contenedor-productos");
  renderizarProductos(contenedorProductos, productos);

  const inputBusqueda = document.getElementById('buscar-producto');
  inputBusqueda.addEventListener('input', function() {
    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
    if (textoBusqueda === '') {
      renderizarProductos(contenedorProductos, productos);
      ProductosDestacados.style.display = "block";
    } else {
      const productosFiltrados = filtrarProductos(productos, textoBusqueda);
      renderizarProductos(contenedorProductos, productosFiltrados);
      ProductosDestacados.style.display = "none";
      const rect = miBoton.getBoundingClientRect();
      const desiredPosition = rect.top - 80;
      window.scrollBy({ top: desiredPosition, behavior: 'smooth'});

    }
  });

  const carrito = [];
  const listaCarrito = document.getElementById('lista-carrito');

  contenedorProductos.addEventListener('click', function(event) {
    if (event.target.classList.contains('boton-agregar-carrito')) {
      const productoIndex = event.target.parentElement.dataset.index;
      const producto = productos[productoIndex];
      carrito.push(producto);
      actualizarCarrito();
    }
  });

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio}`;
      listaCarrito.appendChild(li);
    });
  }

  function filtrarProductos(productos, textoBusqueda) {
    return productos.filter(producto =>
      producto.nombre.toLowerCase().includes(textoBusqueda) ||
      producto.descripcion.toLowerCase().includes(textoBusqueda)
    );
  }

  actualizarCarrito();

});

function filtrarProductos(productos, textoBusqueda) {
  const productosBlock = productos.filter(producto =>
    producto.estado === "block" &&
    (producto.nombre.toLowerCase().includes(textoBusqueda) ||
    producto.descripcion.toLowerCase().includes(textoBusqueda))
  );
  
  const productosRestantes = productos.filter(producto =>
    producto.estado !== "block" &&
    (producto.nombre.toLowerCase().includes(textoBusqueda) ||
    producto.descripcion.toLowerCase().includes(textoBusqueda))
  );

  return [...productosBlock, ...productosRestantes];
}

function offSale(){
  const dir = document.getElementById('productos');
  const rect = dir.getBoundingClientRect();
  const desiredPosition = rect.top - 80;
  window.scrollBy({ top: desiredPosition, behavior: 'smooth'});
  const inputBusqueda = document.getElementById('buscar-producto');
  inputBusqueda.value = ''; // Limpia el input de búsqueda
  const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
  const contenedorProductos = document.getElementById("contenedor-productos");
  const productosFiltrados = filtrarProductos(productos, textoBusqueda);
  renderizarProductos(contenedorProductos, productosFiltrados);
}

function scrollToTop(name) {
  const dir = document.getElementById(name);
  const rect = dir.getBoundingClientRect();
  const desiredPosition = rect.top - 80;
  window.scrollBy({ top: desiredPosition, behavior: 'smooth'});
}


