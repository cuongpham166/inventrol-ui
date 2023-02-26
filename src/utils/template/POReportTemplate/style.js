import { StyleSheet } from '@react-pdf/renderer';

const poreportStyles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        //paddingHorizontal: 35,
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        top: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export default poreportStyles;
