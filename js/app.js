var addressBookModule = angular.module("addressBook", ['pascalprecht.translate']);


addressBookModule.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        ADDRESSBOOK: 'AddressBook',
        NAME: 'Name',
        SURNAME: 'Surname',
        PHONE: 'Phone',
        GROUP: 'Group',

        EDIT: 'Edit',
        DONE: 'Done',

        ADD: 'Add',
        FINISH: 'Finish',
        RESET: 'Reset',
        
        CHOOSE_LANGUAGE: 'Choose language',
        GROUP_BY: 'Group by'
    });
    $translateProvider.translations('de', {
        ADDRESSBOOK: 'Adressbuch',
        NAME: 'Name',
        SURNAME: 'Nachname',
        PHONE: 'Telefon',
        GROUP: 'Gruppe',
        EDIT: 'Bearbeiten',
        DONE: 'Done',

        ADD: 'Hinzufügen',
        FINISH: 'Oberfläche',
        RESET: 'Rücksetzen',

        CHOOSE_LANGUAGE: 'Wählen Sie eine Sprache',
        GROUP_BY: 'Gruppe von'
    });
    $translateProvider.preferredLanguage('en');
});

addressBookModule.controller('LanguageController', function ($scope, $translate) {
    $scope.languages =[{name: 'en'}, {name: 'de'}]
    $scope.language = $scope.languages[0].name

    $scope.changeLanguage = function (key) {
        console.log($scope.language)
        $translate.uses(key);
    };
});

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

    for(var idx in $scope.items)
        $scope.groups[$scope.items[idx].group] = ''

    $scope.stateSave = false;

    window.scope = $scope;

    $scope.labels = {
        name: 'Name',
        surname: 'Surname',
        phone: 'Phone',
        group: 'Group'
    }

    $scope.$watch('groups', function(newVal, oldVa){
        $scope.groupKeys = Object.keys($scope.groups)
    }, true)

    $scope.item = {
        name: '',
        surname: '',
        phone: '',
        group: ''
    }

    $scope.reset = function(){
        $scope.item = {}
    }

    $scope.add = function(){
        if($scope.stateSave == false){
            $scope.items.push($scope.item)
            $scope.groups[$scope.item.group] = ''
            $scope.item = {}
        } else {
            $scope.stateSave = false
            $scope.groups[$scope.item.group] = ''
            $scope.item = {}
        }
    }

    $scope.isOdd = function(index){
        return (index % 2 == 0?'odd':'even')
    }

    $scope.edit = function(index){
        $scope.item = $scope.items[index]
        $scope.stateSave = true
    }

    $scope.changeGroup = function(key){
        console.log(key);        
    }
})
