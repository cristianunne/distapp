import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemProductoStock from './ItemProductoStock';

const ItemsProductosStockBox = ({ productos, setIsLoading, idstockcamioncampaign, reload, setReload, funcion }) => {
  const [result, setResult] = useState([]);




  const createItems = (productos) => {
    let result_ = [];
    let i = 1;
    if (productos != undefined) {
        productos.map((prod, key) => {
          
            result_.push(<ItemProductoStock key={prod.idproductos} producto={prod} setIsLoading={setIsLoading} idstockcamioncampaign={idstockcamioncampaign} 
            reload={reload} setReload={setReload} funcion={funcion}/>);
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

export default ItemsProductosStockBox
const styles = StyleSheet.create({

  item_box: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 1,
    columnGap: 4,
    paddingBottom: 20,
    justifyContent: 'space-between'

  },
});