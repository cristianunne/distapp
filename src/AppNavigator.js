
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from "./Screens/Splash";
import Login from "./components/Login";
import Home from "./Screens/Home";
import { useNavigation } from '@react-navigation/native';
import { AppContext, IsDbContext } from "./Context/ContextApp";
import { DrawerHome } from "./Screens/DrawerHome";
import ConfInicioScreen from "./Screens/Configuracion/ConfInicioScreen";
import ComprasScreenInicio from "./Screens/compras/ComprasScreenInicio";
import ProductosComprasScreen from "./Screens/compras/ProductosComprasScreen";
import ProductoDetailsScreen from "./Screens/compras/ProductoDetailsScreen";



const Stack = createNativeStackNavigator();

const AppNavigator = ({ dbExist }) => {

  //console.log('para iniciar la db ' + dbExist);

  const [isLogin, setIsLogin, user, setUser] = useContext(AppContext);
  const [isDb, setIsDb] = useContext(IsDbContext);

  useEffect(() => {
    //si existe la db, consulto por el usuario, sino mando a login
    setIsDb(dbExist);
    //console.log("existe la db: " + dbExist);
    //console.log("user " + user);
    //console.log("esta seisdb en app navgator" + isDb);
    //console.log("esta logueado en app navgator " + isLogin);

  }, [dbExist])


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="InicioConfig" component={ConfInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="InicioCompras" component={ComprasScreenInicio}/>
      <Stack.Screen options={{ headerShown: false }} name="ProductosComprasScreen" component={ProductosComprasScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ProductosDetailssScreen" component={ProductoDetailsScreen} />
      <Stack.Screen 
      options={{ headerShown: false }} 
      name="Home" component={DrawerHome} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

export default AppNavigator;