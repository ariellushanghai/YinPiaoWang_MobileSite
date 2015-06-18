/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App = angular.module('App', ['ngRoute', 'ngCookies', 'angular-carousel', 'ngTouch', 'App_directives','App_services','App_controllers']);
App.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'partials/main.html',
        controller: 'main_controller',
        page_title: '银票网',
        header_left_button: 'register',
        header_right_button: 'login'
    }).when('/invest', {
        templateUrl: 'partials/invest.html',
        controller: 'invest_controller',
        page_title: '投资列表',
        header_left_button: 'blank',
        header_right_button: 'default'
    }).when('/invest/:id', {
        templateUrl: 'partials/invest_item_detail.html',
        controller: 'invest_item_detail_controller',
        page_title: '项目详情'
    }).when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'login_controller',
        page_title: '注册',
        header_left_button: 'blank',
        header_right_button: 'default'
    }).when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'login_controller',
        page_title: '登录',
        header_left_button: 'default',
        header_right_button: 'default'
    }).when('/personal_center', {
        templateUrl: 'partials/personal_center.html',
        controller: 'PC_controller',
        page_title: '个人中心',
        header_left_button: 'blank',
        header_right_button: 'goPayIndex'
    }).when('/personal_center/my_investments/', {
        templateUrl: 'partials/my_investments.html',
        controller: 'PC_my_investments_controller',
        page_title: '我的投资',
        header_left_button: 'default',
        header_right_button: 'filterOfMyInvestments'
    }).when('/personal_center/my_investments/item/:id', {
        templateUrl: 'partials/my_investments_item_detail.html',
        controller: 'PC_my_investments_item_detail_controller',
        page_title: '订单详细',
        header_left_button: 'default',
        header_right_button: 'default'
    }).when('/personal_center/my_teals', {
        templateUrl: 'partials/my_teals.html',
        controller: 'PC_myTeals_controller',
        page_title: '我的银两',
        header_left_button: 'default',
        header_right_button: 'default'
    }).when('/personal_center/goPayIndex', {
        templateUrl: 'partials/goPayIndex.html',
        controller: 'PC_goPayIndex_controller',
        page_title: '充 值',
        header_left_button: 'default',
        header_right_button: 'default'
    }).when('/personal_center/save_my_seat', {
        templateUrl: 'partials/userBeSpeak.html',
        controller: 'PC_saveMySeat_controller',
        page_title: '预约助手',
        header_left_button: 'default',
        header_right_button: 'save_my_seat_rule'
    }).when('/personal_center/save_my_seat_rule', {
        templateUrl: 'partials/save_my_seat_rule.html',
        //controller: 'PC_saveMySeatRule_controller',
        page_title: '预约规则',
        header_left_button: 'default',
        header_right_button: 'default'
    }).when('/more', {
        templateUrl: 'partials/more.html',
        controller: 'more_controller',
        page_title: '更多',
        header_left_button: 'blank',
        header_right_button: 'default'
    }).when('/fourZeroFour', {
        templateUrl: 'partials/404.html',
        controller: 'fourZeroFour_controller',
        page_title: '没找到',
        header_left_button: 'blank',
        header_right_button: 'default'
    }).otherwise({
        redirectTo: '/fourZeroFour'
    });

    //$locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
App.run(['$rootScope', '$location', '$cookies', '$log', 'authHttpResponseInterceptor', function ($rootScope, $location, $cookies, $log,  authHttpResponseInterceptor) {
    $rootScope.log = function (str) {
        console.log(str);
    };
    $rootScope.signOut = function () {
        console.log('$rootScope.signOut()');

    };

    $rootScope.$on('$routeChangeSuccess', function (evt, curr_route, prev_route) {
        //Interceptor.log(curr_route);
    });
}]);
