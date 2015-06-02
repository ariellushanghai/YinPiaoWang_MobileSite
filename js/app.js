/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App = angular.module('App', ['ngRoute', 'ngCookies']);
App.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'main_controller',
            page_title: '银票网'
        }).when('/invest', {
            templateUrl: 'partials/invest.html',
            controller: 'invest_controller',
            page_title: '投资列表'
        }).when('/invest/:id', {
            templateUrl: 'partials/invest_item_detail.html',
            controller: 'invest_item_detail_controller',
            page_title: '项目详情'
        }).when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'login_controller',
            page_title: '登录'
        }).when('/personal_center', {
            templateUrl: 'partials/personal_center.html',
            controller: 'personal_center_controller',
            page_title: '个人中心'
        }).when('/more', {
            templateUrl: 'partials/more.html',
            controller: 'more_controller',
            page_title: '更多'
        }).otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

App.run(function ($rootScope) {
    $rootScope.log = function (str) {
        console.log(str);
    }
});
//=======================   服务  =======================
App.factory('userInfo', ['$http', '$cookies', function ($http, $cookies) {
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
//登陆服务
App.factory('loginService', ['$http', '$cookies', '$location', 'userInfo', function ($http, $cookies, $location, userInfo) {
    //var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp';
    var TEST_SERVER_BASE_URL = 'http://192.168.1.174/mobile/jsonp';
    //var TEST_SERVER_BASE_URL_checkimage = 'http://test2.yinpiao.com/jsonp';
    var TEST_SERVER_BASE_URL_checkimage = 'http://192.168.1.174:8080/jsonp';
    var CAPTCHA_SERVER_BASE_URL = '/verification/checkImage';
    var uid = null;
    var token = null;
    return {
        isLoggedIn: function () {
            return uid !== null && token !== null;
        },
        fetchCaptcha: function (sucess, error) {
            var self = this;
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL_checkimage,
                params: {
                    "url": encodeURIComponent(CAPTCHA_SERVER_BASE_URL),
                    "callback": "JSON_CALLBACK"
                }
            }).then(function (res) {
                self.txtToCaptcha(res.data.checkCode);
                self.setCookie(res.data.redisName);
            }, function (res) {
                console.log('fetchCaptcha() ERR: ', res);
            });
        },
        txtToCaptcha: function (txt) {
            console.log('txtToCaptcha(', txt, ')');
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
            //login: function (cred, sucess, error) {
            var shit = {
                name: cred.username,
                password: cred.password,
                checkCode: cred.checkCode.toLowerCase()
            };
            //console.log(JSON.stringify(shit));
            var arg = encodeURIComponent("/mobile/user/login?jsonInput=" + JSON.stringify(shit));
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL,
                params: {
                    "url": arg,
                    "redisName": $cookies.redisName,
                    "callback": "JSON_CALLBACK"
                }
            }).then(function success(res) {
                //console.log("res: ", JSON.stringify(res));
                if (res.data.result == 0) {
                    userInfo.setUserInfo(res.data.data);
                    uid = res.data.data.userId;
                    token = res.data.data.token;
                    console.log('userInfo: ', userInfo.getUserInfo());
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
//项目服务
//对相同的API的操作并到一个factory里，可以共用一个常量URL
App.factory('factoryInvestList', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
    //var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp';
    var TEST_SERVER_BASE_URL = 'http://192.168.1.174/mobile/jsonp';
    var lru = $cacheFactory('lru', {
        capacity: 5
    }); //缓存5次请求
    return {
        //项目列表
        getList: function (sucess, error) {
            var arg = encodeURIComponent("mobile/trade/invest/bill/list?type=0&page=1&num=10");
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL,
                params: {
                    "url": arg,
                    "callback": "JSON_CALLBACK"
                },
                cache: lru
            }).then(sucess, error);
        },
        //项目详情
        getDetail: function (id, sucess, error) {
            var arg = encodeURIComponent("mobile/trade/invest/bill/detail?id=" + id);
            console.log('url: ', TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK");
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL,
                params: {
                    "url": arg,
                    "callback": "JSON_CALLBACK"
                }
            }).then(sucess, error);
        }
    };
}]);
//个人中心
App.factory('factoryPersonalCenter', ['$http', '$cacheFactory', '$rootScope', 'loginService', function ($http, $cacheFactory, $rootScope, loginService) {
    var this_service = this;
    //var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp';
    var TEST_SERVER_BASE_URL = 'http://192.168.1.174/mobile/jsonp';
    var data = {};
    return {
        fetchData: function () {
            var self = this;
            var arg = encodeURIComponent("mobile/user/customerAccount");
            return $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL,
                params: {
                    "url": arg,
                    "callback": "JSON_CALLBACK",
                    "uid": loginService.get_uid_token().uid,
                    "token": loginService.get_uid_token().token
                }
            }).then(function (res) {
                if (res.data.result == 0) {
                    console.log('factoryPersonalCenter.fetchData() sucess: ', res);
                    self.setData(res.data.data);
                    $rootScope.$broadcast('dataFetched');
                    //return self.getData();
                    return res.data.data;
                } else {
                    console.error('怪余祺');
                    return {};
                }
            }, function (res) {
                console.log('err: ', res);
                return {};
            });
        },
        getData: function () {
            console.log('factoryPersonalCenter.getData(', data, ')');
            return data;
        },
        setData: function (obj) {
            console.log('factoryPersonalCenter.setData(', obj, ')');
            return data = obj;
        }
    }
}]);

//页面标题栏
App.controller('header_controller', ['$scope', '$route', function ($scope, $route) {
    $scope.getPageTitle = function () {
        return $route.current.page_title;
    }
}]);
//底部导航条
App.controller('menu_controller', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (view_location) {
        return view_location === $location.path();
    };
}]);
//首页
App.controller('main_controller', ['$scope', function ($scope) {

}]);
//登陆
App.controller('login_controller', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.username = '13812345678';
    $scope.password = '111111';

    $scope.fetchCaptcha = function () {
        loginService.fetchCaptcha();
    };

    $scope.fetchCaptcha();

    $scope.login = function () {
        var cred = {
            username: $scope.username,
            password: $scope.password,
            checkCode: $scope.checkCode
        };
        loginService.login(cred);
    }
}]);
//更多
App.controller('more_controller', ['$scope', 'factoryMore', function ($scope, factoryMore) {

}]);
//投资列表
App.controller('invest_controller', ['$scope', 'factoryInvestList', function ($scope, factoryInvestList) {
    $scope.billTypeList = ['待购买', '银票纯', '银票红', '银商', '转让', '第三方平台'];
    factoryInvestList.getList(function (res) {
        console.log('sucess: ', res.data.data);
        $scope.itemList = res.data.data;
    }, function (res) {
        console.log('err: ', res);
    });
}]);
//项目详情
App.controller('invest_item_detail_controller', ['$scope', '$route', '$routeParams', 'factoryInvestList', function ($scope, $route, $routeParams, factoryInvestList) {
    var billId = $routeParams.id.replace(':', '');
    factoryInvestList.getDetail(billId, function (res) {
        console.log('sucess & data: ', res.data.data);
        $scope.item = res.data.data;
    }, function (res) {
        console.log('err: ', res);
    });
}]);
//个人中心
App.controller('personal_center_controller', ['$scope', 'userInfo', 'factoryPersonalCenter', function ($scope, userInfo, factoryPersonalCenter) {
    $scope.$on('dataFetched', function () {
        //console.log('get brocatst: dataFetched');
        $scope.data = factoryPersonalCenter.getData();
    });
    factoryPersonalCenter.fetchData();
}]);
//首页
App.controller('index_page_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {

}]);