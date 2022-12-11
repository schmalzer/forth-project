/sz {40 mul} def

/over {1 index} def
/2dup {1 index 1 index} def

% draw chessboard
/cb {
    1 1 8 {
        1 1 8 {over exch csq} for
        pop
    } for
} def

% draw colored square
% input: row column
/csq {
    % even --> black / uneven --> white 
    2dup add 2 mod 0 eq {
      % draw 
        bsq
    } {
        wsq
    } ifelse 
} def

% draw black square
% input: row column
/bsq {
    % draw a black square
    0 setgray
    sq
} def

% draw white square
% input: row column
/wsq {
    % draw a white square
    1 setgray
    sq
} def

% draw a square
% input: row column
/sq {
    % start a new path
    newpath

    % go to starting position
    sz exch sz exch moveto

    % bottom side
    1 sz 0 sz rlineto

	% right side
    0 sz 1 sz rlineto

    % top side
    -1 sz 0 sz rlineto

    % automatically add left side to close path
    closepath

    % store colore
    gsave

    % draw border with black
    0 setgray
    stroke

    % fill square
    grestore
    fill
} def

/pl {
    0.5 setgray
    newpath
    1 x add sz 2 y add sz moveto
    2 x add sz 1 y add sz lineto
    1 x add sz 1 y add sz moveto
    2 x add sz 2 y add sz lineto
    stroke


} def