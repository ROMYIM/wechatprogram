const curtainOpenPicture = '/resources/control/curtain/curtain_on.png';
const curtainClosePicture = '/resources/control/curtain/curtain_off.png';
const curtainPausePicture = '/resources/control/curtain/curtain_pause.png';

const curtianPictures = [curtainOpenPicture, curtainPausePicture, curtainClosePicture];

const app = getApp();

export class Curtain {

	constructor(device) {
		this.picture = curtainOpenPicture;
		if (device.STATECONNECTION != 0 && device.ISLOST == 0) {
			switch (device.STATESWITCH) {
				case 0: this.picture = curtainClosePicture;
					break;
				case 1: this.picture = curtainOpenPicture;
					break;
				case 2: this.picture = curtainPausePicture;
					break;
			}
		}
    this.device = device;
    this.list = [];
    this.controlDevice = function (context, button) {
		app.request(
			'appFamily/changeDevice.do',
			'POST',
			true,
			() => {
				let user = wx.getStorageSync('user');
				let keyMap = app.createSecretKey(user);
				this.device.SNID = this.device.GATEWAYMAC;
				this.device.DATATYPE = '12';
				this.device.OPERATETYPE = '82';
				this.device.DEVICECOMMAND = button.commandCode;
				let deviceParams = JSON.stringify(this.device);
				let data = {
					SNID: this.device.SNID,
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
					button.clickHandler(this);
					context.setData({
						curtain: context.data.curtain
					})
					wx.showToast({
						title: '控制成功',
						icon: 'none',
						duration: 1500
					})
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
					})
				}
			},
			res => {

			}
		)
    };
    this.list = [
		new CurtainButton(
			'/resources/control/curtain/curtaincontrol_button_on_nor.png',
			'/resources/control/curtain/curtaincontrol_button_on_press.png',
			'打开', 0, '01'),
		new CurtainButton(
			'/resources/control/curtain/curtaincontrol_button_pause_nor.png',
			'/resources/control/curtain/curtaincontrol_button_pause_press.png',
			'暂停', 1, '02'),
		new CurtainButton(
			'/resources/control/curtain/curtaincontrol_button_off_nor.png',
			'/resources/control/curtain/curtaincontrol_button_off_press.png',
			'关闭', 2, '00'),  
    ]
  }
}

class CurtainButton {
	constructor(offIcon, onIcon, name, pictureIndex, commandCode) {
		this.offIcon = offIcon;
		this.onIcon = onIcon;
		this.icon = offIcon;
		this.name = name;
		this.commandCode = commandCode;
		this.clickHandler = function (curtain) {
			curtain.picture = curtianPictures[pictureIndex];
			this.icon = this.onIcon
		}
	}
}