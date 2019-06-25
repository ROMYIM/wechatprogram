// pages/home/home.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
		recordSource: '',
		hidden: true,
		currentPageIndex: 0
    },

    redirectHandler: function (event) {
		if (event && event.detail) {
			this.pages[event.detail.oldPage].hidePage();
			this.pages[event.detail.newPage].showPage();
			wx.setNavigationBarTitle({
				title: event.detail.pageName,
			});
			this.setData({
				currentPageIndex: event.detail.newPage,
			})
		}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		app.login();
		this.dialog = this.selectComponent('#registerDialog');
		this.tabbar = this.selectComponent('#tabbar');
		this.pages = [];
		this.pages.push(this.selectComponent('#index'));
		this.pages.push(this.selectComponent('#control'));
		this.pages.push(this.selectComponent('#service'));
		this.pages.push(this.selectComponent('#own'));
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
		this.pages[0].showPage();
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
		if (this.pages[this.data.currentPageIndex].pullDownRefresh) {
			this.pages[this.data.currentPageIndex].pullDownRefresh();
			wx.stopPullDownRefresh();
		}
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
		return;
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    dialogConfirmHandler: function (event) {
      // app.globalData.canILogin = true;
      // app.login(this.pageIndex);
		if (event && event.detail) {
			wx.navigateTo({
				url: event.detail.url,
				success: function (res) { },
				fail: function (res) { },
				complete: function (res) { console.log(res) },
			})
			console.log('click register');
		}
		this.dialog.hideDialog();
    },

	closeRecordDialog: function() {
		this.tabbar.setData({
			recordDialogHidden: true
		})
		this.setData({
			hidden: true
		})
	},

	openRecordDialog: function() {
		this.setData({
			hidden: false
		})
	},

})