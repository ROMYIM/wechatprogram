// pages/register/register.js
import WxValidate from '../../utils/WxValidate.js'

const app = getApp();

const rules = {
	mobile: {
		required: true,
		tel: true
	},
	code: {
		required: true,
		digits: true
	}
};

const messages = {
	mobile: {
		required: '手机号不能为空',
		tel: '请输入正确的11位手机号'
	},
	code: {
		required: '验证码不能为空',
		digits: '验证码只能为纯数字'
	}
}

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		headPortrait: '/resources/own/mine_icon_profile-photo.png',
		nickName: '昵称',
		mobile: '',
		buttonDisable: false,
		codeButtonText: '获取验证码'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.bindUserInfo = () => {
			this.setData({
				hasUserInfo: true,
				headPortrait: app.globalData.userInfo.avatarUrl,
				nickName: app.globalData.userInfo.nickName
			})
		}
		app.getUserInfo(this.data.canIUse);
		this.wxValidate = new WxValidate(rules, messages);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	bindUserInfo: function (event) {
		if (event.detail.errMsg == 'getUserInfo:fail auth deny') {
			return;
		}
		app.globalData.userInfo = event.detail.userInfo;
		this.setData({
			hasUserInfo: true,
			nickName: app.globalData.userInfo.nickName,
			headPortrait: app.globalData.userInfo.avatarUrl
		});
		// this.register(event);
	},

	mobileInputEvent: function (event) {
		this.setData({
			mobile: event.detail.value
		})
	},

	getVerifyCode: function (event) {
		var _this = this;
		var mobile = this.data.mobile;
		var regMobile = /^1\d{10}$/;
		if (!regMobile.test(mobile)) {
			wx.showToast({
				title: '手机号有误！',
				icon: 'none'
			})
			return false;
		} else {
			var c = 60;
			var intervalId = setInterval(function () {
				c = c - 1;
				_this.setData({
				codeButtonText: c + 's后重发',
				buttonDisable: true
				})
				if (c == 0) {
					clearInterval(intervalId);
					_this.setData({
						codeButtonText: '获取验证码',
						buttonDisable: false
					})
				}
			}, 1000)
			app.request(
				'appUser/getSms.do',
				'POST',
				false,
				() => {
					let keyMap = app.createSecretKey(this.data.mobile);
					let data = {
						FKEY: keyMap.key,
						TIMESTAMP: keyMap.timeStamp,
						MOBILE: this.data.mobile
					}
					return data;
				},
				res => {
					wx.hideLoading();
					if (res.data.code == 101) {
						console.log('获取成功')
					}
				}
			)
		}
	},

	register: function (event) {
		const params = event.detail.value;
		console.log(params);
		if (!this.wxValidate.checkForm(params)) {
			console.log(this.wxValidate.errorList[0]);
			wx.showToast({
				title: this.wxValidate.errorList[0]["msg"],
				icon: 'none',
				image: '',
				duration: 1500,
				mask: true,
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {},
			})
		} else {
			var url = 'appUser/wxregister';
			
			try {
				app.request(
					url,
					'POST',
					false,
					() => {
						var openID = wx.getStorageSync("sid")
						var keyMap = app.createSecretKey(openID);
						var data = {
							MOBILE: event.detail.value.mobile,
							OPENID: wx.getStorageSync('sid'),
							USERNAME: this.data.nickName,
							FKEY: keyMap.key,
							TIMESTAMP: keyMap.timeStamp,
							SMSCODE: event.detail.value.code
						}
						return data;
					},
					res => {
						wx.hideLoading();
						if (res.data.code == 101) {
							wx.showToast({
								title: '注册成功!',
								duration: 1500,
								complete: () => {
									app.globalData.registerState = true
									wx.setStorageSync('phone', event.detail.value.mobile)
									wx.reLaunch({
										url: '/pages/home/home',
									})
								}
							})
						}
					},
					res => {
						wx.hideLoading();
						console.log(res.data)
						wx.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1500
						})
					}
				)
			} catch (exception) {
				console.log(exception);
			}
		}
	}
})