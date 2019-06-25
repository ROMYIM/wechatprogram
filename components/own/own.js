// components/own/own.js
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
		hidden: true,
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		headPortrait: '/resources/own/mine_icon_profile-photo.png',
		nickName: '昵称',
		registerState: app.globalData.registerState,
		phone: wx.getStorageSync('phone')
    },

    lifetimes: {

		ready() {
			if (app.userInfo) {
				this.setData({
					hasUserInfo: true,
					headPortrait: app.globalData.userInfo.avatarUrl,
					nickName: app.globalData.userInfo.nickName
				})
			}      
		},
    
		attached() {
			app.bindUserInfo = () => {
				this.setData({
					hasUserInfo: true,
					headPortrait: app.globalData.userInfo.avatarUrl,
					nickName: app.globalData.userInfo.nickName
				})
			}
			app.getUserInfo(this.data.canIUse);
			this.setData({
				registerState: app.globalData.registerState,
				phone: wx.getStorageSync('phone')
			})
		}
    },

    /**
     * 组件的方法列表
     */
    methods: {

		bindUserInfo: function (e) {
			if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
				return;
			}
			if (e != undefined) {
				app.globalData.userInfo = e.detail.userInfo;
			}
			this.setData({
				hasUserInfo: true,
				headPortrait: app.globalData.userInfo.avatarUrl,
				nickName: app.globalData.userInfo.nickName
			})
		},

		gotoNewPage: function (event) {
			var url = event.currentTarget.dataset.url;
			wx.navigateTo({
				url: url,
			})
		},

		getUserInfo: function (event) {
			if (this.data.registerState) {
				return;
			} else {
				this.gotoNewPage(event);
			}
		},

		showPage: function () {
			this.setData({
				registerState: app.globalData.registerState,
				phone: wx.getStorageSync('phone'),
				hidden: false
			})
		},

		hidePage: function () {
			this.setData({
				hidden: true
			})
		},

		getOrdersList: function (event) {
			
			if (app.globalData.registerState) {
				wx.navigateTo({
					url: '/pages/order/orderList?canISubmit=1',
				})
			} else {
				getCurrentPages()[0].dialog.showDialog();
			}
		},

		buttonClick: function (event) {
			app.unOpenTips();
		},

		personalUserInfo: function (event) {
			// app.unOpenTips();
			if (app.globalData.registerState) {
				wx.navigateTo({
					url: '/pages/personal_info/personal_info'
				})
			} else {
				getCurrentPages()[0].dialog.showDialog();
			}
		},

		gotoRegister: function (event) {
			if (!app.globalData.registerState) {
				const url = event.currentTarget.dataset.url;
				wx.navigateTo({
					url: url
				})
			}
		}
    }
})
