/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App = angular.module('App', ['ngRoute', 'ngMaterial', 'ngMessages', 'listProject_module']);
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'main_controller',
            page_title: 'shouye'

        }).when('/invest', {
            templateUrl: 'partials/invest.html',
            controller: 'invest_controller',
            page_title: 'touzi'
        }).when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'login_controller'
        }).when('/personal_center', {
            templateUrl: 'partials/personal_center.html',
            controller: 'personal_center_controller'
        }).when('/more', {
            templateUrl: 'partials/more.html',
            controller: 'more_controller'
        }).otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);
//页面标题栏
App.controller('header_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
    console.log($location);
    console.log($route);
    console.log($routeParams);
    $scope.page_titles = {
        "/": "首 页",
        "/invest": "登 录",
        "/login": "更 多",
        "/personal_center": "投资列表",
        "/more": "我的账户"
    };
    $scope.getPageTitle = function () {
        //return $scope.page_titles[$location.path()];
        return $route.current.page_title;
    }
    console.log("$scope.page_title: ",$scope.page_title);
    console.log("$route.current: ",$route.current.page_title);
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
App.controller('login_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {

}]);
App.controller('more_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {

}]);

App.controller('invest_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'getNewProjectList_Factory', function ($scope, $http, $location, $route, $routeParams, getNewProjectList_Factory) {

    //getNewProjectList_Factory.get({},
    //    function success(response) {
    //        console.log("Success:" + JSON.stringify(response));
    //        $scope.newProjectList = response;
    //    },
    //    function error(errorResponse) {
    //        console.log("Error:" + JSON.stringify(errorResponse));
    //    }
    //);
}]);
App.controller('personal_center_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);
App.controller('index_page_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {

}]);