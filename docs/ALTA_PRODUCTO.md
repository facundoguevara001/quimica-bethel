# Alta de productos

Abrí `public/Plantilla_Quimica_Bethel.xlsx` y completá un solo generador de la hoja `ALTA`.

- Generador 1: para categoría y subcategoría existentes.
- Generador 2: para una categoría y subcategoría nuevas. Elegí un prefijo de producto que ya exista.
- Las celdas amarillas son de carga. Las verdes se completan después de confirmar un alta.
- Marca, fragancia y presentación son opcionales. Podés escribir una presentación diferente de las sugeridas.

Desde la raíz del proyecto ejecutá:

```powershell
npm run alta-producto -- --dry-run
```

El comando valida toda la carga y muestra los códigos que generará. Para registrar el alta:

```powershell
npm run alta-producto
```

Escribí `SI` cuando pida confirmación. Se crea un respaldo en `backups/` y luego se actualizan `PRODUCTOS`, `PRECIOS`, `CATÁLOGOS` y `CONTROL_FOTOS`. Finalmente, agregá la foto indicada en `public/products/`.
