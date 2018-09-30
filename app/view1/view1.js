'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.service('itemsService', function() {

    const items = [{
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 200000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 10000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 23000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 1000000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 4
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 1000000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 2
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 1
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 50000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 2300000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 1000000
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 555555
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 4555
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 34523
        },
        {
            lorem: 'xxxxxxx',
            ipsum: 'xxxxxxx',
            dolor: 'xxxxxxx',
            sit: 'xxxxxxx',
            amet: 23
        }
    ];

    return {
        getMany: _getMany,
    };

    function _getMany(skip, top) {
        return {
            total: items.length,
            items: items.slice(skip, skip + top)
        }
    }

})

.controller('View1Ctrl', ['$scope', 'itemsService', function($scope, itemsService) {
    $scope.filtersIsOpen = false;
    $scope.skip = 0;
    $scope.top = 5;

    $scope.response = itemsService.getMany($scope.skip, $scope.top);
    $scope.currentPage = $scope.response.items;

    $scope.infoPages = [];

    let cursor = 0;
    let cont = 1;
    let total = $scope.response.total;


    $scope.paginator = function() {
        while (true) {
            if (total > cursor + $scope.top) {
                $scope.infoPages.push({
                    page: cont,
                    skip: cursor,
                    top: $scope.top,
                    state: cont == 1 ? true : false
                });

                cont++;
                cursor += $scope.top;
            } else {
                if (cursor < total) {
                    $scope.infoPages.push({
                        page: cont,
                        skip: cursor,
                        top: total - cursor,
                        state: false
                    });
                }
                break;
            }
        }
    }
    $scope.paginator();
    console.log(JSON.stringify($scope.infoPages));

    $scope.loadCurrentPage = function(skip, top) {
        $scope.currentPage = itemsService.getMany(skip, top).items;
        console.log(JSON.stringify($scope.currentPage));
    }

    $scope.cleanSelected = function() {
        $scope.infoPages.forEach(function(valor, indice, array) {
            valor.state = false;
        })
    }
}]);