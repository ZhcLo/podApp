angular.module('app', [
  'ionic',
  'ionic-toast',
  'app.services',
  'accounting.ctrl',
  'randomData.ctrl',
  'statistics.ctrl',
  'ionic-datepicker',
  'highcharts-ng'
])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('accounting', {
        url: '/accounting',
        views: {
          "content": {
            templateUrl: 'views/accounting/a.html',
            controller: 'accountingCtrl'
          }
        }
      })
      .state('statistics', {
        url: '/statistics',
        views: {
          "content": {
            templateUrl: 'views/statistics/a.html',
            controller: 'statisticsCtrl'
          }
        }
      })
      .state('randomData', {
        url: '/randomData',
        views: {
          "content": {
            templateUrl: 'views/randomData/a.html',
            controller: 'randomDataCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise("/accounting");

  })

  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '关闭',
      mondayFirst: false,
      weeksList: ["日","一","二","三","四","五","六"],
      monthsList: ["1月","2月","3月","4月","5月","6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      templateType: 'popup',
      showTodayButton: true,
      dateFormat: 'yyyy-MM-dd',
      closeOnSelect: false,
      from: new Date(2016, 0, 1)
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
