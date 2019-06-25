// components/control/control.js
import { AirContioner } from "./devices/airConditioner.js";
import { Curtain } from "./devices/curtain.js";
import { AirControllCode } from "./devices/airConditioner.js";

const app = getApp();
const iconTextColor = ['#6f6f6f', '#4a7df7'];

const lightOnPicture = '/resources/control/lamb/light_on.png';
const lightOffPicture = '/resources/control/lamb/light_off.png';

const curtainOpenPicture = '/resources/control/curtain/curtain_on.png';
const curtainClosePicture = '/resources/control/curtain/curtain_off.png';
const curtainPausePicture = '/resources/control/curtain/curtain_pause.png';

const tvOnPicture = '/resources/control/tv/tv_on.png';
const tvOffPicture = '/resources/control/tv/tv_off.png';

const airCode = "001,关机,任意模式,任意风量,任意风向,16\n" +
            "002,开机,任意模式,任意风量,任意风向,16\n" +
            "003,开机,制冷,自动,自动,16\n" +
            "004,开机,制冷,自动,自动,17\n" +
            "005,开机,制冷,自动,自动,18\n" +
            "006,开机,制冷,自动,自动,19\n" +
            "007,开机,制冷,自动,自动,20\n" +
            "008,开机,制冷,自动,自动,21\n" +
            "009,开机,制冷,自动,自动,22\n" +
            "010,开机,制冷,自动,自动,23\n" +
            "011,开机,制冷,自动,自动,24\n" +
            "012,开机,制冷,自动,自动,25\n" +
            "013,开机,制冷,自动,自动,26\n" +
            "014,开机,制冷,自动,自动,27\n" +
            "015,开机,制冷,自动,自动,28\n" +
            "016,开机,制冷,自动,自动,29\n" +
            "017,开机,制冷,自动,自动,30\n" +
            "018,开机,制冷,高,自动,16\n" +
            "019,开机,制冷,高,自动,17\n" +
            "020,开机,制冷,高,自动,18\n" +
            "021,开机,制冷,高,自动,19\n" +
            "022,开机,制冷,高,自动,20\n" +
            "023,开机,制冷,高,自动,21\n" +
            "024,开机,制冷,高,自动,22\n" +
            "025,开机,制冷,高,自动,23\n" +
            "026,开机,制冷,高,自动,24\n" +
            "027,开机,制冷,高,自动,25\n" +
            "028,开机,制冷,高,自动,26\n" +
            "029,开机,制冷,高,自动,27\n" +
            "030,开机,制冷,高,自动,28\n" +
            "031,开机,制冷,高,自动,29\n" +
            "032,开机,制冷,高,自动,30\n" +
            "033,开机,制冷,中,自动,16\n" +
            "034,开机,制冷,中,自动,17\n" +
            "035,开机,制冷,中,自动,18\n" +
            "036,开机,制冷,中,自动,19\n" +
            "037,开机,制冷,中,自动,20\n" +
            "038,开机,制冷,中,自动,21\n" +
            "039,开机,制冷,中,自动,22\n" +
            "040,开机,制冷,中,自动,23\n" +
            "041,开机,制冷,中,自动,24\n" +
            "042,开机,制冷,中,自动,25\n" +
            "043,开机,制冷,中,自动,26\n" +
            "044,开机,制冷,中,自动,27\n" +
            "045,开机,制冷,中,自动,28\n" +
            "046,开机,制冷,中,自动,29\n" +
            "047,开机,制冷,中,自动,30\n" +
            "048,开机,制冷,低,自动,16\n" +
            "049,开机,制冷,低,自动,17\n" +
            "050,开机,制冷,低,自动,18\n" +
            "051,开机,制冷,低,自动,19\n" +
            "052,开机,制冷,低,自动,20\n" +
            "053,开机,制冷,低,自动,21\n" +
            "054,开机,制冷,低,自动,22\n" +
            "055,开机,制冷,低,自动,23\n" +
            "056,开机,制冷,低,自动,24\n" +
            "057,开机,制冷,低,自动,25\n" +
            "058,开机,制冷,低,自动,26\n" +
            "059,开机,制冷,低,自动,27\n" +
            "060,开机,制冷,低,自动,28\n" +
            "061,开机,制冷,低,自动,29\n" +
            "062,开机,制冷,低,自动,30\n" +
            "063,开机,制冷,自动,手动,16\n" +
            "064,开机,制冷,自动,手动,17\n" +
            "065,开机,制冷,自动,手动,18\n" +
            "066,开机,制冷,自动,手动,19\n" +
            "067,开机,制冷,自动,手动,20\n" +
            "068,开机,制冷,自动,手动,21\n" +
            "069,开机,制冷,自动,手动,22\n" +
            "070,开机,制冷,自动,手动,23\n" +
            "071,开机,制冷,自动,手动,24\n" +
            "072,开机,制冷,自动,手动,25\n" +
            "073,开机,制冷,自动,手动,26\n" +
            "074,开机,制冷,自动,手动,27\n" +
            "075,开机,制冷,自动,手动,28\n" +
            "076,开机,制冷,自动,手动,29\n" +
            "077,开机,制冷,自动,手动,30\n" +
            "078,开机,制冷,高,手动,16\n" +
            "079,开机,制冷,高,手动,17\n" +
            "080,开机,制冷,高,手动,18\n" +
            "081,开机,制冷,高,手动,19\n" +
            "082,开机,制冷,高,手动,20\n" +
            "083,开机,制冷,高,手动,21\n" +
            "084,开机,制冷,高,手动,22\n" +
            "085,开机,制冷,高,手动,23\n" +
            "086,开机,制冷,高,手动,24\n" +
            "087,开机,制冷,高,手动,25\n" +
            "088,开机,制冷,高,手动,26\n" +
            "089,开机,制冷,高,手动,27\n" +
            "090,开机,制冷,高,手动,28\n" +
            "091,开机,制冷,高,手动,29\n" +
            "092,开机,制冷,高,手动,30\n" +
            "093,开机,制冷,中,手动,16\n" +
            "094,开机,制冷,中,手动,17\n" +
            "095,开机,制冷,中,手动,18\n" +
            "096,开机,制冷,中,手动,19\n" +
            "097,开机,制冷,中,手动,20\n" +
            "098,开机,制冷,中,手动,21\n" +
            "099,开机,制冷,中,手动,22\n" +
            "100,开机,制冷,中,手动,23\n" +
            "101,开机,制冷,中,手动,24\n" +
            "102,开机,制冷,中,手动,25\n" +
            "103,开机,制冷,中,手动,26\n" +
            "104,开机,制冷,中,手动,27\n" +
            "105,开机,制冷,中,手动,28\n" +
            "106,开机,制冷,中,手动,29\n" +
            "107,开机,制冷,中,手动,30\n" +
            "108,开机,制冷,低,手动,16\n" +
            "109,开机,制冷,低,手动,17\n" +
            "110,开机,制冷,低,手动,18\n" +
            "111,开机,制冷,低,手动,19\n" +
            "112,开机,制冷,低,手动,20\n" +
            "113,开机,制冷,低,手动,21\n" +
            "114,开机,制冷,低,手动,22\n" +
            "115,开机,制冷,低,手动,23\n" +
            "116,开机,制冷,低,手动,24\n" +
            "117,开机,制冷,低,手动,25\n" +
            "118,开机,制冷,低,手动,26\n" +
            "119,开机,制冷,低,手动,27\n" +
            "120,开机,制冷,低,手动,28\n" +
            "121,开机,制冷,低,手动,29\n" +
            "122,开机,制冷,低,手动,30\n" +
            "123,开机,自动,自动,自动,16\n" +
            "124,开机,自动,自动,自动,17\n" +
            "125,开机,自动,自动,自动,18\n" +
            "126,开机,自动,自动,自动,19\n" +
            "127,开机,自动,自动,自动,20\n" +
            "128,开机,自动,自动,自动,21\n" +
            "129,开机,自动,自动,自动,22\n" +
            "130,开机,自动,自动,自动,23\n" +
            "131,开机,自动,自动,自动,24\n" +
            "132,开机,自动,自动,自动,25\n" +
            "133,开机,自动,自动,自动,26\n" +
            "134,开机,自动,自动,自动,27\n" +
            "135,开机,自动,自动,自动,28\n" +
            "136,开机,自动,自动,自动,29\n" +
            "137,开机,自动,自动,自动,30\n" +
            "138,开机,自动,高,自动,16\n" +
            "139,开机,自动,高,自动,17\n" +
            "140,开机,自动,高,自动,18\n" +
            "141,开机,自动,高,自动,19\n" +
            "142,开机,自动,高,自动,20\n" +
            "143,开机,自动,高,自动,21\n" +
            "144,开机,自动,高,自动,22\n" +
            "145,开机,自动,高,自动,23\n" +
            "146,开机,自动,高,自动,24\n" +
            "147,开机,自动,高,自动,25\n" +
            "148,开机,自动,高,自动,26\n" +
            "149,开机,自动,高,自动,27\n" +
            "150,开机,自动,高,自动,28\n" +
            "151,开机,自动,高,自动,29\n" +
            "152,开机,自动,高,自动,30\n" +
            "153,开机,自动,中,自动,16\n" +
            "154,开机,自动,中,自动,17\n" +
            "155,开机,自动,中,自动,18\n" +
            "156,开机,自动,中,自动,19\n" +
            "157,开机,自动,中,自动,20\n" +
            "158,开机,自动,中,自动,21\n" +
            "159,开机,自动,中,自动,22\n" +
            "160,开机,自动,中,自动,23\n" +
            "161,开机,自动,中,自动,24\n" +
            "162,开机,自动,中,自动,25\n" +
            "163,开机,自动,中,自动,26\n" +
            "164,开机,自动,中,自动,27\n" +
            "165,开机,自动,中,自动,28\n" +
            "166,开机,自动,中,自动,29\n" +
            "167,开机,自动,中,自动,30\n" +
            "168,开机,自动,低,自动,16\n" +
            "169,开机,自动,低,自动,17\n" +
            "170,开机,自动,低,自动,18\n" +
            "171,开机,自动,低,自动,19\n" +
            "172,开机,自动,低,自动,20\n" +
            "173,开机,自动,低,自动,21\n" +
            "174,开机,自动,低,自动,22\n" +
            "175,开机,自动,低,自动,23\n" +
            "176,开机,自动,低,自动,24\n" +
            "177,开机,自动,低,自动,25\n" +
            "178,开机,自动,低,自动,26\n" +
            "179,开机,自动,低,自动,27\n" +
            "180,开机,自动,低,自动,28\n" +
            "181,开机,自动,低,自动,29\n" +
            "182,开机,自动,低,自动,30\n" +
            "183,开机,自动,自动,手动,16\n" +
            "184,开机,自动,自动,手动,17\n" +
            "185,开机,自动,自动,手动,18\n" +
            "186,开机,自动,自动,手动,19\n" +
            "187,开机,自动,自动,手动,20\n" +
            "188,开机,自动,自动,手动,21\n" +
            "189,开机,自动,自动,手动,22\n" +
            "190,开机,自动,自动,手动,23\n" +
            "191,开机,自动,自动,手动,24\n" +
            "192,开机,自动,自动,手动,25\n" +
            "193,开机,自动,自动,手动,26\n" +
            "194,开机,自动,自动,手动,27\n" +
            "195,开机,自动,自动,手动,28\n" +
            "196,开机,自动,自动,手动,29\n" +
            "197,开机,自动,自动,手动,30\n" +
            "198,开机,自动,高,手动,16\n" +
            "199,开机,自动,高,手动,17\n" +
            "200,开机,自动,高,手动,18\n" +
            "201,开机,自动,高,手动,19\n" +
            "202,开机,自动,高,手动,20\n" +
            "203,开机,自动,高,手动,21\n" +
            "204,开机,自动,高,手动,22\n" +
            "205,开机,自动,高,手动,23\n" +
            "206,开机,自动,高,手动,24\n" +
            "207,开机,自动,高,手动,25\n" +
            "208,开机,自动,高,手动,26\n" +
            "209,开机,自动,高,手动,27\n" +
            "210,开机,自动,高,手动,28\n" +
            "211,开机,自动,高,手动,29\n" +
            "212,开机,自动,高,手动,30\n" +
            "213,开机,自动,中,手动,16\n" +
            "214,开机,自动,中,手动,17\n" +
            "215,开机,自动,中,手动,18\n" +
            "216,开机,自动,中,手动,19\n" +
            "217,开机,自动,中,手动,20\n" +
            "218,开机,自动,中,手动,21\n" +
            "219,开机,自动,中,手动,22\n" +
            "220,开机,自动,中,手动,23\n" +
            "221,开机,自动,中,手动,24\n" +
            "222,开机,自动,中,手动,25\n" +
            "223,开机,自动,中,手动,26\n" +
            "224,开机,自动,中,手动,27\n" +
            "225,开机,自动,中,手动,28\n" +
            "226,开机,自动,中,手动,29\n" +
            "227,开机,自动,中,手动,30\n" +
            "228,开机,自动,低,手动,16\n" +
            "229,开机,自动,低,手动,17\n" +
            "230,开机,自动,低,手动,18\n" +
            "231,开机,自动,低,手动,19\n" +
            "232,开机,自动,低,手动,20\n" +
            "233,开机,自动,低,手动,21\n" +
            "234,开机,自动,低,手动,22\n" +
            "235,开机,自动,低,手动,23\n" +
            "236,开机,自动,低,手动,24\n" +
            "237,开机,自动,低,手动,25\n" +
            "238,开机,自动,低,手动,26\n" +
            "239,开机,自动,低,手动,27\n" +
            "240,开机,自动,低,手动,28\n" +
            "241,开机,自动,低,手动,29\n" +
            "242,开机,自动,低,手动,30\n" +
            "243,开机,制热,自动,自动,16\n" +
            "244,开机,制热,自动,自动,17\n" +
            "245,开机,制热,自动,自动,18\n" +
            "246,开机,制热,自动,自动,19\n" +
            "247,开机,制热,自动,自动,20\n" +
            "248,开机,制热,自动,自动,21\n" +
            "249,开机,制热,自动,自动,22\n" +
            "250,开机,制热,自动,自动,23\n" +
            "251,开机,制热,自动,自动,24\n" +
            "252,开机,制热,自动,自动,25\n" +
            "253,开机,制热,自动,自动,26\n" +
            "254,开机,制热,自动,自动,27\n" +
            "255,开机,制热,自动,自动,28\n" +
            "256,开机,制热,自动,自动,29\n" +
            "257,开机,制热,自动,自动,30\n" +
            "258,开机,制热,高,自动,16\n" +
            "259,开机,制热,高,自动,17\n" +
            "260,开机,制热,高,自动,18\n" +
            "261,开机,制热,高,自动,19\n" +
            "262,开机,制热,高,自动,20\n" +
            "263,开机,制热,高,自动,21\n" +
            "264,开机,制热,高,自动,22\n" +
            "265,开机,制热,高,自动,23\n" +
            "266,开机,制热,高,自动,24\n" +
            "267,开机,制热,高,自动,25\n" +
            "268,开机,制热,高,自动,26\n" +
            "269,开机,制热,高,自动,27\n" +
            "270,开机,制热,高,自动,28\n" +
            "271,开机,制热,高,自动,29\n" +
            "272,开机,制热,高,自动,30\n" +
            "273,开机,制热,中,自动,16\n" +
            "274,开机,制热,中,自动,17\n" +
            "275,开机,制热,中,自动,18\n" +
            "276,开机,制热,中,自动,19\n" +
            "277,开机,制热,中,自动,20\n" +
            "278,开机,制热,中,自动,21\n" +
            "279,开机,制热,中,自动,22\n" +
            "280,开机,制热,中,自动,23\n" +
            "281,开机,制热,中,自动,24\n" +
            "282,开机,制热,中,自动,25\n" +
            "283,开机,制热,中,自动,26\n" +
            "284,开机,制热,中,自动,27\n" +
            "285,开机,制热,中,自动,28\n" +
            "286,开机,制热,中,自动,29\n" +
            "287,开机,制热,中,自动,30\n" +
            "288,开机,制热,低,自动,16\n" +
            "289,开机,制热,低,自动,17\n" +
            "290,开机,制热,低,自动,18\n" +
            "291,开机,制热,低,自动,19\n" +
            "292,开机,制热,低,自动,20\n" +
            "293,开机,制热,低,自动,21\n" +
            "294,开机,制热,低,自动,22\n" +
            "295,开机,制热,低,自动,23\n" +
            "296,开机,制热,低,自动,24\n" +
            "297,开机,制热,低,自动,25\n" +
            "298,开机,制热,低,自动,26\n" +
            "299,开机,制热,低,自动,27\n" +
            "300,开机,制热,低,自动,28\n" +
            "301,开机,制热,低,自动,29\n" +
            "302,开机,制热,低,自动,30\n" +
            "303,开机,制热,自动,手动,16\n" +
            "304,开机,制热,自动,手动,17\n" +
            "305,开机,制热,自动,手动,18\n" +
            "306,开机,制热,自动,手动,19\n" +
            "307,开机,制热,自动,手动,20\n" +
            "308,开机,制热,自动,手动,21\n" +
            "309,开机,制热,自动,手动,22\n" +
            "310,开机,制热,自动,手动,23\n" +
            "311,开机,制热,自动,手动,24\n" +
            "312,开机,制热,自动,手动,25\n" +
            "313,开机,制热,自动,手动,26\n" +
            "314,开机,制热,自动,手动,27\n" +
            "315,开机,制热,自动,手动,28\n" +
            "316,开机,制热,自动,手动,29\n" +
            "317,开机,制热,自动,手动,30\n" +
            "318,开机,制热,高,手动,16\n" +
            "319,开机,制热,高,手动,17\n" +
            "320,开机,制热,高,手动,18\n" +
            "321,开机,制热,高,手动,19\n" +
            "322,开机,制热,高,手动,20\n" +
            "323,开机,制热,高,手动,21\n" +
            "324,开机,制热,高,手动,22\n" +
            "325,开机,制热,高,手动,23\n" +
            "326,开机,制热,高,手动,24\n" +
            "327,开机,制热,高,手动,25\n" +
            "328,开机,制热,高,手动,26\n" +
            "329,开机,制热,高,手动,27\n" +
            "330,开机,制热,高,手动,28\n" +
            "331,开机,制热,高,手动,29\n" +
            "332,开机,制热,高,手动,30\n" +
            "333,开机,制热,中,手动,16\n" +
            "334,开机,制热,中,手动,17\n" +
            "335,开机,制热,中,手动,18\n" +
            "336,开机,制热,中,手动,19\n" +
            "337,开机,制热,中,手动,20\n" +
            "338,开机,制热,中,手动,21\n" +
            "339,开机,制热,中,手动,22\n" +
            "340,开机,制热,中,手动,23\n" +
            "341,开机,制热,中,手动,24\n" +
            "342,开机,制热,中,手动,25\n" +
            "343,开机,制热,中,手动,26\n" +
            "344,开机,制热,中,手动,27\n" +
            "345,开机,制热,中,手动,28\n" +
            "346,开机,制热,中,手动,29\n" +
            "347,开机,制热,中,手动,30\n" +
            "348,开机,制热,低,手动,16\n" +
            "349,开机,制热,低,手动,17\n" +
            "350,开机,制热,低,手动,18\n" +
            "351,开机,制热,低,手动,19\n" +
            "352,开机,制热,低,手动,20\n" +
            "353,开机,制热,低,手动,21\n" +
            "354,开机,制热,低,手动,22\n" +
            "355,开机,制热,低,手动,23\n" +
            "356,开机,制热,低,手动,24\n" +
            "357,开机,制热,低,手动,25\n" +
            "358,开机,制热,低,手动,26\n" +
            "359,开机,制热,低,手动,27\n" +
            "360,开机,制热,低,手动,28\n" +
            "361,开机,制热,低,手动,29\n" +
            "362,开机,制热,低,手动,30\n" +
            "363,开机,抽湿,自动,自动,16\n" +
            "364,开机,抽湿,自动,自动,17\n" +
            "365,开机,抽湿,自动,自动,18\n" +
            "366,开机,抽湿,自动,自动,19\n" +
            "367,开机,抽湿,自动,自动,20\n" +
            "368,开机,抽湿,自动,自动,21\n" +
            "369,开机,抽湿,自动,自动,22\n" +
            "370,开机,抽湿,自动,自动,23\n" +
            "371,开机,抽湿,自动,自动,24\n" +
            "372,开机,抽湿,自动,自动,25\n" +
            "373,开机,抽湿,自动,自动,26\n" +
            "374,开机,抽湿,自动,自动,27\n" +
            "375,开机,抽湿,自动,自动,28\n" +
            "376,开机,抽湿,自动,自动,29\n" +
            "377,开机,抽湿,自动,自动,30\n" +
            "378,开机,抽湿,高,自动,16\n" +
            "379,开机,抽湿,高,自动,17\n" +
            "380,开机,抽湿,高,自动,18\n" +
            "381,开机,抽湿,高,自动,19\n" +
            "382,开机,抽湿,高,自动,20\n" +
            "383,开机,抽湿,高,自动,21\n" +
            "384,开机,抽湿,高,自动,22\n" +
            "385,开机,抽湿,高,自动,23\n" +
            "386,开机,抽湿,高,自动,24\n" +
            "387,开机,抽湿,高,自动,25\n" +
            "388,开机,抽湿,高,自动,26\n" +
            "389,开机,抽湿,高,自动,27\n" +
            "390,开机,抽湿,高,自动,28\n" +
            "391,开机,抽湿,高,自动,29\n" +
            "392,开机,抽湿,高,自动,30\n" +
            "393,开机,抽湿,中,自动,16\n" +
            "394,开机,抽湿,中,自动,17\n" +
            "395,开机,抽湿,中,自动,18\n" +
            "396,开机,抽湿,中,自动,19\n" +
            "397,开机,抽湿,中,自动,20\n" +
            "398,开机,抽湿,中,自动,21\n" +
            "399,开机,抽湿,中,自动,22\n" +
            "400,开机,抽湿,中,自动,23\n" +
            "401,开机,抽湿,中,自动,24\n" +
            "402,开机,抽湿,中,自动,25\n" +
            "403,开机,抽湿,中,自动,26\n" +
            "404,开机,抽湿,中,自动,27\n" +
            "405,开机,抽湿,中,自动,28\n" +
            "406,开机,抽湿,中,自动,29\n" +
            "407,开机,抽湿,中,自动,30\n" +
            "408,开机,抽湿,低,自动,16\n" +
            "409,开机,抽湿,低,自动,17\n" +
            "410,开机,抽湿,低,自动,18\n" +
            "411,开机,抽湿,低,自动,19\n" +
            "412,开机,抽湿,低,自动,20\n" +
            "413,开机,抽湿,低,自动,21\n" +
            "414,开机,抽湿,低,自动,22\n" +
            "415,开机,抽湿,低,自动,23\n" +
            "416,开机,抽湿,低,自动,24\n" +
            "417,开机,抽湿,低,自动,25\n" +
            "418,开机,抽湿,低,自动,26\n" +
            "419,开机,抽湿,低,自动,27\n" +
            "420,开机,抽湿,低,自动,28\n" +
            "421,开机,抽湿,低,自动,29\n" +
            "422,开机,抽湿,低,自动,30\n" +
            "423,开机,抽湿,自动,手动,16\n" +
            "424,开机,抽湿,自动,手动,17\n" +
            "425,开机,抽湿,自动,手动,18\n" +
            "426,开机,抽湿,自动,手动,19\n" +
            "427,开机,抽湿,自动,手动,20\n" +
            "428,开机,抽湿,自动,手动,21\n" +
            "429,开机,抽湿,自动,手动,22\n" +
            "430,开机,抽湿,自动,手动,23\n" +
            "431,开机,抽湿,自动,手动,24\n" +
            "432,开机,抽湿,自动,手动,25\n" +
            "433,开机,抽湿,自动,手动,26\n" +
            "434,开机,抽湿,自动,手动,27\n" +
            "435,开机,抽湿,自动,手动,28\n" +
            "436,开机,抽湿,自动,手动,29\n" +
            "437,开机,抽湿,自动,手动,30\n" +
            "438,开机,抽湿,高,手动,16\n" +
            "439,开机,抽湿,高,手动,17\n" +
            "440,开机,抽湿,高,手动,18\n" +
            "441,开机,抽湿,高,手动,19\n" +
            "442,开机,抽湿,高,手动,20\n" +
            "443,开机,抽湿,高,手动,21\n" +
            "444,开机,抽湿,高,手动,22\n" +
            "445,开机,抽湿,高,手动,23\n" +
            "446,开机,抽湿,高,手动,24\n" +
            "447,开机,抽湿,高,手动,25\n" +
            "448,开机,抽湿,高,手动,26\n" +
            "449,开机,抽湿,高,手动,27\n" +
            "450,开机,抽湿,高,手动,28\n" +
            "451,开机,抽湿,高,手动,29\n" +
            "452,开机,抽湿,高,手动,30\n" +
            "453,开机,抽湿,中,手动,16\n" +
            "454,开机,抽湿,中,手动,17\n" +
            "455,开机,抽湿,中,手动,18\n" +
            "456,开机,抽湿,中,手动,19\n" +
            "457,开机,抽湿,中,手动,20\n" +
            "458,开机,抽湿,中,手动,21\n" +
            "459,开机,抽湿,中,手动,22\n" +
            "460,开机,抽湿,中,手动,23\n" +
            "461,开机,抽湿,中,手动,24\n" +
            "462,开机,抽湿,中,手动,25\n" +
            "463,开机,抽湿,中,手动,26\n" +
            "464,开机,抽湿,中,手动,27\n" +
            "465,开机,抽湿,中,手动,28\n" +
            "466,开机,抽湿,中,手动,29\n" +
            "467,开机,抽湿,中,手动,30\n" +
            "468,开机,抽湿,低,手动,16\n" +
            "469,开机,抽湿,低,手动,17\n" +
            "470,开机,抽湿,低,手动,18\n" +
            "471,开机,抽湿,低,手动,19\n" +
            "472,开机,抽湿,低,手动,20\n" +
            "473,开机,抽湿,低,手动,21\n" +
            "474,开机,抽湿,低,手动,22\n" +
            "475,开机,抽湿,低,手动,23\n" +
            "476,开机,抽湿,低,手动,24\n" +
            "477,开机,抽湿,低,手动,25\n" +
            "478,开机,抽湿,低,手动,26\n" +
            "479,开机,抽湿,低,手动,27\n" +
            "480,开机,抽湿,低,手动,28\n" +
            "481,开机,抽湿,低,手动,29\n" +
            "482,开机,抽湿,低,手动,30\n" +
            "483,开机,送风,自动,自动,16\n" +
            "484,开机,送风,自动,自动,17\n" +
            "485,开机,送风,自动,自动,18\n" +
            "486,开机,送风,自动,自动,19\n" +
            "487,开机,送风,自动,自动,20\n" +
            "488,开机,送风,自动,自动,21\n" +
            "489,开机,送风,自动,自动,22\n" +
            "490,开机,送风,自动,自动,23\n" +
            "491,开机,送风,自动,自动,24\n" +
            "492,开机,送风,自动,自动,25\n" +
            "493,开机,送风,自动,自动,26\n" +
            "494,开机,送风,自动,自动,27\n" +
            "495,开机,送风,自动,自动,28\n" +
            "496,开机,送风,自动,自动,29\n" +
            "497,开机,送风,自动,自动,30\n" +
            "498,开机,送风,高,自动,16\n" +
            "499,开机,送风,高,自动,17\n" +
            "500,开机,送风,高,自动,18\n" +
            "501,开机,送风,高,自动,19\n" +
            "502,开机,送风,高,自动,20\n" +
            "503,开机,送风,高,自动,21\n" +
            "504,开机,送风,高,自动,22\n" +
            "505,开机,送风,高,自动,23\n" +
            "506,开机,送风,高,自动,24\n" +
            "507,开机,送风,高,自动,25\n" +
            "508,开机,送风,高,自动,26\n" +
            "509,开机,送风,高,自动,27\n" +
            "510,开机,送风,高,自动,28\n" +
            "511,开机,送风,高,自动,29\n" +
            "512,开机,送风,高,自动,30\n" +
            "513,开机,送风,中,自动,16\n" +
            "514,开机,送风,中,自动,17\n" +
            "515,开机,送风,中,自动,18\n" +
            "516,开机,送风,中,自动,19\n" +
            "517,开机,送风,中,自动,20\n" +
            "518,开机,送风,中,自动,21\n" +
            "519,开机,送风,中,自动,22\n" +
            "520,开机,送风,中,自动,23\n" +
            "521,开机,送风,中,自动,24\n" +
            "522,开机,送风,中,自动,25\n" +
            "523,开机,送风,中,自动,26\n" +
            "524,开机,送风,中,自动,27\n" +
            "525,开机,送风,中,自动,28\n" +
            "526,开机,送风,中,自动,29\n" +
            "527,开机,送风,中,自动,30\n" +
            "528,开机,送风,低,自动,16\n" +
            "529,开机,送风,低,自动,17\n" +
            "530,开机,送风,低,自动,18\n" +
            "531,开机,送风,低,自动,19\n" +
            "532,开机,送风,低,自动,20\n" +
            "533,开机,送风,低,自动,21\n" +
            "534,开机,送风,低,自动,22\n" +
            "535,开机,送风,低,自动,23\n" +
            "536,开机,送风,低,自动,24\n" +
            "537,开机,送风,低,自动,25\n" +
            "538,开机,送风,低,自动,26\n" +
            "539,开机,送风,低,自动,27\n" +
            "540,开机,送风,低,自动,28\n" +
            "541,开机,送风,低,自动,29\n" +
            "542,开机,送风,低,自动,30\n" +
            "543,开机,送风,自动,手动,16\n" +
            "544,开机,送风,自动,手动,17\n" +
            "545,开机,送风,自动,手动,18\n" +
            "546,开机,送风,自动,手动,19\n" +
            "547,开机,送风,自动,手动,20\n" +
            "548,开机,送风,自动,手动,21\n" +
            "549,开机,送风,自动,手动,22\n" +
            "550,开机,送风,自动,手动,23\n" +
            "551,开机,送风,自动,手动,24\n" +
            "552,开机,送风,自动,手动,25\n" +
            "553,开机,送风,自动,手动,26\n" +
            "554,开机,送风,自动,手动,27\n" +
            "555,开机,送风,自动,手动,28\n" +
            "556,开机,送风,自动,手动,29\n" +
            "557,开机,送风,自动,手动,30\n" +
            "558,开机,送风,高,手动,16\n" +
            "559,开机,送风,高,手动,17\n" +
            "560,开机,送风,高,手动,18\n" +
            "561,开机,送风,高,手动,19\n" +
            "562,开机,送风,高,手动,20\n" +
            "563,开机,送风,高,手动,21\n" +
            "564,开机,送风,高,手动,22\n" +
            "565,开机,送风,高,手动,23\n" +
            "566,开机,送风,高,手动,24\n" +
            "567,开机,送风,高,手动,25\n" +
            "568,开机,送风,高,手动,26\n" +
            "569,开机,送风,高,手动,27\n" +
            "570,开机,送风,高,手动,28\n" +
            "571,开机,送风,高,手动,29\n" +
            "572,开机,送风,高,手动,30\n" +
            "573,开机,送风,中,手动,16\n" +
            "574,开机,送风,中,手动,17\n" +
            "575,开机,送风,中,手动,18\n" +
            "576,开机,送风,中,手动,19\n" +
            "577,开机,送风,中,手动,20\n" +
            "578,开机,送风,中,手动,21\n" +
            "579,开机,送风,中,手动,22\n" +
            "580,开机,送风,中,手动,23\n" +
            "581,开机,送风,中,手动,24\n" +
            "582,开机,送风,中,手动,25\n" +
            "583,开机,送风,中,手动,26\n" +
            "584,开机,送风,中,手动,27\n" +
            "585,开机,送风,中,手动,28\n" +
            "586,开机,送风,中,手动,29\n" +
            "587,开机,送风,中,手动,30\n" +
            "588,开机,送风,低,手动,16\n" +
            "589,开机,送风,低,手动,17\n" +
            "590,开机,送风,低,手动,18\n" +
            "591,开机,送风,低,手动,19\n" +
            "592,开机,送风,低,手动,20\n" +
            "593,开机,送风,低,手动,21\n" +
            "594,开机,送风,低,手动,22\n" +
            "595,开机,送风,低,手动,23\n" +
            "596,开机,送风,低,手动,24\n" +
            "597,开机,送风,低,手动,25\n" +
            "598,开机,送风,低,手动,26\n" +
            "599,开机,送风,低,手动,27\n" +
            "600,开机,送风,低,手动,28\n" +
            "601,开机,送风,低,手动,29\n" +
            "602,开机,送风,低,手动,30\n";

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
        currentDeviceName: '设备控制',
		hidden: true,
		iconList: [
            {
                id: 0,
                name: 'lamb',
                iconPath: '../../resources/control/curtaincontrol_icon_light-nor.png',
                selectedIconPath: '../../resources/control/curtaincontrol_icon_light-press.png',
                textColor: iconTextColor[0],
                selected: false,
                text: '灯光'
            },
            {
                id: 1,
                name: 'curtaine',
                iconPath: '../../resources/control/curtaincontrol_icon_curtain_nor.png',
                selectedIconPath: '../../resources/control/curtaincontrol_icon_curtain_press.png',
                textColor: iconTextColor[0],
                selected: false,
                text: '窗帘'
            },
            {
                id: 2,
                name: 'airConditioner',
                iconPath: '../../resources/control/curtaincontrol_icon_air_nor.png',
                selectedIconPath: '../../resources/control/curtaincontrol_icon_air_press.png',
                textColor: iconTextColor[0],
                selectd: false,
                text: '空调'
            },
            {
                id: 3,
                name: 'television',
                iconPath: '../../resources/control/curtaincontrol_icon_TV_nor.png',
                selectedIconPath: '../../resources/control/curtaincontrol_icon_TV_press.png',
                textColor: iconTextColor[0],
                selected: false,
                text: '电视'
            }
		],
		selectedIndex: 0,
		lamb: {
            picture: lightOffPicture,
            brightness: 0,
            switchButton: {
                name: '开关',
                offIcon: '/resources/control/lamb/curtaincontrol_button_on_nor.png',
                onIcon: '/resources/control/lamb/curtaincontrol_button_off_press.png',
                icon: '/resources/control/lamb/curtaincontrol_button_on_nor.png',
                text: '全开'
            },
            list: []
		},
		curtain: {
            picture: curtainOpenPicture,
            device: null,
			controlDevice: function (context, button) {
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
						}
					},
					res => {
                        wx.hideLoading();
					}
				) 
			},
			list: [
				{
					offIcon: '/resources/control/curtain/curtaincontrol_button_on_nor.png',
					onIcon: '/resources/control/curtain/curtaincontrol_button_on_press.png',
					icon: '/resources/control/curtain/curtaincontrol_button_on_nor.png',
					name: '打开',
					commandCode: '01',
					clickHandler: function (curtain) {
						curtain.picture = curtainOpenPicture;
						this.icon = this.onIcon;
					}
				},
				{
					offIcon: '/resources/control/curtain/curtaincontrol_button_pause_nor.png',
					onIcon: '/resources/control/curtain/curtaincontrol_button_pause_press.png',
					icon: '/resources/control/curtain/curtaincontrol_button_pause_nor.png',
					name: '暂停',
					commandCode: '02',
					clickHandler: function (curtain) {
						curtain.picture = curtainPausePicture;
						this.icon = this.onIcon;
					}
				},
				{
					offIcon: '/resources/control/curtain/curtaincontrol_button_off_nor.png',
					onIcon: '/resources/control/curtain/curtaincontrol_button_off_press.png',
					icon: '/resources/control/curtain/curtaincontrol_button_off_nor.png',
					name: '关闭',
					commandCode: '00',
					clickHandler: function (curtain) {
						curtain.picture = curtainClosePicture;
						this.icon = this.onIcon;
					}
				}
			]
		},
		airConditioner: {
			airCodes: [],
			currentDevice: null,
      		list: [],
		},
		television: {
			picture: tvOffPicture,
			list: [
				{
					offIcon: '/resources/control/tv/TV_button_switch_nor.png',
					onIcon: '/resources/control/tv/TV_button_switch_press.png',
					name: '开关',
					clickHandler: function(tv) {
						console.log(this)
						if (tv.picture == tvOffPicture) {
							tv.picture = tvOnPicture; 
						} else {
							tv.picture = tvOffPicture;
						}
						var iconTemp = this.onIcon;
						this.onIcon = this.offIcon;
						this.offIcon = iconTemp;
					}
				},
				{
					offIcon: '/resources/control/tv/TV_button_return_nor.png',
					onIcon: '/resources/control/tv/TV_button_return_press.png',
					name: '返回'
				},
				{
					offIcon: '/resources/control/tv/TV_button_home_nor.png',
					onIcon: '/resources/control/tv/TV_button_home_press.png',
					name: '首页'
				},
				{
					offIcon: '/resources/control/tv/TV_button_menu_nor.png',
					onIcon: '/resources/control/tv/TV_button_menu_press.png',
					name: '菜单'
				},
				{
					offIcon: '/resources/control/tv/TV_button_mute_nor.png',
					onIcon: '/resources/control/tv/TV_button_mute_press.png',
					name: '静音'
				},
			]
		}
	},

	lifetimes: {
		created() {
			let codeStrings = airCode.split("\n");
			codeStrings.forEach(codeString => {
				const airCode = new AirControllCode(codeString);
				this.data.airConditioner.airCodes.push(airCode);
			});
			var family = wx.getStorageSync('family');
			this.devices = {
				lamb: this.selectComponent('#lamb'),
				airConditioner: this.selectComponent('#airConditioner'),
				curtaine: this.selectComponent('#curtaine'),
				television: this.selectComponent('#television'),
			}
		},

		attached() {

		},

		ready() {
			var iconList = this.data.iconList;
			this._changePanelIcon(iconList[0]);
			this.setData({
				iconList: iconList
			})
			this.hiddeAllPanel();
			this.devices.lamb.showPanel();
            this.setData({
                currentDeviceName: '灯光控制'
            })
			// this.initDevices();
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		hiddeAllPanel: function () {
			this.devices.lamb.hiddePanel();
			this.devices.airConditioner.hiddePanel();
			this.devices.curtaine.hiddePanel();
			this.devices.television.hiddePanel();
		},

		changePanel: function (event) {
			// 语音控制电视机
			// if (event.currentTarget.id == 3) {
			// 	wx.showToast({
            //         title: '该功能暂未开放',
            //         icon: 'none'
			// 	})
			// 	return;
			// }
			if (event.currentTarget.id != this.data.selectedIndex) {
				var iconList = this.data.iconList;
				this._changePanelIcon(iconList[this.data.selectedIndex]);
				this._changePanelIcon(iconList[event.currentTarget.id]);
                let currentDeviceName = iconList[event.currentTarget.id].text + '控制';
                if (event.currentTarget.id == 1 && this.data.curtain.currentDevice) {
                    currentDeviceName = this.data.curtain.currentDevice.device.DEVICENAME
                } else if (event.currentTarget.id == 2 && this.data.airConditioner.currentDevice) {
                    currentDeviceName = this.data.airConditioner.currentDevice.device.DEVICENAME
                }
				this.setData({
					selectedIndex: event.currentTarget.id,
					iconList: this.data.iconList,
                    currentDeviceName: currentDeviceName
				})
			}
			this.hiddeAllPanel();
			this.devices[event.currentTarget.dataset.panel].showPanel();
		},

		airConditionerChange: function (event) {
			const index = event.detail.current;
			this.setData({
				'airConditioner.currentDevice': this.data.airConditioner.list[index],
                currentDeviceName: this.data.airConditioner.list[index].device.DEVICENAME
			})
		},

		curtainChange: function (event) {
			const index = event.detail.current;
			this.setData({
				'curtain.currentDevice': this.data.curtain.list[index],
                currentDeviceName: this.data.curtain.list[index].device.DEVICENAME
			})
		},

        pullDownRefresh: function () {
            app.getDevices(() => this._initDevices());
            // this._initDevices();
        },

		_initDevices: function () {
			if (wx.getStorageSync('family')) {
				this._initLambs();
				// this._initCurtain();
				this.setData({
					curtain: this._initCurtain(),
					airConditioner: this._initAirConditioners()
				})
				console.log(this.data)
			}
		},

		_initCurtain: function () {
			if (app.globalData.curtainList && app.globalData.curtainList.length > 0) {
				const devices = app.globalData.curtainList;
				// this.data.curtain.device = app.globalData.curtainList[0];
				let curtainList = [];
				devices.forEach(device => {
					const curtain = new Curtain(device);
					curtainList.push(curtain);
				});
				const curtain = {
					currentDevice: curtainList[0],
					list: curtainList
				}
				return curtain;
			} else { 
				return {
                    currentDevice: null,
                    list: []
                }
			}
		},

		_initAirConditioners: function () {
			if (app.globalData.airConditionList && app.globalData.airConditionList.length > 0) {
				const devices = app.globalData.airConditionList;
				// this.data.curtain.device = app.globalData.curtainList[0];
				let airList = [];
				devices.forEach(device => {
                    let codeIndex = 0;
					if (device.IRKEY) {
                        codeIndex = parseInt(device.IRKEY) - 1;
                    }
                    const airConditioner = new AirContioner(device, this.data.airConditioner.airCodes[codeIndex]);
					airList.push(airConditioner);
				});
				const airConditioner = {
					currentDevice: airList[0],
					list: airList,
                    airCodes: this.data.airConditioner.airCodes
				}
				return airConditioner;
			} else { 
				return {
                    currentDevice: null,
                    list: [],
                    airCodes: this.data.airConditioner.airCodes
                }
			}
		},

		_initLambs: function () {
			this.data.lamb.list = [];
            this.data.lamb.brightness = 0;
            this.data.lamb.picture = lightOffPicture;
			for (let i = 0; i < app.globalData.lambList.length; i++) {
				let lamb = app.globalData.lambList[i];
				lamb.onIcon = '/resources/control/lamb/light_button_on.png';
				lamb.offIcon = '/resources/control/lamb/light_button_off.png';
				if (lamb.STATESWITCH == 1 && lamb.STATECONNECTION != 0 && lamb.ISLOST == 0) {
					this.data.lamb.picture = lightOnPicture;
					lamb.on = true;
					lamb.icon = lamb.onIcon;
					this.data.lamb.brightness++;
				} else {
					lamb.icon = lamb.offIcon;
					lamb.on = false;
				}
				lamb.name = lamb.DEVICENAME;
				this.data.lamb.list.push(lamb);
			}
			if (this.data.lamb.brightness == this.data.lamb.list.length && this.data.lamb.brightness > 0) {
				this.data.lamb.switchButton.icon = this.data.lamb.switchButton.onIcon;
				this.data.lamb.switchButton.text = "全关"
			} else {
				this.data.lamb.switchButton.icon = this.data.lamb.switchButton.offIcon;
				this.data.lamb.switchButton.text = "全开"
			}
			this.setData({
				lamb: this.data.lamb
			})
		},

		_changePanelIcon: function (panelIcon) {
			if (panelIcon.selected) {
				panelIcon.textColor = iconTextColor[0];
			} else {
				panelIcon.textColor = iconTextColor[1];
			}
			var iconTemp = panelIcon.iconPath;
			panelIcon.iconPath = panelIcon.selectedIconPath;
			panelIcon.selectedIconPath = iconTemp;
			panelIcon.selected = !panelIcon.selected;
		},

		_exchangeIcon: function (button) {
			var iconTemp = button.onIcon;
			button.onIcon = button.offIcon;
			button.offIcon = iconTemp;
		},

		_buttonClick: function (button) {
			this._exchangeIcon(button)
		},

		lambSwitchButtonClick: function (event) {
			var allLamb = this.data.lamb;
            if (allLamb.list.length == 0) {
                wx.showToast({
                    title: '没有相关设备',
                    icon: 'none'
                })
            }
			console.log(allLamb.brightness)
			var switchButton = allLamb.switchButton;
			for (let i = 0; i < allLamb.list.length; i++) {
				if (switchButton.text == '全关' && allLamb.list[i].on) {
					this._lambTurnOff(allLamb.list[i]);
				} else if (switchButton.text == '全开' && !allLamb.list[i].on) {
					this._lambTurnOn(allLamb.list[i]);
				}
			}
            if (switchButton.text == '全开' && allLamb.brightness == allLamb.list.length && allLamb.brightness > 0) {
				switchButton.icon = switchButton.onIcon;
				switchButton.text = '全关';
				allLamb.picture = lightOnPicture;
			} else if (switchButton.text == '全关' && allLamb.brightness == 0) {
				switchButton.icon = switchButton.offIcon;
				switchButton.text = '全开';
				allLamb.picture = lightOffPicture;
			}
			this.setData({
				lamb: allLamb
			})
		},

		_lambTurnOn: function(lamb) {
			app.request(
				'appFamily/changeDevice.do',
				'POST',
				true,
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
						lamb.on = true;
						this.data.lamb.brightness++;
						this.data.lamb.picture = lightOnPicture;
						lamb.icon = lamb.onIcon;
						if (this.data.lamb.brightness == this.data.lamb.list.length && this.data.lamb.switchButton.text == '全开') {
							this.data.lamb.switchButton.text = '全关';
							this.data.lamb.switchButton.icon = this.data.lamb.switchButton.onIcon;
						}
						this.setData({
							lamb: this.data.lamb
						})
					} else {
                        wx.showToast({
                            icon: 'none',
                            title: res.data.msg
                        })
                    }
				},
				res => {
                    wx.hideLoading();
				}
			) 
		},

		_lambTurnOff: function(lamb) {
            app.request(
                'appFamily/changeDevice.do',
                'POST',
                true,
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
                        lamb.on = false;
                        this.data.lamb.brightness--;
                        lamb.icon = lamb.offIcon;
                        if (this.data.lamb.brightness == 0) {
                            this.data.lamb.picture = lightOffPicture;
                            this.data.lamb.switchButton.text = '全开';
                            this.data.lamb.switchButton.icon = this.data.lamb.switchButton.offIcon;
                        }
                        this.setData({
                            lamb: this.data.lamb
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: res.data.msg
                        })
                    }
                },
                res => {
                    wx.hideLoading();
                }
            ) 
		},

		lambButtonClick: function (event) {
			console.log(this.data.lamb.brightness)
			let lambList = this.data.lamb.list;
			if (lambList && lambList.length > 0) {
				let lamb = lambList[event.currentTarget.dataset.id];
				if (lamb.on) {
                    this._lambTurnOff(lamb)
				} else {
                    this._lambTurnOn(lamb)
				}
				var lambItem = 'lamb.list[' + event.currentTarget.dataset.id + ']';
				this.setData({
                    lamb: this.data.lamb
				})
			} else {
				this._deviceNotFound();
			}
		
		},

		tvButtonClick: function (event) {
			app.unOpenTips();
			// var button = this.data.television.list[event.currentTarget.dataset.id];
			// button.clickHandler(this.data.television);
			// this.setData({
			// 	television: this.data.television
			// })
		},

		conditionerButtonClick: function (event) {
			let airDevice = this.data.airConditioner.currentDevice.device
			if (airDevice) {
				var button = this.data.airConditioner.currentDevice.list[event.currentTarget.dataset.id];
				app.request(
					'appFamily/controlIr.do',
					'POST',
					true,
					() => {
						let user = wx.getStorageSync('user');
						let keyMap = app.createSecretKey(user);
						airDevice.SNID = airDevice.GATEWAYMAC;
						airDevice.DATATYPE = '12';
						airDevice.OPERATETYPE = 'A7';
						airDevice.IRCODE = '0082';
						airDevice.IRKEY = button.clickHandler(this.data.airConditioner.currentDevice)
						let deviceParams = JSON.stringify(airDevice);
						let data = {
                            SNID: airDevice.SNID,
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
                                title: '控制成功',
                                icon: 'none',
                                duration: 1500
                            })
                            this.setData({
                                airConditioner: this.data.airConditioner
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
				// button.clickHandler(this.data.airConditioner);
			} else {
				this._deviceNotFound();
			}
		},

		showPage: function () {
			this.pullDownRefresh();
			this.setData({
				hidden: false
			})
		},

		hidePage: function () {
			this.setData({
				hidden: true
			})
		},

		curtainButtonClick: function (event) {
			if (this.data.curtain.currentDevice) {
				let button = this.data.curtain.currentDevice.list[event.currentTarget.dataset.index];
				this.data.curtain.currentDevice.controlDevice(this, button);
			} else {
				this._deviceNotFound();
			}
		}
	},

	_deviceNotFound: function () {
		wx.showToast({
			title: '设备找不到',
			mask: true,
			icon: 'none',
			duration: 1500
		})
	}
})
