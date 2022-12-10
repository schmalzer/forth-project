/inch {72 mul} def
/2dup {1 index 1 index} def

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
    inch exch inch exch moveto

    % bottom side
    1 inch 0 inch rlineto

	% right side
    0 inch 1 inch rlineto

    % top side
    -1 inch 0 inch rlineto

    % automatically add left side to close path
    closepath

    % fill square
    fill
} def