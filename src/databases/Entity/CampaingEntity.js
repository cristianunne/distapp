import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'


export async function getCampaignCount()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT COUNT(*) AS cantidad FROM campaign";

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
        console.log('Error en User CAMPAIGN CANTIDAD');
        return false;
    });

    //console.log(result);
    return result;

}

export async function getCampaignFromDB()
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM campaign";

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
        console.log('Error en get campaign');
        return false;
    });

    //console.log(result);
    return result;

}


export async function insertCampaignToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO campaign (idcampaign, number, fecha_inicio, fecha_fin, status) " +
    " VALUES (?, ?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idcampaign, data.number, 
                data.fecha_inicio,  data.fecha_fin, data.status], 
                (_, result) => {
                   
                  
                    console.log('inserted data Campaign');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    //console.log(sqlerror);
                    //console.log(err);
                    console.log('campasdkaspdk');
                   
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