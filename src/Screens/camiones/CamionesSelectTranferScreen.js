import React, { useEffect, useState } from 'react'
import { View, StyleShee, TouchableOpacity, StyleSheet, Text, Image, Alert, SafeAreaView, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import Header from '../../components/Header'
import { AppContext } from '../../Context/ContextApp';
import Footer from '../../components/Footer';
import { getCamionesWithoutCurrentFetch } from '../../services/fetching';
import ItemCamionSelectBox from '../../components/camion/ItemCamionSelectBox';


const CamionesSelectTranferScreen = ({route}) => {

    const [isLogin, setIsLogin, user, setUser, campaignActive, setCampaignActive] = React.useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [dataProducto, setDataProducto] = useState();
    const [dataProductoDinamic, setDataProductoDinamic] = useState();
    const [busqueda, setBusqueda] = useState('');


    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    const { idcampaign, idcammioncampaign, idcamion } = route.params;
    const [camion, setCamion] = useState(null);



    const getCamionesFromAPI = async () => {

        setIsLoading(true);
   
        let res = await getCamionesWithoutCurrentFetch(idcamion);
        setCamion(res);
        setIsLoading(false);
    }


    useEffect(() => {

       
        getCamionesFromAPI();

    }, [isFocused])

    return (
        <View style={styles.container}>
        <Header title={'Selección del Camión'} leftIcon={require('../../images/home.png')}
            rightIcon={require('../../images/cart.png')}
        />

        <LoadingModal modalVisible={isLoading} color={'#00ff00'} task={'Cargando....'}/>
      
        <View style={styles.box_main}>
        
            <SafeAreaView style={styles.box_content}>
                <ScrollView style={styles.scrollview}>
            
                  
                        {/*result*/}

                    
                        <ItemCamionSelectBox camiones={camion} setIsLoading={setIsLoading} idcampaign={idcampaign} 
                        idcammioncampaign={idcammioncampaign} idcamion_origen={idcamion}></ItemCamionSelectBox>

                       
                      

                </ScrollView>
            </SafeAreaView>
        </View>

       

        <Footer></Footer>

    </View>
    )
}

export default CamionesSelectTranferScreen

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