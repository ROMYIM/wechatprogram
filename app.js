//app.js
import { md5 } from 'utils/util.js'                  

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    // this.login();

    var phone = wx.getStorageSync('phone');
    if (phone) {
      this.globalData.registerState = true
    }
    var family = wx.getStorageSync('family');

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } 
      }
    });
    this.globalData.recorderManager = wx.getRecorderManager();
  },

  request: function(url, method, needLogin, paramsPackage, successFunction, failedFunction) {
    if (needLogin) {
      this.checkSession();
      var sid = wx.getStorageSync('sid');
      if (sid == undefined || sid == null || sid.length == 0) {
        this.login();
        return;
      }
      if (!this.globalData.registerState) {
        var page = getCurrentPages()[0];
        page.dialog.showDialog();
        return;
      }
    }
    var data = paramsPackage();
    console.log(this.globalData.baseUrl + url);
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: this.globalData.baseUrl + url,
      data: data,
      method: method,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      responseType: 'text',
      success: successFunction,
      fail: failedFunction,
      // complete: function (res) { wx.hideLoading() },
    })
  },

  requestErrorCallBack: function (res) {
    wx.showToast({
      title: res,
      icon: 'none'
    })
  },

  login: function (successCallback) {
    console.log("login");
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.showLoading({
          title: '加载中',
        })
        var timeStamp = new Date().getTime();
        var keyMap = this.createSecretKey(this.globalData.secret);
        console.log(keyMap.key);
        wx.request({
          url: this.globalData.baseUrl + 'appUser/wxAuthorization',
          method: 'POST',
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            APPID: this.globalData.appID,
            SECRET: this.globalData.secret,
            CODE: res.code,
            TIMESTAMP: keyMap.timeStamp,
            FKEY: keyMap.key
          },
          success: res => {
            console.log(res.data);
            if (res.data.code == 101) {
              wx.setStorageSync("sid", res.data.map['OPENID']);
              wx.setStorageSync("hotel", res.data.map['HOTELID']);
              wx.setStorageSync('user', res.data.map['USERID']);
              wx.setStorageSync('phone', res.data.map['MOBILE']);
              // wx.setStorageSync('familyList', res.data.data);
              // wx.setStorageSync('family', res.data.data[0]);
              if (wx.getStorageSync('phone')) {
                this.globalData.registerState = true
              }
              // this.getDevices();
              if (successCallback) {
                successCallback();
              }
              // _this.request(url, method, needLogin, paramsPackage, successFunction, failedFunction)
            } else {
              // wx.removeStorageSync('hotel');
              // wx.removeStorageSync('user');
              if (res.data.map != null && res.data.map["OPENID"] != undefined) {
                wx.setStorageSync("sid", res.data.map['OPENID']);
                let pages = getCurrentPages();
                console.log(pages)
                var page = pages[0];
                page.dialog.showDialog()
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            }
          },
          fail: res => {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 1000
            })
          },
          complete: res => {
            wx.hideLoading();
          }
        })
        console.log(res.code);
      },
      complete: res => {
        wx.hideLoading();
      }
    })
  },

  getUserInfo: function (canIUse) {
    if (this.globalData.userInfo) {
      this.bindUserInfo();
    } else if (canIUse) {
      this.userInfoReadyCallback = res => {
        this.globalData.userInfo = res.userInfo;
        this.bindUserInfo();
      }
    } else {
      wx.getUserInfo({
        withCredentials: false,
        lang: 'zh_CN',
        success: function (res) {
          this.globalData.userInfo = res.userInfo;
          this.bindUserInfo();
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          wx.showToast({
            title: res
          })
        },
      })

    }
  },

  checkSession: function() {
    wx.checkSession({
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res)
        wx.removeStorageSync('sid');
      },
      complete: function(res) {
        console.log(res);
      },
    })
  },

  redirectNewPage: function (eventSource) {
    if (eventSource && eventSource.detail) {
      wx.switchTab({
        url: eventSource.detail.newPage,
        complete: (res) => console.log(res)
      })
    }
  },

  createSecretKey: function(code) {
    var timeStamp = new Date().getTime();
    var key = code.toString() + timeStamp + this.globalData.secretKey;
    console.log(key);
    var keyMap = {
      key: md5(key),
      timeStamp: timeStamp
    }
    return keyMap;
  },

  getDevices: function (callback) {
    var family = wx.getStorageSync('family');
    if (family) {
      var startTime = family.STARTTIME;
      var endTime = family.ENDTIME;
      var nowTime = new Date().getTime();
      if (nowTime < startTime || nowTime > endTime) {
        return;
      }
      var url = 'appFamily/getAppDevice.do';
      this.request(
        url,
        'POST',
        true,
        () => {
          var user = wx.getStorageSync('user');
          var keyMap = this.createSecretKey(user);
          var data = {
            USERID: user,
            FAMILYID: family.FAMILYID,
            FKEY: keyMap.key,
            TIMESTAMP: keyMap.timeStamp
          };
          return data;
        },
        res => {
          wx.hideLoading();
          if (res.data.code == 101) {
            console.log(res.data.map)
            this.globalData.airConditionList = res.data.map.airDeviceList;
            this.globalData.curtainList = res.data.map.curtainDeviceList;
            this.globalData.sceneList = res.data.map.sceneDeviceList;
            this.globalData.lambList = res.data.map.switchDeviceList;
            if (callback) {
              callback();
            }
            // this.createSocket();
          } else {
            this.globalData.airConditionList = [];
            this.globalData.curtainList = [];
            this.globalData.sceneList = [];
            this.globalData.lambList = [];
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        },
        res => {
          wx.hideLoading();
          wx.showToast({
            title: '服务器维护中',
          })
        }
      )
      
    } 
  },

  createSocket: function () {
    if (!this.globalData.webSocket) {
      this.globalData.webSocket = wx.connectSocket({
        url: this.globalData.socketUrl
      })
    }
  },

  unOpenTips: function () {
    wx.showToast({
      title: '该功能暂未开放',
      icon: 'none',
      duration: 1500
    })
  },

  globalData: {
    userInfo: null,
    appID: 'wxca20cf2091c1f4b9',
    secret: 'a3c50569004cd6bd101b727f2a002055',
    // baseUrl: 'http://192.168.24.24:8081/smarthotel/',
    baseUrl: 'https://mkhotel.gotechcn.cn:8082/smarthotel/',
    // baseUrl: 'http://172.24.9.136:8083/smarthotel/',
    baseImageUrl: 'https://mkhotel.gotechcn.cn:8082/smarthotelImages/',
    socketUrl: '',
    canILogin: false,
    recorderManager: null,
    secretKey: 'p!P2QklnjGGaZKlw',
    registerState: false,
    webSocket: null,
    soketUrl: '',
    airConditionList: [],
    curtainList: [],
    sceneList: [],
    lambList: []
  }
})