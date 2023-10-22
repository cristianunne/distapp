import { StyleSheet } from 'react-native';


const CustomTextInputStyle = StyleSheet.create({

    view : {
        width: '85%',
        height: '100',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#4DA984',
        fontFamily: 'Roboto'
    },

    viewError : {
        width: '85%',
        height: '100',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#F00',
        fontFamily: 'Roboto'
    },

    image : {
        width:25,
        height: 25
    },
    inputText: {
        marginLeft: 10,

    }

});

export default CustomTextInputStyle;