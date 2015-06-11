/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App_services = angular.module('App_services', ['ngRoute', 'ngCookies', 'angular-carousel', 'ngTouch']);

//=======================   服务  =======================
//全局变量定义
App_services.factory('globals', [function () {
    var ADMIN_SERVER = 'http://192.168.1.70/mobile/jsonp';
    var TEST_2_SERVER = 'http://192.168.1.70:8080/jsonp';
    var ADDRESS = {};
    var uid = null;
    var token = null;
    // ================================================================================
    // ================================================================================
    // 砸金蛋
    ADDRESS.HIT_EGG = encodeURIComponent("app/activities/zajindankh");
    // 网银充值
    ADDRESS.WEB_PAY = encodeURIComponent("wangyin/webpay");
    // ================================================================================
    // 用户
    // 用户注册
    ADDRESS.REGISTER = encodeURIComponent("user/add");
    // 用户注销
    ADDRESS.LOGOUT = encodeURIComponent("user/logout");
    // 用户签到
    //	ADDRESS.SIGNIN = encodeURIComponent("user/signinKh");
    ADDRESS.SIGNIN = encodeURIComponent("user/signin");
    // 用户月签到信息
    //	ADDRESS.SIGNIN_BY_ID = encodeURIComponent("user/signinByUseridKh");
    ADDRESS.SIGNIN_BY_ID = encodeURIComponent("user/signinByUserid");
    // 获取用户基础信息
    ADDRESS.GETCUSTOME = encodeURIComponent("user/getCustomer");
    // 实名认证
    ADDRESS.REALNAMEAUTH = encodeURIComponent("user/realNameAuth");
    // 邮箱认证
    ADDRESS.SENDCHECKEMAIL = encodeURIComponent("user/sendCheckEmail");
    // 修改登录密码
    ADDRESS.EDITPASSWORD = encodeURIComponent("user/editPassword");
    // 找回密码
    ADDRESS.FINDPASSWORD = encodeURIComponent("user/findPassword");
    // 设置交易密码（2.45）
    ADDRESS.SETCODE_ = encodeURIComponent("user/getById");
    // 用户登陆
    ADDRESS.LOGIN = encodeURIComponent("mobile/user/login");
    // 用户信息(刘雷鹏&余琪)
    ADDRESS.GET_CUSTOMERACCOUNT = encodeURIComponent("mobile/user/customerAccount");
    // ================================================================================
    // 预约小助手
    // 2.41	用户预约记录
    ADDRESS.GET = encodeURIComponent("trade/resuful/account_bespeak/find_userBespeak");
    // 2.43	保存预约助手设置
    ADDRESS.SAVE = encodeURIComponent("trade/resuful/account_bespeak/saveandupdate");
    // 2.44	关闭预约助手
    ADDRESS.CLOSE = encodeURIComponent("trade/resuful/account_bespeak/userBespeak_colse");
    // ================================================================================
    // 积分银两相关的
    // 我的商品列表
    ADDRESS.MY_COMMODITYLIST = encodeURIComponent("rcommodity/commodityList");
    // 购换银两
    ADDRESS.RECHARGE_TAEL = encodeURIComponent("rPurchaseRecord/addPurchaseRecord");
    // 积分明细
    ADDRESS.POINTLIST = encodeURIComponent("rPurchaseRecord/IntegralGainList");
    // 我的银两列表
    ADDRESS.FIND_TAELLIST = encodeURIComponent("mobile/user/couponList");
    // 积分兑换银两快捷处理（刘雷鹏&余琪）
    ADDRESS.CHANGE_POINT = encodeURIComponent("mobile/user/addPurchaseRecord");
    // ================================================================================
    // 与消息请求服务器相关的方法都在这里声明
    // 注册短信验证码
    ADDRESS.SMS_REG_SMS = encodeURIComponent("verification/checkSms");
    // 注册图片验证码
    ADDRESS.SMS_REG_PIC = encodeURIComponent("verification/checkImage");
    // 获取指定文本信息
    ADDRESS.GRT_IMAGE = encodeURIComponent("cms/folder/image");
    // 首页幻灯片实际路径
    ADDRESS.GRT_BANNER_IMAGES = "http://192.168.1.70:8080/cms/image/getImage/";
    // 获取指定文本信息
    ADDRESS.GRT_CONTENT = encodeURIComponent("cms/folder/content");
    // 获取指定附件信息
    ADDRESS.GRT_DOCUMENT = encodeURIComponent("cms/folder/document");
    // 获取用户站内消息总数
    ADDRESS.GRT_MSGCOUNT = encodeURIComponent("notice/msg/msgCount");
    // 获取用户站内信列表
    ADDRESS.FIND_ALLMSGBYID = encodeURIComponent("notice/msg/getAllMsgByUserId");
    // 删除用户站内消息
    ADDRESS.DELETEMSG = encodeURIComponent("notice/msg/deleteMsg");
    // 站内消息已读
    ADDRESS.READED = encodeURIComponent("notice/msg/updateReadStatus");
    // 站内消息全部标记已读
    ADDRESS.READED_NEW = encodeURIComponent("notice/msg/doReadMsg");
    // 站内未读消息
    ADDRESS.UNREAD_MSG = encodeURIComponent("notice/msg/getNoReadMsgCount");
    // 获取系统当前时间
    ADDRESS.GETSYSDATE = encodeURIComponent("system/getSysDate");
    // ================================================================================
    // 投资理财列表
    //投资理财列表
    ADDRESS.List = encodeURIComponent("mobile/trade/invest/bill/list");
    //我的项目详情（银票&银商）（刘雷鹏&余琪）
    ADDRESS.Detail = encodeURIComponent("mobile/trade/invest/bill/detail");
    //第三方平台投资项目详细
    ADDRESS.DETAIL_THIRDPARTY = encodeURIComponent("trade/restful/invest/thirdparty/detail");
    // 最新投资项目
    ADDRESS.FINDBILLLIST_MAIN = encodeURIComponent("trade/restful/main/bill/list");
    // 2.1直投项目投资列表项目
    ADDRESS.FINDBILLLIST_INVEST = encodeURIComponent("trade/restful/invest/bill/list");
    // 2.4转让项目列表
    ADDRESS.FINDCREDITLIST = encodeURIComponent("trade/restful/invest/credit/list");
    // 2.5直投项目详情页
    ADDRESS.GETBILLDETAIL = encodeURIComponent("trade/restful/invest/bill/detail");
    // 2.6用户账户信息
    ADDRESS.GETACCOUNTINFO = encodeURIComponent("trade/restful/account/info");
    // 2.7刷新可投资金额
    ADDRESS.GET_27 = encodeURIComponent("trade/restful/invest/bill/surplusMoney");
    // 2.9直投项目投资记录列表
    ADDRESS.GET_29 = encodeURIComponent("trade/restful/invest/billOrder/list");
    // 2.10投项目下订单接口
    ADDRESS.GET_30 = encodeURIComponent("trade/billOrder/order");
    // 2.11直投项目订单确认接口
    ADDRESS.GET_31 = encodeURIComponent("trade/restful/invest/billOrder/confirm");
    // 2.12校验密码
    ADDRESS.GET_32 = encodeURIComponent("trade/restful/invest/billOrder/checkPassword");
    // 2.13直投项目支付接口
    ADDRESS.GET_33 = encodeURIComponent("trade/billOrder/pay");
    // 2.14转让标详情
    ADDRESS.GET_34 = encodeURIComponent("trade/restful/invest/credit/detail");
    // 2.16转让项目投资记录
    ADDRESS.GET_36 = encodeURIComponent("trade/restful/invest/creditOrder/list");
    // 2.17刷新转让项目可投资金额
    ADDRESS.GET_37 = encodeURIComponent("trade/restful/invest/credit/surplusMoney");
    // 2.18转让项目下订单接口
    ADDRESS.GET_38 = encodeURIComponent("trade/billOrder/creditOrder");
    // 2.19	转让项目订单确认接口
    ADDRESS.GET_39 = encodeURIComponent("trade/restful/invest/creditOrder/confirm");
    // 2.20	转让项目支付接口
    ADDRESS.GET_40 = encodeURIComponent("trade/billOrder/creditPay");
    // 2.24	我的账户-订单记录-我的投资记录
    ADDRESS.GET_44 = encodeURIComponent("trade/restful/user/billOrder/list");
    // 2.25	我的账户-订单记录-订单详情
    ADDRESS.GET_45 = encodeURIComponent("trade/restful/user/myOrder/detail");
    // 2.32	我的账户-转让记录
    ADDRESS.GET_52 = encodeURIComponent("trade/restful/user/credit/list");
    // 2.34	我的账户-转让记录-已认购项目记录
    ADDRESS.GET_54 = encodeURIComponent("trade/restful/user/creditOrder/list");
    // 2.35	我的账户-我的银票总数
    ADDRESS.GET_55 = encodeURIComponent("activity/restful/coupon/total");
    // 2.37	我的账户-我的银票记录
    ADDRESS.GET_57 = encodeURIComponent("activity/restful/coupon/list");
    // 2.40	进入用户预约功能
    ADDRESS.GET_60 = encodeURIComponent("trade/resuful/account_bespeak/to_userBespeak");
    // 2.46	是否设置交易密码
    ADDRESS.GET_66 = encodeURIComponent("trade/restful/account/pwdtradingexist");
    // 2.47	新增交易密码
    ADDRESS.GET_67 = encodeURIComponent("trade/restful/account/addpwdtraing");
    // 2.48	修改交易密码
    ADDRESS.GET_68 = encodeURIComponent("trade/restful/account/editpwdtraing");
    // #####找回交易密码
    ADDRESS.GET_100 = encodeURIComponent("trade/restful/account/forgetpwdtraing");
    // 取消或删除订单
    ADDRESS.GET_73 = encodeURIComponent("trade/restful/user/myOrder/cancleOrDelete");
    // 退款
    ADDRESS.GET_74 = encodeURIComponent("trade/billOrder/orderPayCancel");
    // 2.27	我的账户-订单记录-转让页面
    ADDRESS.GET_47 = encodeURIComponent("trade/restful/user/transferOrder/detail");
    // 2.28	我的账户-订单记录-转让确认
    ADDRESS.GET_48 = encodeURIComponent("trade/billOrder/credit");
    // 2.55	提现（充值、交易）记录列表
    ADDRESS.GET_75 = encodeURIComponent("user/cashFlow/list");
    //新增银行卡
    ADDRESS.GET_77 = encodeURIComponent("user/trade/bankCard/save");
    //删除银行卡
    ADDRESS.GET_78 = encodeURIComponent("user/trade/bankCard/delete");
    //银行卡列表
    ADDRESS.GET_79 = encodeURIComponent("user/trade/bankCard/list");
    // 签到获取银两数
    ADDRESS.GET_101 = encodeURIComponent("activity/restful/coupon/saveAndUpdate");
    // 2.21	我的账户首页-最近投资项目
    ADDRESS.GET_41 = encodeURIComponent("trade/restful/user/billOrder/list");
    // 2.22	我的账户首页-最近到期项目
    ADDRESS.GET_42 = encodeURIComponent("user/restful/index/recentOrder/list");
    // 2.29	我的账户-订单记录-支付(直投项目)
    ADDRESS.GET_49 = encodeURIComponent("trade/restful/invest/billOrder/confirm");
    // 2.30	我的账户-订单记录-支付(转让项目)
    ADDRESS.GET_50 = encodeURIComponent("trade/restful/invest/creditOrder/confirm");
    // 2.38	我的账户-充值
    ADDRESS.GET_58 = encodeURIComponent("gopay/pay/goPayIndex");
    // 2.39	我的账户-提现
    ADDRESS.GET_59 = encodeURIComponent("trade/restful/withdraw");
    // 2.49	校验原始交易密码
    ADDRESS.GET_69 = encodeURIComponent("trade/restful/account/checkpwdtraing");
    // 2.50	获取用户提现总金额
    ADDRESS.GET_70 = encodeURIComponent("user/cashOut/total");
    // 2.51	获取用户充值总金额
    ADDRESS.GET_71 = encodeURIComponent("user/cashIn/total");
    // 转让列表详情
    ADDRESS.GET_81 = encodeURIComponent("trade/restful/user/credit/detail");
    return {
        ADMIN_SERVER: ADMIN_SERVER,
        TEST_2_SERVER: TEST_2_SERVER,
        ADDRESS: ADDRESS,
        get_uid_token: function () {
            return {
                "uid": uid,
                "token": token
            }
        },
        set_uid_token: function (u, t) {
            uid = u;
            token = t;
        }
    }
}]);
App_services.factory('userInfo', ['$http', '$cookies', function ($http, $cookies) {
    var user_info = {};
    return {
        setUserInfo: function (obj) {
            user_info = obj;
        },
        getUserInfo: function () {
            return user_info;
        }
    }
}]);
//持有返回数据
App_services.factory('Warehouse', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
        get: function (key) {
            if (_.isUndefined(data.key)) {
                console.log('data.', key, ' is undefined');
                return undefined;
            } else {
                return data.key;
            }
        },
        set: function (key, value) {
            data.key = value;
            return data.key;
        },
        remove: function (key) {
            delete data.key;
        }
    }
}]);
//通用请求数据服务（登陆以后）
App_services.factory('FetchDataService', ['$http', '$cookies', '$location', '$q', 'globals', 'Warehouse', function ($http, $cookies, $location, $q, globals, Warehouse) {
    var warehouse = Warehouse;
    return {
        fetchData: function (key, server_url, list_args) {
            //console.log('FetchDataService.fetchData(key: ', key, 'server_url: ', server_url, ')');
            var uid = globals.get_uid_token().uid || '';
            var token = globals.get_uid_token().token || '';
            var arg = globals.ADDRESS[key];
            var server_url = globals[server_url] || globals.TEST_2_SERVER;
            if (!angular.isUndefined(list_args)) {
                var arg_str = '?';
                for (var property in list_args) {
                    if (list_args.hasOwnProperty(property)) {
                        arg_str += (property + '=' + list_args[property] + '&');
                    }
                }
                arg_str = arg_str.substr(0, arg_str.length - 1);
                console.log('arg_str: ', arg_str);
                arg += encodeURIComponent(arg_str);
            }
            var d = $q.defer();
            $http({
                method: "JSONP",
                url: server_url,
                params: {
                    "callback": "JSON_CALLBACK",
                    "url": arg,
                    "uid": uid,
                    "token": token
                }
            }).then(function success(res) {
                if (res.data.result == 0) {
                    console.log('fetchData() sucess: ', res);
                    d.resolve(warehouse.set(key, res.data.data));
                } else if (res.data.result == 1) {
                    //数据不可用
                    console.log('吊打余棋 result==1');
                    d.reject({});
                } else if (res.data.result == 2) {
                    //认证失败
                    globals.set_uid_token(null, null);
                    $location.path('/login').replace();
                } else {
                    console.log('不明原因 吊打余棋');
                    d.reject({});
                }
            }, function failed(res) {
                console.log('err: ', res);
                d.reject({});
            });
            return d.promise;
        },
        //后台花样作死，发明的新返回格式: Array
        fetchArray: function (key, server_url, list_args) {
            //console.log('FetchDataService.fetchArray(key: ', key, 'server_url: ', server_url, ')');
            var uid = globals.get_uid_token().uid || '';
            var token = globals.get_uid_token().token || '';
            var arg = globals.ADDRESS[key];
            var server_url = globals[server_url] || globals.TEST_2_SERVER;
            if (!angular.isUndefined(list_args)) {
                var arg_str = '?';
                for (var property in list_args) {
                    if (list_args.hasOwnProperty(property)) {
                        arg_str += (property + '=' + list_args[property] + '&');
                    }
                }
                arg_str = arg_str.substr(0, arg_str.length - 1);
                //console.log('arg_str: ', arg_str);
                arg += encodeURIComponent(arg_str);
            }
            var d = $q.defer();
            $http({
                method: "JSONP",
                url: server_url,
                params: {
                    "callback": "JSON_CALLBACK",
                    "url": arg,
                    "uid": uid,
                    "token": token
                }
            }).then(function success(res) {
                if(angular.isArray(res.data) || res.data.length > 0) {
                    console.log('fetchArray() sucess: ', res);
                    d.resolve(warehouse.set(key, res.data));
                } else {
                    console.log(res.data, '不明原因 吊打余棋');
                    d.reject([]);
                }
            }, function failed(res) {
                console.log('err: ', res);
                d.reject([]);
            });
            return d.promise;
        }
    }
}]);
App_services.factory('authHttpResponseInterceptor', [function () {
    var header_left_buttons = {
        "default": {
            "text": "返回",
            //$window.history.back()
            "ngClick": "history_back",
            "ngHref": "",
            "show": true
        },
        "register": {
            "text": "注册",
            "ngClick": "",
            "ngHref": "/register",
            "show": true
        },
        "blank": {
            "text": "",
            "ngClick": "",
            "ngHref": "",
            "show": false
        }
    };
    var header_right_buttons = {
        "default": {
            "text": "",
            "ngClick": "",
            "ngHref": "",
            "show": false
        },
        "login": {
            "text": "登录",
            "ngClick": "",
            "ngHref": "/login",
            "show": true
        },
        "goPayIndex": {
            "text": "充值",
            "ngClick": "",
            "ngHref": "/personal_center/goPayIndex",
            "show": true
        }
    };
    return {
        "header_left_buttons": header_left_buttons,
        "header_right_buttons": header_right_buttons
        //response: function (response) {
        //    if (response.status === 401) {}
        //    return response || $q.when(response);
        //},
        //responseError: function (rejection) {
        //    var reservedPaths = ['/', '/mycube', '/connect', '/event'];
        //    if (rejection.status === 401 && _.contains(reservedPaths, $location.path().trim())) {
        //        var stateService = $injector.get('$state');
        //        stateService.go('home');
        //    }
        //    return $q.reject(rejection);
        //}
    };
}]);
//登陆服务
App_services.factory('loginService', ['$http', '$cookies', '$location', 'globals', 'userInfo', function ($http, $cookies, $location, globals, userInfo) {
    return {
        isLoggedIn: function () {
            return uid !== null && token !== null;
        },
        //必须调用专门的请求，因为验证码接口的返回没有result字段
        fetchCaptcha: function () {
            var self = this;
            $http({
                method: "JSONP",
                url: globals.TEST_2_SERVER,
                params: {
                    "callback": "JSON_CALLBACK",
                    "url": globals.ADDRESS.SMS_REG_PIC
                }
            }).then(function (res) {
                self.txtToCaptcha(res.data.checkCode);
                self.setCookie(res.data.redisName);
                return res.data.checkCode; //测试使用
            }, function (res) {
                console.log('fetchCaptcha() ERR: ', res);
            });
        },
        txtToCaptcha: function (txt) {
            //console.log('txtToCaptcha(', txt, ')');
            var canvas = document.createElement("canvas");
            canvas.setAttribute('width', 120);
            canvas.setAttribute('height', 38);
            canvas.setAttribute('id', 'captcha_canvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = 'italic 25px monospace';
            context.textBaseline = 'top';
            context.textAlign = 'start';
            canvas.style.display = 'none';
            var txtArray = txt.split('');
            var lens = txtArray.length;
            var color_ = ["#ff0000", "#00ff00", "#333333", "#0000ff"];
            var height_ = canvas.height - 30;
            var height_arr = [0, height_, 0, height_];
            for (var i = 0; i < lens; i++) {
                context.strokeStyle = color_[i];
                if (i % 2 == 0) {
                    context.strokeText(txtArray[i].toUpperCase(), canvas.width * (i) / 4, height_arr[i], canvas.width * (i + 1));
                } else {
                    context.strokeText(txtArray[i], canvas.width * (i) / 4, height_arr[i], canvas.width * (i + 1));
                }
            }
            $("#check_img").prop("src", canvas.toDataURL("image/png"));
        },
        login: function (cred) {
            console.log('cred: ', cred);
            //login: function (cred, sucess, error) {
            var shit = {
                name: cred.username,
                password: cred.password,
                checkCode: cred.checkCode.toLowerCase()
            };
            //console.log(JSON.stringify(shit));
            var arg = globals.ADDRESS.LOGIN + encodeURIComponent("?jsonInput=" + JSON.stringify(shit));
            $http({
                method: "JSONP",
                url: globals.ADMIN_SERVER,
                params: {
                    "callback": "JSON_CALLBACK",
                    "url": arg,
                    "redisName": $cookies.redisName
                }
            }).then(function success(res) {
                if (res.data.result == 0) {
                    userInfo.setUserInfo(res.data.data);
                    globals.set_uid_token(res.data.data.userId, res.data.data.token);
                    $location.path('/personal_center').replace();
                } else {
                    return console.error('怪余祺')
                }
            }, function error(err) {
                console.log('Login failed: ', err)
            });
        },
        setCookie: function (obj) {
            $cookies.redisName = obj;
        },
        get_uid_token: function () {
            return {
                "uid": uid,
                "token": token
            }
        }
    };
}]);