// components/index/index.js
const app = getApp();
const sceneStyleList = [
	{
		background: '#e0e7f9',
		style: 'width:6vh; height:5vh',
		icon: '/resources/index/home_icon_gohome.png',
		textColor: '#497df8'
	},
	{
		background: '#f9f0d3',
		style: 'width:10vw; height:8vw',
		icon: '/resources/index/home_icon_sleep.png',
		textColor: '#c3a415'
	},
	{
		background: '#d2f7f3',
		style: 'width:6vh; heigth:5vh',
		icon: '/resources/index/home_icon_read.png',
		textColor: '#23b09e'
	},
	{
		background: '#fbd9da',
		style: 'width:8vw; height:8vw',
		icon: '/resources/index/home_icon_happy.png',
		textColor: '#e04950'
	}
]

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
		hidden: false,
		scenceList: [],
		userInfo: {
			haveRoom: false,
			roomId: '下拉获取房间',
			roomList: wx.getStorageSync('familyList')
		},
		welcomeStatement: '欢迎入住智慧酒店',
	},

	lifetimes: {

		created() {
			this.getRoom();
		},
	},

	pageLifetimes: {
		show() {
			// wx.showToast({
			//   title: '获取房间',
			//   icon: 'none',
			//   duration: 2000
			// })
			
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getAccessToken: function (e) {
			wx.request({
				url: this.globalData.baseUrl + 'SmartHotel/Token',
				data: {
					appID: app.globalData.appID,
					appSecret: app.globalData.secret
				},
				dataType: 'json',
				method: 'POST',
				success: function (res) {
					console.log(res);
				},
				fail: function (res) {
					console(res);
				}
			})
		},

		pullDownRefresh: function() {
			this.getRoom();
		},

		roomButtonClick: function (event) {
			if (app.globalData.registerState) {
				var url = event.currentTarget.dataset.url;
				wx.navigateTo({
					url: url,
				})
			} else {
				getCurrentPages()[0].showDialog();
			}
		},

		changeRoom: function (event) {
			if (event.detail.value) {
				wx.setStorageSync('family', this.data.userInfo.roomList[event.detail.value]);
				this.setData({
					'userInfo.roomId': '你的套间号：' + wx.getStorageSync('family').FAMILYNAME
				});
				app.getDevices(() => this.getScenceMode());
			}
		},

		getRoom: function (event) {
			let message = null;
			app.request(
				'appHotel/getHotelOrderByOpenId',
				'POST',
				true,
				() => {
					let hotel = wx.getStorageSync('hotel');
					let keyMap = app.createSecretKey(hotel);
					let data = {
						OPENID: wx.getStorageSync('sid'),
						HOTELID: hotel,
						TIMESTAMP: keyMap.timeStamp,
						FKEY: keyMap.key,
					}
					return data;
				},
				res => {
					wx.hideLoading();
					let message = null;
					if (res.data.code == 101) {
						let familyList = res.data.data;
						if (familyList && familyList.length > 0) {
							wx.setStorageSync('familyList', res.data.data);
							wx.setStorageSync('family', familyList[0]);
							app.getDevices(null);
							this.getScenceMode();
							this.setData({
								userInfo: {
									haveRoom: true,
									roomId: '你的套间号：' + wx.getStorageSync('family').FAMILYNAME,
									roomList: wx.getStorageSync('familyList')
								},
								welcomeStatement: '点击切换房间'
							})
						}
					} else {
						message = '你还没入住，请到前台办理入住手续';
						wx.removeStorageSync('familyList');
						wx.removeStorageSync('family');
						if (message) {
							wx.hideLoading();
							this.setData({
								userInfo: {
									haveRoom: false,
									roomId: '下拉获取房间',
									roomList: null
								},
								welcomeStatement: '欢迎入住智慧酒店'
							})
							wx.showToast({
								title: message,
								icon: 'none',
								duration: 5000
							})
							var c = 2;
							var intervalId = setInterval(function () {
								c--;
								if (c == 0) {
								wx.hideToast();
								}
							}, 1000)
						}
					}
					wx.stopPullDownRefresh();
				},
				res => {
					wx.stopPullDownRefresh();
					wx.removeStorageSync('familyList');
					wx.removeStorageSync('family');
					message = '服务器忙！请联系相关工作人员';
					if (message) {
						wx.hideLoading();
						wx.showToast({
							title: message,
							icon: 'none',
							duration: 5000
						})
						this.setData({
							userInfo: {
								haveRoom: false,
								roomId: '下拉获取房间',
								roomList: null
							},
							welcomeStatement: '欢迎入住智慧酒店'
						})
					}
				}
			)
		},

		getScenceMode: function () {
			app.request(
				'appFamily/getSceneMode.do',
				'POST',
				false,
				() => {
					let user = wx.getStorageSync('user');
					let keyMap = app.createSecretKey(user);
					let data = {
						USERID: user,
						FAMILYID: wx.getStorageSync('family').FAMILYID,
						TIMESTAMP: keyMap.timeStamp,
						FKEY: keyMap.key,
					}
					return data;
				},
				res => {
					wx.hideLoading();
					if (res.data.code == 101) {
						let scenceList = res.data.data;
						for (let i = 0; i < scenceList.length; i++) {
							let styleIndex = i % sceneStyleList.length
							scenceList[i].STYLE = sceneStyleList[styleIndex];
						}
						this.setData({
							scenceList: scenceList
						})
					} else {
						this.setData({
							scenceList: [],
						})
						wx.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1500
						})
					}
				},
				res => {

				}
			)
		},

		openDoorClick: function (event) {
			app.unOpenTips();
		},

		checkOutClick: function (event) {
			if (app.globalData.registerState) {
				wx.navigateTo({
					url: '/pages/order/orderList?canISubmit=2',
				})
			} else {
				getCurrentPages()[0].dialog.showDialog();
			}
		
		},

		continueClick: function (event) {
			if (app.globalData.registerState) {
				wx.navigateTo({
					url: '/pages/order/orderList?canISubmit=2',
				})
			} else {
				getCurrentPages()[0].dialog.showDialog();
			}
		},

		callButtonClick: function (event) {
			app.unOpenTips();
		},

		switchLambs: function (event) {
			if (wx.getStorageSync('family')) {
				if (app.globalData.lambList) {
					if (event.currentTarget.dataset.command == 'on') {
						app.globalData.lambList.forEach(lamb => this._lambTurnOn(lamb));
					} else if (event.currentTarget.dataset.command == 'off') {
						app.globalData.lambList.forEach(lamb => this._lambTurnOff(lamb));
					}
				} else {
					wx.showToast({
						title: '没有相关设备',
						icon: 'none'
					})
				}
			} else {
				wx.showToast({
					title: '你还没入住，无法控制设备',
					icon: 'none',
					duration: 1000
				})
			}
		},

		sceneModeClick: function (event) {
			if (this.data.scenceList && this.data.scenceList.length > 0) {
				let sceneIndex = parseInt(event.currentTarget.dataset.index);
				let scene = this.data.scenceList[sceneIndex];
				app.request(
					'appFamily/setSceneMode.do',
					'POST',
					false,
					() => {
						let user = wx.getStorageSync('user');
						let keyMap = app.createSecretKey(user);
						scene.SNID = scene.GATEWAYMAC;
						scene.DATATYPE = '12';
						scene.OPERATETYPE = '92';
						let deviceParams = JSON.stringify(scene);
						let data = {
							SNID: scene.SNID,
							USERID: user,
							FAMILYID: wx.getStorageSync('family').FAMILYID,
							TIMESTAMP: keyMap.timeStamp,
							FKEY: keyMap.key,
							JSON: deviceParams
						}
						return data;
					},
					res => {
						wx.hideLoading();
						if (res.data.code == 101) {
							wx.showToast({
								title: '控制设备成功',
								duration: 1500
							})
						} else {
							wx.showToast({
								title: '控制失败',
								icon: 'none',
								duration: 1500
							})
						}
					},
					res => {

					}
				)
			} else {
				wx.showToast({
                    title: '没有相关情景',
                    icon: 'none',
                    duration: 1500
				})
			}
		},

		_lambTurnOn: function (lamb) {
			app.request(
				'appFamily/changeDevice.do',
				'POST',
				false,
				() => {
					let user = wx.getStorageSync('user');
					let keyMap = app.createSecretKey(user);
					lamb.SNID = lamb.GATEWAYMAC;
					lamb.DATATYPE = '12';
					lamb.OPERATETYPE = '82';
					lamb.DEVICECOMMAND = '01';
					let deviceParams = JSON.stringify(lamb);
					let data = {
						SNID: lamb.SNID,
						USERID: user,
						FAMILYID: wx.getStorageSync('family').FAMILYID,
						TIMESTAMP: keyMap.timeStamp,
						FKEY: keyMap.key,
						JSON: deviceParams
					}
					return data;
				},
				res => {
					wx.hideLoading();
					if (res.data.code == 101) {
                            wx.showToast({
                            title: '控制设备成功',
                            duration: 1000
						})
					} else {
						wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
						})
					}
				},
				res => {
					wx.hideLoading();
				}
			)
		},

		_lambTurnOff: function (lamb) {
			app.request(
				'appFamily/changeDevice.do',
				'POST',
				false,
				() => {
					let user = wx.getStorageSync('user');
					let keyMap = app.createSecretKey(user);
					lamb.SNID = lamb.GATEWAYMAC;
					lamb.DATATYPE = '12';
					lamb.OPERATETYPE = '82';
					lamb.DEVICECOMMAND = '00';
					let deviceParams = JSON.stringify(lamb);
					let data = {
						SNID: lamb.SNID,
						USERID: user,
						FAMILYID: wx.getStorageSync('family').FAMILYID,
						TIMESTAMP: keyMap.timeStamp,
						FKEY: keyMap.key,
						JSON: deviceParams
					}
					return data;
				},
				res => {
					wx.hideLoading();
					if (res.data.code == 101) {
						wx.showToast({
                            title: '控制设备成功',
                            duration: 1000
						})
					} else {
						wx.showToast({
                            icon: 'none',
                            title: res.data.msg,
						})
					}
				},
				res => {

				}
			)
		},

		bookRoomClick: function (event) {
			if (app.globalData.registerState) {
				wx.navigateTo({
					url: '/pages/book/book',
				})
			} else {
				getCurrentPages()[0].dialog.showDialog();
			}
		},

		showPage: function () {
			this.setData({
				hidden: false
			})
		},

		hidePage: function () {
			this.setData({
				hidden: true
			})
		}
	}
})
