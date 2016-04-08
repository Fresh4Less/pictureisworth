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

app.directive('spincounter', function($interval) {
    function link(scope, element, attrs) {
        scope.$watch(attrs.digits, function(val) {
            var outer = angular.element('<span></span>');
            outer.addClass('spincounter');
            for(var i = 0; i < attrs.digits; i++) {
                var inner = angular.element('<span></span>');
                inner.addClass('placeholder');
                inner.text('0');
                var spinner = angular.element('<span></span>');
                spinner.addClass('spinner');
                spinner.html(['0','1','2','3','4','5','6','7','8','9'].join('</br>'));
                spinner.css('top', '0px');
                inner.append(spinner);
                outer.append(inner);
                //TODO: remove this and do actual animation
                (function(s) {
                $interval(function() {
                    s.css('top', (parseFloat(s.css('top'), 10) - 1) + 'px');
                }, 1/60)})(spinner);
            }
            element.append(outer);
        });
        scope.$watch(attrs.count, function(val) {
        });
    }
    return {
        restrict: 'E',
        scope: {
            count: '='
        },
        link: link
    };
});

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
