# Sitio del Estudio Jurídico Miguel López Cabada

Sitio estático de una sola página (`index.html`, `styles.css`, `script.js`), publicado con GitHub Pages en estudiolopezcabada.com.ar. Hacer push a `main` publica el sitio en vivo.

**Caché:** GitHub Pages hace que los navegadores guarden CSS y JS durante 4 horas, pero el HTML sólo 10 minutos. Cada vez que cambien `styles.css` o `script.js`, actualizar el `?v=` con que se cargan en `index.html` (usar la fecha, p. ej. `?v=20261104`; si ya se usó ese día, agregar `b`, `c`…). Si no, los visitantes ven el HTML nuevo con el CSS viejo.

Estas reglas de diseño aplican a **cualquier** cambio visual. Ante la duda, mantener lo existente antes que inventar algo nuevo.

## Dirección visual

Claro, sobrio y editorial, en azul empolvado. Seriedad de estudio jurídico sin clichés. El objetivo explícito es que el sitio **no parezca hecho con IA ni con una plantilla**.

## Colores

Azul empolvado: fondos claros y textos azul oscuro. Usar siempre los tokens de `:root` en `styles.css`, nunca hex sueltos.

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#1E3A63` | Texto principal, títulos, bordes fuertes |
| `--ink-soft` | `#2F4B75` | Párrafos |
| `--slate` | `#465C7B` | Texto secundario, etiquetas mono |
| `--paper` | `#F6F7F4` | Fondo general; texto sobre botones |
| `--paper-2` | `#DCE6F0` | Secciones alternas |
| `--contact` | `#CBDBEB` | Fondo de Contacto y footer |
| `--accent` / `--accent-h` | `#2A5288` / `#1E3E6B` | Botón principal (y hover), números, íconos, detalles, papelitos |
| `--line` | azul oscuro con transparencia | Bordes y separadores finos |

Duotonos (filtros SVG en `index.html`): hero de `#1E3A63` a `#F6F7F4`; retrato en azul (`#duotono-sello`, de `#1B3A66` a `#F6F7F4`) y en bordó (`#duotono-bordo`, de `#4A161C` a `#F6F2ED`).

Únicas excepciones, cada una restringida a un solo lugar:
- **Bordó** `#4A161C`: sólo en el bucle del retrato. Nunca en botones, textos ni fondos.
- **Verde WhatsApp** `#25D366` (hover `#1EBE5A`): sólo en el botón flotante.

## Tipografías

- **Newsreader** (serif): títulos `h1`–`h3`, nombre en el hero, número de la ficha.
- **Inter**: texto de cuerpo y botones.
- **IBM Plex Mono**: etiquetas de sección, datos (matrícula, tomo/folio), labels del formulario. En mayúsculas con espaciado amplio.

No agregar otras familias.

## Espaciados y layout

- Ancho máximo `--wrap: 1120px`; margen lateral `--gutter`: 28px (16px en ≤820px).
- Secciones: `96px` de padding vertical (72px en ≤820px).
- Bordes finos de 1px; radio `--radius: 2px`. Nada de esquinas muy redondeadas.
- Sin sombras decorativas, salvo el modal y el botón flotante.

## Botones

- Sólidos y planos. **Sin degradés.**
- Principal: fondo `--accent`, texto papel.
- Secundario (`.btn-ghost`): borde fino azul oscuro, fondo transparente.
- Flecha `→` que se desplaza 4px en hover.
- Todo botón o enlace a WhatsApp lleva el **logo oficial** (`<svg class="wa-ico"><use href="#wa"/></svg>`) en el color del botón. No dibujar íconos propios de WhatsApp.

## Imágenes y efectos

- **Hero**: foto de Tribunales pálida (duotono azul y capa clara), textos oscuros, **zoom lento** (26 s, ida y vuelta), **paralaje** al hacer scroll y **papelitos que caen** en canvas (cantidad media, viento suave, el mouse los aparta, algunos pasan por delante del texto).
- **Nombre en el hero**: sin caja ni fondo, entre dos líneas finas azul oscuro de 1px (arriba y abajo), sin brillos.
- **Retrato**: proporción original de la foto (911×1726), sin recortarlo. **Bucle** de fundido entre el duotono azul y el bordó (16 s por vuelta, sostiene cada color), **revelado** de abajo hacia arriba al entrar en pantalla, **paralaje** suave (24px) y leve acercamiento en hover.
- **Revelado**: un elemento recortado al 100% con `clip-path` no dispara IntersectionObserver. Observar siempre su contenedor.
- Aparición suave (`.reveal`) de bloques al hacer scroll.

## Accesibilidad y rendimiento

- **Responsivo obligatorio**: verificar cada cambio a 390px y a 1366px de ancho. Sin scroll horizontal.
- Respetar `prefers-reduced-motion`: quitar todo desplazamiento y bucle (zoom, paralaje, revelado, papelitos, bucle del retrato); la foto queda fija en azul.
- La animación de papelitos se pausa cuando el hero no está visible y limita el devicePixelRatio a 2.
- Contraste legible en todo texto; foco visible en enlaces y botones.

## Qué evitar

- Dorado, bronce o cualquier degradé metálico o "premium".
- Brillos animados, resplandores radiales, sombras decorativas.
- Agregar colores nuevos o usar el bordó o el verde WhatsApp fuera de su lugar.
- Grandes bloques oscuros: el sitio es claro.
- Íconos genéricos de plantilla, tarjetas con sombras flotantes, esquinas muy redondeadas.
- Cambiar textos o contenido cuando la tarea es sólo de diseño.
- `background-attachment: fixed` (se traba en celulares).
