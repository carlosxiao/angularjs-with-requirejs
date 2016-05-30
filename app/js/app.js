define(['routes','uiBootstrap','angular-ui-router' , 'lteApp' , 'angular-dialog-service' , 'angular-datatables'], function (config) {
    'use strict';

    var app = angular.module('app', ['ui.bootstrap','ui.router' , 'ngResource' , 'ngCookies' , 'datatables' , 'w5c.validator' , 'dialogs.main' , 'pascalprecht.translate','dialogs.default-translations']);
    

    app.config(
    [
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$stateProvider',
        '$resourceProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$translateProvider',
        'dialogsProvider',
        'w5cValidatorProvider',
        function($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $stateProvider, $resourceProvider , $urlRouterProvider , $httpProvider , $translateProvider , dialogsProvider , w5cValidatorProvider)
        {
	        app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;
            app.resource   = $resourceProvider.resource;
            //$locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('UserInterceptor');
            if(config.states !== undefined)
            {
                angular.forEach(config.states, function(states, path)
                {
                    //console.log(route);
                    //$urlRouterProvider.when(path, {templateUrl:route.templateUrl, resolve:dependencyResolverFor(route.dependencies)});
                    $stateProvider.state(states.name,states.data);
                });
            }

            if(config.defaultRoutePath !== undefined)
            {
                $urlRouterProvider.otherwise(config.defaultRoutePath);
            }

            dialogsProvider.useBackdrop('static');
            dialogsProvider.useEscClose(false);
            dialogsProvider.useCopy(false);
            dialogsProvider.setSize('sm');

            $translateProvider.translations('es',{
                DIALOGS_ERROR: "Error",
                DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
                DIALOGS_CLOSE: "Cerca",
                DIALOGS_PLEASE_WAIT: "Espere por favor",
                DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
                DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
                DIALOGS_PERCENT_COMPLETE: "% Completado",
                DIALOGS_NOTIFICATION: "Notificacion",
                DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
                DIALOGS_CONFIRMATION: "Confirmacion",
                DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
                DIALOGS_OK: "Bueno",
                DIALOGS_YES: "Si",
                DIALOGS_NO: "No"
            });

            $translateProvider.preferredLanguage('en-US');

            // 全局校验配置
            w5cValidatorProvider.config({
                blurTrig   : false,
                showError  : true,
                removeError: true

            });

            w5cValidatorProvider.setRules({
                email         : {
                    required: "输入的邮箱地址不能为空",
                    email   : "输入邮箱地址格式不正确"
                },
                username      : {
                    required      : "输入的用户名不能为空",
                    pattern       : "用户名必须输入字母、数字、下划线,以字母开头",
                    w5cuniquecheck: "输入用户名已经存在，请重新输入"
                },
                password      : {
                    required : "密码不能为空",
                    minlength: "密码长度不能小于{minlength}",
                    maxlength: "密码长度不能大于{maxlength}"
                },
                repeatPassword: {
                    required: "重复密码不能为空",
                    repeat  : "两次密码输入不一致"
                },
                number        : {
                    required: "数字不能为空"
                },
                customizer    : {
                    customizer: "自定义验证数字必须大于上面的数字"
                }
            });
        }
    ]);

    app.factory('UserInterceptor', ["$q","$rootScope","$cookies","$location",function ($q,$rootScope,$cookies,$location) {   
        return {
            request:function(config){
                //config.headers["Client-Type"]   = 1;
                config.headers["Content-Type"]  = 'application/json; charset=utf-8';
                config.headers["uuid"]  = $rootScope.uuid;
                return config;
            },
            responseError : function(response){
                //判断错误码，如果是未登录
                if(response.status == 401 || response.status == 408){
                    $rootScope.uuid  = "";
                    $rootScope.role = "";
                    $rootScope.name = "";
                    $cookies.remove('uuid');
                    $cookies.remove('role');
                    $cookies.remove('name');
                    $rootScope.$emit("userIntercepted","notLogin",response);
                }
                return $q.reject(response);
            }
        };
    }]);
    app.run(['$rootScope','$location','$cookies','$window' , '$templateCache' , '$state', '$stateParams' ,function($rootScope,$location , $cookies , $window , $templateCache , $state, $stateParams){
        $rootScope.uuid    =$cookies.get("uuid") || null;
        $rootScope.role   =$cookies.get("role") || null;
        $rootScope.username=$cookies.get("name") || null;  
        // 处理错误请求事件
        $rootScope.$on('userIntercepted',function(errorType){
            $window.location = 'login.html';
        });

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $templateCache.put('/dialogs/custom.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="course">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div>');
        $templateCache.put('/dialogs/custom2.html','<div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> Custom Dialog 2</h4></div><div class="modal-body"><label class="control-label" for="customValue">Custom Value:</label><input type="text" class="form-control" id="customValue" ng-model="data.val" ng-keyup="hitEnter($event)"><span class="help-block">Using "dialogsProvider.useCopy(false)" in your applications config function will allow data passed to a custom dialog to retain its two-way binding with the scope of the calling controller.</span></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="done()">Done</button></div>')
    }]);

	return app;
});