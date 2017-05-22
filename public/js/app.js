'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngRoute','ui.bootstrap','ngSanitize']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/aboutme', {templateUrl: 'partial/1', controller: MyCtrl1});
    $routeProvider.when('/experience', {templateUrl: 'partial/2', controller: MyCtrl2});
    $routeProvider.when('/examples', {templateUrl: 'partial/3', controller: MyCtrl3});
    $routeProvider.when('/music', {templateUrl: 'partial/4', controller: MyCtrl4});
    $routeProvider.when('/contact', {templateUrl: 'partial/5', controller: MyCtrl5});
    $routeProvider.when('/sent', {templateUrl: 'partial/6', controller: MyCtrl6});
    $routeProvider.when('/restricted/index', {templateUrl: 'partial/7', controller: MyCtrl7});
    $routeProvider.when('/htmlextract', {templateUrl: 'partial/8', controller: MyCtrl8});
    $routeProvider.when('/jquerymap', {templateUrl: 'partial/9', controller: MyCtrl9});
    $routeProvider.otherwise({redirectTo: '/aboutme'});
    $locationProvider.html5Mode(true);
  }]);
