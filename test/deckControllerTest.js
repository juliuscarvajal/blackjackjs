describe('DeckController', function() {
  beforeEach(module('app'));
  
  var $controller;
  
  beforeEach(inject(function(_$controller_) {
   $controller = _$controller_; 
  }));
  
  describe('$scope.deck', function() {
    it('sets the deck of 52 cards', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope});
      
      $scope.deck();
      expect($scope.deck.length).toEqual(52);
    });
  });
  
  describe('excludeSelected filter', function() {
    beforeEach(inject(function(_$filter_) {
      $filter = _$filter_;
    }));
    
    it('has no more 2D card when being selected', function() {
      var length = $filter('excludeSelected');
      expect(length('2D')).toEqual(51);
    });
  });
           
  describe('$scope.score', function() {
    var $scope, controller;
    
    beforeEach(function() {
      $scope = {};
      controller = $controller('DeckController', {$scope: $scope});
    });
    
    it('sets the card score to 0 if there is no face nor suit specified', function() {
      expect($scope.score('')).toEqual(0);
    });
    
    it('sets the card score to 0 if card is not properly specified', function() {
      expect($scope.score('33')).toEqual(0);
      expect($scope.score('A')).toEqual(0);
      expect($scope.score('3')).toEqual(0);
      expect($scope.score('DJ')).toEqual(0);
    });
    
    it('sets the card score to 11 if the face is "A" with any suit', function() {
      expect($scope.score('AC')).toEqual(11);
    });

    it('sets the card score to 10 if the face is either "K", "Q", or "J",  with any suit', function() {
      expect($scope.score('KS')).toEqual(10);
      expect($scope.score('QH')).toEqual(10);
      expect($scope.score('JD')).toEqual(10);
    });
    
    it('sets the card score to the exact value of the face with any suit', function() {
      expect($scope.score('2C')).toEqual(2);
      expect($scope.score('3D')).toEqual(3);
      expect($scope.score('4H')).toEqual(4);
      expect($scope.score('5C')).toEqual(5);
      expect($scope.score('6D')).toEqual(6);
      expect($scope.score('7H')).toEqual(7);
      expect($scope.score('8C')).toEqual(8);
      expect($scope.score('9D')).toEqual(9);
      expect($scope.score('10H')).toEqual(10);
    });  
  });
  
  describe('$scope.totalScore', function() {
    var $scope, controller;
    
    beforeEach(function() {
      $scope = {};
      controller = $controller('DeckController', {$scope: $scope});
    });

    it('sets the total score to 21 if first card is "A" with any suit and second card is "K" with any suit', function() {
      $scope.card1 = 'AH';
      $scope.card2 = 'KD';
      $scope.updateScore();
      expect($scope.totalScore).toEqual(21);
    });
    
    it('sets the total score to 22 if first card is "A" with any suit and second card is "A" with any suit', function() {
      $scope.card1 = 'AH';
      $scope.card2 = 'AD';
      $scope.updateScore();
      expect($scope.totalScore).toEqual(22);
    });

    it('sets the total score to 20 if first card is "Q" with any suit and second card is "J" with any suit', function() {
      $scope.card1 = 'QH';
      $scope.card2 = 'JD';
      $scope.updateScore();
      expect($scope.totalScore).toEqual(20);
    });
    
    it('sets the total score to 11 if first card is "A" with any suit and second card is not specified', function() {
      $scope.card1 = 'AC';
      $scope.card2 = '';
      $scope.updateScore();
      expect($scope.totalScore).toEqual(11);
    });

    it('sets the total score to 10 if first card is not specified and second card is "A" with any suit', function() {
      $scope.card1 = '';
      $scope.card2 = 'KS';
      $scope.updateScore();
      expect($scope.totalScore).toEqual(10);
    });
    
  });
});