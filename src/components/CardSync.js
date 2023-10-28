import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../styles/common_styles';

const CardSync = (props) => {
  return (
    <View style={[styles.box_welcome, styles.elevation]}>
    <View style={styles.box_header}>
        <View>
            <Text style={styles.text_header}>{props.title}</Text>
        </View>
    </View>

    <View style={styles.box_content}>

        <View style={styles.box_text_content}>
          
        {props.children}

        </View>
    </View>

</View>
  )
}

export default CardSync


const styles = StyleSheet.create({
    box_welcome: {
        height: '15%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 15

    },
    elevation: {
        elevation: 7,
        shadowColor: '#164620',
    },
    box_header: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.PRIMARY,
        marginTop: -10,
        marginLeft: -10,
        marginRight: -10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5

    },

    box_content: {
        flex: 1,
        alignItems: 'center',
       

    },
    text_header: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 7,
        alignSelf: 'center',
    },


    box_text_content: {
        padding: 2,
        fontFamily: 'Roboto',
        justifyContent: 'center',
        flex: 1,
        marginTop: 10

    },

    box_text_sub_content: {
        flexDirection: 'row',
    },

    box_text_sub_content_error: {
        flexDirection: 'column',
    },

    text_campaign: {
        marginBottom: 10,
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: 'bold'
    },
    text_load:{
        justifyContent: 'center',
        textAlign: 'justify'
    }

});