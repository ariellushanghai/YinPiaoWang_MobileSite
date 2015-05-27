/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App = angular.module('App', ['ngRoute']);
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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
}]);
//=======================   服务  =======================
//登陆服务
App.factory('loginService', ['$http', function ($http) {
    var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp?url=';
    return {
        login: function (cred, sucess, error) {
            var arg = encodeURIComponent("mobile/user/login/?name=" + cred.username + "&password=" + cred.password + "&checkcode=" + cred.checkcode);
            console.log('url: ', TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK");
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK"
            }).then(sucess, error);
        }
    };
}]);
//项目列表
App.factory('getNewProjectList', ['$http', function ($http) {
    var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp?url=';
    var arg = encodeURIComponent("mobile/trade/invest/bill/list?type=0&page=1&num=10");
    return {
        getList: function (sucess, error) {
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK"
            }).then(sucess, error);
        }
    };
}]);
// 项目详情
App.factory('getProjectDetail', ['$http', function ($http) {
    var TEST_SERVER_BASE_URL = 'http://192.168.1.70/mobile/jsonp?url=';
    return {
        getDetail: function (id, sucess, error) {
            console.log('id: ', id);
            var arg = encodeURIComponent("mobile/trade/invest/bill/detail?id=" + id);
            console.log('url: ', TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK");
            $http({
                method: "JSONP",
                url: TEST_SERVER_BASE_URL + arg + "&callback=JSON_CALLBACK"
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
        //return $scope.page_titles[$location.path()];
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
    $scope.login = function () {
        var cred = {
            "username": $scope.username,
            "password": $scope.password,
            "checkcode": $scope.checkcode
        };
        loginService.login(cred, function (res) {
            console.log('sucess & data: ', res.data.data);
            $scope.item = res.data.data;
        }, function (res) {
            console.log('err: ', res);
        });
    }
}]);
//更多
App.controller('more_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {}]);
//投资列表
App.controller('invest_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'getNewProjectList', function ($scope, $http, $location, $route, $routeParams, getNewProjectList) {
    $scope.billTypeList = ['待购买', '银票纯', '银票红', '银商', '转让', '第三方平台'];
    getNewProjectList.getList(function (res) {
        console.log('sucess: ', res.data.data);
        $scope.itemList = res.data.data;
    }, function (res) {
        console.log('err: ', res);
    });
}]);
//项目详情
App.controller('invest_item_detail_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'getProjectDetail', function ($scope, $http, $location, $route, $routeParams, getProjectDetail) {
    var billId = $routeParams.id.replace(':', '');
    getProjectDetail.getDetail(billId, function (res) {
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