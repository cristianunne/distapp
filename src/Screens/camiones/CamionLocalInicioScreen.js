import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import { LoadingModal } from 'react-native-loading-modal'
import { useNavigation } from '@react-navigation/native'
import { AppContext } from '../../Context/ContextApp'
import { useIsFocused } from '@react-navigation/native';
import { getStockCamionCampaignFromDB } from '../../databases/Entity/StockCamionCampaignEntity'
import { getProductosTransferenciasByCamionFetch } from '../../services/fetching'

const CamionLocalInicioScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [idstock_camion_campaign, setIdstock_camion_campaign] = useState();
    const [idCamion, setIdCamion] = useState();
    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const isFocused = useIsFocused();

    //Aca debo traer los productos y pasarle al box

    //traigo los productos que fueron aprobado en stock
    const [camion, setCamion] = useState(null);

    const getCamionByCampaignAndUser = async () => {
        const user_obj = JSON.parse(user);
        //const campaignActive_obj = JSON.parse(campaignActive);
        if(campaignActive != null){
            const res = await getStockCamionCampaignFromDB(campaignActive.idcampaign, user_obj.idusers);

            if (res){
    
                setCamion(res);
                setIdstock_camion_campaign(res.rows.item(0).idstock_camion_campaign);
                setIdCamion(res.rows.item(0).camion_idcamion);
    
            }
           
         
        }
    }


    const goToTransferencia = () => {
        //tengo que pasarle las variables de idstockcamioncampiagn
        navigation.navigate('CamionesSelectTranferScreen', {
            idcampaign: campaignActive.idcampaign,
            idcammioncampaign: idstock_camion_campaign,
            idcamion : idCamion
        });
    }


    const acceptTransferencias = () => {

        navigation.navigate('CamionesTransferenciasAceptarScreen', {
            idcampaign: campaignActive.idcampaign,
            idcamion : idCamion
        });

    }

    const verTransferencias = async () => {

        const productos = await getProductosTransferenciasByCamionFetch(campaignActive.idcampaign, idCamion);
      

        if (productos.length > 0){
            navigation.navigate('CamionesTransferenciasVerScreen', {
                idcampaign: campaignActive.idcampaign,
                idcamion : idCamion
            });
        }

        

    }


    useEffect(() => {
        getCamionByCampaignAndUser();
    }, [isFocused]);


    return (
        <View style={styles.container}>

            <Header title={''} leftIcon={require('../../images/home.png')} />
            <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'} />

            <Text style={styles.text_title}>Operaciones del Camión</Text>
            <View style={styles.box_main}>

                <View style={styles.item_content}>
                    <TouchableOpacity style={styles.item} onPress={goToTransferencia}>
                        <Image source={require('../../images/transferencia.png')} style={styles.iconItemGreen} />
                        <Text style={styles.text_icon}>Transferir Productos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={acceptTransferencias}>
                        <Image source={require('../../images/descarga.png')} style={styles.iconItemGreen} />
                        <Text style={styles.text_icon}>Aceptar Transferencias</Text>
                    </TouchableOpacity>

                   
                </View>

                <View style={styles.item_content}>
            
                    <TouchableOpacity style={styles.item} onPress={verTransferencias}>
                        <Image source={require('../../images/ojo.png')} style={styles.iconItemGreen} />
                        <Text style={styles.text_icon}>Ver Transferencias</Text>
                    </TouchableOpacity>
                   
                </View>
            </View>
        </View>
    )
}

export default CamionLocalInicioScreen

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
        flex: 0.3,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 15,


    },
    item_content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'auto'
    },

    iconItem: {
        width: 40,
        height: 40,
    },
    iconItemGreen: {
        width: 40,
        height: 40,
        tintColor: 'green'
    },

    text_icon: {
        fontSize: 14,
        maxWidth: 100,
        alignSelf: 'center',
        textAlign: 'center',
    }
});