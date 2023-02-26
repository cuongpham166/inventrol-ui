import { StyleSheet } from '@react-pdf/renderer';

const poreportFooterStyles = StyleSheet.create({
    footerContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9660c4',
        maxHeight: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default poreportFooterStyles;
