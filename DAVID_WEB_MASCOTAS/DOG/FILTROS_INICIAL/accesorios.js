document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu_icon');
    const menuPrincipal = document.querySelector('.menu-principal');
    const menuList = document.querySelector('.menu-principal__list');
    const searchIcon = document.getElementById('search-icon');
    const headerSearch = document.querySelector('.header__search');

    menuIcon.addEventListener('click', function () {
        menuPrincipal.classList.toggle('show');
        menuList.classList.toggle('show');

        // Oculta la barra de búsqueda si se abre el menú
        if (menuPrincipal.classList.contains('show')) {
            headerSearch.classList.remove('show');
        }
    });

    searchIcon.addEventListener('click', function () {
        headerSearch.classList.toggle('show');

        // Oculta el menú si se abre la barra de búsqueda
        if (headerSearch.classList.contains('show')) {
            menuPrincipal.classList.remove('show');
            menuList.classList.remove('show');
        }
    });

    const productosContainer = document.getElementById('productos');
    const mostrarMasBtn = document.getElementById('mostrarMasBtn');
    let productosMostrados = 0;
    const productosPorPagina = 8;
    let productos = [];

    // Función para cargar productos desde el JSON
    function cargarProductos() {
        fetch('../PRINCIPAL/productos.json')
            .then(response => response.json())
            .then(data => {
                productos = data.filter(producto => producto.categoria === 'accesorios');
                mostrarProductos();
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    // Función para mostrar productos
    function mostrarProductos() {
        const productosParaMostrar = productos.slice(productosMostrados, productosMostrados + productosPorPagina);
        productosParaMostrar.forEach(producto => {
            const productoHTML = `
                <div class="producto ${producto.accesorios} ${producto.animal}">
                    <img src="${producto.img}" alt="${producto.alt}">
                    <p>${producto.nombre}</p>
                    <p>${producto.precio}</p>
                    <button>Comprar</button>
                </div>
            `;
            productosContainer.insertAdjacentHTML('beforeend', productoHTML);
        });
        productosMostrados += productosParaMostrar.length;

        // Ocultar el botón si no hay más productos para mostrar
        if (productosMostrados >= productos.length) {
            mostrarMasBtn.style.display = 'none';
        }
    }

    // Cargar productos al inicio
    cargarProductos();

    // Mostrar más productos al hacer clic en el botón
    mostrarMasBtn.addEventListener('click', mostrarProductos);
});
