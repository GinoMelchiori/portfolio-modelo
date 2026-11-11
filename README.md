# Portfolio de modelo

Sitio web personal para mostrar un portfolio de modelo: galería por categorías (colecciones, colaboraciones, sesiones de fotos y desfiles), sección «Sobre mí» editable, apartado de polaroids y contacto.

Hecho con **HTML, CSS y JavaScript puro** (sin frameworks ni dependencias). Responsive y con modo claro/oscuro automático.

## Estructura

```
Portfolio-Modelaje/
├── index.html        Estructura de la página
├── styles.css        Estilos (responsive + tema claro/oscuro)
├── app.js            Lógica: edición, galería, polaroids, visor
├── portfolio.json    Contenido publicado (lo que ven los visitantes)
├── .nojekyll         Evita el procesado de Jekyll en GitHub Pages
└── .gitignore
```

## Uso

1. Abrí `index.html` en el navegador, o publicá el repo con **GitHub Pages** (Settings → Pages → rama `main`).
2. Agregá `#editar` al final de la URL (`.../index.html#editar`) para mostrar los botones de edición.
3. Cargá fotos, textos y datos. Todo se guarda en el `localStorage` del navegador y las imágenes se comprimen automáticamente.

## Publicar tu contenido para todos

El `localStorage` es privado de cada navegador, así que para que los visitantes vean tu contenido:

1. En modo edición, tocá **Exportar** (descarga `portfolio.json`).
2. Reemplazá `portfolio.json` del repo por ese archivo y hacé commit.
3. Los visitantes verán tu contenido al abrir la página. **Importar** carga un archivo exportado en otro navegador.

## Funcionalidades

- Edición en el lugar de nombre, frase, historia, medidas y contacto
- Galería con filtros por categoría y visor a pantalla completa
- Polaroids con epígrafes editables
- Compresión de imágenes en el navegador

## Despliegue en GitHub Pages

1. Creá un repositorio público en github.com/new (sin README ni .gitignore).
2. En la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Primer commit: portfolio de modelo"
   git branch -M main
   git remote add origin https://github.com/GinoMelchiori/Portfolio-Modelaje.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
4. En 1–2 minutos queda online en `https://GinoMelchiori.github.io/Portfolio-Modelaje/`.

## Actualizar el contenido

1. Abrí `https://GinoMelchiori.github.io/Portfolio-Modelaje/#editar`, cargá todo y tocá **Exportar**.
2. Reemplazá `portfolio.json` por el archivo descargado.
3. `git add portfolio.json && git commit -m "Actualizo contenido" && git push`
4. Verificá en una ventana privada: tu navegador muestra tus datos locales y no el JSON publicado.
