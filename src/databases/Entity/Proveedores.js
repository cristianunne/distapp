import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'

export async function insertProveedores(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO proveedores (idproveedores, name, cuit, direccion, provincia, localidad," +  
    " telefono, email, departamento)" + 
    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idproveedores, data.name, data.cuit, data.direccion, data.provincia, 
                data.localidad, data.telefono, data.email, data.departamento], 
                (_, result) => {
                    console.log('mmmmsdfsdfsdfsfsdfsdfsdmm');
                  
                    console.log('inserted data success proveedores');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    console.log(sqlerror);
                    console.log(err);
                    console.log('mmmmmm');
                   
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