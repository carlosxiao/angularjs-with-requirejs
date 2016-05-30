define(['app'], function(app) {
    return app.controller('CmdbCtrl', ['$rootScope' , '$scope' , '$http' , '$cookies' , '$window' , 'dialogs' , function($rootScope , $scope , $http , $cookies , $window , dialogs) {
        var userUuid=$rootScope.uuid
        var path=config.cmdbUrl+"/cmdb/idcs";
        
        var initDataList = function(){
            $http({
                url:path,
                method:'get',
                headers:{'uuid':userUuid}
            }).success(function(data){
                $scope.dataList = data.data;
            }).error(function(data){
                var message = data.message || null;
                if(message){
                    dialogs.error('查询机房信息失败' , message , 50);
                }
            });    
        };
        
        initDataList();

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
                    initDataList();    
                } else {
                    dialogs.error(data.message);                    
                }
            }).error(function(data){
                var message = data.message || null;
                if(message){
                    dialogs.error('操作vcenter信息失败' , message , 50);
                }
            });
            $("#idc-modal").modal('hide');
        };


        $scope.addIdcInfo = function() {
            $scope.vm.entity = null;
            $scope.op = "ADD";
            $("#idc-modal").modal('show');
        };

        $scope.updateIdcInfo= function(item){
            $scope.vm.entity = item;
            $scope.op = "UPDATE";
            $("#idc-modal").modal('show');  
        };

        $scope.deleteIdcInfo = function(item){
            var delDlg = dialogs.confirm("提示" , "确认删除[" +item.Name+ "]机房信息");

            delDlg.result.then(function(btn){
                $http({
                    url:path,
                    method:'delete',
                    data : {'id':item.id}
                }).success(function(data){
                    if (data.result === true) {
                        dialogs.notify("成功" , "操作成功");
                        $scope.vm.entity = null;
                        initDataList();    
                    } else {
                        dialogs.error(data.message);                    
                    }
                }).error(function(data){
                    var message = data.message || null;
                    if(message){
                        dialogs.error('操作机房信息失败' , message , 50);
                    }
                });
            });
        };

    }]);
});