import { StyleSheet } from '@react-pdf/renderer';

const poreportHeaderStyles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 30,
    },

    headerTitle: {
        fontSize: 20,
        padding: 10,
        backgroundColor: '#9660c4',
        color: '#FFFFFF',
    },

    headerSubtitle: {
        fontSize: 11,
        marginBottom: 5,
    },
});

export default poreportHeaderStyles;
