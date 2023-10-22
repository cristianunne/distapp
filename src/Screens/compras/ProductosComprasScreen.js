import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getEmpleadosComprasStock } from '../../databases/Entity/ComprasEntity'
import ItemProductosCompras from '../../components/ItemProductosCompras'
import ButtonIcon from '../../components/ButtonIcon'

const ProductosComprasScreen = () => {



    const [result, setResult] = useState([]);
    const result_ = [];

    const getProductosStockFromDB = async () => {

        const productos = await getEmpleadosComprasStock();
      
        for (let i = 0; i < productos.rows.length; i++)
        {
             let produ = productos.rows.item(i);
             console.log('dentro');

             console.log(productos.rows.item(i).name);

             result_.push(<ItemProductosCompras key={i} prod_compra={produ}/>);
 
        }

        setResult(result_);

    }




    useEffect(() => {
        getProductosStockFromDB();
    },[]);




  return (
    <View style={styles.container}>
         <Header title={'Productos Compras'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <View style={styles.box_main}>
                <SafeAreaView>
                    <ScrollView>
                        {result}

                    </ScrollView>
                </SafeAreaView>
            </View>


            <Footer></Footer>
    </View>
  )
}

export default ProductosComprasScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed',
    },

    text_title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 12,
        color: '#187351'
    },

    box_main: {
        flex: 0.9,
        borderRadius: 10,
        padding: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 5,

    },

});