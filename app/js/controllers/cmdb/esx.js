define(['app'], function(app) {
    return app.controller('EsxCtrl', ['$rootScope' , '$scope' , '$http' , '$cookies' , '$window' , 'dialogs' , function($rootScope , $scope , $http , $cookies , $window , dialogs) {
        $scope.gridOptions = {
            enableSorting: true,
            exporterMenuCsv: true,
            enableFiltering : true ,
            enableGridMenu: true,
            paginationPageSizes: [10, 50, 75],
            paginationPageSize: 10,
            enableColumnResizing:true ,
            columnDefs: [
              { name:'System_Ip', field: 'System_Ip' },
              { name:'Physical_Memory', field: 'Physical_Memory' },
              { name:'Physical_Cpu_Pkgs', field: 'Physical_Cpu_Pkgs'},
              { name:'Physical_Cpu_Model', field: 'Physical_Cpu_Model'},
              { name:'Physical_Cpu_Mhz', field: 'Physical_Cpu_Mhz'},
              { name:'Physical_Cpu_Cores', field: 'Physical_Cpu_Cores'},
              { name:'Net_Dev_Name', field: 'Net_Dev_Name'},
              { name:'Mac_Address', field: 'Mac_Address'},
              { name:'Logical_Cpu_Cores', field: 'Logical_Cpu_Cores'},
              { name:'主机id', field: 'Host_Id'},
              { name:'Device_uuid', field: 'Device_uuid'},
              { name:'Device_type', field: 'Device_type'},
              { name:'Device_model', field: 'Device_model'},
              { name:'Device_Status', field: 'Device_Status'},
              { name:'Datastore_Type', field: 'Datastore_Type'},
              { name:'Datastore_Space', field: 'Datastore_Space'},
              { name:'Datastore_Name', field: 'Datastore_Name'},
              { name:'Datastore_Free_Space', field: 'Datastore_Free_Space'}
            ] 
        };

        var userUuid=$rootScope.uuid
        var path=config.cmdbUrl+"/cmdb/esxilist";
        $http({
            url:path,
            method:'get',
            headers:{'uuid':userUuid}
        }).success(function(data){
            $scope.gridOptions.data = data.data;
        }).error(function(data){
            var message = data.message || null;
            if(message){
                dialogs.error('查询机房信息失败' , message , 50);
            }
        });


    }]);
});