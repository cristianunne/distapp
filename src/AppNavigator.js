
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from "./Screens/Splash";
import Login from "./components/Login";

import { useNavigation } from '@react-navigation/native';
import { AppContext, IsDbContext } from "./Context/ContextApp";
import { DrawerHome } from "./Screens/DrawerHome";
import ConfInicioScreen from "./Screens/Configuracion/ConfInicioScreen";
import ComprasScreenInicio from "./Screens/compras/ComprasScreenInicio";
import ProductosComprasScreen from "./Screens/compras/ProductosComprasScreen";
import ProductoDetailsScreen from "./Screens/compras/ProductoDetailsScreen";
import ProductosInicioScreen from "./Screens/productos/ProductosInicioScreen";
import ClientesInicioScreen from "./Screens/clientes/ClientesInicioScreen";
import CartSessionInicioScreen from "./Screens/cartsession/CartSessionInicioScreen";
import ProductoDetailsCartSessionScreen from "./Screens/cartsession/ProductoDetailsCartSessionScreen";
import ClientesSelectionScreen from "./Screens/cartsession/ClientesSelectionScreen";
import DescuentoGeneralScreen from "./Screens/cartsession/DescuentoGeneralScreen";
import { VentaFinalScreen } from "./Screens/cartsession/VentaFinalScreen";
import CamionesInicioScreen from "./Screens/camiones/CamionesInicioScreen";
import StockCargaInicioScreen from "./Screens/stock/StockCargaInicioScreen";
import StockCargaSolicitudesScreen from "./Screens/stock/StockCargaSolicitudesScreen";
import StockInicioScreen from "./Screens/stock/StockInicioScreen";
import CamionLocalInicioScreen from "./Screens/camiones/CamionLocalInicioScreen";
import CamionesTranferenciaSentScreen from "./Screens/camiones/CamionesTranferenciaSentScreen";
import CamionesSelectTranferScreen from "./Screens/camiones/CamionesSelectTranferScreen";
import CamionesTransferenciasAceptarScreen from "./Screens/camiones/CamionesTransferenciasAceptarScreen";
import CamionesEditProductoTransferScreen from "./Screens/camiones/CamionesEditProductoTransferScreen";
import CamionesTransferenciasVerScreen from "./Screens/camiones/CamionesTransferenciasVerScreen";
import TypePagoSelectionScreen from "./Screens/cartsession/TypePagoSelectionScreen";
import VentasInicioScreen from "./Screens/ventas/VentasInicioScreen";
import VentasInicioScreenOptions from "./Screens/ventas/VentasInicioScreenOptions";
import VentasRealizadasScreen from "./Screens/ventas/VentasRealizadasScreen";
import VentasResumenScreen from "./Screens/ventas/VentasResumenScreen";
import VentasNotSentScreen from "./Screens/ventas/VentasNotSentScreen";
import PedidosScreen from "./Screens/pedidos/PedidosScreen";
import PedidosInicioScreen from "./Screens/pedidos/PedidosInicioScreen";
import PedidosResumenProductosScreen from "./Screens/pedidos/PedidosResumenProductosScreen";
import FechaSelection from "./Screens/cartsession/FechaSelection";
import VentasResumenDiariaScreen from "./Screens/ventas/VentasResumenDiariaScreen";
import VentasDiariasFechaSelectScreen from "./Screens/ventas/VentasDiariasFechaSelectScreen";



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
      <Stack.Screen options={{ headerShown: false }} name="ProductosInicioScreen" component={ProductosInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ClientesInicioScreen" component={ClientesInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CartSessionInicioScreen" component={CartSessionInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ProductoDetailsCartSessionScreen" component={ProductoDetailsCartSessionScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ClientesSelectionScreen" component={ClientesSelectionScreen} />
      <Stack.Screen options={{ headerShown: false }} name="FechaSelection" component={FechaSelection} />
      <Stack.Screen options={{ headerShown: false }} name="DescuentoGeneralScreen" component={DescuentoGeneralScreen} />
      <Stack.Screen options={{ headerShown: false }} name="TypePagoSelectionScreen" component={TypePagoSelectionScreen} />

      <Stack.Screen options={{ headerShown: false }} name="VentaFinalScreen" component={VentaFinalScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesInicioScreen" component={CamionesInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="StockCargaInicioScreen" component={StockCargaInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="StockCargaSolicitudesScreen" component={StockCargaSolicitudesScreen} />
      <Stack.Screen options={{ headerShown: false }} name="StockInicioScreen" component={StockInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionLocalInicioScreen" component={CamionLocalInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesTranferenciaSentScreen" component={CamionesTranferenciaSentScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesSelectTranferScreen" component={CamionesSelectTranferScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesTransferenciasAceptarScreen" component={CamionesTransferenciasAceptarScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesEditProductoTransferScreen" component={CamionesEditProductoTransferScreen} />
      <Stack.Screen options={{ headerShown: false }} name="CamionesTransferenciasVerScreen" component={CamionesTransferenciasVerScreen} />

      <Stack.Screen options={{ headerShown: false }} name="VentasInicioScreenOptions" component={VentasInicioScreenOptions} />
      <Stack.Screen options={{ headerShown: false }} name="VentasInicioScreen" component={VentasInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="VentasRealizadasScreen" component={VentasRealizadasScreen} />
      <Stack.Screen options={{ headerShown: false }} name="VentasResumenScreen" component={VentasResumenScreen} />
      <Stack.Screen options={{ headerShown: false }} name="VentasNotSentScreen" component={VentasNotSentScreen} />
      <Stack.Screen options={{ headerShown: false }} name="VentasResumenDiariaScreen" component={VentasResumenDiariaScreen} />
      <Stack.Screen options={{ headerShown: false }} name="VentasDiariasFechaSelectScreen" component={VentasDiariasFechaSelectScreen} />

      <Stack.Screen options={{ headerShown: false }} name="PedidosScreen" component={PedidosScreen} />
      <Stack.Screen options={{ headerShown: false }} name="PedidosInicioScreen" component={PedidosInicioScreen} />
      <Stack.Screen options={{ headerShown: false }} name="PedidosResumenProductosScreen" component={PedidosResumenProductosScreen} />

      <Stack.Screen 
      options={{ headerShown: false }} 
      name="Home" component={DrawerHome} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

export default AppNavigator;