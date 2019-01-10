import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../../static/style/loan2_style";
import Header from "../../../common/Header";

export default class Diya extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		dydz: null, //抵押住宅地址
	  		mj: null, //房屋实用面积
	  		ll: null, //楼龄
	  		fuzk: null, //房屋状况
	  		zujin: null, //房屋租金
	  		fuzx: null, //房屋債項 0时为头按 1时为二按 2时为三按 3时为其他 4时为没有
	  		zx1: null,
	  		zx2: null,
	  		zx3: null,
	  		zx4: null,
	  	};
	}

	componentWillMount(){
		// 获取详情
		fetch(API('/users/userinfo_detail'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			let zx = response['results']['mortgages_status'];
			if(response['err_no'] == 0){
				this.setState({
					dydz: response['results']['mortgage_address'],
					mj: response['results']['mortgage_area'].toString() == 0 ? null : response['results']['mortgage_area'].toString(),
					ll: response['results']['mortgage_age'].toString() == 0 ? null : response['results']['mortgage_age'].toString(),
					fuzk: response['results']['mortgages_status'] == 0 ? true : (response['results']['mortgages_status'] == 1 ? false : null),
					zujin: response['results']['mortgages_status'] == 1 ? response['results']['mortgages_rent'].toString() : null,
					fuzx: zx == 0 ? 4 : (zx == 1 ? 0 : (zx == 2 ? 1 : zx == 3 ? 2 : zx == 4 ? 3 : null)),
					zx1: zx == 1 ? response['results']['mortgages_loan_price'].toString() : null,
					zx2: zx == 2 ? response['results']['mortgages_loan_price'].toString() : null,
					zx3: zx == 3 ? response['results']['mortgages_loan_price'].toString() : null,
					zx4: zx == 4 ? response['results']['mortgages_loan_price'].toString() : null,
				})
			}
		} )
	}

	onsubmit = () => {
		if(
			this.state.dydz == '' ||
			this.state.dydz == null ||
			this.state.mj == null ||
			this.state.mj == '' ||
			this.state.ll == null ||
			this.state.ll == '' ||
			this.state.fuzk == null ||
			this.state.fuzx == null
		){
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else if(!this.state.fuzk && this.state.zujin == null || this.state.zujin == ''){
			// 判断房屋状况是否通过
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else if(this.state.fuzx == 0 && this.state.zx1 == null || this.state.zx1 == ''){
			// 判断房屋债项是否通过
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else if(this.state.fuzx == 1 && this.state.zx2 == null || this.state.zx2 == ''){
			// 判断房屋债项是否通过
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else if(this.state.fuzx == 2 && this.state.zx3 == null || this.state.zx3 == ''){
			// 判断房屋债项是否通过
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else if(this.state.fuzx == 3 && this.state.zx4 == null || this.state.zx4 == ''){
			// 判断房屋债项是否通过
			Alert.alert(i18n.t('loan2.xinx'))
			return false;
		}else{
			let zx = this.state.fuzx == 0 ? this.state.zx1 : (this.state.fuzx == 1 ? this.state.zx2 : (this.state.fuzx == 2 ? this.state.zx3 : (this.state.fuzx == 3 ? this.state.zx4 : 0)))
			let from = signData();
			from.append('mortgage_address', this.state.dydz);
			from.append('mortgage_area', this.state.mj);
			from.append('mortgage_age', this.state.ll);
			from.append('mortgages_status', this.state.fuzk ? 0 : 1);
			from.append('mortgages_rent', !this.state.fuzk ? this.state.zujin : 0);
			from.append('mortgages_loan_price', zx);
			from.append('mortgages_loan', this.state.fuzx == 0 ? 1 : (this.state.fuzx == 1 ? 2 : (this.state.fuzx == 2 ? 3 : (this.state.fuzx == 3 ? 4 : this.state.fuzx == 4 ? 0 : null))));
			fetch(API('/users/edit'), {
				method: 'POST',
				body: from
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					Actions.pop();
				}
			} )
		}
	}

	render(){
		return(
			<View style={main}>
				<Header title={i18n.t('renzheng.diya')} />
				<ScrollView style={{height: scrollViewHeight}}>
					{/*住宅地址*/}
					<View style={styles.textareawrapb}>
						<Text style={styles.label}>{ i18n.t('loan2.dydz') }</Text>
						<View style={styles.textbottom}>
							<TextInput style={styles.textarea} multiline={true} defaultValue={this.state.dydz} onChangeText={ (value) => this.setState({dydz: value}) } placeholder={ i18n.t('loan2.dydzp') }/>
							<Text style={styles.textbottomcont}>{i18n.t('loan2.dytext')}</Text>
						</View>
					</View>
					{/*房屋面积*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.mj') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.mj} onChangeText={ (value) => this.setState({mj: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.mjp') }/>
					</View>
					{/*楼龄*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.ll') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.ll} onChangeText={ (value) => this.setState({ll: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.llp') }/>
					</View>
					{/*房屋状况*/}
					<View style={[styles.inputwrap, {marginTop: 10, marginBottom: 10}]}>
						<Text style={styles.label}>{ i18n.t('loan2.fuzk') }</Text>
						{/*单选框*/}
						<View style={styles.radioWrap}>
							<TouchableOpacity style={styles.radiotabtwo} onPress={ () => {this.setState({fuzk: true, zujin: null})} }>
								<View style={styles.radio}>
									<View style={ this.state.fuzk ? styles.radiochild : null }></View>
								</View>
								<Text>{ i18n.t('loan2.fuzy') }</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.radiotabtwo, {marginLeft: 10}]} onPress={ () => {this.setState({fuzk: false})} }>
								<View style={styles.radio}>
									<View style={ this.state.fuzk == false ? styles.radiochild : null }></View>
								</View>
								<Text>{ i18n.t('loan2.fucz') }</Text>
								<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
									<Text>(</Text>
									<Text>{ i18n.t('loan2.fuzj') }</Text>
									<TextInput 
										editable={ this.state.fuzk == null || this.state.fuzk == true ? false : true }
										style={{width: 50, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
										defaultValue={this.state.zujin} 
										onChangeText={ (value) => this.setState({zujin: value}) } 
										keyboardType="numeric" 
										/>
									<Text>)</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					{/*債項*/}
					<View style={[styles.inputwrapzx, {marginTop: 10, marginBottom: 10}]}>
						<Text style={styles.label}>{ i18n.t('loan2.fuzx') }</Text>
						{/*单选框*/}
						<View style={{flex: 1, flexDirection: 'column'}}>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 0, zx2: null, zx3: null, zx4: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzx == 0 ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.futa') }</Text>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
										<Text>(</Text>
										<Text>{ i18n.t('loan2.zxje') }</Text>
										<TextInput 
											editable={ this.state.fuzx == null || this.state.fuzx != 0 ? false : true }
											style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
											defaultValue={this.state.zx1} 
											onChangeText={ (value) => this.setState({zx1: value}) } 
											keyboardType="numeric" 
											/>
										<Text>)</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 1, zx1: null, zx3: null, zx4: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzx == 1 ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.fuer') }</Text>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
										<Text>(</Text>
										<Text>{ i18n.t('loan2.zxje') }</Text>
										<TextInput 
											editable={ this.state.fuzx == null || this.state.fuzx != 1 ? false : true }
											style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
											defaultValue={this.state.zx2} 
											onChangeText={ (value) => this.setState({zx2: value}) } 
											keyboardType="numeric" 
											/>
										<Text>)</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 2, zx1: null, zx2: null, zx4: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzx == 2 ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.fusan') }</Text>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
										<Text>(</Text>
										<Text>{ i18n.t('loan2.zxje') }</Text>
										<TextInput 
											editable={ this.state.fuzx == null || this.state.fuzx != 2 ? false : true }
											style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
											defaultValue={this.state.zx3} 
											onChangeText={ (value) => this.setState({zx3: value}) } 
											keyboardType="numeric" 
											/>
										<Text>)</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 3, zx1: null, zx2: null, zx3: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzx == 3 ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.fuqt') }</Text>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
										<Text>(</Text>
										<Text>{ i18n.t('loan2.zxje') }</Text>
										<TextInput 
											editable={ this.state.fuzx == null || this.state.fuzx != 3 ? false : true }
											style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
											defaultValue={this.state.zx4} 
											onChangeText={ (value) => this.setState({zx4: value}) } 
											keyboardType="numeric" 
											/>
										<Text>)</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 4, zx1: null, zx2: null, zx3: null, zx4: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzx == 4 ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.funo') }</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
						<TouchableOpacity onPress={ this.onsubmit } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
							<Text style={{color: '#fff'}}>{ i18n.t('renzheng.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}