import React, { useEffect } from 'react'
import { View, Image } from 'react-native';
import SplashStyles from './Splash.Styled';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../Context/ContextApp';
import { getUser, getUserCount } from '../databases/Entity/UsersEntity';


 
const Splash = (component) => {

    const navigation = useNavigation();
    const [isLogin, setIsLogin, user, setUser] = React.useContext(AppContext);
    const [isDb, setIsDb] = React.useContext(AppContext);

    const getUserFromDb = async () => {

        const user_count = await getUserCount();
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


                    navigation.push('Home');
            }
        }
    }

    const setDataToContext = (user_data) => {
        //usare para 
        //console.log(user_data.rows.item(0));

        let data_ = JSON.stringify(user_data.rows.item(0));
        setUser(data_);
        //console.log(user);
        
        //setUser(...user, JSON.stringify(user_data.rows.item(0)));
       
    }
    
    
    useEffect(() => {
     

        getUserFromDb();

        //console.log("esta logueado en splah " + isLogin);
 
       
    }, []);


    return (
        <View style={SplashStyles.container}>
            <Image source={require('../images/logo.png')} style={SplashStyles.logo}>
            </Image>

            <Image source={require('../images/loading.gif')} style={SplashStyles.loading}>
            </Image>
        </View>
    );

}
export default Splash;