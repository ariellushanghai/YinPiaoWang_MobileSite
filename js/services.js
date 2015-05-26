var listProject_module = angular.module('listProject_module', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngResource']);
listProject_module.factory('getNewProjectList_Factory', ['$resource', '$http', function($resource, $http) {
    return $resource("http://192.168.1.130:80/JSONs/test_data.json", {}, {
        get: {
            method: 'GET',
            cache: false,
            isArray: true
        },
        save: {
            method: 'POST',
            cache: false,
            isArray: false
        },
        update: {
            method: 'PUT',
            cache: false,
            isArray: false
        },
        delete: {
            method: 'DELETE',
            cache: false,
            isArray: false
        }
    });

}]);