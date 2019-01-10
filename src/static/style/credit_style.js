import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
	container: {
    },
    xinyong: {
    	height: 200,
    	flexDirection: 'row',
    },
    kacao: {
    	flex: 1,
    	height: 200
    },
    titlewrap: {
    	flexDirection: 'row',
    	alignItems: 'center'
    },
    kawrap: {
    	position: 'absolute',
        left: WIDTH / 2,
		marginLeft: -150,
		marginTop: 35
    },
    ka: {
    	width: 300,
    	height: 190
    },
    firm: {
    	position: 'absolute',
    	marginTop: 15,
    	marginLeft: 25,
    	fontSize: 16
    },
    jifen: {
    	position: 'absolute',
    	top: 53,
    	right: 85,
    	fontSize: 22
    },
    account: {
    	position: 'absolute',
    	top: 105,
    	right: 30,
    	fontSize: 18,
    	color: '#fcfdf7'
    },
    date: {
		position: 'absolute',
    	top: 130,
    	right: 30,
    	color: '#ffffff'
    },
    name: {
		position: 'absolute',
    	bottom: 12,
    	left: 25,
    	color: '#ffffff'
    },
    li: {
    	width: 5,
    	height: 12,
    	backgroundColor: '#ff7865'
    },
    listwrap: {
    	flexDirection: 'column',
    	marginTop: 15
    },
    listchild: {
    	backgroundColor: '#f7f7f7',
    	height: 50,
    	flexDirection: 'row',
    	alignItems: 'center',
        marginBottom: 20
    },
    listicon: {
    	width: 40,
    	height: 40
    },
    listcont: {
    	flex: 1,
    	flexDirection: 'column',
    	marginLeft: 10
    },
    listbtn: {
    	width: 70,
    	height: 25,
    	borderRadius: 20,
    	backgroundColor: '#f87d53',
    	color: '#ffffff',
    	textAlign: 'center',
    	lineHeight: 25,
    	flexDirection: 'row',
    	alignItems: 'center',
    	justifyContent: 'center'
    },
    btntext: {
    	fontSize: 12,
    	color: '#ffffff'
    },
    texthui: {
    	fontSize: 13,
    	color: '#848484'
    }
})