# Requirements (Spanish)

- Gestión de usuarios (alta, registro, baja....)
- Funciones del usuario (crear/borrar, modificar colección, crear/borrar/modificar/publicar/despublicar objeto, búsqueda de objetos, recomendación de objetos/colecciones, visualizar objeto,...
- Un objeto se crea a través de un formulario donde el autor debe rellenar metadatos del objeto:nombre, descripción, palabras clave, imagen , audio, video, enlaces,..... Algunos de estos elementos optativos.
- Se me ocurre como funcionalidad novedosa, que el sistema cuando das de alta un objeto, analice el resto de objetos que hay en una colección , y pueda generar recomendaciones sobre objetos que podrían estar relacionados (esta recomendación podría estar basada en las palabras clave o el análisis de la descripción por ejemplo).
- Cuando visualizas un objeto ves su ficha con toda la información introducida, y además campos generados por el sistema: recreación 3D, objetos relacionados o recomendados. También podrías guardar objetos en una lista de favoritos o recomendarlos a otra persona registrada (podrías hacer un sistema tipo red social donde los usuarios puedan seguirse unos a otros, de manera que lo que se siguen pueden hacerse recomendaciones entre ellos).
- Un objeto puede estar en varios estados: borrador o publicado. En borrador solo lo ve el usuario creado y cuando ya ha decidido que está finalizado, lo publica y por tanto es buscable por cualquier otro usuario.
- Respecto a la búsqueda debería ser posible realizarla a través de un barra de búsqueda poniendo el nombre, palabras clave... También podría haber otro tipo de búsqueda en forma de nubes de palabras (basadas en las palabras clave que tiene cada objeto). El resultado es un listado de objetos que coinciden con los criterios de búsqueda
- Por último,se me ocurre que tal vez podrías añadir algo de inteligencia generativa. Por ejemplo, podrías tener una opción de buscar más información que lanzará internamente una búsqueda a algún modelo de lenguaje para recuperar información extra sobre un recurso y mostrárselo al usuario, advirtiendo al usuario que puede haber elementos que no son reales, pues como sabes estos sistemas a veces no dicen la verdad.

# Requirements

- Users CRUD
- Sample CRUD
- Collection CRUD
- User/sample/collection search
- View 3D model of sample
- Web scraper for creating 3D models
- Metadata for sample/collection
- Favorites
- Recommend items to others
- Sample/collection published status