'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'views/mainpage.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1198237676975868');
  $facebookProvider.setPermissions("email,public_profile, user_posts, publish_actions, user_photos, user_tagged_places, user_location");
})

.run(function($rootScope){
	(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
	$scope.isLoggedIn = false;

	$scope.login = function(){
		$facebook.login().then(function(){
			$scope.isLoggedIn = true;
			refresh();
		});
	}

	$scope.logout = function(){
		$facebook.logout().then(function(){
			$scope.isLoggedIn = false;
			refresh();
		});
	}

	$scope.calcDistance = function() {}

	function refresh(){
		$facebook.api("/me?fields=id,name,gender,locale,first_name,last_name,email,location").then(function(response){
			$scope.welcomeMsg = "Welcome "+ response.name;
			$scope.isLoggedIn = true;
			$scope.userInfo = response;
			console.log("Userinfo");
			console.log($scope.userInfo);
            $facebook.api('/me/picture').then(function(response){
                $scope.picture = response.data.url;
                $facebook.api('/me/permissions').then(function(response){
                    $scope.permissions = response.data;
                    $facebook.api('/me/posts').then(function(response){
                        console.log(response.data);
                        $scope.posts = response.data;
					});
                    $facebook.api('/me/tagged_places').then(function(response){
                        console.log(response.data);
                        $scope.places = response.data;
					});
					$facebook.api('/' + $scope.userInfo.location.id, {
						fields: 'location'
					}).then(function(locationResponse) {
						$scope.currLocation = locationResponse;
						console.log('Cuurent location object');
						console.log($scope.currLocation);
					});
                });
            });
		},
		function(err){
			$scope.welcomeMsg = "Please Log In";
		});
	}

	$scope.postStatus = function(){
		var body = this.body;
		$facebook.api('/me/feed', 'post', {message: body}).then(function(response){
			$scope.msg = 'Thanks for Posting';
			refresh();
		});
	}

	refresh();
}]);