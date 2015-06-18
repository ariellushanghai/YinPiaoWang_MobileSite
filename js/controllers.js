/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App_controllers = angular.module('App_controllers', ['ngRoute', 'ngCookies', 'angular-carousel', 'ngTouch']);
//============================= Controllers ===========================================================
//Body控制器
App_controllers.controller('body_controller', ['$scope', '$route', '$location', '$window', function ($scope, $route, $location, $window) {
    var nav_bar_bottom_show_list = ['/', '/invest', '/personal_center', '/more'];
    $scope.$on('$routeChangeSuccess', function () {
        $scope.should_appear = _.contains(nav_bar_bottom_show_list, $route.current.originalPath);
    });
    //$scope.$on('header_l_clicked', function (evt) {
    //    console.log('header_l_clicked: ', evt);
    //});
    $scope.header_l_handler = function (href, evt_name) {
        console.log('header_l_handler() ', href, evt_name);
        if (href === '') {
            if (evt_name) {
                if (evt_name === 'history_back') {
                    return $window.history.back();
                }
                //return $scope.$broadcast("header_l_click", evt_name);
                return $scope.$broadcast(evt_name);
            } else {
                return false;
            }
        } else {
            console.log('header_l_handler go to ', href);
            $location.path(href);
        }
    };
    $scope.header_r_handler = function (href, evt_name) {
        console.log('header_r_handler() ', href, evt_name);
        if (href === '') {
            if (evt_name) {
                //return $scope.$broadcast("header_r_click", evt_name);
                return $scope.$broadcast(evt_name);
            } else {
                return false;
            }
        } else {
            console.log('header_r_handler go to ', href);
            $location.path(href);
        }
    };
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
        //console.log('左按钮：', authHttpResponseInterceptor.header_left_buttons[l_btn]);
        //console.log('右按钮：', authHttpResponseInterceptor.header_right_buttons[r_btn]);
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
    $scope.billTypeList = ['银票理财', '银商理财', '银票纯一号', '银票红一号', '银票红二号', '银票纯二号'];
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
        "type": '',
        "page": 1,
        "num": 10
    };
    $scope.switchTab = function (pageType) {
        $scope.page.type = pageType;
        $scope.fetchData();
    };
    $scope.fetchData = function () {
        FetchDataService.fetchData('List', 'ADMIN_SERVER', $scope.page).then(function (res) {
            console.log('首页 res: ', res);
            $scope.itemList = res;
        });
    }
    $scope.fetchData();
}]);
//登陆
App_controllers.controller('login_controller', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.username = '13506991523';
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
    $scope.username = '13506991523';
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
//投资列表
App_controllers.controller('invest_controller', ['$scope', 'FetchDataService', function ($scope, FetchDataService) {
    $scope.billTypeList = ['银票理财', '银商理财', '银票纯一号', '银票红一号', '银票红二号', '银票纯二号'];
    $scope.page = {
        "type": '',
        "page": 1,
        "num": 15
    };
    //$scope.$watch(function () {
    //    return $scope.page;
    //}, function (newValue, oldValue) {
    //    if(newValue !== oldValue) {
    //        console.log('newValue !== oldValue');
    //        console.log('$scope.page',$scope.page);
    //        $scope.fetchData($scope.page);
    //    }
    //});
    $scope.switchTab = function (pageType) {
        $scope.page.type = pageType;
        $scope.fetchData();
    };
    $scope.flipFlop = function (direction) {
        if (direction === '+') {
            $scope.page.page = $scope.page.page + 1;
        } else {
            $scope.page.page = $scope.page.page - 1;
        }
        $scope.fetchData();
    };
    $scope.fetchData = function () {
        FetchDataService.fetchData('List', 'ADMIN_SERVER', $scope.page).then(function (res) {
            console.log('$scope.page', $scope.page);
            console.log('invest_controller res: ', res);
            $scope.itemList = res;
            console.log('$scope.itemList.length: ', $scope.itemList.length);
        });
    };
    $scope.fetchData();
}]);
//项目详情
App_controllers.controller('invest_item_detail_controller', ['$scope', '$route', '$routeParams', 'FetchDataService', function ($scope, $route, $routeParams, FetchDataService) {
    var id = {
        "id": $routeParams.id
    };
    FetchDataService.fetchData('Detail', 'ADMIN_SERVER', id).then(function (res) {
        //console.log('res: ', res);
        $scope.item = res;
    });
}]);
//=============================================
//个人中心
App_controllers.controller('PC_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.onOff = ['关闭', '开启'];
    $scope.userInfoObj = userInfo.getUserInfo();
    $scope.log($scope.userInfoObj);
    $scope.data = {};
    FetchDataService.fetchData('GET_CUSTOMERACCOUNT', 'ADMIN_SERVER').then(function (res) {
        console.log('res: ', res);
        $scope.data = res;
    });
    FetchDataService.fetchData('GRT_MSGCOUNT', 'TEST_2_SERVER').then(function (res) {
        console.log('msgCount: ', res);
        $scope.data.msgCount = res;
    });
}]);
//我的投资
App_controllers.controller('PC_my_investments_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.showfilter = false;
    $scope.$on('filterOfMyInvestments', function (evt) {
        //console.log('evt.name: ',evt.name);
        $scope.showfilter = true;
    });
    $scope.page = {
        "num": 15,
        "page": 1,
        "status": '',
        "userId": userInfo.getUserInfo().id
            //或者取loginService的UserId
    };
    $scope.$watch(function () {
        return $scope.page.status;
    }, function (newValue, oldValue) {
        if (newValue == oldValue) {
            console.log('newValue: ', newValue, 'oldValue: ', oldValue);
            $scope.showfilter = false;
        } else {
            $scope.fetchData($scope.page);
        }
    });
    $scope.fetchData = function (page) {
        console.log('fetchData(', page.status, ')');
        FetchDataService.fetchData('GET_44', 'TEST_2_SERVER', page).then(function (res) {
            console.log('res: ', res);
            $scope.itemList = res;
            $scope.showfilter = false
        })
    };
    $scope.fetchData($scope.page);
}]);
//我的投资->订单详细
App_controllers.controller('PC_my_investments_item_detail_controller', ['$scope', '$route', '$routeParams', 'FetchDataService', function ($scope, $route, $routeParams, FetchDataService) {
    console.log($routeParams.id);
    var id = {
        "orderId": $routeParams.id
    };
    FetchDataService.fetchData('GET_45', 'TEST_2_SERVER', id).then(function (res) {
        console.log('res: ', res);
        $scope.item = res;
    });
}]);
// 我的投资->预约助手
App_controllers.controller('PC_saveMySeat_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.userInfoObj = userInfo.getUserInfo();
    FetchDataService.fetchData('GET', 'TEST_2_SERVER', {
        'uid': $scope.userInfoObj.userId
    }).then(function (res) {
        console.log('res: ', res);
        $scope.item = res;
    });
}]);
// 我的投资->我的银两列表
App_controllers.controller('PC_myTeals_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.teal = userInfo.getUserInfo().teal;
    $scope.page = {
        "num": 15,
        "page": 1,
        "status": 1,
        "userId": userInfo.getUserInfo().id
            //或者取loginService的UserId
    };
    $scope.typeList = ["注册奖励", "系统补发", "微博转发", "注册邀请", "每日签到", "大转盘", "VIP入群奖励", "投资奖励", "活动奖励", "纠错奖励", "官方奖励", "积分兑换", "活动赠送"];
    $scope.$watch(function () {
        return $scope.page.status;
    }, function (newValue, oldValue) {
        if (newValue == oldValue) {
            console.log('newValue: ', newValue, 'oldValue: ', oldValue);
            //$scope.showfilter = false;
        } else {
            $scope.fetchData($scope.page);
        }
    });
    $scope.fetchData = function (page) {
        FetchDataService.fetchData('FIND_TAELLIST', 'ADMIN_SERVER', page).then(function (res) {
            console.log('FIND_TAELLIST: ', res);
            $scope.itemList = res;
        });
    };
    $scope.fetchData($scope.page);
}]);
// 我的投资->预约规则
App_controllers.controller('PC_saveMySeatRule_controller', [function () {}]);
//充值
App_controllers.controller('PC_goPayIndex_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.data = {};
    FetchDataService.fetchData('GET_CUSTOMERACCOUNT', 'ADMIN_SERVER').then(function (res) {
        console.log('res: ', res);
        $scope.data = res;
    });
}]);
//=============================================
//更多
App_controllers.controller('more_controller', ['$scope', 'userInfo', 'FetchDataService', function ($scope, userInfo, FetchDataService) {
    $scope.fetchData = function () {
        FetchDataService.fetchData('FIND_TAELLIST', 'TEST_2_SERVER').then(function (res) {
            console.log('GRT_MSGCOUNT: ', res);
        });
    };
    $scope.fetchData();
}]);
// 404
App_controllers.controller('fourZeroFour_controller', [function () {}]);