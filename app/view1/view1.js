'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'cfpLoadingBar', function($scope, $http, cfpLoadingBar) {

	$scope.from_value = 100;

	$scope.loading = true;

	$http.get('http://globalcurrencies.xignite.com/xGlobalCurrencies.json/ListCurrencies?_Token=DCA8FB8AAF9A4670BEBE6D7136B82B99&_fields=CurrencyList.Active,CurrencyList,CurrencyList.Symbol,CurrencyList.Name')
	.success(function(data, status, headers, config) {
		$scope.currencies = data["CurrencyList"];
		console.log($scope.currencies);

		for (var i = 0; i < $scope.currencies.length; i++) {
			if ($scope.currencies[i]["Symbol"] == "USD") {
				$scope.from_currency = $scope.currencies[i];
			}
			if ($scope.currencies[i]["Symbol"] == "SGD") {
				$scope.to_currency = $scope.currencies[i];
			}
		}

		console.log($scope.from_currency);
		console.log($scope.to_currency);

		$scope.loading = false;

	});

	$scope.get_exchange_rates = function (from_currency, to_currency) {

		$scope.loading = true;

		$http.get('https://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?_Token=DCA8FB8AAF9A4670BEBE6D7136B82B99&Symbol=' + from_currency + to_currency + '&_fields=BaseCurrency,QuoteCurrency,Bid,Mid,Ask')
		.success(function(data, status, headers, config) {
			$scope.to_value = $scope.from_value * data["Mid"];
			$scope.loading = false;
		});
	}

	$scope.get_exchange_rates('SGD', 'USD');

}]);