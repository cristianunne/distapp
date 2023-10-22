import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
const Drawer = createDrawerNavigator();



export const DrawerHome = () => {
    const [result, setResult] = useState(false);

    useEffect(() => {

    }, [result]);


    return (
       <Drawer.Navigator>
        <Drawer.Screen name='Inicio' component={Home} options={{headerShown:false}} />
       </Drawer.Navigator>
    )
}
