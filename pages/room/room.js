// pages/room/room.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buildingList: [],
        floorList: [],
        roomList: [],
        blockName: '楼栋',
        selectedFloor: 0,
        familyType: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.familyType = options.familyType;
        var url = 'appHotel/getHotelBlockList.do'
        app.request(
            url,
            'POST',
            true,
            () => {
                var hotel = wx.getStorageSync('hotel');
                var keyMap = app.createSecretKey(hotel);
                var data = {
                    HOTELID: hotel,
                    FKEY: keyMap.key,
                    TIMESTAMP: keyMap.timeStamp
                }
                return data;
            },
            res => {
                wx.hideLoading();
                if (res.data.code == 101) {
                    this.setData({
                        buildingList: res.data.data
                    })
                    var event = {
                        detail: {
                            value: 0
                        }
                    }
                    this.changeBuilding(event)
                }
            },
            res => {
                wx.hideLoading();
            }
        );
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

    changeFloor: function (event) {
        var floor = this.data.floorList[event.currentTarget.dataset.index];
        var url = 'appHotel/getFamilyList.do';
        app.request(
            url,
            'POST',
            true,
            () => {
                const order = wx.getStorageSync('order');
                console.log(order)
                var hotel = wx.getStorageSync('hotel');
                var keyMap = app.createSecretKey(hotel);
                var data = {
                    STARTDATE: order.STARTTIME,
                    ENDDATE: order.ENDTIME,
                    FKEY: keyMap.key,
                    TIMESTAMP: keyMap.timeStamp,
                    HOTELID: hotel,
                    FLOORID: floor.FLOORID,
                    FAMILYTYPE: this.data.familyType
                }
                return data;
            },
            res => {
                wx.hideLoading();
                if (res.data.code == 101) {
                    this.setData({
                        roomList: res.data.data,
                        selectedFloor: event.currentTarget.dataset.index
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500
                    })
                }
            },
            res => {
                wx.hideLoading();
            }
        )
    },

    changeBuilding: function (event) {
        var url = 'appHotel/getfloorList.do';
        var block = this.data.buildingList[event.detail.value];
        app.request(
            url,
            'POST',
            true,
            () => {
                var blockID = block.BLOCKID;
                var hotel = wx.getStorageSync('hotel');
                var keyMap = app.createSecretKey(hotel);
                const order = wx.getStorageSync('order');
                var data = {
                    STARTDATE: order.STARTTIME,
                    ENDDATE: order.ENDTIME,
                    FKEY: keyMap.key,
                    TIMESTAMP: keyMap.timeStamp,
                    HOTELID: hotel,
                    BLOCKID: blockID,
                    FAMILYTYPE: this.data.familyType
                }
                return data;
            },
            res => {
                wx.hideLoading();
                if (res.data.code == 101) {
                    this.setData({
                        floorList: res.data.data,
                        blockName: block.BLOCKNAME
                    })
                    var event = {
                        currentTarget: {
                            dataset: {
                                index: 0
                            }
                        }
                    }
                    this.changeFloor(event)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    })
                }
            },
            res => {
                wx.hideLoading();
            }
        )
    },

    createOrder: function (event) {
        var order = wx.getStorageSync('order');
        if (!order || order == undefined) {
            wx.navigateBack({
                delta: 1,
                success: res => {
                    wx.showToast({
                        title: '程序错误,请重新选房',
                        icon: 'none',
                        duration: 1500
                    })
                }
            })
            try {
                wx.removeStorageSync('order');
            } catch (e) {
                console.log(e)
            }
        } else {
            var room = this.data.roomList[event.currentTarget.dataset.index];
            order.HOTELID = wx.getStorageSync('hotel');
            order.FAMILYID = room.FAMILYID;
            order.FAMILYNAME = room.FAMILYNAME;
            var keyMap = app.createSecretKey(order.HOTELID);
            order.FKEY = keyMap.key;
            order.TIMESTAMP = keyMap.timeStamp;
            wx.redirectTo({
                url: '/pages/order/create?canISubmit=1&detail=' + JSON.stringify(order),
            })
        }
    }
})