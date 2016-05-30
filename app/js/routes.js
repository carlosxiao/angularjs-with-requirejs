define([], function()
{
    var loadController = function(controllerName) {
        return ["$q", function($q) {
            var deferred = $q.defer();
            require([controllerName], function() {deferred.resolve(); });
            return deferred.promise;
        }];
    };

    return{
        defaultRoutePath: '/index',
        states: [
            {
            name: "dashboard",
            data: {
                    url: '/index',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'DashboardCtrl',
                    resolve: { homeviewcontroller: loadController("controllers/dashboard")}
                }
            },
            {
                name: "cmdb",
                data: {
                    url: '/cmdb/idc',
                    templateUrl: 'partials/cmdb/idc.html',
                    controller: 'CmdbCtrl' ,
                    resolve: { homeviewcontroller: loadController("controllers/cmdb/idc")}
                }
            },
            {
                name: "esx",
                data: {
                    url: '/cmdb/esx',
                    templateUrl: 'partials/cmdb/esx.html',
                    controller: 'EsxCtrl' ,
                    resolve: { homeviewcontroller: loadController("controllers/cmdb/esx")}
                }
            },
            {
                name: "vcenter",
                data: {
                    url: '/cmdb/vcenter',
                    templateUrl: 'partials/cmdb/vcenter.html',
                    controller: 'VcenterCtrl' ,
                    resolve: { homeviewcontroller: loadController("controllers/cmdb/vcenter")}
                }
            },
            {
                name: "machines",
                data: {
                    url: '/cmdb/machines',
                    templateUrl: 'partials/cmdb/machines.html',
                    controller: 'MachinesCtrl' ,
                    resolve: { homeviewcontroller: loadController("controllers/cmdb/machines")}
                }
            }


        ]
    };
});