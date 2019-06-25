// components/dialog/checkout.js
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
			type: String,
			value: '窗口'
		},
		content: {
			type: String,
			value: '窗口内容'
		},
		confirm: {
			type: String,
			value: '确定'
		},
		cancel: {
			type: String,
			value: '取消'
		},
		width: {
			type: String,
			value: '50vw'
		},
		height: {
			type: String,
			value: '50vh'
		},
		border_radius: {
			type: String,
			value: '30rpx'
		}
    },

    /**
     * 组件的初始数据
     */
    data: {
        hidden: true,
        order: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hideDialog: function() {
			this.setData({
				hidden: true
			})
		},
		showDialog: function(order) {
			this.setData({
				hidden: false,
                order: order
			})
		},
		_confirmEvent: function() {
			this.checkOutRoom();
		},
		_cancelEvent: function() {
			this.hideDialog();
		},
		_closeEvent: function() {
			this.hideDialog();
		},

        checkOutRoom: function () {
			let order = this.data.order;
			if (order) {
				app.request(
					'appHotel/returnFamily.do',
					'POST',
					true,
					() => {
						let hotel = wx.getStorageSync('hotel');
						let keyMap = app.createSecretKey(hotel);
						let data = {
							ORDERNUM: order.ORDERNUM.toString() + hotel.toString(),
							TIMESTAMP: keyMap.timeStamp,
							FKEY: keyMap.key,
							HOTELID: hotel
						}
						return data;
					},
					res => {
						wx.hideLoading();
						let code = res.data.code;
						let message = '';
						if (res.data.code == 101) {
							message = '退房成功';
						} else {
							message = '退房失败，请联系前台工作人员';
						}
						wx.redirectTo({
							url: '/pages/result/result?code=' + code + '&message=' + message,
						})
					},
					res => {
						wx.hideLoading();
					}
				)
			}
		},
    }
})
