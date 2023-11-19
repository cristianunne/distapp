
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemProductoTranfer from './ItemProductoTranfer';

const ItemsProductoTransferBox = ({ productos, setIsLoading, idcampaign, idstockcamioncampaign, camion_origen, camion_destino, reload, setReload }) => {

  const [result, setResult] = useState([]);

  const createItems = () => {
    let result_ = [];
    let i = 1;
    if (productos != undefined) {
      productos.map((prod, key) => {
        //console.log('valorrrrrr: ' + key);
        result_.push(<ItemProductoTranfer key={key} producto={prod} setIsLoading={setIsLoading} idcampaign={idcampaign} 
          idcampaing_stock_camion={idstockcamioncampaign} camion_origen={camion_origen} camion_destino={camion_destino} 
          reload={reload} setReload={setReload}/>);
      });
      setResult(result_);

    }

  }

  useEffect(() => {
    createItems(productos);
   


  }, [productos])

  return (
    <View>
      <View style={styles.item_box}>
        {result}

      </View>
    </View>
  )
}

export default ItemsProductoTransferBox

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