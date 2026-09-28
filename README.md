# 📖 Libro de Reclamaciones

Sistema web para la gestión de reclamos, consultas y comunicación con los usuarios.  
El proyecto cuenta con una interfaz moderna, responsive y diversas mejoras enfocadas en la experiencia del usuario.

## 🚀 Nuevas mejoras agregadas

En las últimas actualizaciones se incorporaron nuevas funcionalidades y mejoras visuales:

- 📝 **Mejora del Libro de Reclamaciones**
  - Se mejoró la funcionalidad del registro de reclamaciones.
  - Se optimizó la interfaz para facilitar el ingreso de información.
  - Se realizaron ajustes en el diseño y comportamiento de los formularios.

- 🌙 **Modo oscuro mejorado**
  - Se corrigieron estilos CSS relacionados con el modo oscuro.
  - Se reemplazó el botón tradicional por un **switch estilo iOS**.
  - La preferencia del modo oscuro se mantiene mediante persistencia.

- 🛍️ **Mejora de la sección de productos**
  - Se optimizó la interfaz de productos.
  - Se realizaron mejoras visuales y de usabilidad.

- 💬 **Mejoras en el Chat Bot**
  - Se mejoró la interfaz del chat.
  - Se optimizaron las respuestas y el comportamiento del bot.
  - Se realizaron ajustes para ofrecer una interacción más clara.

- 📱 **Redes sociales**
  - Se agregó un botón flotante interactivo.
  - El botón incluye un menú desplegable para acceder a las redes sociales.

- 🎨 **Mejoras generales de interfaz**
  - Ajustes de estilos CSS.
  - Mejoras de diseño responsive.
  - Correcciones visuales y de interacción.
  - Optimización de diferentes secciones del sistema.

## 🛠️ Tecnologías utilizadas

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Node.js / npm
- SQLite

## 📂 Estructura del proyecto

```text
├── static/
├── templates/
├── app.py
├── crear_tabla_usuarios.py
├── database.sql
├── deploy.py
├── libro_reclamaciones_respaldo.json
├── mensajes_contacto.json
├── analytics_visits.json
├── package.json
├── package-lock.json
├── requirements.txt
├── sitemap.xml
├── tailwind.config.js
├── Dockerfile
└── README.md

⚙️ Instalación
1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

2. Crear un entorno virtual
python -m venv venv
Activar el entorno:

Windows:
venv\Scripts\activate

Linux / macOS:
source venv/bin/activate

3. Instalar dependencias
pip install -r requirements.txt

4. Ejecutar el proyecto
python app.py

Luego abre en el navegador:

http://localhost:5000

🐳 Ejecución con Docker
El proyecto también incluye un Dockerfile para facilitar el despliegue mediante contenedores.

docker build -t libro-reclamaciones .
docker run -p 5000:5000 libro-reclamaciones

📌 Funcionalidades principales
Registro de reclamaciones.

Gestión de información de usuarios.

Formulario de contacto.

Libro de reclamaciones.

Chat Bot.

Sección de productos.

Modo oscuro.

Switch de modo oscuro con persistencia.

Menú flotante de redes sociales.

Diseño responsive.

Mejoras de experiencia de usuario.

Sistema preparado para despliegue.

🔄 Historial de mejoras recientes
Últimas actualizaciones
Mejora de la funcionalidad y diseño del Libro de Reclamaciones.

Corrección de estilos CSS y comportamiento del modo oscuro.

Optimización de la sección de productos y su interfaz.

Reemplazo del botón de modo oscuro por un switch estilo iOS con persistencia.

Nuevo botón flotante interactivo para redes sociales con menú desplegable.

Mejoras en la interfaz y respuestas del Chat Bot.

Carga y organización inicial del proyecto para desarrollo y despliegue.

👨‍💻 Desarrollo
Proyecto desarrollado como una aplicación web enfocada en brindar una experiencia sencilla y moderna para la gestión de reclamaciones y comunicación con los usuarios.

📄 Licencia
Este proyecto se encuentra destinado para uso y desarrollo del proyecto correspondiente.
