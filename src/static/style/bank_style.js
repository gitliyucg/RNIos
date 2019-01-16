import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
	inputwrap: {
		backgroundColor: '#fff',
		height: 110
	},
	inputchild: {
		marginLeft: 15,
		marginRight: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#f8f8f8',
		flexDirection: 'row',
		alignItems: 'center',
		height: 55
	},
	label: {
		width: 100
	},
	input: {
		flex: 1,
		padding: 0,
		height: 55
	},
	wrap: {
		flexDirection: 'row',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 35
	},
	agrokwrap: {
		width: 25,
		height: 25,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#444444',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	agrok: {
		width: 25,
		height: 25
	},
	agroktext: {
		flex: 1,
		marginLeft: 5
	},
	agrokcent: {
		color: '#484848',
		lineHeight: 30
	},
	uploadwrap: {
		marginLeft: 30,
		marginRight: 30
	},
	uploadchild: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	uploadleft: {
	},
	uploadleft: {
	},
	uploadimg: {
		width: 140,
		height: 95
	},
	uploadtext: {
		width: 140,
		height: 30,
		textAlign: 'center',
		lineHeight: 30
	},
	btnwrap: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btn: {
		width: 335,
		height: 45,
		backgroundColor: '#fd6a20',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 5
	},
	editbtnwrap: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	editbtn1: {
		width: 120,
		height: 45,
		backgroundColor: '#fd6a20',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 5
	},
	editbtn2: {
		width: 120,
		height: 45,
		backgroundColor: '#f7ba14',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 5
	},
	deleteicon: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 20,
		height: 20
	}
})