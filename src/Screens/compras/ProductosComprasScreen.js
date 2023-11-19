import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getEmpleadosComprasStock } from '../../databases/Entity/ComprasEntity'
import ItemProductosCompras from '../../components/ItemProductosCompras'
import ButtonIcon from '../../components/ButtonIcon'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";

const ProductosComprasScreen = ({route}) => {


    const isFocused = useIsFocused();
    const [result, setResult] = useState([]);
    const [estado, setEstado] = useState(false);
    const result_ = [];
    const [reload, setReload] = useState(false);
    const [reload2, setReload2] = useState(false);

    const { number_compra } = route.params;


    const [isLoading, setIsLoading] = useState(false);

    const getProductosStockFromDB = async () => {

        const productos = await getEmpleadosComprasStock(number_compra);

        //console.log('vuelve a traer');
      
        for (let i = 0; i < productos.rows.length; i++)
        {
             let produ = productos.rows.item(i);
            // console.log('dentro');

             //console.log(productos.rows.item(i).name);

             result_.push(<ItemProductosCompras key={i} number_compra={number_compra} prod_compra={produ} 
                setIsLoading={setIsLoading} reload={reload} setReload={setReload} reload2={reload2} setReload2={setReload2}/>);

        }
        setResult(result_);
        setEstado(true);
        setReload(!reload);
    
        setReload2(!reload2);

    }




    useEffect(() => {
        getProductosStockFromDB();
        //console.log('numero de compra ' + number_compra);

       
    }, [isFocused, reload2]);




  return (
    <View style={styles.container}>
         <Header title={'Productos Compras'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />
             <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'}/>

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