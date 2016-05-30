define(['app'], function(app) {
    return app.controller('IndexCtrl', ['$rootScope' , '$scope' , '$http' , '$cookies' , '$window' , 'dialogs' , function($rootScope , $scope , $http , $cookies , $window , dialogs) {
        var userUuid=$rootScope.uuid
        var path=config.oauthUrl+"/menu";
        $http({
            url:path,
            method:'get',
            headers:{'uuid':userUuid}
        }).success(function(data){
            //console.log(data);
            $scope.menuList = data.data;
        }).error(function(data){
            var message = data.message || null;
            if(message){
                dialogs.error('查询菜单失败' , message , 50);
            }
        });

        //dialogs.error('Error' , 'test' , 50);

        //logout
        $scope.logout = function() {
        	var logoutConfirm = dialogs.confirm('确认' , '确认退出?');
        	logoutConfirm.result.then(function(btn){
				$http({
		            url: config.oauthUrl + "/logout",
		            method:'get',
		            headers:{'uuid':userUuid}
	            }).success(function(data){
	            	$cookies.remove('uuid');
	                $cookies.remove('role');
	                $cookies.remove('name');
	                $window.location.href = "login.html";
	            }).error(function(data){
	                var message = data.message || null;
		            if(message){
		                dialogs.error('退出失败' , message , 50);
		            }
		        });
			},function(btn){
				console.log('You confirmed "No."');
			});
        }
    }]);
});