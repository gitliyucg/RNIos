import { StyleSheet } from "react-native";

export let styles = StyleSheet.create({
	back: {
		position: 'relative',
		height: 240,
		backgroundColor: '#fff'
	},
	backimg: {
		height: 70
	},
	posview: {
		position: 'absolute',
		top: 25,
		width: 350,
		height: 190,
		backgroundColor: '#fff',
		left: WIDTH / 2,
		marginLeft: -175,
		borderRadius: 5,
		flexDirection: 'column',
		borderWidth: 1,
		borderColor: '#f5f1ee'
	},
	backtop: {
		height: 90,
		borderBottomWidth: 1,
		borderBottomColor: '#f6f6f6',
		paddingLeft: 15,
		paddingRight: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	backtopimg: {
		width: 65,
		height: 65,
	},
	backtopcont: {
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 20
	},
	backb: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	backbchild: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 20
	},
	backchildcont: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	},
	lcwrap: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1
	},
	lcimgwrap:{
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1
	},
	lcimg: {
		width: 30,
		height: 30
	},
	btnwrap: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 50
	},
	sq: {
		width: 335,
		height: 45,
		borderRadius: 5,
		backgroundColor: '#fb7f27',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
})