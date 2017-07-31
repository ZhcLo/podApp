angular.module("statistics.ctrl", [])
  .controller('statisticsCtrl', ['$scope', '$state', '$interval', '$filter', 'codes', '$http',
    function ($scope, $state, $interval, $filter, codes, $http) {
      $scope.classif = codes.get();
      $scope.dataAll = [];
      $scope.result = {
        id: '',
        class: 0,
        subClass: 0,
        value: '0',
        remarks: '',
        date: Date.now()
      };

      $scope.listAll = function(){
        $scope.dataAll = codes.loadAll();
      };

      $scope.$watch("result.date", function(){
        $scope.listAll();
      });




      //console.log(codes.loadAll());
      var dataOut = 0;
      var dataIn = 0;
      for (var i = 0; i < codes.loadAll().length; i++) {
        if (codes.loadAll()[i].class == 1) {
          //console.log(parseFloat(codes.loadAll()[i].value));
          dataIn += parseFloat(codes.loadAll()[i].value);
        } else {
          //console.log(parseFloat(codes.loadAll()[i].value));
          dataOut += parseFloat(codes.loadAll()[i].value);
        }
      }
      //console.log("收入:", dataIn);
      //console.log("支出:", dataOut);







      /*$scope.data = [];
      for (var i = 0; i < codes.loadAll().length; i++) {
        $scope.data.push(parseFloat(codes.loadAll()[i].value));
      }*/
      $scope.data = [
        {
          name: '收入',
          y: dataIn
        }, {
          name: '支出',
          y: dataOut
        }
      ];
      $scope.OutClass = [
        {name: '餐饮伙食', y: 0},
        {name: '交通出行', y: 0},
        {name: '休闲娱乐', y: 0},
        {name: '话费网费', y: 0},
        {name: '生活日用', y: 0},
        {name: '服装饰品', y: 0},
        {name: '电器家私', y: 0},
        {name: '教育培训', y: 0},
        {name: '育儿养老', y: 0},
        {name: '医疗保健', y: 0},
        {name: '红包礼金', y: 0},
        {name: '房租按揭', y: 0},
        {name: '善款彩票', y: 0},
        {name: '保险投资', y: 0},
        {name: '其他支出', y: 0}
      ];
      for (var i = 0; i < codes.loadAll().length; i++) {
        if (codes.loadAll()[i].class == 0) {
          var j = codes.loadAll()[i].subClass;
          $scope.OutClass[j].y += parseFloat(codes.loadAll()[i].value);
        }

      }
      //console.log($scope.OutClass[1].y);
      // 图表结构配置
      $scope.config = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: '收支对比表'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: $scope.data
        }]
      };
      $scope.config2 = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: '支出分类汇总统计'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: $scope.OutClass
        }]
      };


      /*$scope.change = function () {
        console.log("改数据……");
        $scope.OutClass = $scope.OutClass;
      };*/
      $scope.doRefresh = function() {
        $http.get('')
          .success(function() {
            $scope.listAll();
          })
          .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
          });
      };
  }]);
