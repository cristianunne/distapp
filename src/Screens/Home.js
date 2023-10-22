import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Inicio } from './Inicio';
import { Settings } from './Settings';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppContext } from '../Context/ContextApp';
import { red } from '@mui/material/colors';
import CardCampaign from '../components/CardCampaign';
import { getCampaignUser } from '../services/fetching';
import { getUser, getUserCount } from '../databases/Entity/UsersEntity';
import { getCampaignCount } from '../databases/Entity/CampaingEntity';


//const Tab = createBottomTabNavigator();

function Home() {

    const [result, setResult] = useState(false);

    const [selectedTab, setSelectedTab] = useState(0)

    const [isLogin, setIsLogin, user, setUser] = React.useContext(AppContext);

    const [name, setName] = useState();

    const [campaign, setCampaign] = useState({});
    const [isData, setIsData] = useState();

    const [cantCampaign, setCantCampaign] = useState(0)


    //Consultamos las campaigns donde esta activo

    const getCampaign = async (iduser) => {
        //console.log("mensaje");
        const campaign_ = await getCampaignUser(iduser);
        if(campaign_ != undefined){
            if (campaign_ != false){
                setCampaign(campaign_);
                setIsData(true)
            }
        }
     
        console.log("mensdfsdfrsaje");


    }


    const getUserFromDb = async () => {

        const user_count = await getUserCount()
        //console.log(user_count);

        if(!user_count){
                //mando al login
                navigation.navigate('Login');
        } else {

            if (user_count.rows.item(0).cantidad == 0){

                //mando al login
                navigation.navigate('Login');
    
            } else {
                    //traigo el usuario y agrego al context sus datos
                    //console.log(user_count.rows.item(0).cantidad)
                    const user_data = await getUser();
                    setDataToContext(user_data)
                  
            }
        }
    }


    const getCampaign_Count = async () => {

        const campaign_count = await getCampaignCount();

        if (campaign_count){
            const cant = campaign_count.rows.item(0).cantidad;

            //setCantCampaign(cant);
            console.log(cantCampaign);
        }

    
    }



    useEffect(() => {

        //const obj = '{"user_id":1,"idusers":3,"firstname":"Javier","lastname":"Urbano","email":"cris@hotmail.com","photo":"","role":"empleado"}';
       // console.log("user:");
        //console.log(user);

        //getUserFromDb();

        if(user != null){
            const myobj = JSON.parse(user);

            //console.log(myobj);
            setName(myobj.firstname + " " + myobj.lastname);

            getCampaign_Count();
        }
           
        //alert(myobj);
        //setUser_(...user_, myobj);
        //console.log(myobj.idusers);
        //console.log("mensdfsdfrsaje");
        //traigo la camapana si hay
        //const campaign_ = getCampaign(myobj.idusers);

        //console.log(campaign);
        //console.log(user_);
    });


    return (

        <View style={styles.container}>
            <Header leftIcon={require('../images/menu.png')}
                rightIcon={require('../images/cart.png')} 
                />
          
               <View style={[styles.box_welcome, styles.elevation]}>
                <View style={styles.box_hand}>
                    <Image source={require('../images/hola.png')} style={styles.bottomTabIcon} />
                </View>
                <View style={styles.box_saludo}> 
                    <Text style={styles.title}>Bienvenido</Text>
                    <Text style={styles.textuser}> {name}</Text>
                </View>
               </View>

               <CardCampaign cantCampaign={cantCampaign}></CardCampaign>
          
            <Footer />
            

    
        </View>


    )
}
//   <CardCampaign campaign={campaign}></CardCampaign>
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ededed'
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderTopColor: '#fefefe'
    },
   
    viewMain: {
        marginBottom:140,
        marginTop: 5,
        padding: 10,
    },

    box_welcome: {
        height: '20%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
        
    },

    box_hand: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    box_saludo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomTabIcon: {
        width: 70,
        height: 70
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#164620',
        marginBottom: 7,
        alignSelf: 'center'
    },
    textuser: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: '400',
        alignSelf: 'center'

    },
    elevation: {
        elevation: 7,
        shadowColor: '#164620',
      }

})



/*<Tab.Navigator>
<Tab.Screen name="Feed" options={{ headerShown: false }} component={Inicio} />
<Tab.Screen name="Messages" options={{ headerShown: false }} component={Settings} />
<Tab.Screen name="COnfig" options={{ headerShown: false }} component={Settings} />
</Tab.Navigator>*/
