// components/tabbar/tabbar.js
const textColor = ['#7a7a7a', '#2c6bff'];
const app = getApp();

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		backgroundColor: {
			type: String,
			value: '#ffffff'
		},
		backgroundImage: {
			type: String,
			value: '/resources/tabbar/tab_bg.png'
		},
		height: {
			type: String,
			value: '10vh'
		},
		width: {
			type: String,
			value: '100%'
		},
		selectedIndex: {
			type: Number,
			value: "0"
		}
	},

    /**
     * 组件的初始数据
     */
    data: {
        recordDialogHidden: true,
        list: [
            {
                id: 0,
                pagePath: '/pages/index/index',
                text: '首页',
                textColor: textColor[0],
                iconPath: '/resources/tabbar/tab_home_normal.png',
                selectedIconPath: '/resources/tabbar/tab_home_press.png',
                selected: false,
                iconCss: 'item-icon',
                pageIndex: 0,
                open: true,
                clickHandler: function () {
                    let result = null;
                    if (!this.open) {
                        wx.showToast({
                        title: '该功能暂未开放',
                        icon: 'none',
                        duration: 1000
                        })
                    } else {
                        result = this.changeSelectedItem();
                    }
                    return result;
                },
                changeSelectedItem: function () {
                    var colorIndex = 0;
                    if (this.selected) {
                        colorIndex = 1;
                    } else {
                        colorIndex = 0;
                    }
                    this.textColor = textColor[1 - colorIndex];
                    var iconTemp = this.iconPath;
                    this.iconPath = this.selectedIconPath;
                    this.selectedIconPath = iconTemp;
                    this.selected = !this.selected;
                    return this;
                }
            },
            {
                id: 1,
                pagePath: '/pages/control/control',
                text: '智控',
                textColor: textColor[0],
                iconPath: '/resources/tabbar/tab_control_normal.png',
                selectedIconPath: '/resources/tabbar/tab_control_press.png',
                selected: false,
                iconCss: 'item-icon',
                pageIndex: 1,
                open: true,
                clickHandler: function () {
                    let result = null;
                    if (!this.open) {
                        wx.showToast({
                        title: '该功能暂未开放',
                        icon: 'none',
                        duration: 1000
                        })
                    } 
                    else if (!wx.getStorageSync('family')) {
                        wx.showToast({
                        title: '你还没入住，无法使用该功能',
                        icon: 'none',
                        duration: 1000
                        })
                    } 
                    else {
                        result = this.changeSelectedItem();
                    }
                    return result;
                },
                changeSelectedItem: function () {
                    var colorIndex = 0;
                    if (this.selected) {
                        colorIndex = 1;
                    } else {
                        colorIndex = 0;
                    }
                    this.textColor = textColor[1 - colorIndex];
                    var iconTemp = this.iconPath;
                    this.iconPath = this.selectedIconPath;
                    this.selectedIconPath = iconTemp;
                    this.selected = !this.selected;
                    return this;
                }
            },
            {
                id: 2,
                pagePath: '/pages/logs/logs',
                text: '语音',
                textColor: textColor[0],
                iconPath: '/resources/record/record-icon.png',
                selectedIconPath: '/resources/tabbar/tab_record_press.png',
                selected: false,
                iconCss: 'record-icon',
                open: true,
                clickHandler: function () {
                    let result = null;
                    if (!this.open) {
                        wx.showToast({
                            title: '该功能暂未开放',
                            icon: 'none',
                            duration: 1000
                        })
                    } else if (!wx.getStorageSync('family')) {
                        wx.showToast({
                            title: '你还没入住，无法使用该功能',
                            icon: 'none',
                            duration: 1000
                        })
                    } else {
                        result = this;
                    }
                    return result;
                }
            },
            {
                id: 3,
                pagePath: '/pages/logs/logs',
                text: '服务',
                textColor: textColor[0],
                iconPath: '/resources/tabbar/tab_services_normal.png',
                selectedIconPath: '/resources/tabbar/tab_services_press.png',
                selected: false,
                iconCss: 'item-icon',
                pageIndex: 2,
                open: true,
                clickHandler: function () {
                    let result = null;
                    if (!this.open) {
                        wx.showToast({
                            title: '该功能暂未开放',
                            icon: 'none',
                            duration: 1000
                        })
                    } else if (!wx.getStorageSync('family')) {
                        wx.showToast({
                            title: '你还没入住，无法使用该功能',
                            icon: 'none',
                            duration: 1000
                        })
                    } else {
                        result = this.changeSelectedItem();
                    }
                    return result;
                },
                changeSelectedItem: function () {
                    var colorIndex = 0;
                    if (this.selected) {
                        colorIndex = 1;
                    } else {
                        colorIndex = 0;
                    }
                    this.textColor = textColor[1 - colorIndex];
                    var iconTemp = this.iconPath;
                    this.iconPath = this.selectedIconPath;
                    this.selectedIconPath = iconTemp;
                    this.selected = !this.selected;
                    return this;
                }
            },
            {
                id: 4,
                pagePath: '/pages/notice/notice',
                text: '我的',
                textColor: textColor[0],
                iconPath: '/resources/tabbar/tab_own_normal.png',
                selectedIconPath: '/resources/tabbar/tab_own_press.png',
                selected: false,
                iconCss: 'item-icon',
                pageIndex: 3,
                open: true,
                clickHandler: function () {
                    let result = null;
                    if (!this.open) {
                        wx.showToast({
                            title: '该功能暂未开放',
                            icon: 'none',
                            duration: 1000
                        })
                    } else {
                        result = this.changeSelectedItem();
                    }
                    return result;
                },
                changeSelectedItem: function () {
                    var colorIndex = 0;
                    if (this.selected) {
                        colorIndex = 1;
                    } else {
                        colorIndex = 0;
                    }
                    this.textColor = textColor[1 - colorIndex];
                    var iconTemp = this.iconPath;
                    this.iconPath = this.selectedIconPath;
                    this.selectedIconPath = iconTemp;
                    this.selected = !this.selected;
                    return this;
                }
            }
        ],
        selectedIndex: 0,
        recordSource: null
    },

    pageLifetimes: {
        show() {
            var tabbarList = this.data.list;
            if (!tabbarList[this.properties.selectedIndex].selected) {
                this._changeSelectedItem(tabbarList[this.properties.selectedIndex]);
            }
            // if (this.properties.selectedIndex != 0) {
            //   this._changeSelectedItem(tabbarList[0]);
            // }
            this.setData({
                list: tabbarList,
                selectedIndex: this.properties.selectedIndex
            })
        }
    },

	/**
	 * 组件的方法列表
	 */
	methods: {
		_clickEvent: function(event) {
			console.log(event.currentTarget.id);
			var tabbarList = this.data.list;
			let newItem = tabbarList[event.currentTarget.id].clickHandler();
			if (newItem) {
				let oldItem = tabbarList[this.data.selectedIndex].changeSelectedItem();
				if (newItem === oldItem) {
					return;
				}
				this.setData({
					list: tabbarList,
					selectedIndex: event.currentTarget.id
				})
				this.triggerEvent('gotoNewPage', {
					oldPage: oldItem.pageIndex,
					newPage: newItem.pageIndex,
					pageName: newItem.text
				})
			} 
		},
		
		_changeSelectedItem: function(selectedItem) {
			var colorIndex = 0;
			if (selectedItem.selected) {
				colorIndex = 1;
			} else {
				colorIndex = 0;
			}
			selectedItem.textColor = textColor[1 - colorIndex];
			var iconTemp = selectedItem.iconPath;
			selectedItem.iconPath = selectedItem.selectedIconPath;
			selectedItem.selectedIconPath = iconTemp;
			selectedItem.selected = !selectedItem.selected;
			return selectedItem;
		},

		_openEvent: function () {
			let _this = this;
			if (!this.data.list[2].open) {
				wx.showToast({
					title: '该功能暂未开放',
					icon: 'none',
					duration: 1000
				})
				return;
			} else {
                if (!wx.getStorageSync('family')) {
                    wx.showToast({
                        title: '你还没入住，无法使用该功能',
                        icon: 'none',
                        duration: 1000
                    })
                    return;
                }
				wx.getSetting({
					success: function (res) {
						if (!res.authSetting['scope.record']) {
							wx.authorize({
								scope: 'scope.record',
								success: function (res) {
									console.log(wx.getStorageInfoSync());
									// _this.startRecord();
								},
								fail: function (res) {
									console.log(wx.getStorageInfoSync());
									wx.showToast({
										title: '请在设置页面中设置相关授权权限',
										icon: 'none',
										duration: 1500
									});
								},
								complete: function (res) { console.log(res) },
							})
						} else {
							_this.triggerEvent('openRecord', {})
							_this.setData({
								recordDialogHidden: false
							})
						}
					},
					fail: function (res) {
						wx.showToast({
							title: '获取设置信息失败',
							icon: 'none'
						})
					},
					complete: function (res) { console.log(res) },
				})
			}
		},

		playRecord: function (event) {
			console.log('play record')
			console.log(this.data.recordSource)
			if (this.data.recordSource.length > 0) {
				console.log(this.data.recordSource)
				const audioContext = wx.createInnerAudioContext();
				audioContext.src = this.data.recordSource;
				audioContext.play();
			}
		},
	}
})
