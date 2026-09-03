# Sincronización manual de stock

El comando agrega salidas confirmadas a `MOVIMIENTOS_STOCK` de la plantilla local. No modifica productos, precios, fórmulas ni otra hoja.

## Configuración de Google (una sola vez)

1. En [Google Cloud Console](https://console.cloud.google.com/), creá o elegí un proyecto y habilitá **Google Sheets API**.
2. En **APIs y servicios → Credenciales**, configurá la pantalla de consentimiento y creá un cliente OAuth 2.0 de tipo **Aplicación de escritorio**.
3. Copiá `.env.example` como `.env.local` y completá `GOOGLE_OAUTH_CLIENT_ID` y `GOOGLE_OAUTH_CLIENT_SECRET`. Ese archivo está ignorado por Git.
4. Confirmá el nombre de la pestaña de respuestas en `GOOGLE_SHEET_RANGE`; por defecto es `Form Responses 1!A:H`.

En la primera ejecución sin `--input`, el comando imprime una URL de Google. Abrila, autorizá el acceso de solo lectura y volvé a la terminal. El token de renovación queda fuera del repositorio, en `%APPDATA%\\QuimicaBethel\\google-sheets-token.json`.

## Ejecutar

Primero, simulá sin modificar archivos:

```powershell
npm run sync-stock -- --dry-run
```

Si el resumen es correcto, ejecutá la sincronización real:

```powershell
npm run sync-stock
```

El resumen previo informa filas leídas, a importar, omitidas (venta 0), errores y duplicados. Los detalles de cada error incluyen la fila de origen y el motivo.

En la primera escritura se crea `backups/Plantilla_Quimica_Bethel.before-first-sync.xlsx`. El registro idempotente se guarda en `.sync-stock/imported-responses.json`; ambos directorios están ignorados por Git.

## Reglas aplicadas

- Solo se descuenta `Unidades vendidas reales`; una venta 0 no genera salida.
- Se rechazan campos faltantes, códigos inexistentes, números inválidos, devoluciones mayores que entregas y totales de venta inconsistentes.
- Cada salida agrega fecha, código, entrada 0, salida vendida y observación con pedido, cliente, entregadas, devueltas y monto.
- El identificador SHA-256 de `marca temporal + pedido + código` evita duplicados, incluso entre ejecuciones.

## Prueba local no destructiva

```powershell
npm run test:sync-stock
```

La prueba copia la plantilla a un directorio temporal, procesa tres respuestas de ejemplo y la procesa una segunda vez. Comprueba que se agrega una sola salida y que la segunda ejecución no duplica la fila.
