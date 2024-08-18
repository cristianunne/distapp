import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertProductIntoCartSession(idproductos, cantidad, precio, descuento){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO cart_session (productos_idproductos, cantidad,  precio, descuento)" + 
    " VALUES (?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [idproductos, cantidad, precio, descuento], 
                (_, result) => {
                  
                  
                    console.log('insertado en CartSesion');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    //console.log(err);
                    //console.log('mmmmmm');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
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

export async function getCartSessionCount()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT COUNT(*) AS cantidad FROM cart_session";

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

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        console.log('Error en la cntida de cartsession');
        return false;
    });

    //console.log(result);
    return result;

}

export async function getCartSessionProductoById(idproducto)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT sum(cantidad) as suma FROM cart_session WHERE productos_idproductos = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [idproducto], 
                (_, result) => {
                
            
                    resolve(result);
                }, (err) => {
                   
                    reject(err);
   
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        
        return result;
    },
    (error) => { 
        //setResult(false);
        console.log('Error en la cntida de cartsession');
        return false;
    });

    //console.log(result);
    return result;

}

export async function getCartSessionProductos()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT *, cart_s.precio as cart_s_precio, cart_s.descuento as cart_s_descuento, " +  
    "cart_s.cantidad as cart_s_cantidad FROM cart_session as cart_s INNER JOIN productos as pro ON cart_s.productos_idproductos =  pro.idproductos " +  
    "INNER JOIN stock_campaign_producto as stcc ON cart_s.productos_idproductos = stcc.productos_idproductos";

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

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        console.log('Error en la cntida de cartsession');
        return false;
    });

    //console.log(result);
    return result;

}

export async function updateProductIntoCartSession(id_cart_session, cantidad, precio, descuento){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "UPDATE cart_session SET cantidad = ?,  precio = ? , descuento = ? " + 
    " WHERE id_cart_session = ?;";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [cantidad, precio, descuento, id_cart_session], 
                (_, result) => {
                  
                  
                    console.log('update en CartSesion');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    //console.log(err);
                    //console.log('mmmmmm');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
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


export async function deleteProductoFromCartSessionDB(id_cart_session){

    const db = SQLITE.openDatabase(database_name);

    const query = "DELETE FROM cart_session WHERE id_cart_session = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [id_cart_session], 
                (_, result) => {
                
            
                    resolve(result);
                }, (err) => {
                   
                    reject(err);
   
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        //console.log(result);
        return result;
    },
    (error) => { 
        //setResult(false);
        console.log('Error en delete de cartsession');
        return false;
    });

    //console.log(result);
    return result;


}


