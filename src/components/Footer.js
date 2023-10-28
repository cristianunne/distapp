import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {

    const navigation = useNavigation();


const goConfig = () => {
     //mando al login
     navigation.navigate('InicioConfig');
}

const goCompras = () => {
    navigation.navigate('InicioCompras');
}

const goProductos = () => {
    navigation.navigate('ProductosInicioScreen');
}
  return (
    <View style={styles.bottomView}>
                <TouchableOpacity style={styles.bottonTab}>
                    <Image source={require('../images/home.png')} style={styles.bottomTabIconHome} />
                    <Text style={styles.title}>Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottonTab} onPress={goCompras}>
                    <Image source={require('../images/bag.png')} style={styles.bottomTabIcon} />
                    <Text style={styles.title}>Compras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottonTab}>
                    <Image source={require('../images/ventas.png')} style={styles.bottomTabIcon} />
                    <Text style={styles.title}>Ventas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottonTab} onPress={goProductos}>
                    <Image source={require('../images/productos.png')} style={styles.bottomTabIcon} />
                    <Text style={styles.title}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottonTab} onPress={goConfig}>
                    <Image source={require('../images/configuracion.png')} style={styles.bottomTabIcon} />
                    <Text style={styles.title}>Configuración</Text>
                </TouchableOpacity>
            </View>
  )
}

export default Footer


const styles = StyleSheet.create({

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
  bottonTab: {
      width: '20%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  bottomTabIcon: {
      width: 30,
      height: 30
  },

  bottomTabIconHome: {
      width: 30,
      height: 30,
      tintColor: '#00af80'
  },

  title: {
      color: '#187351',
      fontFamily: 'Roboto',
      fontSize: 12
  }
})

