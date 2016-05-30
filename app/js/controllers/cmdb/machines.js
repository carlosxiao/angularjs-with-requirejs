define(['app' , 'bootstrap-popover'], function(app) {
    return app.controller('MachinesCtrl', ['$rootScope' , '$scope' , '$http' , '$cookies' , '$window' , 'dialogs' , 'DTOptionsBuilder' , function($rootScope , $scope , $http , $cookies , $window , dialogs , DTOptionsBuilder) {
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', true)
        .withOption('responsive' , true);
        var userUuid=$rootScope.uuid
        var path=config.cmdbUrl+"/cmdb/machines";
        $http({
            url:path,
            method:'get',
            headers:{'uuid':userUuid}
        }).success(function(data){
            $scope.dataList = data.data;
            setTimeout(function(){
              $(".show").popover();
            }, 100);
        }).error(function(data){
            var message = data.message || null;
            if(message){
                dialogs.error('查询机房信息失败' , message , 50);
            }
        });
    }]);
});