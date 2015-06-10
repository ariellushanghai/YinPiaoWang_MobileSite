/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App_controllers = angular.module('App_controllers', ['ngRoute', 'ngCookies', 'angular-carousel', 'ngTouch']);
//============================= Controllers ===========================================================
//Body控制器
App_controllers.controller('body_controller', ['$scope', '$route', function ($scope, $route) {
    var nav_bar_bottom_show_list = ['/', '/invest', '/personal_center', '/more'];
    $scope.$on('$routeChangeSuccess', function () {
        //console.log($route);
        //console.log($route.current);
        //console.log($route.current.originalPath);
        $scope.should_appear = _.contains(nav_bar_bottom_show_list, $route.current.originalPath.trim());
    });
    $scope.$on('header_l_clicked', function (evt) {
        console.log('header_l_clicked: ', evt);
    });
}]);
//页面标题栏
App_controllers.controller('header_controller', ['$scope', '$route', 'authHttpResponseInterceptor', function ($scope, $route, authHttpResponseInterceptor) {
    $scope.l_btn = null;
    $scope.r_btn = null;
    $scope.getPageTitle = null;
    $scope.$on('$routeChangeSuccess', function () {
        //console.log($route.current.originalPath.trim());
        var l_btn = $route.current.header_left_button || 'default';
        var r_btn = $route.current.header_right_button || 'default';
        console.log('左按钮：', authHttpResponseInterceptor.header_left_buttons[l_btn]);
        console.log('右按钮：', authHttpResponseInterceptor.header_right_buttons[r_btn]);
        $scope.l_btn = authHttpResponseInterceptor.header_left_buttons[l_btn];
        $scope.r_btn = authHttpResponseInterceptor.header_right_buttons[r_btn];
        $scope.getPageTitle = $route.current.page_title;
        $scope.l_btn_evt = l_btn.ngClick;
        $scope.r_btn_evt = r_btn.ngClick;
    });
    $scope.fire = function (txt, ng_click_evt) {
        console.log('fire()');
        console.log('txt: ', txt, 'ng_click_evt: ', ng_click_evt);
        $scope.$emit(txt, ng_click_evt);
    };
}]);
//底部导航条
App_controllers.controller('menu_controller', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (view_location) {
        return view_location === $location.path();
    };
}]);
//首页
App_controllers.controller('main_controller', ['$scope', 'userInfo', 'FetchDataService', 'globals', function ($scope, userInfo, FetchDataService, globals) {
    $scope.onOff = ['关闭', '开启'];
    $scope.billTypeList = ['待购买', '银票纯', '银票红', '银商', '转让', '第三方平台'];

    var dir = globals.ADDRESS;
    var slide_arg = {
        path: "/home/banner",
        page: 1,
        num: 10
    };
    var billList = {
        num: 10,
        page: 1,
        status: 0
    };
    // 首页幻灯片
    FetchDataService.fetchArray('GRT_IMAGE', 'TEST_2_SERVER', slide_arg).then(function (res) {
        //console.log('GRT_IMAGE res: ', res);
        angular.forEach(res, function (elm, index) {
            //console.log(dir['GRT_BANNER_IMAGES'] + elm.id);
            elm.slide_src = dir['GRT_BANNER_IMAGES'] + elm.id;
        });
        $scope.slides = res;
    });
    // 最新投资项目
    FetchDataService.fetchData('FINDBILLLIST_MAIN', 'TEST_2_SERVER', billList).then(function (res) {
        //console.log('FINDBILLLIST_MAIN res: ', res);
        $scope.latestItems = res;
    });

    $scope.page = {
        "type": 0,
        "page": 1,
        "num": 10
    };

    FetchDataService.fetchData('List', 'ADMIN_SERVER', $scope.page).then(function (res) {
        console.log('首页 res: ', res);
        $scope.itemList = res;
    });
}]);
//登陆
App_controllers.controller('login_controller', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.username = '13812345678';
    $scope.password = '111111';
    $scope.fetchCaptcha = function () {
        loginService.fetchCaptcha();
    };
    $scope.fetchCaptcha(); //点击验证码需要
    $scope.login = function () {
        var cred = {
            username: $scope.username,
            password: $scope.password,
            checkCode: $scope.checkCode
        };
        loginService.login(cred);
    }
}]);
//注册
App_controllers.controller('register', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.username = '13812345678';
    $scope.password = '111111';
    $scope.fetchCaptcha = function () {
        loginService.fetchCaptcha();
    };
    $scope.fetchCaptcha(); //点击验证码需要
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
App_controllers.controller('more_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {}]);
//投资列表
App_controllers.controller('invest_controller', ['$scope', 'FetchDataService', function ($scope, FetchDataService) {
    $scope.billTypeList = ['待购买', '银票纯', '银票红', '银商', '转让', '第三方平台'];
    $scope.page = {
        "type": 0,
        "page": 1,
        "num": 10
    };
    $scope.$watch(function (scope) {
        return scope.page;
    }, function () {
        console.log('hey, page has changed!');
    });
    FetchDataService.fetchData('List', 'ADMIN_SERVER', $scope.page).then(function (res) {
        //console.log('res: ', res);
        $scope.itemList = res;
    });
}]);
//项目详情
App_controllers.controller('invest_item_detail_controller', ['$scope', '$route', '$routeParams', 'FetchDataService', function ($scope, $route, $routeParams, FetchDataService) {
    var billId = $routeParams.id.replace(':', '');
    var id = {
        "id": billId
    };
    FetchDataService.fetchData('Detail', 'ADMIN_SERVER', id).then(function (res) {
        //console.log('res: ', res);
        $scope.item = res;
    });
}]);
//个人中心
App_controllers.controller('personal_center_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.onOff = ['关闭', '开启'];
    $scope.data = {};
    FetchDataService.fetchData('GET_CUSTOMERACCOUNT', 'ADMIN_SERVER').then(function (res) {
        console.log('res: ', res);
        $scope.data = res;
    });
}]);
App_controllers.controller('personal_center_goPayIndex_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.data = {};
    FetchDataService.fetchData('GET_CUSTOMERACCOUNT', 'ADMIN_SERVER').then(function (res) {
        console.log('res: ', res);
        $scope.data = res;
    });
}]);
App_controllers.controller('fourZeroFour_controller', [function () {}]);