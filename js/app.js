/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App = angular.module('App', ['ngRoute', 'ngMaterial', 'ngMessages', 'listProject_module']);
App.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'main_controller'
        }).when('/invest', {
            templateUrl: 'partials/invest.html',
            controller: 'invest_controller'
        }).when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'login_controller'
        }).when('/personal_center', {
            templateUrl: 'partials/personal_center.html',
            controller: 'personal_center_controller'
        }).otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true).hashPrefix('!');
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: true
    //});
}]);
App.controller('main_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {
    //$http.get('JSONs/test_data.json').success(function(data) {
    //    console.log('data: ',JSON.stringify(data));
    //});
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);
App.controller('header_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {
    $http.get('JSONs/test_data.json').success(function(data) {
        //console.log('data: ', JSON.stringify(data));
    });
}]);
App.controller('menu_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {
    $http.get('JSONs/test_data.json').success(function(data) {
        //console.log('data: ', JSON.stringify(data));
    });
}]);
App.controller('login_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {


}]);
App.controller('index_page_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {
    $http.get('JSONs/test_data.json').success(function(data) {
        //console.log('data: ', JSON.stringify(data));
    });
}]);
App.controller('invest_controller', ['$scope', '$http', '$location', '$route', '$routeParams', 'getNewProjectList_Factory', function($scope, $http, $location, $route, $routeParams, getNewProjectList_Factory) {
    //$scope.newProjectList = [];

    //console.log("$scope.newProjectList :",$scope.newProjectList );
    getNewProjectList_Factory.get({},
        function success(response) {
            console.log("Success:" + JSON.stringify(response));
            $scope.newProjectList = response;
        },
        function error(errorResponse) {
            console.log("Error:" + JSON.stringify(errorResponse));
        }
    );


}]);
App.controller('personal_center_controller', ['$scope', '$http', '$location', '$route', '$routeParams', function($scope, $http, $location, $route, $routeParams) {
    $http.get('JSONs/test_data.json').success(function(data) {
        console.log('data: ', JSON.stringify(data));
    });
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);