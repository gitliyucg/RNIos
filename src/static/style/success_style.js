import { StyleSheet } from 'react-native';

export let styles = StyleSheet.create({
	succwrap: {
		height: 320,
		backgroundColor: '#fec02d',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	successicon: {
		width: 315,
		height: 300
	},
	succtext: {
		marginLeft: 15,
		marginRight: 15,
		lineHeight: 30,
		marginTop: 20
	},
	btnwrap: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnchild: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnchildtwo: {
		width: 170,
		height: 40,
		backgroundColor: '#f7ba14',
	}
})