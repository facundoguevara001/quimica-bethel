# Alta de productos

Abrí `public/Plantilla_Quimica_Bethel.xlsx` y completá un solo generador de la hoja `ALTA`.

- Generador 1: para categoría y subcategoría existentes.
- Generador 2: para una categoría y subcategoría nuevas. Elegí un prefijo de producto que ya exista.
- Para nuevas promociones, elegí el prefijo PROM; continúa la serie de códigos existente.
- En Cocina, los detergentes y lavavajillas se cargan con la subcategoría existente “Detergentes y Lavavajillas”.
- Después de un alta, los campos amarillos conservan sus valores. Reemplazá los datos del producto anterior antes de la siguiente validación. `--dry-run` valida la carga, pero no agrega el producto.
- Las celdas amarillas son de carga. Las verdes se completan después de confirmar un alta.
- Marca, fragancia y presentación son opcionales. Podés escribir una presentación diferente de las sugeridas.
- Para textos propios, dejá vacío “Código contenido a reutilizar” y completá “Descripción base nueva” y “Características base nuevas”. Si indicás un código CNT para reutilizar, el producto hereda esos textos y se ignoran los campos nuevos. La tarjeta muestra las características; la página de detalle muestra la descripción.

Desde la raíz del proyecto ejecutá:

```powershell
npm run alta-producto -- --dry-run
```

El comando valida toda la carga y muestra los códigos que generará. Para registrar el alta:

```powershell
npm run alta-producto
```

Escribí `SI` cuando pida confirmación. Se crea un respaldo en `backups/`, se actualizan `PRODUCTOS`, `PRECIOS`, `CATÁLOGOS` y `CONTROL_FOTOS`, y se regenera `src/data/products.js` para que el producto aparezca en localhost. Finalmente, agregá la foto indicada en `public/products/` y ejecutá `npm run dev` (o recargá localhost si ya estaba abierto). Para regenerar los datos manualmente: `npm run generate`.
