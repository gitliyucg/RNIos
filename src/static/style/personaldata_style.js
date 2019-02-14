import {StyleSheet} from 'react-native';

export let styles = StyleSheet.create({
	loanTitle: {
		height: 30,
		backgroundColor: '#f7ba14',
		alignItems: 'center',
		justifyContent: 'center'
	},
	loanTitleText: {
		fontSize: 14,
		color: '#fff'
	},
	inputwrap: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15
	},
	inputpochan: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 15,
		marginRight: 15
	},
	label: {
		width: 105
	},
	input: {
		height: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#cdcdcd',
		flex: 1,
		padding: 0
	},
	stateiconwrap: {
		width: 30,
		flexDirection: 'row',
		justifyContent: 'flex-end' 
	},
	stateicon: {
		width: 15,
		height: 15,
	},
	selectstyle: {
		fontSize: 14, 
		lineHeight: 30, 
	},
	selectwrap: {
		fontSize: 14,
		width: 200,
		borderWidth: 0
	},
	inputXing: {
		width: 75,
		padding: 0,
		borderBottomWidth: 1,
		borderBottomColor: '#cdcdcd',
	},
	inputMing: {
		flex: 1,
		marginLeft: 10,
		padding: 0,
		borderBottomWidth: 1,
		borderBottomColor: '#cdcdcd',
	},
	radioWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		height: 30,
		marginTop: 10,
		marginBottom: 10
	},
	radiotab: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 100
	},
	radio: {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: '#4b4b4b',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15
	},
	radiotext: {
		marginLeft: 15
	},
	radiochild: {
		width: 10,
		height: 10,
		backgroundColor: '#4b4b4b',
		borderRadius: 5
	},
	datewrap: {
		flex: 1,
	},
	pochan: {
		flexDirection: 'column',
		flex: 1
	},
	pochantext: {
		color: '#9e9e9e',
		marginTop: 10
	}
})	