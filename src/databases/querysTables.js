export const users_table = "CREATE TABLE IF NOT EXISTS users " +
  "(user_id INTEGER PRIMARY KEY AUTOINCREMENT, idusers INTEGER NOT NULL UNIQUE, firstname VARCHAR(100), lastname VARCHAR(100), " +
  "email VARCHAR(200), photo TEXT, role VARCHAR(10));";


export const campaign_table = "CREATE TABLE IF NOT EXISTS campaign " +
  "(campaign_id INTEGER PRIMARY KEY AUTOINCREMENT, idcampaign INTEGER UNIQUE, number INTEGER, " +
  "fecha_inicio TEXT, fecha_fin TEXT, status INTEGER);"


export const stock_camion_campaign_table = "CREATE TABLE IF NOT EXISTS stock_camion_campaign " +
  "(stock_camion_campaign_id INTEGER PRIMARY KEY AUTOINCREMENT, idstock_camion_campaign INTEGER UNIQUE, campaign_idcampaign INTEGER, camion_idcamion INTEGER, " +
  "users_idusers INTEGER, " +
  "FOREIGN KEY(campaign_idcampaign) REFERENCES campaign(idcampaign), " + 
  "FOREIGN KEY(camion_idcamion) REFERENCES camiones(idcamiones), " + 
  "FOREIGN KEY(users_idusers) REFERENCES users(idusers));";

  export const stock_camion_campaign_producto_table = "CREATE TABLE IF NOT EXISTS stock_campaign_producto " +
  "(idstock_campaign_producto_id INTEGER PRIMARY KEY AUTOINCREMENT, idstock_campaign_producto INTEGER UNIQUE, productos_idproductos INTEGER, cantidad REAL, " +
  "created TEXT, modified TEXT, cantidad_initial REAL, status INTEGER, stock_camion_campaign_idstock_camion_campaign	INTEGER, cant_transfer REAL, " +
  "FOREIGN KEY(stock_camion_campaign_idstock_camion_campaign) REFERENCES stock_camion_campaign(idstock_camion_campaign), " + 
  "FOREIGN KEY(productos_idproductos) REFERENCES productos(idproductos));";


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
  "precio REAL, descuento REAL, " + 
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
"productos_idproductos INTEGER, comprasstock_idcomprasstock INTEGER, cantidad REAL, " + 
"comprobante VARCHAR(150), status INTEGER DEFAULT 0, observaciones VARCHAR(250), cantidad_comprada REAL DEFAULT 0, " + 
"FOREIGN KEY(productos_idproductos) REFERENCES productos(idproductos) ON DELETE CASCADE, " + 
"FOREIGN KEY(comprasstock_idcomprasstock) REFERENCES compras_stock(idcompras_stock) ON DELETE CASCADE);";


export const cart_session_table = "CREATE TABLE IF NOT EXISTS cart_session " +
"(id_cart_session INTEGER PRIMARY KEY AUTOINCREMENT, productos_idproductos INTEGER, cantidad REAL, " +
"precio REAL, descuento REAL, " +
"FOREIGN KEY(productos_idproductos) REFERENCES productos(idproductos) ON DELETE CASCADE);";


export const ventas_table = "CREATE TABLE IF NOT EXISTS ventas " +
"(ventas_id INTEGER PRIMARY KEY AUTOINCREMENT, ventas_idventas INTEGER UNIQUE, created TEXT, users_idusers INTEGER NOT NULL, " +
"clientes_idclientes INTEGER NOT NULL, subtotal REAL NOT NULL, descuentos REAL, total REAL NOT NULL, descuento_general REAL, " + 
"pedidos_idpedidos INTEGER, coordenadas TEXT, campaign_idcampaign INTEGER NOT NULL, cuenta_corriente INTEGER NOT NULL, " +
"is_pay INTEGER NOT NULL, camion_idcamion INTEGER NOT NULL, status INTEGER, fecha_venta TEXT, " + 
"FOREIGN KEY(users_idusers) REFERENCES users(idusers) ON DELETE CASCADE, " + 
"FOREIGN KEY(clientes_idclientes) REFERENCES clientes(idclientes) ON DELETE SET NULL, " + 
"FOREIGN KEY(campaign_idcampaign) REFERENCES campaign(idcampaign) ON DELETE CASCADE, " + 
"FOREIGN KEY(camion_idcamion) REFERENCES camiones(idcamiones) ON DELETE SET NULL); "; 

export const productos_ventas_table = "CREATE TABLE IF NOT EXISTS productos_ventas " + 
"(productos_ventas_id INTEGER PRIMARY KEY AUTOINCREMENT, ventas_idventas INTEGER NOT NULL, productos_idproductos INTEGER NOT NULL, " +
"cantidad REAL, precio_unidad REAL, descuento_unidad REAL, created TEXT, idstock_campaign_producto INTEGER, " +
"FOREIGN KEY(ventas_idventas) REFERENCES ventas(ventas_id) ON DELETE CASCADE);"; 

export const pedidos_table = "CREATE TABLE IF NOT EXISTS pedidos " +
"(pedidos_id INTEGER PRIMARY KEY AUTOINCREMENT, idpedidos INTEGER UNIQUE, number INTEGER, created TEXT, users_idusers INTEGER NOT NULL, " +
"clientes_idclientes INTEGER NOT NULL, " + 
"observaciones TEXT, status_val INTEGER, " + 
"FOREIGN KEY(users_idusers) REFERENCES users(idusers) ON DELETE CASCADE, " + 
"FOREIGN KEY(clientes_idclientes) REFERENCES clientes(idclientes) ON DELETE SET NULL);";

export const productos_pedidos_table = "CREATE TABLE IF NOT EXISTS productos_pedidos " + 
"(pedidos_idproductos INTEGER PRIMARY KEY AUTOINCREMENT, idproductos_pedidos INTEGER NOT NULL, productos_idproductos INTEGER NOT NULL, " +
"cantidad REAL, created TEXT, pedidos_idpedidos INTEGER, " +
"FOREIGN KEY(idproductos_pedidos) REFERENCES pedidos(idproductos_pedidos) ON DELETE CASCADE, " +
"FOREIGN KEY(pedidos_idpedidos) REFERENCES pedidos(idpedidos) ON DELETE CASCADE);"; 


export const delete_campaign_table = "DELETE FROM campaign";
export const delete_camiones_table = "DELETE FROM camiones";
export const delete_categories_table = "DELETE FROM categories";
export const delete_subcategories_table = "DELETE FROM subcategories";
export const delete_clientes_table = "DELETE FROM clientes";
export const delete_productos_table = "DELETE FROM productos";
export const delete_proveedores_table = "DELETE FROM proveedores";
export const delete_compras_table = "DELETE FROM compras_stock";
export const delete_productos_comprasstock_table= "DELETE FROM empleado_comprasstock";
export const delete_stock_camion_campaign = "DELETE FROM stock_camion_campaign";
export const delete_stock_campaign_producto = "DELETE FROM stock_campaign_producto";

export const delete_cart_session_table = "DELETE FROM cart_session";
export const delete_ventas_table = "DELETE FROM ventas";
export const delete_productos_ventas_table = "DELETE FROM productos_ventas";

export const delete_pedidos_table = "DELETE FROM pedidos";
export const delete_productos_pedidos_table = "DELETE FROM productos_pedidos";

export const delete_users_table = "DELETE FROM users";





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