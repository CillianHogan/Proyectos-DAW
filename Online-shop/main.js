// pillo todos los elementos del html para que el js los encuentre
const productsGrid = document.querySelector('#products-grid');
const cartCount = document.querySelector('#cart-count');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const btnCart = document.querySelector('#cart-button');
const btnCloseCart = document.querySelector('#close-cart');

// cargo lo que haya en el localstorage. 
// le pongo el JSON.parse porque si no me devuelve un texto y yo quiero el array
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// funcion para traer los productos de la api de internet
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        // si falla la api pongo este mensaje para no dejar la web vacia
        productsGrid.innerHTML = '<p>Vaya, parece que algo ha fallado cargando los productos...</p>';
        console.log("error de la api:", error);
    }
}

// esta funcion crea las tarjetitas de los productos
function renderProducts(products) {
    productsGrid.innerHTML = ''; 
    
    // recorro todos los productos que me da la api
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // meto el html a saco con el innerHTML
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><strong>${product.price}€</strong></p>
            <button class="btn-add" 
                data-id="${product.id}" 
                data-title="${product.title}" 
                data-price="${product.price}">
                Comprar
            </button>
        `;
        productsGrid.appendChild(card);
    });

    // despues de crear los botones tengo que decirles que escuchen el click
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(btn => btn.addEventListener('click', addToCart));
}

// añadir cosas al carrito
function addToCart(event) {
    const button = event.target;
    // guardo los datos del boton en un objeto
    const item = {
        id: button.dataset.id,
        title: button.dataset.title,
        price: parseFloat(button.dataset.price)
    };
    
    cart.push(item); // lo meto al array
    saveCart();
    updateCartUI();
}

// guardar en el pc del usuario
function saveCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));
}

// esta funcion actualiza el dibujito del carrito y el modal
function updateCartUI() {
    // el numerito de arriba
    cartCount.innerText = cart.length;
    
    // limpio lo que habia antes en el modal para no repetir
    cartItemsContainer.innerHTML = "";
    
    // sumo el total con un bucle for, que el reduce me liaba un poco
    let sumaTotal = 0;
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        sumaTotal = sumaTotal + item.price;
        
        // voy añadiendo cada item al modal
        const itemDiv = document.createElement('div');
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
            <span>${item.title.substring(0, 20)}...</span>
            <span>${item.price.toFixed(2)}€</span>
        `;
        cartItemsContainer.appendChild(itemDiv);
    }
    
    // le pongo el .toFixed(2) para que no salgan mil decimales en el precio
    cartTotal.innerText = sumaTotal.toFixed(2);
}

// abrir y cerrar el modal (le cambio el display con el estilo)
btnCart.onclick = function() {
    cartModal.style.display = 'block';
};

btnCloseCart.onclick = function() {
    cartModal.style.display = 'none';
};

// si el usuario pincha fuera del cuadro blanco, tambien se cierra
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};

// arranco la app
fetchProducts();
updateCartUI();