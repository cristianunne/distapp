import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertProductos(data) {

    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO productos (idproductos, name, marca, unidad, content, description, " +
        "subcategories_idsubcategories, active, categories_idcategories, proveedores_idproveedores, image, " +
        "precio, descuento)" +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    let precio = null;
    let descuento = null;

    if (data.precios != undefined) {
        if (data.precios.length > 0) {
            precio = data.precios[0].precio;
        }
    }

    if (data.descuentos != undefined) {
        if (data.descuentos.length > 0) {
            descuento = data.descuentos[0].precio;

        }
    }

    //console.log('DATA demas');
    //console.log(data);
    //let precio = typeof data.precios[0].precio === 'undefined' ? data.precios[0].precio : null;
    //console.log('precioo: ' + data.precios[0].precio);


    let promise = new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql(query, [data.idproductos, data.name, data.marca, data.unidad, data.content,
            data.description, data.subcategories_idsubcategories, data.active, data.categories_idcategories,
            data.proveedores_idproveedores,
            data.image, precio, descuento],
                (_, result) => {
                    //console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');

                    //console.log('inserted data productos');
                    // Resovle when the data is successful

                    resolve(result);
                }, (err, sqlerror) => {

                    console.log(sqlerror);
                    //console.log(err);
                    console.log('error productos');

                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then((result) => {
        //setResult(true);
        //console.log(result);
        return true;
    },
        (error) => {
            //setResult(false);
            //console.log(error);
            return false;

        });
    //db.closeAsync();

    return result;


}

export async function updateProductos(data) {

    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE productos SET name = ?, marca = ?, unidad = ?, content = ?, description =?, " +
        "subcategories_idsubcategories = ?, active = ?, categories_idcategories = ?, proveedores_idproveedores = ?, image = ?, " +
        "precio = ?, descuento = ? WHERE idproductos = ?;"
    let precio = null;
    let descuento = null;

    if (data.precios != undefined) {
        if (data.precios.length > 0) {
            precio = data.precios[0].precio;
        }
    }

  

    if (data.descuentos != undefined) {
        if (data.descuentos.length > 0) {
            descuento = data.descuentos[0].precio;

        }
    }

    //let precio = typeof data.precios[0].precio === 'undefined' ? data.precios[0].precio : null;

    //console.log('precioo: ' + data.precios[0].precio);


    let promise = new Promise((resolve, reject) => {

        db.transaction(tx => {
            tx.executeSql(query, [data.name, data.marca, data.unidad, data.content,
            data.description, data.subcategories_idsubcategories, data.active, data.categories_idcategories,
            data.proveedores_idproveedores,
            data.image, precio, descuento, data.idproductos],
                (_, result) => {
                    //console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');

                    console.log('inserted data productos');
                    // Resovle when the data is successful

                    resolve(result);
                }, (err, sqlerror) => {

                    console.log(sqlerror);
                    //console.log(err);
                    console.log('error productos');

                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then((result) => {
        //setResult(true);
        //console.log(result);
        return true;
    },
        (error) => {
            //setResult(false);
            //console.log(error);
            return false;

        });
    //db.closeAsync();

    return result;


}

export async function getProductosDB() {
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT *, prod.name as name, cat.name as cat_name  FROM productos as prod " +
        " INNER JOIN categories as cat on categories_idcategories = idcategories " +
        "INNER JOIN stock_campaign_producto as st_ca_camp on st_ca_camp.productos_idproductos = prod.idproductos;";

    
    /*const query = "SELECT *, prod.name as name, cat.name as cat_name  FROM productos as prod " +
        " INNER JOIN categories as cat on categories_idcategories = idcategories;";*/

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [],
                (_, result) => {


                    resolve(result);
                }, (err) => {

                    reject(err);

                })
        });
    });

    let result = await promise.then((result) => {
        //setResult(true);
        //console.log(result);
        return result;
    },
        (error) => {
            //setResult(false);
            //console.log('Error en User ENtity CANTIDAD');
            return false;
        });

    //console.log(result);
    return result;

}

export async function getProductoById(id_producto) {
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM productos where idproductos = ?;";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [id_producto],
                (_, result) => {


                    resolve(result);
                }, (err) => {

                    reject(err);

                })
        });
    });

    let result = await promise.then((result) => {
        //setResult(true);
        //console.log(result);
        return result;
    },
        (error) => {
            //setResult(false);
            //console.log('Error en User ENtity CANTIDAD');
            return false;
        });

    //console.log(result);
    return result;

}