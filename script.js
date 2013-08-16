function TGame() {
    this.bstate = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    this.dim = this.bstate.length;

    this.checkVictoryOn = function(ixpos, iypos, turn) {
        // check when iterating over x
        var xvic = true;
        var yvic = true;
        var mainDiagVic = true;
        var offDiagVic = true;
        for (var i = 0; i < this.dim; i++) {
            if (this.bstate[i][iypos] !== turn) {
                xvic = false;
                break;
            }
        }
        if (xvic) {
            return turn;
        }
        // check when iterating over y
        for (var i = 0; i < this.dim; i++) {
            if (this.bstate[ixpos][i] !== turn) {
                // can exit immediately since other direction has no victory
                yvic = false;
                break;
            }
        }
        if (yvic) {
            return turn;
        }
        // check diagonal victories
        for (var i = 0; i < this.dim; i++) {
            if (this.bstate[i][i] !== turn) {
                mainDiagVic = false;
                break;
            }
        }
        if (mainDiagVic) {
            return turn;
        }
        for (var i = 0; i < this.dim; i++) {
            if (this.bstate[i][this.dim - i - 1] !== turn) {
                return false;
            }
        }
        return turn;
    }

    this.updateWith = function(ixpos, iypos, turn) {
        this.bstate[ixpos][iypos] = turn;
    };
}

$(document).ready(function() {
    // initialize TGame object
    game = new TGame();
    // one function to handle everything that must happen when switching turns: change turn message and turn state (.turn class)
    var switch_turn = function() {
        $is_x_turn = $('.turn').hasClass('x');
        if ($is_x_turn) {
            $('.nextplayer').html("X");
            $('.currentplayer').html("O");
        }
        else {
            $('.nextplayer').html("O");
            $('.currentplayer').html("X");
        }
        $('.turn').toggleClass('x');
    };

    $('td').click(function() {
        $is_x_turn = $('.turn').hasClass('x');
        xpos = $(this).find(".squareposx").html();
        ixpos = parseInt(xpos);
        ypos = $(this).find(".squareposy").html();
        iypos = parseInt(ypos);
        if ($is_x_turn) {
            var tc = "X";
        }
        else {
            var tc = "O";
        }
        $(this).find('.content').html(tc);
        game.updateWith(ixpos, iypos, tc);
        var winner = game.checkVictoryOn(ixpos, iypos, tc);
        if (winner) {
            // set the victor value
            $('.winner').html(winner);
            // make victory statement visible
            $('.vicnote').css("display", "block");
            // hide the turn statement
            $('.state').css("display", "none");
        }
        switch_turn();
    });

    $('button.newgame').click(function() {
        game = new TGame();
        $('td .content').html("");
        // erase the victor value
        $('.winner').html("");
        // hide victory statement
        $('.vicnote').css("display", "none");
        // make the turn statement visible
        $('.state').css("display", "block");
        // set player turn to X
        if (! $('.turn').hasClass('x')){
            switch_turn();
        }
    });
});
