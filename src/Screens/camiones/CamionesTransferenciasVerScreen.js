import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import Header from '../../components/Header'

import Footer from '../../components/Footer'
import { getProductosDB } from '../../databases/Entity/ProductosEntity'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { AppContext } from '../../Context/ContextApp'
import { getProductosTransferenciasCamionFetch } from '../../services/fetching'
import ItemProductoAcceptTranfer from '../../components/camion/ItemProductoAcceptTranfer'
import ItemProductoTransferAceptBox from '../../components/camion/ItemProductoTransferAceptBox'
import { getProductosTransferenciasByCamionFetch } from '../../services/fetching';

const CamionesTransferenciasVerScreen = ({route, navigation}) => {

    const { idcamion, idcampaign } = route.params;

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataProducto, setDataProducto] = useState();
    const [dataProductoDinamic, setDataProductoDinamic] = useState();
    const [busqueda, setBusqueda] = useState('');

    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);


    //aca deberia hacer la traida de datos
    const getProductosTransfer = async () => {
        
       
        setIsLoading(true);
      
        const resul = await getProductosTransferenciasByCamionFetch(idcampaign, idcamion);

        setDataProducto(resul);
        setDataProductoDinamic(resul);
        setIsLoading(false);
    }




    useEffect(() => {
    
        getProductosTransfer();

       
    }, [isFocused, reload])
  return (
    <View style={styles.container}>
    <Header title={'Productos de Transferencia'} leftIcon={require('../../images/home.png')}
        rightIcon={require('../../images/cart.png')}
    />

    <LoadingModal modalVisible={isLoading} color={'#00ff00'} title={'Cargando....'} />
    <View style={styles.search_box}>

        <TextInput
            style={styles.input}
            onChangeText={null}
            value={busqueda}
            placeholder="Buscar"
        />


    </View>
    <View style={styles.box_main}>

        <SafeAreaView style={styles.box_content}>
            <ScrollView style={styles.scrollview}>


                <ItemProductoTransferAceptBox productos={dataProducto} setIsLoading={setIsLoading} reload ={reload} setReload={setReload}
                hasButtons={false} has_delete={true}></ItemProductoTransferAceptBox>

            </ScrollView>
        </SafeAreaView>
    </View>



    <Footer></Footer>
</View>
  )
}

export default CamionesTransferenciasVerScreen

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