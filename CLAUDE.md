# Sitio del Estudio Jurídico Miguel López Cabada

Sitio estático de una sola página (`index.html`, `styles.css`, `script.js`), publicado con GitHub Pages en estudiolopezcabada.com.ar. Hacer push a `main` publica el sitio en vivo.

Estas reglas de diseño aplican a **cualquier** cambio visual. Ante la duda, mantener lo existente antes que inventar algo nuevo.

## Dirección visual

Sobrio, editorial, "tinta y papel". Seriedad de estudio jurídico sin clichés. El objetivo explícito es que el sitio **no parezca hecho con IA ni con una plantilla**.

## Colores

Monocromo. Usar siempre los tokens de `:root` en `styles.css`, nunca hex sueltos.

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#161F29` | Texto principal, títulos, botón principal sobre fondo claro, secciones oscuras, footer |
| `--ink-soft` | `#2A3646` | Párrafos |
| `--slate` | `#52616F` | Texto secundario, etiquetas mono |
| `--paper` | `#F5F1E8` | Fondo general; botón principal sobre fondo oscuro |
| `--paper-2` | `#ECE6D8` | Secciones alternas |
| `--on-dark` | `#D9D2C3` | Etiquetas y detalles sobre fondo oscuro |
| `--line` / `--line-dark` | tinta / papel con transparencia | Bordes y separadores finos |

Únicas excepciones, cada una restringida a un solo lugar:
- **Azul tinta de sello** `#0F2147`: sólo en el duotono del retrato (filtro `#duotono-sello`). Nunca en botones, textos ni fondos.
- **Verde WhatsApp** `#25D366` (hover `#1EBE5A`): sólo en el botón flotante de WhatsApp.

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
- Principal sobre fondo claro: fondo tinta, texto papel. Sobre fondo oscuro (hero, contacto): fondo papel, texto tinta.
- Secundario (`.btn-ghost`): borde fino, fondo transparente.
- Flecha `→` que se desplaza 4px en hover.
- Todo botón o enlace a WhatsApp lleva el **logo oficial** (`<svg class="wa-ico"><use href="#wa"/></svg>`) en el color del botón. No dibujar íconos propios de WhatsApp.

## Imágenes y efectos

- **Hero**: foto de Tribunales con duotono tinta/papel, capa oscura, **zoom lento** (26 s, ida y vuelta), **paralaje** al hacer scroll y **papelitos que caen** en canvas (cantidad media, viento suave, el mouse los aparta, algunos pasan por delante del texto).
- **Recuadro del nombre**: borde blanco de 2px en todo el contorno, sin brillos.
- **Retrato**: proporción original de la foto (911×1726), sin recortarlo. Duotono azul sello, **revelado** de abajo hacia arriba al entrar en pantalla, **paralaje** suave (24px) y, en hover, fundido de 1,2 s al blanco y negro original con un leve acercamiento.
- **Revelado**: un elemento recortado al 100% con `clip-path` no dispara IntersectionObserver. Observar siempre su contenedor.
- Aparición suave (`.reveal`) de bloques al hacer scroll.

## Accesibilidad y rendimiento

- **Responsivo obligatorio**: verificar cada cambio a 390px y a 1366px de ancho. Sin scroll horizontal.
- Respetar `prefers-reduced-motion`: quitar todo desplazamiento (zoom, paralaje, revelado, papelitos), pero conservar los fundidos de opacidad.
- La animación de papelitos se pausa cuando el hero no está visible y limita el devicePixelRatio a 2.
- Contraste legible en todo texto; foco visible en enlaces y botones.

## Qué evitar

- Dorado, bronce o cualquier degradé metálico o "premium".
- Brillos animados, resplandores radiales, sombras decorativas.
- Agregar colores nuevos o usar el azul sello o el verde WhatsApp fuera de su lugar.
- Íconos genéricos de plantilla, tarjetas con sombras flotantes, esquinas muy redondeadas.
- Cambiar textos o contenido cuando la tarea es sólo de diseño.
- `background-attachment: fixed` (se traba en celulares).
