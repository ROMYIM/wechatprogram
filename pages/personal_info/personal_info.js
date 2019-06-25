// pages/personal_info/personal_info.js
import WxValidate from '../../utils/WxValidate.js'


const app = getApp();

const rules = {
    name: {
        required: true
    },
    phone: {
        required: true,
        tel: true
    }
}

const messages = {
	phone: {
		required: '手机号不能为空',
		tel: '请输入正确的11位手机号'
	},
	name: {
		required: '姓名不能为空'
	}
}

class Gender {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    
}

const genderList = [ new Gender('男', 0), new Gender('女', 1) ]

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: null,
        gender: null,
        phone: null,
        genderList: genderList
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.wxValidate = new WxValidate(rules, messages);
        app.request(
            '',
            'POST',
            true,
            () => {
                const hotel = wx.getStorageSync('hotel');
                const keyMap = app.createSecretKey(hotel);
                const data = {
                    FKEY: keyMap.key,
                    HOTELID: hotel,
                    TIMESTAMP: keyMap.timeStamp
                }
                return data;
            },
            res => {
                wx.hideLoading();
                if (res.data.code == 101) {
                    
                } else {
                    
                }
            },
            res => {
                wx.hideLoading();
                wx.showToast({
                    icon: 'none',
                    duration: 1500,
                    title: res.data.msg
                })
            }
        )
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

    selectGender: function (event) {
        const index = event.detail.value;
        this.setData({
            gender: genderList[index]
        })
    },

    saveInformation: function (event) {
        const params = event.detail.value;
        if (!this.wxValidate.checkForm(params)) {
            wx.showToast({
                title: this.wxValidate.errorList[0]["msg"],
				icon: 'none',
                uration: 1500,
				mask: true,
            })
        } else {
            
        }
    }
})