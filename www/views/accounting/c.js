angular.module("accounting.ctrl", [])
  .controller('accountingCtrl', ['$scope', 'ionicDatePicker', '$filter', '$state', 'codes', '$http','ionicToast',
    function ($scope, ionicDatePicker, $filter, $state, codes, $http, ionicToast) {

    $scope.classif = codes.get();
    $scope.data = [];
    $scope.result = {
      id: '',
      class: 0,
      subClass: 0,
      value: '0',
      remarks: '',
      date: Date.now()
    };

    //日期选择
    $scope.openp = function (){
      var config = {
        callback: function (val) {
          $scope.result.date = val;
        },
        to: new Date(),
        inputDate: new Date($scope.result.date),
        templateType: 'modal'
      };
      ionicDatePicker.openDatePicker(config);
    };


    var dotN = 0;
    var inp = 0;
    $scope.clickNum = function(n){
      if ($scope.result.value.length == 1 & $scope.result.value == 0 & n == 0) {

      } else if ($scope.result.value.length == 1 & $scope.result.value == 0 & n != 0 & n != '.') {
        $scope.result.value = n;
      } else if ($scope.result.value.length < 10) {
        if (n == '.') {
          if (dotN == 0) {
            $scope.result.value += n;
            dotN++;
          }
        } else {
          if (dotN == 0) {
            $scope.result.value += n;
          } else if (dotN == 1) {
            inp++;
            if (inp <= 2) {
              $scope.result.value += n;
            }
          }
        }
      }
    };
    $scope.clickB = function(m){
      if (m == 'clear') {
        $scope.result.value = '0';
      } else if (m == 'del') {
        console.log($scope.result.value);
        var len = $scope.result.value.length;
        console.log(len);
        if (len < 2) {
          $scope.result.value = "0";
        } else {
          $scope.result.value = $scope.result.value.substr(0, len - 1);
        }
      } else if (m == 'yes') {
        if ($scope.result.value == 0) {
          //alert("不能为 0 哦");
          $scope.showToast();
        } else {
          codes.save($scope.result);
          $scope.result.value = '0';
          console.log("保存成功");
          dotN = 0;
          inp = 0;
          $scope.saveSuc();
          $scope.list();
        }
      } else if (m == 'ok') {
        $scope.result.value = '0';
        $state.go('statistics');
      }
    };
    $scope.selClass = function (m, n) {
      $scope.result.class = m;
      $scope.result.subClass = n;
    };




    $scope.list = function(){
      var md = new Date($scope.result.date * 1);
      $scope.data = codes.load(md.getFullYear(), md.getMonth() + 1);
    };

    $scope.$watch("result.date", function(){
      //$scope.list();
    });

    $scope.doRefresh = function() {
      $http.get('')
        .success(function(newItems) {
          $scope.list();
        })
        .finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.showToast = function(){
      ionicToast.show('不能为0哦', 'bottom', true, 1000);
    };
    $scope.saveSuc = function(){
      ionicToast.show('保存成功', 'bottom', true, 1000);
    };
  }])

  .controller('SlideController', function($scope) {
    $scope.myActiveSlide = 1;
  });




