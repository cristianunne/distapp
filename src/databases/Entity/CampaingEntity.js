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