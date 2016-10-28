angular.module('app').controller('userController', function($http) {
  var self = this;
  this.name;

  $http.get('src/js/data/users.json').success(function(data) {
    self.fetchName(data);
  });

  this.fetchName = function(data) {
    self.name = data[0].name;
  }

  this.time = function() {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var timeNow = new Date();
    var hours = timeNow.getHours();
    var day = timeNow.getDay();
    var minutes = timeNow.getMinutes();

    var ampm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
       hours = 12;
    }
    
    return month[timeNow.getMonth()] + ' ' + day + ' - ' + hours + ":" + minutes + ' ' + ampm;
  }
  this.time();
});
