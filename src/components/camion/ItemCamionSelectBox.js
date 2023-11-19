
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemCamionSelect from './ItemCamionSelect';


const ItemCamionSelectBox = ({ camiones, setIsLoading, idcampaign, idcammioncampaign, idcamion_origen}) => {
    const [result, setResult] = useState([]);

    const createItems = () => {
        let result_ = [];
        let i = 1;
        if (camiones != undefined) {
            camiones.map((camion, key) => {
                
  
            result_.push(<ItemCamionSelect key={key} camion={camion} setIsLoading={setIsLoading} idcampaign={idcampaign} 
            idcammioncampaign={idcammioncampaign} idcamion_origen={idcamion_origen}/>);
          });
          setResult(result_);
    
        }
     
    
      }




    useEffect(() => {

        createItems();
       

    }, [camiones]);

    return (
        <View>
            <View style={styles.item_box}>
                {result}

            </View>
        </View>
    )
}

export default ItemCamionSelectBox

const styles = StyleSheet.create({
 
    item_box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 1,
        columnGap: 4,
        paddingBottom: 20,
    
    },
  });