var datingSite = angular.module("datingSite", ['pascalprecht.translate']);

datingSite.config(function ($translateProvider) {
    $translateProvider.preferredLanguage('en');

    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
});

datingSite.controller('LanguageController', function($scope, $translate){
    $scope.languages =[{name: 'en'}, {name: 'uk'}]
    $scope.language = $scope.languages[0].name

    $scope.changeLanguage = function (key) {
        $translate.uses(key);
    };
})


datingSite.controller('PhotoController', ['$scope', '$http', '$translate', function ($scope, $http, $translate) {

    $http.jsonp('http://217.196.165.81:8983/solr/dating/query?q=sex:woman&wt=json&json.wrf=JSON_CALLBACK')
        .success(function(data, status, headers, config){
            $scope.profiles = {}
            var profile;
            console.log('Success', data)
            for(var idx in data.response.docs){
                var doc = data.response.docs[idx]
                for(field in doc){
                    profile[field] = doc[field];
                }
                $scope.profiles.push(profile);
            }
        }).error(function(data, status, headers, config){
            console.log('Error', data, status, headers, config)
        })
}]);


/*
addressBookModule.controller("FormController", function($scope, $element){
    $scope.grouped = function(input) {
        return input.group == $scope.group || ($scope.group == null);
    };

    $scope.items = [
         {name: "1", surname: "2", phone: "3", group: "4"},
         {name: "5", surname: "7", phone: "9", group: "11"},
         {name: "6", surname: "8", phone: "19", group: "12"},
    ];

    $scope.group = '';
    $scope.groups = {};
    $scope.groupKeys = [];

    var recollectGroups;
    (recollectGroups = function(){
        $scope.groups = {};
        for(var idx in $scope.items)
            $scope.groups[$scope.items[idx].group] = ''
    })()

    $scope.stateSave = false;

    window.scope = $scope;

    $scope.labels = {
        name: 'Name',
        surname: 'Surname',
        phone: 'Phone',
        group: 'Group'
    }

    $scope.$watch('groups', function(newVal, oldVa){
        recollectGroups();
        $scope.groupKeys = Object.keys($scope.groups);
    }, true)

    $scope.item = {
        name: '',
        surname: '',
        phone: '',
        group: ''
    }

    $scope.reset = function(){
        $scope.item = {}
        $scope.stateSave = false
    }

    $scope.add = function(){
        if($scope.stateSave == false){
            $scope.items.push($scope.item)
            $scope.item = {}
            recollectGroups()
        } else {
            $scope.stateSave = false
            $scope.item = {}
            recollectGroups()
        }
    }

    $scope.isOdd = function(index){
        return (index % 2 == 0?'odd':'even')
    }

    $scope.edit = function(index){
        var num = -1;
        for(var idx in $scope.items){
            if(($scope.items[idx].group == $scope.group) || (typeof($scope.group) === 'undefined')){
                num ++;
                if(num == index){
                    $scope.item = $scope.items[idx]
                    break;
                }
            }
        }
        $scope.stateSave = true
    }

    $scope.changeGroup = function(key){
        $scope.group = key;
        
    }
})
*/
