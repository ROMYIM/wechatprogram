const airOnPicture = '/resources/control/airconditioner/air_icon_on.png';
const airOffPicture = '/resources/control/airconditioner/air_icon_off.png';
const airColdPicture = '/resources/control/airconditioner/air_icon_cold.png';
const airHotPicture = "/resources/control/airconditioner/air_icon_hot.png";
const airWaterPicture = "/resources/control/airconditioner/air_icon_water.png";
const airWindPicture = "/resources/control/airconditioner/air_icon_bigbig.png";
const airSpeedLittlePicture = "/resources/control/airconditioner/air_icon_speed_big.png";
const airSpeedMiddlePicture = "/resources/control/airconditioner/air_icon_speed_bigbig.png";
const airSpeedLargePicture = "/resources/control/airconditioner/air_icon_speed_bigbigbig.png";

export class AirContioner {
	constructor(device, airControllCode) {
		this.device = device;
		this.picture = airControllCode.getPicture();
		this.mode = [0, 1, 2, 3, 4];
		this.currentCommand = [0, 0, 0, 1];
		this.windMode = [0, 1];
		this.windSpeed = [0, 3, 2, 1];
		this.temperature = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
		this.selectedMode = 8;
		this.speed = 0;
		this.createCommandCode = function () {
			let commandCode = this.currentCommand[3] + 
			this.currentCommand[2] * 15 + 
			this.currentCommand[1] * 60 + 
			this.currentCommand[0] * 120 + 2;
			console.log('模式：' + this.currentCommand[0].toString());
			console.log('风向：' + this.currentCommand[1].toString());
			console.log('风速：' + this.currentCommand[2].toString());
			console.log('温度：' + this.currentCommand[3].toString());
			console.log(commandCode.toString());
			return commandCode;
		};
		this.updateConditionerState = function (code) {
			this.picture = code.getPicture();
			let buttonIndex = code.getSelectedButtonIndex();
			if (buttonIndex >= 0 && this.selectedMode != buttonIndex) {
				this.list[this.selectedMode].icon = this.list[this.selectedMode].offIcon;
				this.list[buttonIndex].icon = this.list[buttonIndex].onIcon;
				this.selectedMode = buttonIndex;
			} else {
				
			}
		};
		this.list = [
			{
				name: '开关',
				offIcon: '/resources/control/airconditioner/air_button_swith_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_swith_press.png',
				icon: '/resources/control/airconditioner/air_button_swith_nor.png',
				clickHandler: function (airConditioner) {
					let commandCode = 0;
					console.log(this)
					if (airConditioner.picture == airOffPicture) {
						airConditioner.picture = airOnPicture;
						commandCode = 2;
					} else {
						airConditioner.picture = airOffPicture;
						airConditioner.speed = 0;
						commandCode = 1;
					}
					airConditioner.currentCommand = [0, 0, 0, 1];
					airConditioner.list[airConditioner.selectedMode].exChangeIcon();
					this.exChangeIcon();
					return commandCode;
				},
				exChangeIcon: function () {
					var iconTemp = this.onIcon;
					this.onIcon = this.offIcon;
					this.offIcon = iconTemp;
				}
			},
			{
				name: '送风',
				offIcon: '/resources/control/airconditioner/air_button_supply_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_supply_press.png',
				clickHandler: function (airConditioner) {
					let commandCode = 0;
					if (airConditioner.picture == airOffPicture) {
						return 1;
					} else {
						airConditioner.picture = airWindPicture;
						airConditioner.list[airConditioner.selectedMode].exChangeIcon();
						this.exChangeIcon();
						airConditioner.selectedMode = 1;
						let temperatureIndex = airConditioner.list[4].value - 16;
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						airConditioner.currentCommand[0] = airConditioner.mode[4];
						commandCode = airConditioner.createCommandCode();
					}
					return commandCode;
				},
				exChangeIcon: function () {
					var iconTemp = this.onIcon;
					this.onIcon = this.offIcon;
					this.offIcon = iconTemp;
				}
			},
			{
				name: '风速',
				offIcon: '/resources/control/airconditioner/air_button_speed_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_speed_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return 1;
					} else {
						airConditioner.speed = airConditioner.speed % 3 + 1;
						switch (airConditioner.speed) {
							case 1: airConditioner.picture = airSpeedLittlePicture;
							break;
							case 2: airConditioner.picture = airSpeedMiddlePicture;
							break;
							case 3: airConditioner.picture = airSpeedLargePicture;
							break;
						}
						airConditioner.currentCommand[2] = airConditioner.windSpeed[airConditioner.speed];
						let temperatureIndex = airConditioner.list[4].value - 16;
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						let commandCode = airConditioner.createCommandCode();
						return commandCode;	
					}
				}
			},
			{
				name: '降温',
				offIcon: '/resources/control/airconditioner/air_button_cool_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_cool_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return 1;
					} else {
						airConditioner.list[4].value--;
						let temperatureIndex = airConditioner.list[4].value - 16;
						if (temperatureIndex < 0) {
							temperatureIndex = 0
							airConditioner.list[4].value = 16;
						}
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						return airConditioner.createCommandCode();
					}
				}
			},
			{
				name: '温度',
				value: airControllCode.temperatureCode,
			},
			{
				name: '升温',
				offIcon: '/resources/control/airconditioner/air_button_warm_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_warm_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return;
					} else {
						airConditioner.list[4].value++;
						let temperatureIndex = airConditioner.list[4].value - 16;
						if (temperatureIndex > 14) {
							temperatureIndex = 14
							airConditioner.list[4].value = 30;
						}
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						return airConditioner.createCommandCode();
					}
				}
			},
			{
				name: '除湿',
				offIcon: '/resources/control/airconditioner/air_button_water_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_water_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return 1;
					} else {
						airConditioner.picture = airWaterPicture;
						airConditioner.list[airConditioner.selectedMode].exChangeIcon();
						this.exChangeIcon();
						airConditioner.selectedMode = 6;
						airConditioner.currentCommand[0] = airConditioner.mode[3];
						let temperatureIndex = airConditioner.list[4].value - 16;
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						return airConditioner.createCommandCode();
					}
				},
				exChangeIcon: function () {
					var iconTemp = this.onIcon;
					this.onIcon = this.offIcon;
					this.offIcon = iconTemp;
				}
			},
			{
				name: '制热',
				offIcon: '/resources/control/airconditioner/air_button_hot_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_hot_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return;
					} else {
						airConditioner.picture = airHotPicture;
						airConditioner.list[airConditioner.selectedMode].exChangeIcon();
						this.exChangeIcon();
						airConditioner.selectedMode = 7;
						airConditioner.currentCommand[0] = airConditioner.mode[2];
						let temperatureIndex = airConditioner.list[4].value - 16;
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						return airConditioner.createCommandCode();
					}
				},
				exChangeIcon: function () {
					var iconTemp = this.onIcon;
					this.onIcon = this.offIcon;
					this.offIcon = iconTemp;
				}
			},
			{
				name: '制冷',
				offIcon: '/resources/control/airconditioner/air_button_cold_nor.png',
				onIcon: '/resources/control/airconditioner/air_button_cold_press.png',
				clickHandler: function (airConditioner) {
					if (airConditioner.picture == airOffPicture) {
						return;
					} else {
						airConditioner.picture = airColdPicture;
						airConditioner.list[airConditioner.selectedMode].exChangeIcon();
						this.exChangeIcon();
						airConditioner.selectedMode = 8;
						airConditioner.currentCommand[0] = airConditioner.mode[0];
						let temperatureIndex = airConditioner.list[4].value - 16;
						airConditioner.currentCommand[3] = airConditioner.temperature[temperatureIndex];
						return airConditioner.createCommandCode();
					}
				},
				exChangeIcon: function () {
					var iconTemp = this.onIcon;
					this.onIcon = this.offIcon;
					this.offIcon = iconTemp;
				}
			}
		];
		const buttonIndex = airControllCode.getSelectedButtonIndex();
		if (buttonIndex >= 0) {
			this.list[0].exChangeIcon();
			if (buttonIndex > 0) {
				this.list[buttonIndex].exChangeIcon();
				this.selectedMode = buttonIndex;
			}
		}
	}
}

export class AirControllCode {
	constructor(airCodeString) {
		let codeArray = airCodeString.split(',');
		if (codeArray && codeArray.length == 6) {
			this.oridinal = codeArray[0];
			this.switchCode = codeArray[1];
			this.modeCode = codeArray[2];
			this.speedCode = codeArray[3];
			this.directionCode = codeArray[4];
			this.temperatureCode = codeArray[5];
		}
	}

	getPicture() {
		let picture = '';
		if (this.switchCode == '关机') {
			picture = airOffPicture;
		} else {
			switch (this.modeCode) {
				case '制冷':
					picture = airColdPicture;
					break;
				case '制热':
					picture = airHotPicture;
					break;
				case '抽湿':
					picture = airWaterPicture;
					break;
				case '送风':
					picture = airWindPicture;
					break;
				default:
					picture = airOnPicture;
					break;
			}
		}
		if (picture == airWindPicture) {
			switch (this.speedCode) {
				case '低':
					picture = airSpeedLittlePicture;
					break;
				case '中':
					picture = airSpeedMiddlePicture;
					break;
				case '高':
					picture = airSpeedLargePicture;
					break;
				default:
					picture = airSpeedMiddlePicture;
					break;
			}
		}
		return picture;
	}

	getSelectedButtonIndex() {
		let buttonIndex = -1;
		if (this.switchCode == '关机') {
			buttonIndex = -1;
		} else {
			switch (this.modeCode) {
				case '制冷':
					buttonIndex = 8;
					break;
				case '制热':
					buttonIndex = 7;
					break;
				case '抽湿':
					buttonIndex = 6;
					break;
				case '送风':
					buttonIndex = 1;
					break;
				default:
					buttonIndex = 0;
					break;
			}
		}
		return buttonIndex;
	}
}