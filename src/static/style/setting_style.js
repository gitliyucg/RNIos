import {StyleSheet} from 'react-native';

export let styles = StyleSheet.create({
	headwrap: {
		height: 85,
		backgroundColor: '#fff',
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	userimgwrap: {
		width: 60,
		height: 60,
		borderRadius: 30,
		overflow: 'hidden',
		marginLeft: 15,
		marginRight: 35
	},
	userimg: {
		width: 60,
		height: 60
	},
	cache: {
		height: 30,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	cachetext: {
		marginLeft: 15,
		flex: 1
	},
	cacheicon: {
		marginRight: 15,
		width: 15,
		height: 15
	},
	logout: {
		height: 30,
		backgroundColor: '#fff',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	version: {
		textAlign: 'center',
		marginTop: 10,
		color: '#77767b'
	}
})