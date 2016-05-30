require.config({
    baseUrl: '/js',
    paths: {
        'jquery' : 'lib/jquery/jquery.min',
        'jquery-ui' : 'lib/jQueryUI/jquery-ui.min',
        'angular': 'lib/angular/angular.min',
        'angular-ui-router': 'lib/angular-ui-router/angular-ui-router.min',
        'angular-resource': 'lib/angular-resource/angular-resource.min',
        'angular-cookies' : 'lib/angular-cookies/angular-cookies.min',
        'angular-sanitize' : 'lib/angular-sanitize/angular-sanitize.min' ,
        'angular-translate' : 'lib/angular-translate/angular-translate.min' ,
        'angular-dialog-service' : 'lib/angular-dialog-service/dist/dialogs.min' ,
        'angular-datatables' : 'lib/angular-datatables/angular-datatables.min' ,
        'w5c-validator' : 'lib/w5c-validator/w5cValidator.min' ,
        'dialogs-translations' : 'lib/angular-dialog-service/dist/dialogs-default-translations.min' ,
        'bootstrap-tooltip' : 'lib/bootstrap-tooltip/bootstrap-tooltip',
        'bootstrap-popover' : 'lib/bootstrap-popover/bootstrap-popover',
        'bootstrap' : 'lib/bootstrap/js/bootstrap.min',
        'bootstrap-datatables' : 'lib/datatables/dataTables.bootstrap.min',
        'jquery-datatables' : 'lib/datatables/jquery.dataTables.min',
        'uiBootstrap': 'lib/angular-bootstrap/ui-bootstrap-tpls.min',
        'config':'config',
        'lteApp' : 'lib/app'
    },
    shim: {
        'app': {
            deps: ['angular','angular-ui-router', 'uiBootstrap' , 'angular-cookies' , 'angular-resource' , 'w5c-validator']
        },
        'angular' : {
            deps: ['jquery']
        },
        'lteApp' : {deps : ['jquery' , 'jquery-ui']} ,
        'angular-dialog-service' : {deps : ['angular' , 'angular-sanitize' , 'angular-translate' , 'dialogs-translations']} ,
        'angular-datatables' : {deps : ['angular' , 'bootstrap' , 'jquery-datatables' , 'bootstrap-datatables']} ,
        'bootstrap-popover' : {deps : ['bootstrap' , 'bootstrap-tooltip']} ,
        'w5c-validator' : {deps : ['angular']} ,
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'uiBootstrap': {
            deps: ['angular']
        }
    }
});

require(['app','config' , 'controllers/index'], function(app) {
    angular.bootstrap(document, ['app']);
});


// requirejs.config({
//     baseUrl : 'js' ,
//     paths: {
//         underscore: 'lib/underscore/underscore',
//         angular: 'lib/angular/angular',
//         'angular-route': 'lib/angular-route/angular-route',
//         'controllers': 'controllers',
//         'services': 'services',
//         'providers': 'providers',
//         'filters': 'filters',
//         'jquery' : 'lib/jquery/jquery.min' ,
//         'jquery-ui' : 'lib/jQueryUI/jquery-ui.min' ,
//         'bootstrap': 'lib/bootstrap/js/bootstrap.min',
//         'directives': 'directives',
//         'app': 'app' ,
//         'lteApp' : 'lib/app' 
       
//     },

//     shim: {
//         underscore: {
//             exports: '_'
//         },
//         'angular': {
//             exports: 'angular'
//         },
//         'states': {
//             deps: ['angular'],
//             exports: 'states'
//         },
//         'angular-route': {
//             deps: ['angular']
//         },
//         'lteApp':{
//             deps : ['jquery','jquery-ui']
//         },  
//         'jquery-ui':{
//             deps : ['jquery']
//         },
//         'bootstrap': {
//                 deps: ['jquery']
//         },

//     },
//     priority: [
//         'angular',
//         'jquery' ,
//     ]
// });

// requirejs(['app'
//            ], function (angular, app, _) {
//                angular.bootstrap(document, ['app']);
//            });
