PokéDex Dinámica - JS Asíncrono y PokéAPI
Este proyecto es una aplicación que conecta con la PokéAPI para mostrar los 151 Pokémon originales. Seguí un tutorial para aprender a estructurar las peticiones a la API y luego fui añadiendo funcionalidades extra para mejorar la experiencia.

Lo que he trabajado aquí:
Conexión con la API: Gracias a un tutorial aprendí a usar fetch para traer los datos. Sin embargo, para que la carga no fuera lenta, implementé por mi cuenta Promise.all, consiguiendo que todos los Pokémon aparezcan de golpe en lugar de uno a uno.

Buscador en tiempo real: Programé un filtro que busca por nombre mientras escribes. Me costó un poco entender cómo filtrar el array de datos que ya tenía descargado sin tener que volver a llamar a la API, pero al final logré que fuera instantáneo.

Efectos de sonido: Para hacerlo más original, busqué en la documentación de la API cómo sacar los gritos de cada Pokémon y los vinculé para que suenen al hacer clic en las tarjetas.

Estilos personalizados: Aunque la estructura base venía del tutorial, retoqué todo el CSS para que los colores de las tarjetas cambiaran dinámicamente según el tipo de Pokémon (fuego, agua, planta, etc.).

Tecnologías usadas:
JavaScript: (Fetch API, Promesas, métodos de Array como Filter).

HTML/CSS: Diseño responsive con Flexbox.

API Externa: PokéAPI (v2).

Créditos:
Proyecto iniciado siguiendo el tutorial de https://www.youtube.com/@freecodecampes
