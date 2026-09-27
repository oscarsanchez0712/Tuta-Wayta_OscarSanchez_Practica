"""
Script auxiliar (uso único) para crear la tabla `usuarios` en la base de
datos MySQL que ya usa el proyecto TUTA WAYTA, usando la misma conexión
que `app.py`.

Cómo usarlo:
    py crear_tabla_usuarios.py

Puedes borrar este archivo después de ejecutarlo una vez; no se usa en
producción ni es importado por app.py.
"""

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

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'trabajador', 'comprador') NOT NULL DEFAULT 'comprador',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
"""

SEED_SQL = """
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Administrador Tuta Wayta', 'admin@tutawayta.com', 'pbkdf2:sha256:1000000$vZAcJNF6J2SPFtqK$f5cb40291692c197d1fa6b50700e802ea493aab44e3c7dce86e73fea345bd180', 'administrador'),
('Comprador Tuta Wayta', 'comprador@tutawayta.com', 'pbkdf2:sha256:1000000$eCJLRbT1IqViA22j$aa92773cac9c1854c3e575a9791ff175130bae5bdcad8d6d2ab0e28153bb2212', 'comprador')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
"""

def main():
    print("Conectando a la base de datos...")
    conn = get_db_connection()
    cursor = conn.cursor()

    print("Creando tabla 'usuarios' (si no existe)...")
    cursor.execute(CREATE_TABLE_SQL)

    print("Insertando/actualizando usuarios de prueba (admin y comprador)...")
    cursor.execute(SEED_SQL)

    conn.commit()
    cursor.close()
    conn.close()
    print("Listo. La tabla 'usuarios' ya existe con las cuentas de prueba.")

if __name__ == "__main__":
    main()
