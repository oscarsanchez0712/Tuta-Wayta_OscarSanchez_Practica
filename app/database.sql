-- =====================================================
-- TUTA WAYTA — Libro de Reclamaciones
-- database MySQL compatible con app.py
-- =====================================================

CREATE DATABASE IF NOT EXISTS tutawayta
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tutawayta;


CREATE TABLE IF NOT EXISTS libro (

    id                   INT           NOT NULL AUTO_INCREMENT,

    -- Número de hoja (R0001-2026 / Q0001-2026)
    numero_hoja          VARCHAR(20)   NOT NULL UNIQUE,

    -- Tipo: 'reclamacion' | 'queja'
    tipo                 ENUM('reclamacion', 'queja') NOT NULL DEFAULT 'reclamacion',

    -- Datos del consumidor
    nombres              VARCHAR(60)   NOT NULL,
    apellidos            VARCHAR(60)   NOT NULL,
    doc_tipo             VARCHAR(20)   NOT NULL,
    doc_num              VARCHAR(15)   NOT NULL,
    email                VARCHAR(100)  NOT NULL,
    telefono             VARCHAR(12)   NOT NULL,
    direccion            VARCHAR(150)  DEFAULT NULL,

    -- Bien / Servicio
    monto                DECIMAL(10,2) DEFAULT NULL,
    fecha_compra         DATE          NOT NULL,
    bien                 VARCHAR(150)  NOT NULL,

    -- Detalle y pedido
    detalle              TEXT          NOT NULL,
    pedido               TEXT          NOT NULL,

    -- Campos exclusivos de QUEJA (NULL si es reclamación)
    tipo_atencion        VARCHAR(20)   DEFAULT NULL,   -- presencial|telefonica|virtual|delivery
    personal_involucrado VARCHAR(100)  DEFAULT NULL,
    fecha_incidente      DATE          DEFAULT NULL,
    hora_incidente       TIME          DEFAULT NULL,
    motivos              VARCHAR(200)  DEFAULT NULL,   -- valores separados por coma
    calificacion         TINYINT       DEFAULT NULL,   -- 1-5 estrellas
    primera_vez          VARCHAR(3)    DEFAULT NULL,   -- 'si' | 'no'
    ref_queja_anterior   VARCHAR(30)   DEFAULT NULL,

    -- Auditoría
    fecha_registro       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado               ENUM('pendiente', 'en_proceso', 'resuelto', 'cerrado')
                                       NOT NULL DEFAULT 'pendiente',

    PRIMARY KEY (id),
    INDEX idx_tipo        (tipo),
    INDEX idx_fecha       (fecha_registro),
    INDEX idx_numero_hoja (numero_hoja),
    INDEX idx_doc_num     (doc_num)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================
-- USUARIOS (login)
-- =========================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'trabajador', 'comprador') NOT NULL DEFAULT 'comprador',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cuentas semilla (equivalentes a las cuentas demo que ya usaba el login en localStorage)
-- admin@tutawayta.com  -> contraseña: admin123
-- comprador@tutawayta.com -> contraseña: comprador123
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador Tuta Wayta', 'admin@tutawayta.com', 'pbkdf2:sha256:1000000$vZAcJNF6J2SPFtqK$f5cb40291692c197d1fa6b50700e802ea493aab44e3c7dce86e73fea345bd180', 'administrador'),
('Comprador Tuta Wayta', 'comprador@tutawayta.com', 'pbkdf2:sha256:1000000$eCJLRbT1IqViA22j$aa92773cac9c1854c3e575a9791ff175130bae5bdcad8d6d2ab0e28153bb2212', 'comprador')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- =========================
-- CONTACTO
-- =========================
CREATE TABLE IF NOT EXISTS contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    asunto VARCHAR(150),
    mensaje TEXT,
    estado ENUM('pendiente', 'leido', 'respondido') NOT NULL DEFAULT 'pendiente',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_correo (correo),
    INDEX idx_estado (estado)
);

-- =========================
-- PRECIOS PERSONALIZADOS
-- (sin clave foránea: la tabla `products` no existe y app.py
--  crea esta tabla igual, sin relación)
-- =========================
CREATE TABLE IF NOT EXISTS product_price_overrides (
    product_name VARCHAR(180) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (product_name)
) ENGINE=InnoDB
COMMENT='Precios personalizados de productos';

-- -----------------------------------------------------
-- Tabla `analytics_visits`
-- Registra las visitas a las páginas para una analítica simple.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_visits (
    id INT NOT NULL AUTO_INCREMENT,
    visit_date DATE NOT NULL,
    path VARCHAR(255) NOT NULL,
    visitor_id VARCHAR(120) NOT NULL,
    title VARCHAR(255),
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_visit_date (visit_date)
) ENGINE=InnoDB;