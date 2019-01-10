import {StyleSheet} from 'react-native';

export let styles = StyleSheet.create({
	listwrap: {
		marginLeft: 15,
		marginRight: 15,
		height: 215,
		borderRadius: 10,
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
	toptitle: {
		fontSize: 20,
		fontWeight: '700',
		color: '#87521c',
		textAlign: 'center',
		marginTop: 10
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
	liuchengwrap: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15
	},
	liucheng: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	lcimg: {
		width: 20,
		height: 20
	},
	liuchengx: {
		flex: 1,
		height: 2,
		backgroundColor: '#000000'
	},
	uploadwrap: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	uploadchild: {
		width: 200,
		height: 35,
		backgroundColor: '#fc7c55',
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20
	},
	fujianwrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},
	upid: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		alignItems: 'center',
		width: WIDTH - 30
	},
	upidimg: {
		width: 137,
		height: 96
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
	gkinfo: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'column'
	},
	gkinfochild: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	gkinfotext: {
		flex: 1
	},
	qstext: {
		marginLeft: 15,
		marginRight: 15,
		lineHeight: 30
	},
	msgwrap: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'relative',
		marginTop: 15
	},
	inputMsg: {
		position: 'absolute',
		zIndex: 10,
		width: WIDTH,
		height: 25,
		padding: 0,
		opacity: 0
	},
	msgtextwrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	msgtextchild: {
		width: 35,
		height: 25,
		borderWidth: 1,
		borderColor: '#bebcbd',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	msgok: {
		width: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: '#222'
	},
	audiowrap: {
		marginLeft: 15,
		marginRight: 15,
		height: 30,
		backgroundColor: '#a9cce0',
		marginBottom: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	audiojinwrap: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
		flex: 1,
		marginRight: 10
	},
	audiojin: {
		flex: 1,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#232020'
	},
	audiodian: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#fff',
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: 9,
	},
	audiodian2: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#232020',
	}
})