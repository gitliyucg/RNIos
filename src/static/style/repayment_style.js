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
	zhezhao: {
		position: 'absolute',
		width: WIDTH - 30,
		height: 215,
		zIndex: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	zhezhaotext: {
		position: 'absolute',
		width: 190,
		height: 190,
		borderRadius: 95,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		zIndex: 20,
		left: (WIDTH - 30) / 2,
		top: 12.5,
		marginLeft: -95,
		textAlign: 'center',
		lineHeight: 190,
		fontSize: 20,
		color: '#000000'
	}
})