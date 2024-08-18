import React, { useEffect, useState } from 'react'
import { getPedidosFromDB } from '../../databases/Entity/PedidosEntity';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useIsFocused } from '@react-navigation/native';
import CardsDefault from '../../components/CardDefault'
import ItemPedidos from '../../components/pedidos/ItemPedidos';
import { LoadingModal } from 'react-native-loading-modal'
import PedidosBox from './PedidosBox';

const PedidosInicioScreen = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState();

    const isFocused = useIsFocused();

    const [dataProducto, setDataProducto] = useState([]);
    const [dataProductoDinamic, setDataProductoDinamic] = useState([]);
    const [busqueda, setBusqueda] = useState('');




    const onChangeBuscar = (value) => {

        if(value != undefined){
        
            setBusqueda(value);
            filter(value);
        } else {
            setDataProducto(dataProductoDinamic);
        }
       

    }

    const filter = (textBusqueda) => {

        let resultadoFiltro = dataProductoDinamic.filter((elemento) => {

            if(elemento.nombre.toString().toLowerCase().includes(textBusqueda.toLowerCase()) || 
            elemento.shop_name.toString().toLowerCase().includes(textBusqueda.toLowerCase())){
                return elemento;
            }
            
        })
        setDataProducto(resultadoFiltro);
        //shop_name
    }

    const getPedidos = async () => {

        const pedidos = await getPedidosFromDB();
        let pedidos_items = [];

        for (let i = 0; i < pedidos.rows.length; i++)
        {
            pedidos_items.push(pedidos.rows.item(i));
            
        }

        setDataProducto(pedidos_items);
      
        setDataProductoDinamic(pedidos_items);

        //console.log('fadsfasdgasg');
        //console.log(pedidos_items);
        //console.log(dataProducto);

    
        //setResult(result_);

    }




    useEffect(() => {
     
        getPedidos();
        //createItems();
        

    }, [isFocused, reload]);


    return (
        <View style={styles.container}>
        <Header title={'Compras'} leftIcon={require('../../images/home.png')}
            rightIcon={require('../../images/cart.png')}
        />

        <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

        <View style={styles.search_box}>

            <TextInput
                style={styles.input}
                onChangeText={onChangeBuscar}
                value={busqueda}
                placeholder="Buscar"
            />

        </View>

        <PedidosBox pedidos={dataProducto} setIsLoading={setIsLoading} setReload={setReload} reload={reload} 
        style={styles.box_pedidos}>

        </PedidosBox>



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

    box_pedidos: {
        flex: 0.5
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
    },
    input: {
        flex: 1,
        height: 35,
        borderWidth: 0.4,
        padding: 5,
        alignSelf: 'center',
        borderColor: '#888888',
        backgroundColor: '#ffffff'
    },
    search_box: {
        flex: 0.1,
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0,


    },
});

