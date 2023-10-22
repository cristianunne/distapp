import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertProductos(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO productos (idproductos, name, marca, unidad, content, description, " +  
    "subcategories_idsubcategories, active, categories_idcategories, proveedores_idproveedores, image)" + 
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idproductos, data.name, data.marca, data.unidad, data.content,
                data.description, data.subcategories_idsubcategories, data.active, data.categories_idcategories, 
                data.proveedores_idproveedores, 
                data.image], 
                (_, result) => {
                    //console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    console.log('inserted data productos');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('error productos');
                   
                    //reject();
                    reject(err);
                    //reject();
                })
        });
    });

    let result = await promise.then( (result) => { 
        //setResult(true);
        console.log(result);
        return true;
    },
    (error) => { 
        //setResult(false);
        console.log(error);
        return false;
       
    });
    //db.closeAsync();

    return result;
   
   
}