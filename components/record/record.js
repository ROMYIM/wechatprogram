// components/record/record.js
const app = getApp();

const overflowHidden = 'hidden';
const overflowVisible = 'visible';

const heightAuto = 'auto';
const itemHeight = '10vh'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hidden: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        panelHidden: false,

        list: [ 
            {
                icon: '/resources/record/voice_icon_lamp.png',
                text: '灯光控制',
                tips: [
                    '打开/关闭 + 灯名称（客厅灯）',
                    '灯名称（客厅灯）调亮/暗点',
                    '灯名称（客厅灯）亮度调为 + 百分比（80%）',
                    '灯名称（客厅灯）调为 + 颜色（红色等）'
                ],
                overflow: overflowHidden,
                height: itemHeight
            }, 
            {
                icon: '/resources/record/voice_icon_curtain.png',
                text: '窗帘控制',
                tips: [
                    '打开/暂停/关闭 + 窗帘名称（客厅窗帘）'
                ],
                overflow: overflowHidden,
                height: itemHeight
            }, 
            {
                icon: '/resources/record/voice_icon_air.png',
                text: '空调控制',
                tips: [
                    '打开/关闭 + 空调名称（卧室空调）',
                    '空调名称 + 温度调为 + 温度（28度）',
                    '空调名称 + 调为 + xx模式（送风/制冷）',
                    '空调名称 + 风速（高风/中风/低风）'
                ],
                overflow: overflowHidden,
                height: itemHeight
            },
            {
                icon: '/resources/record/voice_icon_tv.png',
                text: '电视控制',
                tips: [
                    '打开/关闭 + 电视名称（客厅电视）',
                    '电视名称（客厅电视） + 音量调高（低）点',
                    '上（下）一频道'
                ],
                overflow: overflowHidden,
                height: itemHeight
            },
            {
                icon: '/resources/record/voice_icon_scene.png',
                text: '情景控制',
                tips: [
                    '打开 + 情景名称（睡眠模式）'
                ],
                overflow: overflowHidden,
                height: itemHeight
            }
        ],
        speackAnimation: {},
        isSpeaking: false,
        icon: {
            text: '语音',
            iconPath: '/resources/tabbar/tab_record_normal.png',
            selectedIconPath: '/resources/tabbar/tab_record_press.png',
            open: true
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _closeEvent: function() {
            this.triggerEvent('closeRecord', {})
            // clearInterval(this.timer);
            this.setData({
                isSpeaking: false
            })
        },

        _itemClickEvent: function (event) {
            const index = event.currentTarget.dataset.index;
            let item = this.data.list[index];
            if (item.overflow == overflowHidden) {
                item.overflow = overflowVisible;
                const height = (item.tips.length + 1) * 5;
                item.height = height + 'vh';
                // this.setData({
                //     [this.data.list[index].overflow]: 'visible'
                // })
            } else {
                item.overflow = overflowHidden;
                item.height = itemHeight;
                // this.setData({
                //     [this.data.list[index].overflow]: 'hidden'
                // })
            }
            this.setData({
                list: this.data.list
            })
        },

        startSpeak: function (event) {
            if (!this.data.isSpeaking) {
                this.setData({
                    isSpeaking: true
                })
                var iconTemp = this.data.icon.iconPath;
				this.data.icon.iconPath = this.data.icon.selectedIconPath;
				this.data.icon.selectedIconPath = iconTemp;
				this.setData({
					'icon': this.data.icon
				})
				this.startRecord();
                speaking.call(this);
            } else {
                //去除帧动画循环
                clearInterval(this.timer)
                this.setData({
                    isSpeaking: false,
                })
            }
        },

        startRecord: function () {
			let _this = this;
            const family = wx.getStorageSync('family');
            if (family) {
                const recordOptions = {
                    duration: 60000,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    encodeBitRate: 64000,
                    format: 'mp3',
                    audioSource: 'auto',
                    frameSize: 50
                }
                app.globalData.recorderManager.onStop(res => {
                    console.log(res.tempFilePath);
                    _this.setData({
                        recordSource: res.tempFilePath,
                    });
                    const user = wx.getStorageSync('user');
                    const keyMap = app.createSecretKey(user);
                    const data = {
                        FAMILYID: family.FAMILYID,
                        USERID: user,
                        FEKY: keyMap.key,
                        TIMESTAMP: keyMap.timeStamp
                    }
                    wx.uploadFile({
                        url: app.globalData.baseUrl + 'appVoice/voiceControl',
                        filePath: res.tempFilePath,
                        name: 'VOICEFILE',
                        formData: data,
                        success: res => {
                            console.log("录音上传成功");
                            console.log(res);
                            const result = JSON.parse(res.data);
                            wx.showToast({
                                title: result.msg,
                                icon: 'none',
                                duration: 1500
                            });
                            setTimeout(() => {
                                _this.setData({
                                    panelHidden: false
                                })
                            }, 1500);
                        },
                        fail: res => {
                            console.log(res);
                            wx.showToast({
                                icon: 'none',
                                title: '录音失败'
                            })
                        }
                    })
                });
                app.globalData.recorderManager.onError(res => console.log(res));
                app.globalData.recorderManager.start(recordOptions);
                this.setData({
                    panelHidden: true
                })
            } else {
                wx.showToast({
                    title: '你还没有办理入住手续',
                    icon: 'none',
                    duration: 1500
                })
            }
		},

		stopRecord: function (event) {
			if (!this.data.icon.open) {
				wx.showToast({
					title: '该功能暂未开放',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if (this.data.isSpeaking) {
				app.globalData.recorderManager.stop();
				var iconTemp = this.data.icon.iconPath;
				this.data.icon.iconPath = this.data.icon.selectedIconPath;
				this.data.icon.selectedIconPath = iconTemp;
				this.setData({
					'icon': this.data.icon,
                    isSpeaking: false
				})
			}
		},
    },

    lifetimes: {
        ready() {
            this.animation1 = wx.createAnimation({ duration: 1000, })
            this.animation2 = wx.createAnimation({ duration: 1000, })
            this.animation3 = wx.createAnimation({ duration: 1000, })
        }
    }
})

function speaking() {
    //话筒帧动画
    //波纹放大,淡出动画
    var _this = this;
    setTimeout(function () {
        animationFun(_this,1,1000)
    }, 0)
    setTimeout(function () {
        animationFun(_this, 2, 1000)
    }, 250)
    setTimeout(function () {
        animationFun(_this, 3, 1000)
    }, 500)
   
}

function animationFun(_this,index,time){ 
    //波纹放大,淡出动画
    if (_this.data.isSpeaking) {
        setTimeout(function () {
            animationFun(_this, index, time)
        }, time)
    }
    switch (index){
        case 1:
            _this.animation1.scale(1, 1).opacity(1).step({ duration: 0 });//还原
            _this.setData({
                spreakingAnimation1: _this.animation1.export()
            })
            break;
        case 2:
            _this.animation2.scale(1, 1).opacity(1).step({ duration: 0 });//还原
            _this.setData({
                spreakingAnimation2: _this.animation2.export()
            })
            break;
        case 3:
            _this.animation3.scale(1, 1).opacity(1).step({ duration: 0 });//还原
            _this.setData({
                spreakingAnimation3: _this.animation3.export()
            })
            break;
    }
    setTimeout(
        () => {
            switch (index) {
                case 1:
                    _this.animation1.scale(3, 3).opacity(0).step();//修改透明度,放大
                    _this.setData({
                        spreakingAnimation1: _this.animation1.export()
                    })
                    break;
                case 2:
                    _this.animation2.scale(3, 3).opacity(0).step();//修改透明度,放大
                    _this.setData({
                        spreakingAnimation2: _this.animation2.export()
                    })
                    break;
                case 3:
                    _this.animation3.scale(3, 3).opacity(0).step();//修改透明度,放大
                    _this.setData({
                        spreakingAnimation3: _this.animation3.export()
                    })
                    break;
            }
        },200
    );
}
