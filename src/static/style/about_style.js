import {StyleSheet} from 'react-native';

export let styles = StyleSheet.create({
	about: {
		margin: 15,
		color: '#919191'
	},
	title: {
		fontSize: 16,
		color: '#c6af96',
		height: 35,
		backgroundColor: '#fff',
		marginTop: 3,
		marginBottom: 3,
		paddingLeft: 15,
		lineHeight: 35
	},
	gongnengwrap: {
		flexDirection: 'column',
		backgroundColor: '#fff'
	},
	gicon: {

	},
	gntop: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		paddingTop: 15,
		paddingBottom: 15
	},
	gntopchild: {
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1
	},
	gnbottom: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15,
		borderTopWidth: 1,
		borderTopColor: '#f1f1f1',
		paddingTop: 15,
		paddingBottom: 15
	},
	lianxi: {
		flexDirection: 'column',
		marginLeft: 15,
		marginRight: 15,
		backgroundColor: '#fff',
		borderRadius: 5
	},
	lxchild: {
		flexDirection: 'row',
		height: 55,
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#f2f2f2',
		marginLeft: 15,
		marginRight: 15
	},
	wx: {
		flexDirection: 'row',
		marginLeft: 15,
		marginRight: 15,
		height: 110,
		alignItems: 'center'
	},
	yx: {
		lineHeight: 55
	},
	dz: {
		lineHeight: 55
	},
	teltext: {
		flex: 1
	},
	texttitle: {
		fontSize: 16,
		marginTop: 10
	},
	textlist: {
		marginTop: 10,
		color: '#969696',
		fontSize: 12
	},
	helpwrap: {
		backgroundColor: '#fff',
	},
	helplist: {
		marginLeft: 15,
		marginRight: 15,
		height: 51,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f1f1f1',
		borderTopWidth: 1,
		borderTopColor: '#f1f1f1'
	},
	helplisttitle: {
		flex: 1
	},
	helplisticon: {
		width: 15,
		height: 15
	},
	helpcont: {
		margin: 15
	}
})