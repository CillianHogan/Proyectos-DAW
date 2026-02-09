ElectroShop - Tienda con API y Carrito
En este proyecto el objetivo era dejar de usar datos "inventados" por mí y empezar a trabajar con una API real para simular una tienda online funcional.

Lo que he trabajado aquí:
Consumo de API: Conecté el proyecto con FakeStoreAPI mediante fetch. Fue un reto gestionar las esperas (asincronía) para que la web no intentara pintar los productos antes de haberlos recibido del servidor.

Carrito y LocalStorage: Programé la lógica para añadir productos al carrito. Lo más importante es que usé LocalStorage, así que si el usuario añade algo y cierra el navegador, al volver sus productos siguen ahí guardados.

Diseño con CSS Grid: Para la rejilla de productos utilicé grid-template-columns: repeat(auto-fill, minmax(...)). Me parece la mejor forma de que la tienda sea totalmente responsive sin tener que escribir mil líneas de código para cada tamaño de pantalla.

Manejo del DOM: Tuve que aprender a crear elementos HTML dinámicamente desde JavaScript para que cada producto de la API tuviera su propia tarjeta con su imagen, precio y botón.

Tecnologías usadas:
JavaScript Vanilla: (Async/Await, Fetch API, LocalStorage).

CSS3: (CSS Grid y Flexbox).

API Externa: FakeStoreAPI.

Cómo probarlo:
Simplemente abre el index.html en tu navegador. Necesitarás conexión a internet para que las imágenes y los datos de los productos carguen desde la API.
