import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemProducto from './ItemProducto';

const ItemsProductosBox = ({ productos, setIsLoading }) => {

    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);


    const createItems = (productos) => {
        //console.log(productos);

    
        let result_ = [];
        let i = 1;
        if (productos != undefined) {
            productos.map((prod, key) => {
                console.log('valorrrrrr: ' + key);
                result_.push(<ItemProducto key={prod.productos_id} producto={prod} setIsLoading={setIsLoading} />);
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

export default ItemsProductosBox

const styles = StyleSheet.create({
 
    item_box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 1,
        columnGap: 4,
        paddingBottom: 20,
    
    },
});