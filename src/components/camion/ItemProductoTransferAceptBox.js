import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemProductoAcceptTranfer from './ItemProductoAcceptTranfer';

const ItemProductoTransferAceptBox = ({productos, setIsLoading, reload, setReload}) => {

    const [result, setResult] = useState([]);


    const createItems = () => {

        let result_ = [];
        let i = 1;
        if (productos != undefined) {

            productos.map((prod, key) => {

                result_.push(<ItemProductoAcceptTranfer key={key}  producto_tranfer={prod} setIsLoading={setIsLoading} reload ={reload} setReload={setReload}></ItemProductoAcceptTranfer>);

            });

            setResult(result_);

        }

    }


    useEffect(() => {
      
        
        createItems();
     

    }, [productos])

    return (
        <View>
            <View style={styles.item_box}>
                {result}

            </View>
        </View>
    )
}

export default ItemProductoTransferAceptBox


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