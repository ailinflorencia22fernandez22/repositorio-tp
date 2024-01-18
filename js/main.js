document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById("menu");
    const carrito = document.getElementById("carrito");
    const totalElement = document.getElementById("total");
  
    const sandwiches = [
      { id: 1, nombre: "Paleta y Queso", precio: 4800 },
      { id: 2, nombre: "Vegetariano", precio: 4800 },
      { id: 3, nombre: "Jamón y Queso", precio: 5500 },
      { id: 4, nombre: "Bondiola", precio: 6000},
      { id: 5, nombre: "Viteltone", precio: 6500 },
      { id: 6, nombre: "Roqufort y Nuez", precio: 6500 },
      
    ];
  
    
    sandwiches.forEach(sandwich => {
      const item = document.createElement("div");
      item.innerHTML = `
        <p>${sandwich.nombre} - ${sandwich.precio} pesos</p>
        <button onclick="agregarAlCarrito(${sandwich.id})">Agregar al carrito</button>
      `;
      menu.appendChild(item);
    });
  
    window.agregarAlCarrito = function(id) {
      const sandwichSeleccionado = sandwiches.find(sandwich => sandwich.id === id);
  
      const itemCarrito = document.createElement("li");
         itemCarrito.innerHTML = `
       ${sandwichSeleccionado.nombre} - ${sandwichSeleccionado.precio} pesos`;
      carrito.appendChild(itemCarrito);
      actualizarTotal();
    }

    function actualizarTotal() {
      const preciosCarrito = Array.from(carrito.children).map(item => {
        const precio = parseInt(item.innerText.match(/\d+/)[0]); 
        return precio;
      });
  
      const total = preciosCarrito.reduce((acc, precio) => acc + precio, 0);
      totalElement.innerText = total;
    }
  });

  localStorage.setItem("carrito", JSON.stringify(Array.from(carrito.children).map(item => item.innerText)));

   document.addEventListener("DOMContentLoaded", function() {

    const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const itemsGuardados = JSON.parse(carritoGuardado);
    itemsGuardados.forEach(item => {
      const itemCarrito = document.createElement("li");
      itemCarrito.innerText = item;
      carrito.appendChild(itemCarrito);
    });

    actualizarTotal();
  }
});