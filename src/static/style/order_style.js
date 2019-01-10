import {StyleSheet} from 'react-native';

export let styles = StyleSheet.create({
	listwrap: {
		marginLeft: 15,
		marginRight: 15,
		height: 215,
		borderRadius: 5,
		overflow: 'hidden',
		marginTop: 10
	},
	listimg: {
		width: WIDTH - 30,
		height: 215
	},
	listcont: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		position: 'absolute',
		top: 130,
		left: 0
	},
	listtext: {
		flex: 1,
		textAlign: 'center',
		fontSize: 16
	},
	orderid: {
		position: 'absolute',
		bottom: 15,
		right: 15,
		color: '#ced7e2'
	},
	listinfo: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'column',
		marginTop: 15
	},
	infochild: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		flex: 1,
		textAlign: 'right'
	},
	labeltext: {
		flex: 2,
		marginLeft: 15,
	},
	infochildcolor1: {
		backgroundColor: '#ffe79d'
	},
	infochildcolor2: {
		backgroundColor: '#d9d8d4'
	},
	orderinfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15,
		marginBottom: 15
	},
	orderchild: {
		flexDirection: 'column',
		height: 100,
		width: 115,
		backgroundColor: '#ffe79d',
		alignItems: 'center'
	},
	listchildwrap: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listchild: {
		width: 110,
		height: 40,
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15
	},
	listwrapaction: {
		backgroundColor: '#fc7c55'
	}
	,
	listwrapnoaction: {
		backgroundColor: '#a8a8a8'
	},
	orderlistwrap: {
		flexDirection: 'row',
		height: 35,
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15
	},
	jianm: {
		flex: 1,
		textAlign: 'center'
	},
	jianmodd: {
		height: 35,
		backgroundColor: '#ffe79d',
		lineHeight: 35
	},
	jianmeven: {
		height: 35,
		backgroundColor: '#d9d8d4',
		lineHeight: 35
	},
	jilu1: {
		flex: 1,
		textAlign: 'center'
	},
	jilu2: {
		flex: 3,
		textAlign: 'center'
	},
	jilu3: {
		flex: 2,
		textAlign: 'center'
	},
	jilu4: {
		flex: 5,
		textAlign: 'center'
	}
})