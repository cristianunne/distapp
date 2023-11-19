import { database_name } from "../databaseServices";
import * as SQLITE from 'expo-sqlite'


export async function insertStockCamionCampignToDB(data){
    
    const db = SQLITE.openDatabase(database_name);

    const query = "INSERT INTO stock_camion_campaign (idstock_camion_campaign, campaign_idcampaign, camion_idcamion, users_idusers) " +
    " VALUES (?, ?, ?, ?);";
    

    let promise = new Promise((resolve, reject) => {
       
        db.transaction(tx => {
            tx.executeSql(query, [data.idstock_camion_campaign, data.campaign_idcampaign, 
                data.camion_idcamion,  data.users_idusers], 
                (_, result) => {
                   
                  
                    console.log('inserted data camioncampaign');
                    // Resovle when the data is successful
            
                    resolve(result);
                }, (err, sqlerror) => {
                   
                    //console.log(sqlerror);
                    //console.log(err);
                    console.log('camioncampaign erro');
                   
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

export async function getStockCamionCampaignFromDB(campaign_idcampaign, users_idusers)
{
    const db = SQLITE.openDatabase(database_name);

    const query = "SELECT * FROM stock_camion_campaign INNER JOIN camiones as cam ON camion_idcamion = cam.idcamiones WHERE campaign_idcampaign = ? and users_idusers = ?";

    let promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(query, [campaign_idcampaign, users_idusers], 
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
        console.log('Error en stock_camion_campaign');
        return false;
    });

    //console.log(result);
    return result;

}