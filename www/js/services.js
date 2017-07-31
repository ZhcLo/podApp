angular.module('app.services', [])
  .factory('codes', function () {
    var classif = [
      [
        "餐饮伙食", "交通出行", "休闲娱乐", "话费网费",
        "生活日用", "服装饰品", "电器家私", "教育培训",
        "育儿养老", "医疗保健", "红包礼金", "房租按揭",
        "善款彩票", "保险投资", "其他支出"
      ],
      ["工资收入", "投资收入", "礼金收入", "其他收入"]
    ];

    var data = [];
    var loadData = function () {
      data = angular.fromJson(localStorage['podData']);
    };
    var saveData = function () {
      localStorage['podData'] = angular.toJson(data);
    };

    var load = function (y, m) {
      loadData();
      var arr = [];
      var start = (new Date(y, m - 1, 1)).getTime();
      var stop = (new Date(y, m, 0)).getTime();
      for(var i = 0; i < data.length; i++){
        if (data[i].date >= start && data[i].date <= stop){
          arr.push(data[i]);
        }
      }
      return arr;
    };

    var save = function (arr) {
        data.push({
          id: Date.now()+Math.random()*1000,
          class: arr.class,
          subClass: arr.subClass,
          value: arr.value,
          date: arr.date
        });
        saveData();
    };

    var dataAll = [];
    var loadDataAll = function () {
      dataAll = angular.fromJson(localStorage['podData']);
    };
    var loadAll = function () {
      loadDataAll();
      var arr = [];
      for(var i = 0; i < dataAll.length; i++){
          arr.push(dataAll[i]);
      }
      return arr;
    };


    return {
      get: function () {
        return classif;
      },
      load: load,
      save: save,
      loadAll: loadAll
    };

  });

