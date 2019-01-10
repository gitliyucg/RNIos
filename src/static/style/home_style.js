import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
    container: {
    },
    diyaview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 13,
    },
    imgwrap: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imgwrap2: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    diyaicon: {
        width: 100,
        height: 100
    },
    diyatext: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 16,
    },
    logowrap: {
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#d6d6d6',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 1
    },
    logo: {
        width: 25,
        height: 25
    },
    logotext: {
        color: '#af6018',
        fontSize: 16,
        marginLeft: 5
    },
    listwrap: {
    	flexDirection: 'column',
    },
    listchild: {
    	paddingLeft: 15,
    	paddingRight: 15,
    	flexDirection: 'row',
    	paddingTop: 10,
    	paddingBottom: 10,
    	borderBottomWidth: 1,
    	borderBottomColor: '#ccc'
    },
    listicon: {
    	width: 60,
    	height: 60,
    },
	cont: {
		flexDirection: 'column',
		marginLeft: 10,
		flex: 1,
        overflow: 'hidden'
	},
	conttextwrap: {
		flexDirection: 'row',
	},
	conttext: {
		marginLeft: 10,
		marginRight: 10
	},
	listgo: {
		flexDirection: 'column',
		justifyContent: 'center'	
	},
	textcolorred: {
		color: '#f02c4e',
	},    
	textcolorhui: {
		color: '#707070'
	},
    goicon: {
        width: 15,
        height: 15
    }
});