/*Samuel Davidson | Elliot Hatch */
app = angular.module('pictureisworth',[]);

app.controller('RootController', function($scope, $interval) {
    $scope.wordCount = 1000;
    $scope.imgCount = 1;
    $scope.imgColor = '#fff';

    $interval(function() {
        $scope.wordCount = getRandomInt(50, 1200);
        $scope.imgCount++;
        $scope.imgColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    }, 2000);
});

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}