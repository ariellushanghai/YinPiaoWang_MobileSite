/**
 * Created by <陆欢 ariellushanghai@icloud.com>on 4/15/15.
 */
var App_directives = angular.module('App_directives', ['ngRoute', 'ngCookies', 'angular-carousel', 'ngTouch']);


//============================= Directives ===========================================================
App_directives.directive('pageHeader', function () {
    return {
        restrict: 'A',
        replace: true,
        //scope: false,
        template: '<header>' +
        '<a class="left-button" ng-href="{{l_btn.ngHref}}" ng-click="$log.debug($event)">{{l_btn.text}}</a>' +
        '<h1 class="title">{{getPageTitle}}</h1>' +
        '<a class="right-button" ng-href="{{r_btn.ngHref}}" ng-click="$scope.fire(\'header_r_clicked\', l_btn_evt)">{{r_btn.text}}</a>' +
        '</header>'
    };
});
//图片轮播指令
//App.directive('imgTab',function(){
//    return {
//        restrict: 'C',
//        //template: '<div></div>',
//        //replace: true,
//        link: function($scope,ele,attrs){
//            var index_ = 0;
//            var len = $scope.imgtabs.length;
//
//            var li_ = "";
//            for(var i = 0; i < len; i++){
//                li_ += "<li></li> ";
//            }
//            var ol_ = "<ol>" + li_ + "</ol>";
//            $("#img_tab").append(ol_);
//
//            $("#img_tab ol li").eq(0).addClass('current');
//
//            $scope.swipe_left_index = function () {
//                //alert(2);
//                index_++;
//                if(index_ >= len) index_ = len-1;
//                $("#img_tab ul").animate({'margin-left':'-100'*index_ + '%'},300);
//                $("#img_tab ol li").eq(index_).addClass('current').siblings().removeClass("current");
//            }
//            $scope.swipe_right_index = function () {
//                console.log('right');
//                index_--;
//                if(index_ < 0) index_ = 0;
//                $("#img_tab ul").animate({'margin-left':'-100'*index_ + '%'},300);
//                $("#img_tab ol li").eq(index_).addClass('current').siblings().removeClass("current");
//            }
//        }
//    }
//});
//
////公司介绍指令
//App.directive('gognsijieshao',function(){
//    return {
//        restrict: 'E',
//        template: '<section>'+
//        '<h3 class="title_h3">公司介绍</h3>'+
//        '<div class="gsjs" id="gsjs">'+
//        '<ul class="js_ul" id="js_ul">'+
//        '<li>'+
//        '<i class="icon_js1"></i><br />'+
//        '<span>第三方支付保驾护<br />航，资金更安全</span>'+
//        '</li>'+
//        '<li>'+
//        '<i class="icon_js2"></i><br />'+
//        '<span>银票均有托收凭证<br />银行提供担保</span>'+
//        '</li>'+
//        '<li>'+
//        '<i class="icon_js3"></i><br />'+
//        '<span>票据均有第三方<br />担保方担保</span>'+
//        '</li>'+
//        '<li>'+
//        '<i class="icon_js4"></i><br />'+
//        '<span>战略合作伙伴<br />提供本息担保</span>'+
//        '</li>'+
//        '<li>'+
//        '<i class="icon_js5"></i><br />'+
//        '<span>优秀风控团队<br />用专业铸就信赖</span>'+
//        '</li>'+
//        '</ul>'+
//        '</div>'+
//        '</section>',
//        replace: true,
//        link: function($scope,ele,attrs){
//            //公司介绍滚动js
//            var timeID_gsjs;
//            gsjsgd();
//            function gsjsgd() {
//                clearInterval(timeID_gsjs);
//                var winW = $(window).width();
//                var js_ulW = $("#js_ul").width();
//                if (winW <= js_ulW) {
//                    var liW = $("#js_ul li").width();
//                    var beishu = parseInt(winW / liW);
//                    //alert(beishu)
//                    $("#gsjs").css({
//                        "width": liW * beishu,
//                        "margin-left": (winW - liW * beishu) / 2
//                    });
//                    timeID_gsjs = setInterval(function () {
//                        var li1 = $("#js_ul li").eq(0);
//                        var html_ = li1.clone();
//                        li1.animate({
//                            "margin-left": "-10em"
//                        }, 500, function () {
//                            $(this).parent().append(html_);
//                            $(this).remove();
//                        });
//                    }, 3000);
//                }else{
//                    $("#gsjs").css({
//                        "width": "100%",
//                        "margin-left":"0"
//                    });
//                };
//            }
//            //手机横竖屏监控
//            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", gsjsgd, false);
//        }
//    }
//});
