import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView,
    ScrollView } from 'react-native';
import { COLORS } from '../styles/common_styles';


const CardsDefault = (props) => {
    return (
      <View style={[styles.box_welcome, styles.elevation]}>
      <View style={styles.box_header}>
          <View>
              <Text style={styles.text_header}>{props.title}</Text>
          </View>
      </View>
  
      <View style={styles.box_content}>
          <View style={styles.box_text_content}>

            <SafeAreaView style={styles.safearea}>
                <ScrollView style={styles.scrolview}>
                    {props.children}
                </ScrollView>
            </SafeAreaView>
            
          </View>
      </View>
  
  </View>
  
    )
  }
  
  export default CardsDefault



const styles = StyleSheet.create({
    box_welcome: {
        flex: 0.9,
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
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT,
        marginTop: -10,
        marginLeft: -10,
        marginRight: -10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomColor: '#bcbcbc',
        borderBottomWidth: 1.2

    },

    box_content: {
        flex: 2,
        alignItems: 'left',
        flexDirection: 'row',

    },
    text_header: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#656565',
        marginBottom: 7,
        alignSelf: 'center'
    },


    box_text_content: {
        flexDirection: 'column',
        fontFamily: 'Roboto',
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'flex-start',

    },
    safearea: {
      

    },
    scrolview: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50
    }




});