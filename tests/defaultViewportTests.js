function runIsInViewport(tol) {
  $('#container > div.box').css('background-color', '#21221E').text('out of viewport');
  $('#container > div.box:in-viewport(' + tol + ')').css('background-color', '#C5C7BC').text('in viewport');
}

runIsInViewport(100);

describe('isInViewport', function() {
  describe('viewport is window', function() {
    var div = $('.box');

    after(function() {
      $('#container').remove();
    });

    function top(x, tol) {
      div.css('top', '0');
      div.css('top', x + 'px');
      runIsInViewport(tol);
    }

    function left(x, tol) {
      div.css('left', '0');
      div.css('left', x + 'px');
      runIsInViewport(tol);
    }

    describe('tolerance is 100', function() {
      describe('div location vertically in viewport', function() {
        it('should return the text from div as "in viewport" when bottom of div is outside tolerance region while top is inside', function() {
          div.text().should.be.exactly('in viewport');
        });

        it('should return the text from div as "in viewport" when bottom of div is equal to tolerance ie it\'s on the edge of tolerance region', function() {
          top(-100, 100);
          div.text().should.be.exactly('in viewport');
        });

        it('should return the text from div as "out of viewport" when bottom of div is inside tolerance region', function() {
          top(-150, 100);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "out of viewport" when top of div is equal to tolerance ie it\'s on the edge of tolerance region', function() {
          top(100, 100);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "out of viewport" when top of div is outside tolerance region', function() {
          top(101, 100);
          div.text().should.be.exactly('out of viewport');
        });
      });

      describe('div location horizontally in viewport', function() {
        it('should return the text from div as "out of viewport" when left is greater than viewport width', function() {
          top(0, 100);
          left(99999, 100);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "out of viewport" when left is greater than viewport left edge', function() {
          left(-99999, 100);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "in viewport" when left is lesser than viewport width', function() {
          left(90, 100);
          div.text().should.be.exactly('in viewport');
          left(0, 100);
        });
      });
    });

    describe('tolerance is 0', function() {
      describe('div location vertically in viewport', function() {
        it('should return the text from div as "in viewport" when div top is 0', function() {
          top(0, 0);
          left(0, 0);
          div.text().should.be.exactly('in viewport');
        });
        it('should return the text from div as "in viewport" when div top < 0 but bottom > 0', function() {
          top(-1, 0);
          div.text().should.be.exactly('in viewport');
        });
        it('should return the text from div as "out of viewport" when div bottom < 0',function(){
          top(-201,0);
          div.text().should.be.exactly('out of viewport');
        });
        it('should return the text from div as "out of viewport" when div top > viewport height', function() {
          top(99999, 0);
          div.text().should.be.exactly('out of viewport');
        });
      });

      describe('div location horizontally in viewport', function() {
        it('should return the text from div as "out of viewport" when left is greater than viewport width', function() {
          top(0, 0);
          left(99999, 0);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "out of viewport" when left is greater than viewport left edge', function() {
          left(-99999, 0);
          div.text().should.be.exactly('out of viewport');
        });

        it('should return the text from div as "in viewport" when left is lesser than viewport width', function() {
          left(90, 0);
          div.text().should.be.exactly('in viewport');
          left(0, 0);
        });
      });
    });
  });
});