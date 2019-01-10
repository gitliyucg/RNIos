import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
	logo: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 30
	},
	logoimg: {
		width: 212,
		height: 47,
	},
	loginimg: {
		width: 232,
		height: 170,
		marginTop: 35
	},
	inputwrap: {
		flexDirection: 'column',
		marginTop: 40
	},
	inputcont: {
		flexDirection: 'column',
		paddingRight: 35,
		paddingLeft: 35,
	},
	label: {
		width: 60
	},
	inputchild: {
		flexDirection: 'row',
		height: 55,
		borderBottomWidth: 1,
		borderBottomColor: '#e2e2e2',
		alignItems: 'center'
	},
	logininput: {
		flex: 1,
		height: 55,
	},
	mabtn: {
		width: 90,
		height: 30,
		borderWidth: 1,
		borderColor: '#767676',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	loginbtn: {
		height: 45,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
		marginTop: 30,
		marginLeft: 15,
		marginRight: 15
	},
	loginbtntrue: {
		backgroundColor: '#f7c220'
	},
	loginbtnfalse: {
		backgroundColor: '#dadada'
	},
	xieyi: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 15
	}
})