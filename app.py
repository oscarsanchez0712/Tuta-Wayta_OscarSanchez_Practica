from flask import Flask, render_template, request, redirect, flash, jsonify, url_for
import mysql.connector

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import mm
import io
import threading
import json
import os
from datetime import datetime

from werkzeug.utils import secure_filename
from werkzeug.middleware.proxy_fix import ProxyFix
from werkzeug.security import check_password_hash

# =========================
#  CONEXIÓN BASE DE DATOS
# =========================
import os
import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host=os.environ.get("DB_HOST", "173.212.213.28"),
        port=int(os.environ.get("DB_PORT", 3399)),
        user=os.environ.get("DB_USER", "tutawayta_user"),
        password=os.environ.get("DB_PASSWORD", "tutawayta17"),
        database=os.environ.get("DB_NAME", "tutawayta")
    )
from flask_mail import Mail, Message

app = Flask(__name__)
##

class SubpathMiddleware:
    def __init__(self, app, subpath):
        self.app = app
        self.subpath = subpath

    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = self.subpath
        return self.app(environ, start_response)

if os.environ.get("FLASK_ENV") == "production":
    app.wsgi_app = SubpathMiddleware(app.wsgi_app, subpath='/tutawayta')
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

app.secret_key = "supersecretkey"

@app.context_processor
def inject_base_path():
    base_path = ""
    if os.environ.get("FLASK_ENV") == "production":
        base_path = "/tutawayta"
    return dict(TUTA_BASE_PATH=base_path)
# =========================
# CONFIG CORREO GMAIL
# =========================
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'jorge.vilcapuma.t@vallegrande.edu.pe' # Asegúrate que este sea el correo correcto
app.config['MAIL_PASSWORD'] = 'xxsganlcgzamdxbq' # Contraseña de aplicación de Google, sin espacios
app.config['MAIL_DEFAULT_SENDER'] = ('Tuta Wayta', 'jorge.vilcapuma.t@vallegrande.edu.pe')

mail = Mail(app)

# --- 🔥 NUEVO: CONFIGURACIÓN PARA SUBIDA DE ARCHIVOS ---
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Asegurarse de que la carpeta de subidas exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ANALYTICS_FILE = os.path.join(os.path.dirname(__file__), "analytics_visits.json")
IGNORED_ANALYTICS_PATHS = {"/admin/dashboard", "/dashboard"}

# Archivo seguro para la segunda manera de guardar mensajes de contacto
CONTACTO_RESPALDO_FILE = os.path.join(os.path.dirname(__file__), "mensajes_contacto.json")

def read_analytics_visits():
    if not os.path.exists(ANALYTICS_FILE):
        return []
    try:
        with open(ANALYTICS_FILE, "r", encoding="utf-8") as file:
            data = json.load(file)
            return data if isinstance(data, list) else []
    except (OSError, json.JSONDecodeError):
        return []

def write_analytics_visits(visits):
    with open(ANALYTICS_FILE, "w", encoding="utf-8") as file:
        json.dump(visits, file, ensure_ascii=False, indent=2)

def ensure_dashboard_tables(cursor):
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analytics_visits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            visit_date DATE NOT NULL,
            path VARCHAR(255) NOT NULL,
            visitor_id VARCHAR(120) NOT NULL,
            title VARCHAR(255),
            created_at DATETIME NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS product_price_overrides (
            product_name VARCHAR(180) PRIMARY KEY,
            price DECIMAL(10,2) NOT NULL,
            updated_at DATETIME NOT NULL
        )
    """)

def save_analytics_visit_db(path, visitor_id, title):
    conn = get_db_connection()
    cursor = conn.cursor()
    ensure_dashboard_tables(cursor)
    cursor.execute(
        """
        INSERT INTO analytics_visits (visit_date, path, visitor_id, title, created_at)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (datetime.now().date(), path, visitor_id, title, datetime.now())
    )
    conn.commit()
    cursor.close()
    conn.close()

def read_analytics_visits_db():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    ensure_dashboard_tables(cursor)
    cursor.execute("""
        SELECT
            DATE_FORMAT(visit_date, '%Y-%m-%d') AS date,
            path,
            visitor_id AS visitorId,
            title,
            DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%s') AS createdAt
        FROM analytics_visits
        ORDER BY id ASC
    """)
    visits = cursor.fetchall()
    cursor.close()
    conn.close()
    return visits

def read_price_overrides_db():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    ensure_dashboard_tables(cursor)
    cursor.execute("SELECT product_name, price FROM product_price_overrides")
    overrides = {row["product_name"]: float(row["price"]) for row in cursor.fetchall()}
    cursor.close()
    conn.close()
    return overrides

def save_price_override_db(product_name, price):
    conn = get_db_connection()
    cursor = conn.cursor()
    # 🔥 CORRECCIÓN: Asegurarse de que la tabla de precios exista antes de intentar escribir en ella.
    # Esto previene errores si la tabla no fue creada manualmente en el servidor de producción.
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS product_price_overrides (
            product_name VARCHAR(180) PRIMARY KEY,
            price DECIMAL(10,2) NOT NULL,
            updated_at DATETIME NOT NULL
        )
    """)
    cursor.execute(
        """
        INSERT INTO product_price_overrides (product_name, price, updated_at)
        VALUES (%s, %s, %s)
        ON DUPLICATE KEY UPDATE price = VALUES(price), updated_at = VALUES(updated_at)
        """,
        (product_name, price, datetime.now())
    )
    conn.commit()
    cursor.close()
    conn.close()

def count_libro_records():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM libro")
        total = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return total
    except Exception:
        return 0

# Auxiliar para guardar mensajes de contacto localmente (Segunda manera)
def guardar_contacto_local(nuevo_msg):
    existentes = []
    if os.path.exists(CONTACTO_RESPALDO_FILE):
        try:
            with open(CONTACTO_RESPALDO_FILE, "r", encoding="utf-8") as f:
                existentes = json.load(f)
                if not isinstance(existentes, list): existentes = []
        except Exception:
            existentes = []
            
    # Asignar un ID único basado en timestamp para la eliminación en contingencia local
    if "id" not in nuevo_msg:
        nuevo_msg["id"] = f"local-{int(datetime.now().timestamp())}"
        
    existentes.insert(0, nuevo_msg)
    try:
        with open(CONTACTO_RESPALDO_FILE, "w", encoding="utf-8") as f:
            json.dump(existentes, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[ERROR] No se pudo escribir el respaldo local de contacto: {e}")

def enviar_correo_async(app, msg):
    """Función para enviar correo en un hilo separado para no bloquear la respuesta."""
    with app.app_context():
        try:
            mail.send(msg)
            print("[INFO] Correo de contacto enviado en segundo plano.")
        except Exception as e:
            print(f"[ERROR] Fallo en el envío de correo asíncrono: {e}")



# =========================
# PÁGINAS
# =========================
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/productos")
def productos():
    return render_template("productos.html")


@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")


@app.route("/equipo")
def equipo():
    return render_template("equipo.html")


@app.route('/historia')
def historia():
    return render_template('historia.html')


@app.route('/galeria')
def galeria():
    return render_template('galeria.html')


@app.route('/Blog')
def blog():
    return render_template('blog.html')

@app.route('/articulo')
def articulo():
    return render_template('articulo.html')



@app.route('/detallesdesayuno')
@app.route('/receta') # URL alternativa y más corta
def detallesdesayuno():
    return render_template('detallesdesayuno.html')

@app.route('/beneficios')
def beneficios():
    return render_template('beneficios.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')


@app.route("/detalles")
def detalles():
    return render_template("detalles.html")
  
@app.route('/carrito')
def carrito():
    return render_template('carrito.html')
  
@app.route('/pago')
def pago():
    return render_template('pago.html')

@app.route('/noticias')
def noticias():
    return render_template('noticias.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

# ==========================================
# 🔥 API DE INICIO DE SESIÓN (usuarios + MySQL)
# ==========================================
def ensure_usuarios_table(cursor):
    """
    Crea la tabla `usuarios` si no existe todavía (igual que
    ensure_dashboard_tables hace con analytics_visits y
    product_price_overrides), y siembra 2 cuentas de prueba
    equivalentes a las demo que antes vivían solo en localStorage.
    """
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(120) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            rol ENUM('administrador', 'trabajador', 'comprador') NOT NULL DEFAULT 'comprador',
            fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    """)
    # admin@tutawayta.com -> admin123 | comprador@tutawayta.com -> comprador123
    cursor.execute("""
        INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
        ('Administrador Tuta Wayta', 'admin@tutawayta.com', 'pbkdf2:sha256:1000000$vZAcJNF6J2SPFtqK$f5cb40291692c197d1fa6b50700e802ea493aab44e3c7dce86e73fea345bd180', 'administrador'),
        ('Comprador Tuta Wayta', 'comprador@tutawayta.com', 'pbkdf2:sha256:1000000$eCJLRbT1IqViA22j$aa92773cac9c1854c3e575a9791ff175130bae5bdcad8d6d2ab0e28153bb2212', 'comprador')
        ON DUPLICATE KEY UPDATE nombre = VALUES(nombre)
    """)

@app.route('/api/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json(silent=True) or {}
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''

        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Todos los campos son obligatorios"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        ensure_usuarios_table(cursor)
        conn.commit()
        cursor.execute(
            "SELECT id, nombre, email, password_hash, rol FROM usuarios WHERE email = %s",
            (email,)
        )
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()

        if not usuario:
            return jsonify({
                "success": False,
                "message": "Correo o contraseña incorrectos"
            }), 401

        if not check_password_hash(usuario['password_hash'], password):
            return jsonify({
                "success": False,
                "message": "Correo o contraseña incorrectos"
            }), 401

        # Nunca se devuelve password_hash ni la contraseña en la respuesta.
        return jsonify({
            "success": True,
            "message": "Inicio de sesión exitoso",
            "user": {
                "id": usuario['id'],
                "nombre": usuario['nombre'],
                "email": usuario['email'],
                "rol": usuario['rol']
            }
        }), 200

    except Exception as e:
        print(f"[ERROR] /api/login: {e}")
        return jsonify({
            "success": False,
            "message": "Error interno del servidor"
        }), 500

@app.route('/cuenta')
def cuenta():
    return render_template('cuenta.html')

@app.route('/admin/dashboard')
@app.route('/dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/api/analytics/visit', methods=['POST'])
def track_analytics_visit():
    data = request.get_json(silent=True) or {}
    path = data.get("path", "/")
    visitor_id = data.get("visitorId", "")
    title = data.get("title", "Tuta Wayta")
    today = datetime.now().strftime("%Y-%m-%d")

    if path in IGNORED_ANALYTICS_PATHS or not visitor_id:
        return jsonify({"ok": True})

    visit = {
        "date": today,
        "path": path,
        "visitorId": visitor_id,
        "title": title,
        "createdAt": datetime.now().isoformat(timespec="seconds")
    }

    try:
        save_analytics_visit_db(path, visitor_id, title)
    except Exception:
        visits = read_analytics_visits()
        visits.append(visit)
        write_analytics_visits(visits)

    return jsonify({"ok": True})

@app.route('/api/analytics/summary')
def analytics_summary():
    try:
        visits = read_analytics_visits_db()
    except Exception:
        visits = read_analytics_visits()
    unique_visitors = len({visit.get("visitorId") for visit in visits if visit.get("visitorId")})
    product_visits = sum(
        1 for visit in visits
        if visit.get("path") in {"/productos", "/detalles", "/detallesdesayuno"}
    )
    page_counts = {}
    for visit in visits:
        path = visit.get("path", "/")
        page_counts[path] = page_counts.get(path, 0) + 1

    return jsonify({
        "ok": True,
        "totalVisits": len(visits),
        "uniqueVisitors": unique_visitors,
        "productVisits": product_visits,
        "claimsTotal": count_libro_records(),
        "pageCounts": page_counts,
        "visits": visits
    })

@app.route('/api/admin/price-overrides', methods=['GET', 'POST'])
def admin_price_overrides():
    if request.method == 'GET':
        try:
            overrides = read_price_overrides_db()
        except Exception:
            overrides = {}
        return jsonify({"ok": True, "overrides": overrides})

    data = request.get_json(silent=True) or {}
    product_name = str(data.get("productName", "")).strip()
    try:
        price = float(data.get("price"))
    except (TypeError, ValueError):
        return jsonify({"ok": False, "msg": "Precio invalido"}), 400

    if not product_name or price <= 0:
        return jsonify({"ok": False, "msg": "Datos invalidos"}), 400

    try:
        save_price_override_db(product_name, price)
    except Exception:
        return jsonify({"ok": False, "msg": "No se pudo guardar en la base de datos"}), 500

    return jsonify({"ok": True})

# --- 🔥 NUEVO: ENDPOINT PARA SUBIR IMÁGENES ---
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/admin/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"ok": False, "msg": "No se encontró el archivo"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"ok": False, "msg": "No se seleccionó ningún archivo"}), 400
        
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Para evitar sobreescribir, se puede añadir un timestamp
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        unique_filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Devuelve la URL pública del archivo guardado
        return jsonify({"ok": True, "url": f"/static/uploads/{unique_filename}"})

    return jsonify({"ok": False, "msg": "Tipo de archivo no permitido"}), 400

# =========================
#  GENERAR Y ENVIAR REPORTE PDF DEL CARRITO
# =========================

@app.route('/generar_reporte_pdf', methods=['POST'])
def generar_reporte_pdf():
    import sys
    import random  # 🔥 Importamos random para los números aleatorios profesionales
    from datetime import datetime, timedelta
    
    data = request.json
    print("[DEBUG] Datos recibidos en /generar_reporte_pdf:", data, file=sys.stderr)
    
    productos = data.get('productos', [])
    email = data.get('email')
    nombre = data.get('nombre', 'Cliente')
    
    if not productos or not email:
        print("[ERROR] Faltan datos críticos: productos o email", file=sys.stderr)
        return jsonify({'ok': False, 'msg': 'Faltan datos críticos: productos o email'}), 400

    # Calculamos el subtotal real sumando los productos del carrito
    subtotal_calculado = 0.0
    for prod in productos:
        cantidad = int(prod.get('cantidad', 1))
        precio = float(prod.get('precio', 0))
        subtotal_calculado += (cantidad * precio)
    
    costo_envio = 15.00
    total_final = subtotal_calculado + costo_envio

    #  LÓGICA DE FECHAS AUTOMÁTICAS
    fecha_actual = datetime.now()
    fecha_factura = data.get('fecha') or fecha_actual.strftime("%d/%m/%Y")
    fecha_vencimiento = data.get('fecha_vencimiento') or (fecha_actual + timedelta(days=30)).strftime("%d/%m/%Y")

    #  GENERACIÓN DE NÚMERO DE FACTURA ALEATORIO PROFESIONAL
    # Genera un formato tipo: F001-000431 (un número aleatorio entre 100 y 99999)
    num_aleatorio = random.randint(100, 99999)
    factura_nro = f"F001-{num_aleatorio:06d}" 

    # Crear PDF en memoria
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=letter, 
        rightMargin=30, 
        leftMargin=30, 
        topMargin=20, 
        bottomMargin=20
    )
    
    styles = getSampleStyleSheet()
    styleN = styles['Normal']
    styleB = ParagraphStyle('Bold', parent=styleN, fontName='Helvetica-Bold', fontSize=10)
    styleTitle = ParagraphStyle('TitleCustom', parent=styles['Title'], fontSize=24, fontName='Helvetica-Bold')
    
    elements = []

    # --- 1. ENCABEZADO: SÓLO TUTA WAYTA Y NÚMERO ALEATORIO ---
    header_data = [
        [
            Paragraph("<b>TUTA WAYTA</b>", styleTitle), 
            Table([
                [Paragraph("<para align='center'><b>FACTURA DE VENTA</b></para>", styleB)],
                [Paragraph(f"<para align='center'><font color='black' size=12><b>{factura_nro}</b></font></para>", styleN)]
            ], colWidths=[150])
        ]
    ]
    
    header_table = Table(header_data, colWidths=[370, 180])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
        ('BOX', (1,0), (1,0), 1, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 15))

    # --- 2. INFORMACIÓN DEL CLIENTE Y FECHAS ---
    info_cliente_table = Table([
        [Paragraph('<b>Señor (es):</b>', styleB), Paragraph(nombre, styleN)],
        [Paragraph('<b>Dirección:</b>', styleB), Paragraph(data.get('direccion', 'Dirección no especificada'), styleN)],
        [Paragraph('<b>Teléfono:</b>', styleB), Paragraph(str(data.get('telefono', 'N/A')), styleN)],
        [Paragraph('<b>Correo:</b>', styleB), Paragraph(email, styleN)]
    ], colWidths=[80, 270])
    
    info_cliente_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('BACKGROUND', (0,0), (-1,-1), colors.whitesmoke),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))

    fechas_table = Table([
        [Paragraph('<para align="center"><b>FECHA FACTURA</b></para>', styleB)],
        [Paragraph(f'<para align="center">{fecha_factura}</para>', styleN)],
        [Paragraph('<para align="center"><b>FECHA VENCIMIENTO</b></para>', styleB)],
        [Paragraph(f'<para align="center">{fecha_vencimiento}</para>', styleN)],
        [Paragraph(f"<b>FORMA DE PAGO:</b> {data.get('forma_pago', 'Contado')}", styleN)]
    ], colWidths=[180])
    
    fechas_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.black),
        ('LINEBELOW', (0,0), (0,0), 1, colors.black),
        ('LINEBELOW', (0,1), (0,1), 1, colors.black),
        ('LINEBELOW', (0,2), (0,2), 1, colors.black),
        ('LINEBELOW', (0,3), (0,3), 1, colors.black),
        ('BACKGROUND', (0,0), (0,0), colors.whitesmoke),
        ('BACKGROUND', (0,2), (0,2), colors.whitesmoke),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))

    bloque_medio = Table([[info_cliente_table, fechas_table]], colWidths=[360, 190])
    bloque_medio.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(bloque_medio)
    elements.append(Spacer(1, 15))

    # --- 3. TABLA PRINCIPAL DE PRODUCTOS ---
    data_table = [[
        Paragraph("<para align='center'><b>CANTIDAD</b></para>", styleB), 
        Paragraph("<para align='center'><b>DESCRIPCIÓN</b></para>", styleB), 
        Paragraph("<para align='center'><b>VALOR</b></para>", styleB)
    ]]
    
    for prod in productos:
        nombre_prod = prod.get('nombre', 'Producto')
        cantidad = prod.get('cantidad', 1)
        precio = prod.get('precio', 0)
        data_table.append([
            Paragraph(f"<para align='center'>{cantidad}</para>", styleN), 
            Paragraph(nombre_prod, styleN), 
            Paragraph(f"<para align='right'>S/ {precio:.2f}</para>", styleN)
        ])

    table_productos = Table(data_table, colWidths=[80, 360, 110])
    table_productos.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1.5, colors.black),
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#b90060')), 
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 1, colors.black),
    ]))
    elements.append(table_productos)
    elements.append(Spacer(1, 15))

    # --- 4. TABLA DE TOTALES ---
    table_totales = Table([
        [Paragraph('<b>SUBTOTAL</b>', styleN), f"S/ {subtotal_calculado:.2f}"],
        [Paragraph('<b>ENVÍO</b>', styleN), f"S/ {costo_envio:.2f}"], 
        [Paragraph('<b>TOTAL</b>', styleB), f"S/ {total_final:.2f}"] 
    ], colWidths=[90, 90])
    
    table_totales.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1.5, colors.black),
        ('GRID', (0,0), (-1,-1), 1.5, colors.black),
        ('ALIGN', (0,0), (0,-1), 'LEFT'),   
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),  
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (1,1), colors.white), 
        ('BACKGROUND', (0,2), (1,2), colors.HexColor('#b90060')), 
        ('TEXTCOLOR', (0,2), (1,2), colors.white), 
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))

    bloque_final = Table([["", table_totales]], colWidths=[370, 180])
    bloque_final.setStyle(TableStyle([
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(bloque_final)

    # Construir PDF
    doc.build(elements)
    buffer.seek(0)

    # Enviar PDF por correo
    try:
        msg = Message(
            subject=f"Reporte de compra {factura_nro} - Tuta Wayta",
            recipients=[email]
        )
        msg.body = f"Hola {nombre},\nAdjuntamos el reporte de tu compra con el Nro: {factura_nro}. ¡Gracias por tu preferencia!"
        msg.attach(f"factura_{factura_nro}.pdf", "application/pdf", buffer.read())
        mail.send(msg)
        return jsonify({'ok': True, 'msg': 'Reporte enviado'})
    except Exception as e:
        print(f"[ERROR] Error al enviar correo: {e}", file=sys.stderr)
        return jsonify({'ok': False, 'msg': f'Error al enviar correo: {e}'}), 500
  
@app.route('/generar_pdf_nutricional', methods=['POST'])
def generar_pdf_nutricional():
    data = request.get_json()
    headers = data.get('headers', [])
    rows = data.get('rows', [])

    buffer = io.BytesIO()
    # Ajuste de área de impresión a 186mm totales para centrar perfectamente todo en una página
    doc = SimpleDocTemplate(
        buffer, 
        pagesize=letter, 
        rightMargin=15*mm, 
        leftMargin=15*mm, 
        topMargin=12*mm, 
        bottomMargin=12*mm
    )
    
    # --- PALETA DE COLORES PROFESIONAL (Estilo Orgánico Corporativo) ---
    COLOR_PRIMARY = colors.HexColor("#0F2C1F")    # Verde Imperial Profundo
    COLOR_SECONDARY = colors.HexColor("#3D6346")  # Verde Oliva de Acento
    COLOR_ACCENT = colors.HexColor("#C5A059")     # Oro Champagne
    TEXT_MAIN = colors.HexColor("#2D3748")        # Gris Slate Corporativo
    BG_LIGHT = colors.HexColor("#F8FAFC")         # Fondo suave para filas alternas
    LINE_COLOR = colors.HexColor("#E2E8F0")       # Línea divisoria fina

    styles = getSampleStyleSheet()
    
    # --- 🔥 TIPOGRAFÍAS REDISEÑADAS: MÁS SEPARADAS, LEGIBLES Y ELEGANTES ---
    # Subimos a 9pt con leading de 13.5pt para que las letras tengan aire y una lectura impecable
    style_body = ParagraphStyle('BodyCustom', parent=styles['Normal'], fontName='Helvetica', fontSize=9, textColor=TEXT_MAIN, leading=13.5, spaceAfter=4)
    style_body_center = ParagraphStyle('BodyCenter', parent=style_body, alignment=1)
    
    style_title = ParagraphStyle('TitleCustom', parent=styles['Title'], fontSize=20, fontName='Helvetica-Bold', textColor=COLOR_PRIMARY, spaceAfter=2, alignment=0)
    style_subtitle = ParagraphStyle('SubTitleCustom', parent=styles['Normal'], fontSize=9, fontName='Helvetica-Bold', textColor=COLOR_ACCENT, spaceAfter=6)
    
    style_h1 = ParagraphStyle('H1Custom', fontName='Helvetica-Bold', fontSize=11, textColor=COLOR_PRIMARY, spaceBefore=8, spaceAfter=4, keepWithNext=True)
    style_header = ParagraphStyle('HeaderCustom', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, textColor=colors.white, alignment=1, leading=11)

    elements = []

    # --- ENCABEZADO INSTITUCIONAL ---
    elements.append(Paragraph("DOSSIER DE INTELIGENCIA COMERCIAL & FITOQUÍMICA", style_subtitle))
    elements.append(Paragraph("Propiedades Globales y Análisis de la Pitahaya", style_title))
    
    # Barra de corte superior elegante
    elements.append(Table([[""]], colWidths=[186*mm], rowHeights=[2.5], style=TableStyle([('BACKGROUND', (0,0), (-1,-1), COLOR_PRIMARY)])))
    elements.append(Spacer(1, 6))

    # --- FLUJO DE INFORMACIÓN LINEAL SEGURO (Evita desbordes y errores de renderizado) ---
    elements.append(Paragraph("1. Origen y Tendencia de Exportación", style_h1))
    elements.append(Paragraph("La pitahaya (<i>Hylocereus spp.</i>) se ha consolidado como un commodity de alto valor en mercados premium de Europa, Asia y Norteamérica. Su demanda internacional se fundamenta en un consumidor global orientado hacia frutos exóticos que aportan densidades macro y micronutricionales óptimas.", style_body))
    
    elements.append(Paragraph("2. Fitoquímica y Compuestos Bioactivos", style_h1))
    elements.append(Paragraph("El valor diferencial radica en su matriz antioxidante: las variedades rojas/púrpuras poseen altos niveles de <b>betalaínas</b> (antioxidante celular activo), mientras que las blancas y amarillas concentran una robusta cantidad de polifenoles solubles y ácidos orgánicos esenciales.", style_body))

    elements.append(Paragraph("3. Beneficios Clínicos Certificados", style_h1))
    elements.append(Paragraph("<b>• Capacidad Antioxidante:</b> Captación eficiente de radicales libres.<br/>"
                              "<b>• Salud Gastrointestinal:</b> Oligosacáridos que actúan como prebióticos naturales.<br/>"
                              "<b>• Sistema Inmune:</b> El ácido ascórbico cataliza la respuesta inmunológica.<br/>"
                              "<b>• Cardioprotección:</b> Ácidos grasos linoleico y oleico en semillas.", style_body))
              
    elements.append(Paragraph("4. Parámetros de Cosecha y Calidad", style_h1))
    elements.append(Paragraph("Para la comercialización internacional se exige un índice de sólidos solubles mínimos de <b>12° a 14° Brix</b>. El corte se ejecuta al alcanzar entre un 50% y 75% de la madurez fenológica (cambio de color en corteza).", style_body))

    # Título de la sección de la matriz nutricional
    elements.append(Paragraph("5. Análisis de Componentes Técnicos (Valores por cada 100g de Pulpa Fresca)", style_h1))
    elements.append(Spacer(1, 2))

    # --- TU MAPEO DE IMÁGENES ---
    image_mapping = {
        "American Beauty": os.path.join(os.path.dirname(__file__), "static", "img", "Pitahaya American Beauty.png"),
        "Híbrida": os.path.join(os.path.dirname(__file__), "static", "img", "Pitahaya Híbrida Tesoro.png"),
        "Interior Blanco": os.path.join(os.path.dirname(__file__), "static", "img", "Pitahaya Blanca.jpg"),
        "Amarilla": os.path.join(os.path.dirname(__file__), "static", "img", "Pitahaya Amarilla Palora.png"),
        "Pitahaya Amarilla": os.path.join(os.path.dirname(__file__), "static", "img", "Pitahaya Amarilla Palora.png")
    }

    # --- TU CONSTRUCCIÓN DE ENCABEZADOS (Iconos compactos para perfecto encaje y estética) ---
    header_with_images = []
    for h in headers:
        clean_header = h.strip()
        if clean_header in image_mapping and os.path.exists(image_mapping[clean_header]):
            img = Image(image_mapping[clean_header], width=10*mm, height=10*mm)
            header_content = [img, Spacer(1, 2), Paragraph(clean_header, style_header)]
            header_with_images.append(header_content)
        else:
            header_with_images.append(Paragraph(clean_header, style_header))

    # Construcción de la matriz de datos
    table_data = [header_with_images]
    for row in rows:
        table_data.append([Paragraph(str(cell), style_body if i == 0 else style_body_center) for i, cell in enumerate(row)])

    # Distribución del ancho simétrico (Total 186mm)
    table = Table(table_data, colWidths=[46*mm, 35*mm, 35*mm, 35*mm, 35*mm])
    
    t_style = [
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_PRIMARY),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
        ('LINEBELOW', (0, 0), (-1, 0), 1.5, COLOR_ACCENT), 
    ]
    
    # Relleno interno balanceado para una lectura limpia y espaciada
    for i in range(1, len(table_data)):
        if i % 2 == 0:
            t_style.append(('BACKGROUND', (0, i), (-1, i), BG_LIGHT))
        t_style.append(('LINEBELOW', (0, i), (-1, i), 0.5, LINE_COLOR))
        t_style.append(('TOPPADDING', (0, i), (-1, i), 4))
        t_style.append(('BOTTOMPADDING', (0, i), (-1, i), 4))

    table.setStyle(TableStyle(t_style))
    elements.append(table)
    elements.append(Spacer(1, 4))

    # Sección 6: Logística de Conservación
    elements.append(Paragraph("6. Logística de Almacenamiento Post-Cosecha", style_h1))
    storage_txt = (
        "Para tránsito internacional, se exige un régimen térmico estricto de entre <b>8°C y 10°C</b> con humedad controlada "
        "del 85-90%. Temperaturas inferiores a 6°C inducen daños por frío irreversible (chilling injury) destruyendo la firmeza."
    )
    elements.append(Paragraph(storage_txt, style_body))
    elements.append(Spacer(1, 6))

    # Pie de página técnico estilizado
    elements.append(Table([[""]], colWidths=[186*mm], rowHeights=[0.5], style=TableStyle([('BACKGROUND', (0,0), (-1,-1), LINE_COLOR)])))
    elements.append(Spacer(1, 4))
    
    style_italic_custom = ParagraphStyle('ItalicCustom', parent=styles['Italic'], fontSize=7.5, leading=10, textColor=colors.HexColor("#718096"))
    elements.append(Paragraph("<i>* Valores analíticos referenciales recopilados bajo metodologías estándar de laboratorio de alimentos.</i>", style_italic_custom))
    elements.append(Paragraph(f"<i>Documento institucional confidencial generado automáticamente el: {datetime.now().strftime('%d/%m/%Y %H:%M')}</i>", style_italic_custom))

    doc.build(elements)
    
    pdf_bytes = buffer.getvalue()
    buffer.close()

    from flask import make_response
    response = make_response(pdf_bytes)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=informe_ejecutivo_pitahaya.pdf'
    
    return response


# =========================
#  CONTACTO (HÍBRIDO / INTELIGENTE)
# =========================

@app.route("/contacto", methods=["GET", "POST"])
def contacto():

    if request.method == "POST":
        # Detectar si los datos vienen por JSON (JS) o por Formulario tradicional
        if request.is_json:
            data = request.get_json() or {}
            nombre = data.get("nombre")
            correo = data.get("correo")
            telefono = data.get("telefono")
            asunto = data.get("asunto")   
            mensaje = data.get("mensaje")
            is_ajax = True
        else:
            nombre = request.form.get("nombre")
            correo = request.form.get("correo")
            telefono = request.form.get("telefono")
            asunto = request.form.get("asunto")   
            mensaje = request.form.get("mensaje")
            is_ajax = False

        # VALIDACIÓN DE CAMPOS OBLIGATORIOS
        if not nombre or not correo or not telefono or not asunto or not mensaje:
            if is_ajax:
                return jsonify({"ok": False, "msg": "Completa todos los campos obligatorios."}), 400
            flash("❌ Completa todos los campos.", "error")
            return redirect(url_for('contacto'))

        # Preparar estructura de mensaje local con la fecha del sistema
        fecha_registro = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        local_msg = {
            "nombre": nombre, "correo": correo, "telefono": telefono,
            "asunto": asunto, "mensaje": mensaje, "creado_at": fecha_registro
        }

        db_ok = False
        # 1. INTENTAR GUARDAR EN BASE DE DATOS (Primera manera)
        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            sql = """
            INSERT INTO contacto (nombre, correo, telefono, asunto, mensaje)
            VALUES (%s, %s, %s, %s, %s)
            """
            valores = (nombre, correo, telefono, asunto, mensaje)

            cursor.execute(sql, valores)
            conn.commit()

            # Obtener el ID recién creado en la base de datos para sincronizar con el JSON local
            nuevo_id = cursor.lastrowid
            local_msg["id"] = nuevo_id

            cursor.close()
            conn.close()
            db_ok = True
            print("[INFO] Datos guardados con éxito en la base de datos.")
        except Exception as db_error:
            print(f"[WARN] No se pudo guardar en la base de datos: {db_error}. Continuando de forma local...")

        # 2. SEGUNDA MANERA: Respaldar localmente pase lo que pase para evitar pantallas de error
        guardar_contacto_local(local_msg)

        # 3. ENVIAR CORREO ELECTRÓNICO (AHORA EN SEGUNDO PLANO)
        try:
            msg = Message(
                subject=f"🌸 {asunto} - {nombre}",
                recipients=["jorge.vilcapuma.t@vallegrande.edu.pe"]
            )
            # EMAIL HTML
            msg.html = f"""
<div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:30px;">
  <div style="max-width:650px; margin:auto; background:white; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#b90060,#8a0048); color:white; padding:35px; text-align:center;">
      <h1 style="margin:0; font-size:32px;">🌸 Tuta Wayta</h1>
      <p style="margin-top:10px; opacity:0.9; font-size:15px;">Nuevo mensaje recibido desde el formulario de contacto</p>
    </div>
    <div style="padding:35px;">
      <h2 style="color:#222; margin-bottom:25px; font-size:22px;">📋 Información del cliente</h2>
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td style="padding:14px;background:#fafafa;border-bottom:1px solid #eee;font-weight:bold;width:180px;">👤 Nombre</td>
          <td style="padding:14px;border-bottom:1px solid #eee;">{nombre}</td>
        </tr>
        <tr>
          <td style="padding:14px;background:#fafafa;border-bottom:1px solid #eee;font-weight:bold;">📧 Correo</td>
          <td style="padding:14px;border-bottom:1px solid #eee;">{correo}</td>
        </tr>
        <tr>
          <td style="padding:14px;background:#fafafa;border-bottom:1px solid #eee;font-weight:bold;">📞 Teléfono</td>
          <td style="padding:14px;border-bottom:1px solid #eee;">{telefono}</td>
        </tr>
        <tr>
          <td style="padding:14px;background:#fafafa;border-bottom:1px solid #eee;font-weight:bold;">📝 Asunto</td>
          <td style="padding:14px;border-bottom:1px solid #eee;">{asunto}</td>
        </tr>
      </table>
      <div style="margin-top:35px;">
        <h3 style="color:#222;margin-bottom:15px;">💬 Mensaje</h3>
        <div style="background:#fafafa; padding:25px; border-radius:14px; line-height:1.7; color:#444; border:1px solid #eee;">
          {mensaje}
        </div>
      </div>
      <div style="text-align:center; margin-top:35px;">
        <a href="mailto:{correo}" style="display:inline-block; background:#b90060; color:white; text-decoration:none; padding:14px 28px; border-radius:12px; font-weight:bold; font-size:15px;">✉️ Responder al cliente</a>
      </div>
    </div>
    <div style="background:#fafafa; padding:18px; text-align:center; font-size:12px; color:#777; border-top:1px solid #eee;">
      © 2026 Tuta Wayta - Sistema de contacto
    </div>
  </div>
</div>
"""
            # Iniciar el envío en un hilo para no bloquear la respuesta al usuario
            thread = threading.Thread(target=enviar_correo_async, args=(app, msg))
            thread.start()
        except Exception as mail_error:
            print(f"[ERROR] Error crítico al preparar el correo: {mail_error}")
            if not is_ajax:
                flash("❌ Error al enviar el mensaje por correo.", "error")

        # Responder según cómo se solicitó
        if is_ajax:
            return jsonify({
                "ok": True,
                "msg": "Mensaje procesado correctamente.",
                "db_status": db_ok
            })

        return redirect(url_for('contacto_enviado'))

    return render_template("contacto.html")

@app.route("/contacto-enviado")
def contacto_enviado():
    """Página de confirmación tras enviar el formulario de contacto."""
    return render_template("contacto_confirmacion.html")


@app.route("/libro", methods=["GET", "POST"])
def libro():

    if request.method == "POST":
        try:
            tipo = request.form.get("tipo")
            nombres = request.form.get("nombres")
            apellidos = request.form.get("apellidos")
            doc_tipo = request.form.get("doc_tipo")
            doc_num = request.form.get("doc_num")
            email = request.form.get("email")
            telefono = request.form.get("telefono")
            direccion = request.form.get("direccion")
            monto = request.form.get("monto")
            fecha_compra = request.form.get("fecha_compra")
            bien = request.form.get("bien")
            detalle = request.form.get("detalle")
            pedido = request.form.get("pedido")

            area_queja = request.form.get("area_queja")
            personal_queja = request.form.get("personal_queja")
            gravedad = request.form.get("gravedad")

            # ⭐ CALIFICACIÓN (ARREGLADO)
            calificacion = request.form.get("calificacion")
            if calificacion:
                calificacion = int(calificacion)
            else:
                calificacion = None

            # AGREGADO: normalización segura de tipos para evitar errores de MySQL
            # (monto vacío "" rompía el INSERT porque la columna es DECIMAL;
            #  además faltaban estas 4 columnas que sí existen en la tabla `libro`)
            monto = monto if monto not in (None, "") else None
            fecha_incidente = request.form.get("fecha_incidente") or None
            hora_incidente = request.form.get("hora_incidente") or None
            primera_vez = request.form.get("primera_vez") or None
            ref_queja_anterior = request.form.get("ref_queja") or None
            # FIN AGREGADO

            # =========================
            # CONEXIÓN
            # =========================
            conn = get_db_connection()
            cursor = conn.cursor()

            # =========================
            # NÚMERO DE HOJA
            # AGREGADO: formato con prefijo segun tipo R0001-2026 / Q0001-2026
            # Cada tipo (Reclamacion/Queja) lleva su propio correlativo
            # independiente, reiniciando visualmente con cada uno.
            # =========================
            year = datetime.now().year
            prefijo = "Q" if tipo == "queja" else "R"
            cursor.execute(
                "SELECT COUNT(*) FROM libro WHERE tipo = %s",
                (tipo,)
            )
            count = cursor.fetchone()[0] + 1
            numero_hoja = f"{prefijo}{count:04d}-{year}"

            # =========================
            # NORMALIZAR QUEJAS
            # =========================
            if tipo == "reclamacion":
                area_queja = None
                personal_queja = None
                gravedad = None
            else:
                area_queja = area_queja or "No especificado"
                personal_queja = personal_queja or "No especificado"
                gravedad = gravedad or "No especificado"

            # =========================
            # INSERT FINAL CORRECTO
            # =========================
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS libro (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    numero_hoja VARCHAR(50) NOT NULL UNIQUE,
                    tipo ENUM('reclamacion', 'queja') NOT NULL,
                    nombres VARCHAR(100) NOT NULL,
                    apellidos VARCHAR(100) NOT NULL,
                    doc_tipo VARCHAR(50),
                    doc_num VARCHAR(50),
                    email VARCHAR(100),
                    telefono VARCHAR(50),
                    direccion TEXT,
                    monto DECIMAL(10, 2),
                    fecha_compra DATE,
                    bien TEXT,
                    detalle TEXT,
                    pedido TEXT,
                    tipo_atencion VARCHAR(100),
                    personal_involucrado VARCHAR(150),
                    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cursor.execute("""
                INSERT INTO libro (
                    numero_hoja, tipo, nombres, apellidos, doc_tipo, doc_num, email, telefono, direccion,
                    monto, fecha_compra, bien, detalle, pedido,
                    tipo_atencion, personal_involucrado, fecha_incidente, hora_incidente,
                    motivos, calificacion, primera_vez, ref_queja_anterior
                )
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                numero_hoja,
                tipo, nombres, apellidos, doc_tipo, doc_num, email, telefono, direccion,
                monto, fecha_compra, bien, detalle, pedido,
                area_queja, personal_queja, fecha_incidente, hora_incidente,
                gravedad, calificacion, primera_vez, ref_queja_anterior
            ))

            conn.commit()
            cursor.close()
            conn.close()

            return jsonify({"ok": True, "numero_hoja": numero_hoja})

        except Exception as e:
            import traceback
            print("ERROR AL REGISTRAR:")
            traceback.print_exc()

            flash("❌ Error al registrar", "error")
            return jsonify({"ok": False, "msg": f"Error en el servidor: {str(e)}"}), 500

    return render_template("libro.html")


# ==========================================
# 🔥 SECCIÓN RESTAURADA: API PARA MENSAJES DE CONTACTO
# ==========================================
@app.route('/api/admin/contacto-mensajes')
def api_contacto_mensajes():
    lista = []
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, nombre, correo, telefono, asunto, mensaje, estado,
                   DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') as creado_at 
            FROM contacto 
            ORDER BY id DESC
        """)
        lista = cursor.fetchall()
        cursor.close()
        conn.close()
    except Exception:
        if os.path.exists(CONTACTO_RESPALDO_FILE):
            try:
                with open(CONTACTO_RESPALDO_FILE, "r", encoding="utf-8") as f:
                    lista = json.load(f)
            except Exception:
                lista = []
    return jsonify({"ok": True, "mensajes": lista or []})

@app.route('/api/admin/contacto-mensajes/eliminar/<id>', methods=['DELETE'])
def api_eliminar_mensaje(id):
    db_deleted = False
    json_deleted = False

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM contacto WHERE id = %s", (id,))
        conn.commit()
        if cursor.rowcount > 0:
            db_deleted = True
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"[WARN] No se pudo borrar en MySQL (id: {id}): {e}. Se procederá a limpiar el respaldo local.")

    if os.path.exists(CONTACTO_RESPALDO_FILE):
        try:
            with open(CONTACTO_RESPALDO_FILE, "r", encoding="utf-8") as f:
                mensajes = json.load(f)
            
            mensajes_filtrados = [m for m in mensajes if str(m.get("id")).strip() != str(id)]
            
            if len(mensajes) != len(mensajes_filtrados):
                json_deleted = True
            
            with open(CONTACTO_RESPALDO_FILE, "w", encoding="utf-8") as f:
                json.dump(mensajes_filtrados, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"[ERROR] Fallo al limpiar archivo JSON local: {e}")

    if db_deleted or json_deleted:
        return jsonify({"ok": True, "msg": "Mensaje eliminado permanentemente."}), 200
    return jsonify({"ok": False, "msg": "No se encontró el mensaje para eliminar."}), 404

# ====================================================================
# 🔥 NUEVA RUTA: API PARA OBTENER Y GESTIONAR EL LIBRO DE RECLAMACIONES
# ====================================================================
@app.route('/api/admin/libro-reclamaciones')
def api_libro_reclamaciones():
    """
    Devuelve todos los registros del libro de reclamaciones para el dashboard.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, numero_hoja, tipo, nombres, apellidos, email as correo, telefono, detalle, pedido,
                   doc_tipo, doc_num, direccion, monto, bien,
                   tipo_atencion, personal_involucrado, DATE_FORMAT(fecha_incidente, '%Y-%m-%d') as fecha_incidente, TIME_FORMAT(hora_incidente, '%H:%i:%s') as hora_incidente,
                   motivos, calificacion, DATE_FORMAT(fecha_registro, '%Y-%m-%d %H:%i:%s') as creado_at, DATE_FORMAT(fecha_compra, '%Y-%m-%d') as fecha_compra
            FROM libro 
            ORDER BY id DESC
        """)
        registros = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"ok": True, "registros": registros})
    except Exception as e:
        print(f"[ERROR] No se pudo leer la tabla 'libro': {e}")
        try:
            with open('libro_reclamaciones_respaldo.json', 'r', encoding='utf-8') as f:
                registros_locales = json.load(f)
            print("[INFO] Sirviendo reclamos desde el archivo de respaldo local.")
            return jsonify({"ok": True, "registros": registros_locales})
        except Exception as json_error:
            print(f"[ERROR] Tampoco se pudo leer el respaldo local de reclamos: {json_error}")
            return jsonify({"ok": False, "registros": [], "msg": "Fallo de BD y respaldo local."}), 500

@app.route('/api/admin/libro-reclamaciones/eliminar/<id>', methods=['DELETE'])
def api_eliminar_reclamacion(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM libro WHERE id = %s", (id,))
    conn.commit()
    eliminados = cursor.rowcount
    cursor.close()
    conn.close()
    if eliminados > 0:
        return jsonify({"ok": True, "msg": "Registro eliminado de la base de datos."}), 200
    return jsonify({"ok": False, "msg": "No se encontró el registro para eliminar."}), 404


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)