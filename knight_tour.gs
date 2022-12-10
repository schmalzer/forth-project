/inch {72 mul} def
/2dup {1 index 1 index} def

% draw colored square
% input: row column
/csq {
    % even --> black / uneven --> white 
    2dup add 2 mod 0 eq {
      % draw 
      2dup bsq
    } {
      2dup wsq
    } ifelse 
} def

% draw black square
% input: row column
/bsq {
    % draw a black square
    1 setgray
    2dup sq
} def

% draw white square
% input: row column
/wsq {
    % draw a white square
    0 setgray
    2dup sq
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

    % Draw the box on the paper
    stroke	
} def