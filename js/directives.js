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
