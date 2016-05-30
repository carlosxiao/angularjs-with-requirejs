define(['app'], function(app) {
    return app.controller('VcenterCtrl', ['$rootScope' , '$scope' , '$http' , '$cookies' , '$window' , 'dialogs' , 'DTOptionsBuilder' , function($rootScope , $scope , $http , $cookies , $window , dialogs , DTOptionsBuilder) {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10);
        var userUuid=$rootScope.uuid
        var path=config.cmdbUrl+"/cmdb/vcenters";
        var initVcenterList = function(){
            $http({
                url:path,
                method:'get'
            }).success(function(data){
                $scope.dataList = data.data;
            }).error(function(data){
                var message = data.message || null;
                if(message){
                    dialogs.error('查询vcenter信息失败' , message , 50);
                }
            });
        };
        
        initVcenterList();

        var vm = $scope.vm = {
            htmlSource        : "",
            showErrorType     : "1",
            showDynamicElement: true,
            entity            : {}
        };
        vm.validateOptions = {
            blurTrig: true
        };

        vm.saveEntity = function ($event) {
            //保存vcenter信息
            $http({
                url:path,
                method:$scope.op == 'ADD'?'post':'put',
                data : $scope.vm.entity
            }).success(function(data){
                if (data.result === true) {
                    dialogs.notify("成功" , "操作成功");
                    $scope.vm.entity = null;
                    initVcenterList();    
                } else {
                    dialogs.error(data.message);                    
                }
            }).error(function(data){
                var message = data.message || null;
                if(message){
                    dialogs.error('操作vcenter信息失败' , message , 50);
                }
            });
            $("#vcenter-modal").modal('hide');
        };

        $scope.addVcenterInfo = function(){
            $scope.vm.entity = null;
            $scope.op = "ADD";
            $("#vcenter-modal").modal('show');
        };

        $scope.updateVcenterInfo = function(item){
            $scope.vm.entity = item;
            $scope.op = "UPDATE";
            $("#vcenter-modal").modal('show');
        };


        $scope.deleteVcenter = function(item) {
            var delDlg = dialogs.confirm("提示" , "确认删除[" +item.host+ "]vcenter信息");

            delDlg.result.then(function(btn){
                $http({
                    url:path,
                    method:'delete',
                    data : {'id':item.id}
                }).success(function(data){
                    if (data.result === true) {
                        dialogs.notify("成功" , "操作成功");
                        $scope.vm.entity = null;
                        initVcenterList();    
                    } else {
                        dialogs.error(data.message);                    
                    }
                }).error(function(data){
                    var message = data.message || null;
                    if(message){
                        dialogs.error('操作vcenter信息失败' , message , 50);
                    }
                });
            });
        }

    }]);
});