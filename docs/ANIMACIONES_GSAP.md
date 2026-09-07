# Animaciones con GSAP

## Instalación realizada

Las ocho skills oficiales de `greensock/gsap-skills` están instaladas en el
directorio personal de Codex (`C:/Users/facun/.codex/skills`). Codex las podrá
descubrir automáticamente desde el próximo turno. Son guías para el agente;
no se envían al navegador con la web.

La web utiliza `gsap` y `@gsap/react`. Se agregaron con:

```powershell
pnpm add gsap @gsap/react
```

Se actualizaron tanto `pnpm-lock.yaml` como `package-lock.json`, ya presentes
en el proyecto. Para trabajar aquí se utilizó pnpm.

## Qué cambió

- Portada: entrada coordinada del distintivo, título, descripción, beneficios
  y botón. La secuencia dura menos de un segundo y el botón permanece disponible.
- Proceso de compra: los iconos, números y conectores se iluminan con el scroll.
  En escritorio hay una secuencia horizontal; hasta 768 px cada tarjeta tiene
  su propio avance y los conectores son verticales. Volver hacia arriba revierte
  el avance visual; no indica el estado real de un pedido.
- Movimiento reducido: la portada aparece directamente y el proceso muestra
  sus acentos finales, sin animaciones de GSAP.
- Navegación: los efectos se limpian al salir de la página, incluidos los cambios
  de tamaño y de preferencia de movimiento.

`src/utils/animation.js` centraliza el registro de GSAP, ScrollTrigger y useGSAP.
Los tiempos de entrada están en `Hero.jsx`; los umbrales de scroll están en
`DeliveryProcess.jsx`. Framer Motion sigue atendiendo los componentes existentes.

## Cómo verlo

```powershell
pnpm run dev --host 127.0.0.1
```

Abrí la URL que muestre Vite (normalmente http://127.0.0.1:5173).

1. Recargá al inicio de la página para ver la entrada de la portada.
2. Bajá despacio hasta “Pagás cuando estás conforme” y observá los cinco pasos.
3. Probá a 390 px de ancho para ver los conectores verticales.
4. Entrá en “Ver zonas y costo”, y volvé a Inicio.
5. Activá movimiento reducido en el sistema o emulalo en las herramientas
   del navegador: las nuevas animaciones deben desaparecer.

## Verificación realizada

- `pnpm run build`: correcto; Vite avisa que el JS principal supera 500 kB.
- Navegador a 1440 px y 390 px; sin desbordamiento horizontal en las comprobaciones.
- Portada visible y cinco instrucciones de compra legibles.
- Un ScrollTrigger en escritorio, cinco en móvil y cero con movimiento reducido.
- Cero ScrollTriggers al salir a Nosotros; uno al regresar a Inicio en escritorio.
- Sin errores de JavaScript registrados durante las pruebas.

Los cambios están preparados localmente; todavía no se publicaron.
