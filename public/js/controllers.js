'use strict';

/* Controllers */

function AppCtrl($scope, $http, $rootScope) {
	$rootScope.bodylayout = 'page';
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });

};

function MyCtrl1($rootScope) {
	$rootScope.bodylayout = 'home';
	console.log($rootScope.bodylayout);
};


function MyCtrl2($scope, $rootScope) {
	$rootScope.bodylayout = 'page';

  $scope.professionalExperience = [
    {
      "company": "NAVEX Global",
      "position": "Web Developer",
      "location": "Lake Oswego",
      "duration": "June 2015 - Present",
      "description": [
                        "Creating web intake sites for online reports using jQuery, HTML, Javascript, and CSS with a strong focus on cross-browser compatibility. Work around heavy restrictions against front-end library use. Only jQuery is allowed.",
                        "Working on automated tool for extracting text and contextual inline HTML tags from static HTML, Javascript, and CSS files using an API built on an Express server in Node with automated build using Grunt. An excel file is built and styled from the output data using Node. Set up user authentication using Passwordless. User can review and edit data in table before creating spreadsheets.",
                        "Implemented SCRUM and Agile development with team for working on additional projects outside normal case work. Acting as SCRUM master, running all daily stand-ups, sprint planning, retrospectives, sprint reviews, etc. Set up and run an Agile board in JIRA to track sprints, stories, and tasks, estimate work, and create/update backlog.",
                        "Set up Subversion repository for development and automated update of Express server on commit.",
                        "Set up automated development build tools using Grunt to compile Sass, Prettify and Beautify files, watch for changes to file directories, organize CSS properties, live reload CSS and HTML in browser, etc.",
                        "Built tools for scraping data from internal web applications. Automated previous manual process for retrieving, updating, or adding data within internal administrative tools. Automated folder creation and mass file downloading of working/archive files from online media are where production code is stored.",
                        "Built prototype test suite using Jasmine to automate QA processes.",
                ],
      "logo":{
        "src":"../img/navex-logo.png",
        "alt":"NAVEX Global"
      }
    },
    {
      "company": "Axis Clinical Software",
      "position": "Jr. Software Engineer",
      "location": "Portland,OR",
      "duration": "September 2014 - June 2015",
      "description": [
                        "Worked on Agile team developing Axis’ Patient Analysis & Tracking System using a variety of technologies.",
                        "Responsible for build process across entire application suite. Crafted build process for new web-based application utilizing Grunt, including front-end unit testing of AngularJS code using Karma and Jasmine. Other features of build included compilation of LESS files into CSS, minifying using UglifyJS, file versioning, source-control integration with Mercurial, and copying files across company network. Later used Grunt to automate build process for flagship application, which was previously done manually using older technologies.",
                        "Worked on development of new web-based application using AngularJS on the front-end, Node.js on the back-end, and EWD.js to interface with a Cache database. This application was intended to replace the current flagship application utilizing current technologies while maintaining functionality with current server code written in MUMPS. Used JetBrains’ WebStorm to write testable Angular modules, controllers, directives, etc. that mimic the current client functions. Node.js modules were written to handle client-side requests from EWD.js, communicate with Cache, and process the data.",
                        "Developed system to bridge current VCS in SourceSafe with new VCS in Mercurial. Changes in SourceSafe are pushed to Mercurial automatically without effecting the current development process.",
                        "Created reporting tools for flagship application using .NET, C#, VB, and MUMPS. Guidelines for gathering metrics for reporting are provided by certified medical organizations and then processed into algorithms used to output results Requires considerable amount of debugging to determine validity of data output."
                ],
      "logo":{
        "src":"../img/axisclinical.png",
        "alt":"Axis Clinical Software"
      }
    },
    {
      "company": "The Tech Academy",
      "position": "Software Development Student",
      "location": "Portland, OR",
      "duration": "June 2014 - September 2014",
      "description": [
                        "Learned the fundamentals of software development through The Tech Academy’s Software Developer Boot Camp.",
                        "Worked quickly through the introductory material and moved on to advanced drills and live projects.",
                        "Obtained Microsoft Technology Associate Software Development Fundamentals certification.",
                        "Studied .NET framework, including basic syntax of C# language and learned the principals of object-oriented programming using C#. Created online store front for fictional toy company to demonstrate proficiency with .NET framework.",
                        "Created mock band website using HTML, CSS and JavaScript to demonstrate knowledge of web technologies.",
                        "Created contact application for mobile using AngularJS, HTML, and CSS, as well as Cordova, which allows you to develop mobile apps for iOS, Android, and Windows phone using web technologies without needing to write code for each platform.",
                        "Worked as a member of an Agile team for initial development of The Tech Academy’s content management system using ASP.NET, Entity Framework, and SQL Server, hosted on Microsoft Azure.",
                        "Learned fundamentals of Relational Database Management Systems by writing statements to query a SQL database to access and manipulate data."
                ],
      "logo":{
        "src":"../img/techacademy.png",
        "alt":"The Tech Academy"
      }
    }
  ];
};

function MyCtrl3 ($scope, $modal, $log, $rootScope) {

  $rootScope.bodylayout = 'page';

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) { 

    var modalInstance = $modal.open({
      templateUrl: 'passwordlessModal',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

};

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

function ModalInstanceCtrl ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

function MyCtrl4($scope, $rootScope) {
	$rootScope.bodylayout = 'page';

  $scope.links = [
    {"link":"https://www.facebook.com/GhostTownGrey","icon":"fa-facebook"},
    {"link":"https://twitter.com/ghosttowngrey","icon":"fa-twitter"},
    {"link":"https://www.youtube.com/user/GhostTownGrey","icon":"fa-youtube"}
  ];

  $scope.flyers = [
    {"src":"../img/flyer/flyer01.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer02.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer03.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer04.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer05.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer06.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer07.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer08.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer09.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer10.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer11.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer12.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer13.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer14.jpg","alt":"Ghost Town Grey"},
    {"src":"../img/flyer/flyer15.jpg","alt":"Ghost Town Grey"}, 
  ];

}

function MyCtrl5($scope, $http, $modal, $rootScope) {
	$rootScope.bodylayout = 'page';
	$scope.postData = {};

  $scope.postMail = function (contact) {
    // Check form validation
    if ($scope.contactForm.$invalid === true) {
      return
    }
    // wrap all your input values in $scope.postData
    $scope.postData = angular.copy(contact);

    $http.post('/api/contact', $scope.postData)
      .success(function(data) {
        // Show success message
        console.log("HEY!");
        $scope.open();
      })
      .error(function(data) {
        // Show error message
      });
  };

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'nodemailerModal',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}

function MyCtrl6($rootScope) {
  $rootScope.bodylayout = 'page';
}

function MyCtrl7($rootScope,$scope) {
  $rootScope.bodylayout = 'page';

  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300'
    });
  };
  for (var i=0; i<4; i++) {
    $scope.addSlide();
  }
}

function MyCtrl8($rootScope,$scope,$http) {
  $rootScope.bodylayout = 'page';

  $scope.postData = {};

  $scope.htmltext = [];

  var formatData = function(data){    
    var dataStr = data;
    var replacements = [
      { find:"<",rep:"&lt;"}, 
      { find:">",rep:"&gt;"},
      { find:"&nbsp;",rep:"&amp;nbsp;"}
    ];
    replacements.forEach(function(exps){
       while ((dataStr.match(exps.find)) !== null) {
        dataStr = dataStr.replace(exps.find, exps.rep);
       }
    }); 
    dataStr = dataStr.replace(/&lt;/g, "<font class='red'>&lt;");
    dataStr = dataStr.replace(/&gt;/g, "&gt;</font>");
    dataStr = '<td>' + dataStr + '</td>';
    return dataStr;
  }

  $scope.htmlExtract = function (htmlurl) {
    // Check form validation
    if ($scope.htmlExtractForm.$invalid === true) {
      return
    }
    // wrap all your input values in $scope.postData
    $scope.postData = {url:htmlurl}

    $http.post('/api/htmlextract', $scope.postData)
      .success(function(data) {

        console.log(data.data);
        for(var i = 0; i<data.data.length;i++){
          data.data[i] = formatData(data.data[i]);
        }
        $scope.htmltext = data.data;
      })
      .error(function(data) {
        // Show error message
        alert('There was an issue with the URL. Please try again.');
      });
  };
}

function MyCtrl9($rootScope) {
  $rootScope.bodylayout = 'jquerymap';
}