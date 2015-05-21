var app = angular.module('app', []);

app
.controller('DeckController', function($scope) {
  $scope.deck = (function() {
    var faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "Q", "K"];
    var suits = ["S", "C", "D", "H"];
    var deckPerSuits = faces.map(function(face){
      return suits.map(function(suit) {
        return face + suit;
      });
    });
    var deck = [];
    return deck.concat.apply(deck, deckPerSuits);
  })();
  
  $scope.score = function(card) {
    return card ? card.replace(/[JQK]/, '10').replace(/A/, '11').replace(/\D/, '') : 0;
  };
  
  $scope.updateScore = function() {    
    $scope.totalScore = +$scope.score($scope.card1) + +$scope.score($scope.card2);
  };
})
.filter('excludeSelected', function() {
  return function(deck, selected){
    var filtered = deck.filter(function(hand) {
      return (selected !== hand);
    });
    return filtered;
  };
});