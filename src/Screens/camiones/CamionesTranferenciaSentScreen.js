import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import Header from '../../components/Header'

import Footer from '../../components/Footer'
import { getProductosDB } from '../../databases/Entity/ProductosEntity'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import ItemsProductoTransferBox from '../../components/camion/ItemsProductoTransferBox'
import { AppContext } from '../../Context/ContextApp'
import { getStockCamionCampaignFromDB } from '../../databases/Entity/StockCamionCampaignEntity'
import { getProductosStockFetch } from '../../services/fetching'


const CamionesTranferenciaSentScreen = ({ route }) => {
    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataProducto, setDataProducto] = useState();
    const [dataProductoDinamic, setDataProductoDinamic] = useState();
    const [busqueda, setBusqueda] = useState('');

    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    const { idcampaign, idcammioncampaign, camion_destino, camion_origen } = route.params;
    const [camion, setCamion] = useState(null);

    const getProductosAprobados = async () => {

        setIsLoading(true);
        const productos = await getProductosStockFetch(idcampaign, idcammioncampaign);
        
        //console.log('ESTE ES');
        //console.log(productos);
       
        setDataProducto(productos);
        setIsLoading(false);
        setDataProductoDinamic(productos);
        //console.log(productos);
   
        //return productos;
    }


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

            if(elemento.name.toString().toLowerCase().includes(textBusqueda.toLowerCase())){
                return elemento;
            }
            
        })
        setDataProducto(resultadoFiltro);
    }






   

    useEffect(() => {
 
        getProductosAprobados();
        console.log('patram');
        console.log(route.params);

    }, [isFocused, reload]);




    return (
        <View style={styles.container}>
        <Header title={'Productos'} leftIcon={require('../../images/home.png')}
            rightIcon={require('../../images/cart.png')}
        />

        <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'}/>
        <View style={styles.search_box}>
               
        <TextInput
                        style={styles.input}
                        onChangeText={onChangeBuscar}
                        value={busqueda}
                        placeholder="Buscar"
                    />


        </View>
        <View style={styles.box_main}>
        
            <SafeAreaView style={styles.box_content}>
                <ScrollView style={styles.scrollview}>
            
                  
                        {/*result*/}


                        <ItemsProductoTransferBox productos={dataProducto} setIsLoading={setIsLoading} idstockcamioncampaign={idcammioncampaign}
                            reload={reload} setReload={setReload} idcampaign={idcampaign} 
                            camion_destino={camion_destino} camion_origen={camion_origen}></ItemsProductoTransferBox>
                      

                </ScrollView>
            </SafeAreaView>
        </View>

       

        <Footer></Footer>

    </View>
    )
}

export default CamionesTranferenciaSentScreen

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
        flex: 0.81,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,

    },

    box_content: {
        flex: 1,
       
    },

    scrollview: {
        padding: 5,
      
    },
    search_box: {
        flex: 0.1,
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0,
    
       
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
});