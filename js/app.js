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
//登陆服务
App.factory('loginService', ['$http', '$cookies', function ($http, $cookies) {
    var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp';
    var TEST_SERVER_BASE_URL_checkimage = 'http://test2.yinpiao.com/jsonp';
    var CAPTCHA_SERVER_BASE_URL = '/verification/checkImage';

    return {
        fetchCaptcha: function (sucess, error) {
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL_checkimage,
                params: {
                    "url": encodeURIComponent(CAPTCHA_SERVER_BASE_URL),
                    "callback": "JSON_CALLBACK"
                }
            }).then(sucess, error);
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
        login: function (cred, sucess, error) {
            var shit = {
                name: cred.username,
                password: cred.password,
                checkCode: cred.checkCode.toLowerCase()
            };
            console.log(JSON.stringify(shit));
            var arg = encodeURIComponent("/mobile/user/login?jsonInput=" + JSON.stringify(shit));
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL,
                headers: {"Authorization": "Basic " + $cookies.redisName},
                params: {
                    "url": arg,
                    "redisName": $cookies.redisName,
                    "callback": "JSON_CALLBACK"
                }
            }).then(sucess, error);
        },
        setCookie: function (obj) {
            $cookies.redisName = obj;
        }
    };
}]);
//项目服务
//对相同的API的操作并到一个factory里，可以共用一个常量URL
App.factory('factoryInvestList', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
    var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp';
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

//指令
App.directive('myDirective', function () {
    return {
        restrict: "A",
        replace: "true",
        templateUrl: "partials/myDirective.html"
    };
});
//页面标题栏
App.controller('header_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
    $scope.getPageTitle = function () {
        return $route.current.page_title;
    }
}]);
//底部导航条
App.controller('menu_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
    $scope.isActive = function (view_location) {
        return view_location === $location.path();
    };
}]);
//首页
App.controller('main_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);
//登陆
App.controller('login_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'loginService', function ($scope, $http, $location, $route, $routeParams, loginService) {
    loginService.fetchCaptcha(function (res) {
        console.log('验证码返回：', res.data);
        loginService.txtToCaptcha(res.data.checkCode);
        loginService.setCookie(res.data.redisName);
    }, function (res) {
        console.log('err: ', res);
    });

    $scope.login = function () {
        var cred = {
            username: $scope.username,
            password: $scope.password,
            checkCode: $scope.checkCode
        };
        loginService.login(cred, function (res) {
            console.log('success: ', res);
        }, function (res) {
            console.log('err: ', res);
        });
    }
}]);
//更多
App.controller('more_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {}]);
//投资列表
App.controller('invest_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'factoryInvestList', function ($scope, $http, $location, $route, $routeParams, factoryInvestList) {
    $scope.billTypeList = ['待购买', '银票纯', '银票红', '银商', '转让', '第三方平台'];
    factoryInvestList.getList(function (res) {
        console.log('sucess: ', res.data.data);
        $scope.itemList = res.data.data;
    }, function (res) {
        console.log('err: ', res);
    });
}]);
//项目详情
App.controller('invest_item_detail_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'factoryInvestList', function ($scope, $http, $location, $route, $routeParams, factoryInvestList) {
    var billId = $routeParams.id.replace(':', '');
    factoryInvestList.getDetail(billId, function (res) {
        console.log('sucess & data: ', res.data.data);
        $scope.item = res.data.data;
    }, function (res) {
        console.log('err: ', res);
    });
}]);
//个人中心
App.controller('personal_center_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);
//首页
App.controller('index_page_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {}]);