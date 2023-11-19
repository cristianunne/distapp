import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'


export async function insertCamionesToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO camiones (idcamiones, nombre, marca, matricula) " +
    " VALUES (?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idcamiones, data.nombre, 
                data.marca,  data.matricula], 
                (_, result) => {
                   
                  
                    console.log('inserted data Camiones');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    //console.log(sqlerror);
                    //console.log(err);
                    console.log('camiones erro');
                   
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

export async function getCamionesFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM camiones";

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
        console.log('Error en get canmiones');
        return false;
    });

    //console.log(result);
    return result;

}
