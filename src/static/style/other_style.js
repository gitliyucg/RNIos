import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
	list: {
		backgroundColor: '#fff',
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10
	},
	listcont: {
		marginLeft: 15,
		marginRight: 15
	},
	uploadlist: {
		flexDirection: 'column'
	},
	add: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	uploadimg: {
		width: 137,
		height: 97
	},
	uploadtext: {
		marginLeft: 35
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
	}
})