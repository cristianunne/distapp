import React, { useEffect, useState } from 'react'
import { getPedidosFromDB } from '../../databases/Entity/PedidosEntity';
import { View, StyleSheet, Text } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useIsFocused } from '@react-navigation/native';
import CardsDefault from '../../components/CardDefault'
import ItemPedidos from '../../components/pedidos/ItemPedidos';
import { LoadingModal } from 'react-native-loading-modal'

const PedidosInicioScreen = () => {

    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState([]);

    const isFocused = useIsFocused();

    const result_ = [];

    const getPedidos = async () => {

        const pedidos = await getPedidosFromDB();
        //console.log(pedidos);

        for (let i = 0; i < pedidos.rows.length; i++)
        {
             let pedido = pedidos.rows.item(i);
             //console.log(compras_stock.rows.item(i));

             result_.push(<ItemPedidos key={i} number={pedido.number} id_pedido={pedido.idpedidos}
                 fecha={pedido.created} status={pedido.status_val} cliente={pedido.nombre + ' ' + pedido.apellido + ' (' + pedido.shop_name + ')'} 
                 localidad={pedido.localidad} setIsLoading={setIsLoading} setReload={setReload} reload={reload} idcliente={pedido.clientes_idclientes}/>);
 
        }
 
        setResult(result_);



    }


    useEffect(() => {

        getPedidos();

    }, [isFocused, reload]);


    return (
        <View style={styles.container}>
        <Header title={'Compras'} leftIcon={require('../../images/home.png')}
            rightIcon={require('../../images/cart.png')}
        />

        <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />

        <CardsDefault title={'Pedidos'}>
          {result}
        </CardsDefault>


        <Footer />
    </View>
    )
}

export default PedidosInicioScreen

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

