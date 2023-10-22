import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import CardsDefault from '../../components/CardDefault'
import ItemCompras from '../../components/ItemCompras'
import { getComprasStock } from '../../databases/Entity/ComprasEntity'

const ComprasScreenInicio = () => {

    const [comprasStock, setComprasStock] = useState();
    const [result, setResult] = useState([]);

    const result_ = [];

    //TRAIGO LAS COMPRAS DE LA DB.
    const getComprasInformation = async () => {

        const compras_stock = await getComprasStock();
        setComprasStock(compras_stock);

       

       for (let i = 0; i < compras_stock.rows.length; i++)
       {
            let compra = compras_stock.rows.item(i);
            //console.log(compras_stock.rows.item(i));
            result_.push(<ItemCompras key={i} number_compra={compra.idcompras_stock} 
                fechaIni={compra.created} status={compra.status}/>);

       }

       setResult(result_);
      

    }

    useEffect(() => {

        getComprasInformation();

    }, []);






    return (

        <View style={styles.container}>
            <Header title={'Compras'} leftIcon={require('../../images/home.png')}
                rightIcon={require('../../images/cart.png')}
            />

            <CardsDefault title={'Compras Pendientes'}>
              {result}
            </CardsDefault>


            <Footer />
        </View>
    )
}

export default ComprasScreenInicio


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
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },

    item_content_final: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
    },
    item: {


        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 40,
        height: 40,
    },

    text_icon: {
        fontSize: 14
    }
});