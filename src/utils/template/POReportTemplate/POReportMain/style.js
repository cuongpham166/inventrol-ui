import { StyleSheet } from '@react-pdf/renderer';

const poreportMainStyles = StyleSheet.create({
    mainSectionContainer: {
        paddingHorizontal: 30,
    },

    infosectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
    },

    infosection: {
        width: '50%',
    },

    maininfoTitle: {
        fontSize: 13,
        padding: 2,
        color: '#9660c4',
    },
    mainInfoText: {
        fontSize: 11,
        padding: 2,
    },

    whiteSpace: {
        marginBottom: 20,
    },

    tablecellNumber: {
        fontSize: 11,
        textAlign: 'right',
        padding: 5,
        maxWidth: 60,
        backgroundColor: '#9660c4',
        color: '#FFFFFF',
        borderColor: '#9660c4',
    },

    tablecellText: {
        fontSize: 11,
        textAlign: 'left',
        padding: 5,
        backgroundColor: '#9660c4',
        color: '#FFFFFF',
        borderColor: '#9660c4',
    },

    datatablecellNumber: {
        fontSize: 11,
        textAlign: 'right',
        padding: 5,
        maxWidth: 60,
        borderColor: '#FFFFFF',
    },

    datatablecellText: {
        fontSize: 11,
        textAlign: 'left',
        padding: 5,
        borderColor: '#FFFFFF',
    },

    summarysectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    },

    purchaseNoticeContainer: {
        width: '75%',
    },

    purchasePaymentContainer: {
        width: '75%',
        marginBottom: 10,
    },

    purchaseNoticeTitle: {
        fontSize: 13,
        padding: 2,
        color: '#9660c4',
    },

    purchaseNoticeText: {
        fontSize: 11,
        padding: 2,
    },

    purchaseCostContainer: {
        width: '25%',
    },

    purchaseCostText: {
        fontSize: 13,
        padding: 5,
        backgroundColor: '#9660c4',
        color: '#FFFFFF',
        textAlign: 'right',
    },
});

export default poreportMainStyles;
