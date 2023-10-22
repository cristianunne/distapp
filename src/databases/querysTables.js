export const users_table = "CREATE TABLE IF NOT EXISTS users " +
  "(user_id INTEGER PRIMARY KEY AUTOINCREMENT, idusers INTEGER NOT NULL UNIQUE, firstname VARCHAR(100), lastname VARCHAR(100), " +
  "email VARCHAR(200), photo TEXT, role VARCHAR(10));";


export const campaign_table = "CREATE TABLE IF NOT EXISTS campaign " +
  "(campaign_id INTEGER PRIMARY KEY AUTOINCREMENT, idcampaign INTEGER UNIQUE, number INTEGER, " +
  "fecha_inicio TEXT, fecha_fin TEXT, status INTEGER);"


export const camion_table = "CREATE TABLE IF NOT EXISTS camiones " +
  "(camion_id INTEGER PRIMARY KEY AUTOINCREMENT, idcamiones INTEGER UNIQUE, nombre VARCHAR(100), marca VARCHAR(100), " +
  "matricula VARCHAR(45));";

export const categories_table = "CREATE TABLE IF NOT EXISTS categories " +
  "(categories_id INTEGER PRIMARY KEY AUTOINCREMENT, idcategories INTEGER UNIQUE, name VARCHAR(100), " + 
  "color VARCHAR(20));";

export const subcategories_table = "CREATE TABLE IF NOT EXISTS subcategories " +
"(subcategories_id INTEGER PRIMARY KEY AUTOINCREMENT, idsubcategories INTEGER UNIQUE, name VARCHAR(50), " + 
"categories_idcategories INTEGER, FOREIGN KEY(categories_idcategories) REFERENCES categories(idcategories));";


export const clientes_table = "CREATE TABLE IF NOT EXISTS clientes " + 
  "(clientes_id INTEGER PRIMARY KEY AUTOINCREMENT, idclientes INTEGER UNIQUE, nombre VARCHAR(100), " + 
  "apellido VARCHAR(100), dni VARCHAR(50), pais VARCHAR(50), provincia VARCHAR(50), departamento VARCHAR(50)," + 
  "localidad VARCHAR(100), direccion VARCHAR(100), altura VARCHAR(45), shop_name VARCHAR(100), " + 
  "telefono VARCHAR(45));";

export const productos_table = "CREATE TABLE IF NOT EXISTS productos " + 
  "(productos_id INTEGER PRIMARY KEY AUTOINCREMENT, idproductos INTEGER UNIQUE, name VARCHAR(30), " + 
  "marca VARCHAR(50), unidad VARCHAR(20), content REAL, description VARCHAR(150), " + 
  "subcategories_idsubcategories INTEGER, active INTEGER, categories_idcategories INTEGER, " + 
  "proveedores_idproveedores INTEGER, image TEXT, " +  
  "FOREIGN KEY(categories_idcategories) REFERENCES categories(idcategories), " + 
  "FOREIGN KEY(subcategories_idsubcategories) REFERENCES subcategories(idsubcategories), " +
  "FOREIGN KEY(proveedores_idproveedores) REFERENCES proveedores(idproveedores));";

export const proveedores_table = "CREATE TABLE IF NOT EXISTS proveedores " + 
"(proveedores_id INTEGER PRIMARY KEY AUTOINCREMENT, idproveedores INTEGER UNIQUE, name VARCHAR(255), " + 
"cuit VARCHAR(45), direccion VARCHAR(200), provincia VARCHAR(45), " +
"localidad VARCHAR(100), telefono VARCHAR(45), email VARCHAR(100), departamento VARCHAR(200));";


export const compras_table = "CREATE TABLE IF NOT EXISTS compras_stock " +
"(compras_stock_id INTEGER PRIMARY KEY AUTOINCREMENT, idcompras_stock INTEGER UNIQUE, created VARCHAR(255), " +
"descripcion VARCHAR(500), status INTEGER DEFAULT 0);";

export const productos_comprasstock_table = "CREATE TABLE IF NOT EXISTS empleado_comprasstock " +
"(empleado_comprastock_id INTEGER PRIMARY KEY AUTOINCREMENT, idempleado_comprastock INTEGER UNIQUE, " +
"productos_idproductos INTEGER, comprasstock_idcomprasstock INTEGER, cantidad INTEGER, " + 
"comprobante VARCHAR(150), status INTEGER DEFAULT 0, observaciones VARCHAR(250), " + 
"FOREIGN KEY(productos_idproductos) REFERENCES productos(idproductos), " + 
"FOREIGN KEY(comprasstock_idcomprasstock) REFERENCES compras_stock(idcompras_stock));";








/* "active": true,
"created": null,
"email": "cris@hotmail.com",
"firstname": "Javier",
"folder": null,
"idusers": 3,
"lastname": "Urbano",
"modified": null,
"photo": "",
"role": "empleado",*/