document.addEventListener('DOMContentLoaded', () => {

    const basePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
    const articuloAssetUrl = (path) => (path && path.startsWith('/') && !path.startsWith('//')) ? basePath + path : path;

    // ==========================================
    // 2. FUNCIÓN PRINCIPAL PARA RENDERIZAR TODO
    // ==========================================
    function cargarArticulo() {
        // Obtener el idioma actual
        const lang = localStorage.getItem("tuta_lang") || document.documentElement.lang || 'es';
        const articulosDB = articulosDBTraducidos[lang] || articulosDBTraducidos.es;

        // Obtener el ID del artículo de la URL
        const params = new URLSearchParams(window.location.search);
        const articuloId = params.get('id');

        // Buscar el artículo
        let articulo = articulosDB[articuloId];

        // Fallback en español si no existe traducción
        if (!articulo && lang !== 'es') {
            console.warn(`Artículo con ID ${articuloId} no encontrado en '${lang}', usando fallback en 'es'.`);
            articulo = articulosDBTraducidos.es[articuloId];
        }

        // --- TRADUCIR EL CONTENIDO DEL ARTÍCULO ---
        if (articulo) {
            document.title = `${articulo.titulo} - Tuta Wayta`;

            document.getElementById('articulo-categoria').textContent = articulo.categoria;
            document.getElementById('articulo-fecha').textContent = articulo.fecha;
            document.getElementById('articulo-titulo').textContent = articulo.titulo;

            const autorImg = document.getElementById('articulo-autor-imagen');
            if (autorImg) {
                autorImg.src = articuloAssetUrl(articulo.autorImagen);
                autorImg.alt = articulo.autorNombre;
            }

            document.getElementById('articulo-autor-nombre').textContent = articulo.autorNombre;
            document.getElementById('articulo-autor-rol').textContent = articulo.autorRol;

            // CORRECCIÓN AQUÍ: Se cambió 'articulo-imagen-hero' por 'articulo-imagen'
            const heroImg = document.getElementById('articulo-imagen');
            if (heroImg) {
                heroImg.src = articuloAssetUrl(articulo.imagen);
                heroImg.alt = articulo.titulo;
            }

            document.getElementById('articulo-cuerpo').innerHTML = articulo.contenidoCompleto;

            // Llamar al motor de traducción global para que actualice la interfaz
            if (window.applyTranslations) {
                window.applyTranslations(lang);
            }
        } else { 
            // Mensaje de error si no existe el ID de artículo
            const articleContent = document.querySelector('.article-content');
            if (articleContent) {
                let tituloError = "Artículo no encontrado";
                let descError = "El artículo que buscas no existe o ha sido movido.";

                // Mapear errores según el idioma activo
                if (lang === 'zh') {
                    tituloError = "未找到文章";
                    descError = "您寻找的文章不存在或已被移动。";
                } else if (lang === 'en') {
                    tituloError = "Article Not Found";
                    descError = "The article you are looking for does not exist or has been moved.";
                } else if (lang === 'pt') {
                    tituloError = "Artigo não encontrado";
                    descError = "O artigo que você procura não existe o foi movido.";
                } else if (lang === 'de') {
                    tituloError = "Artikel nicht gefunden";
                    descError = "Der von Ihnen gesuchte Artikel existiert nicht oder wurde verschoben.";
                } else if (lang === 'it') {
                    tituloError = "Articolo non trovato";
                    descError = "L'articolo que stai cercando non existe o è stato rimosso.";
                } else if (lang === 'fr') {
                    tituloError = "Article non trouvé";
                    descError = "L'article que vous recherchez n'existe pas ou a été déplacé.";
                }

                articleContent.innerHTML = `
                    <div style="text-align: center; padding: 4rem 2rem;">
                        <h1>${tituloError}</h1>
                        <p>${descError}</p>
                    </div>`;
            }
        }
    }

    // ==========================================
    // 3. EVENTOS Y CARGA INICIAL
    // ==========================================

    // Ejecución inicial
    cargarArticulo();

    // Escucha el evento global para recargar el artículo con el nuevo idioma
    window.addEventListener('languageChanged', cargarArticulo);
});