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



/dx [1 2 2 1 -1 -2 -2 -1] def %https://imgur.com/a/NqdFIoo
/dy [2 1 -1 -2 -2 -1 1 2] def

/xm {x add} def %x moving
/ym {y add} def %y moving


/gpmon {  %get possible move count of neighbors
    0 1 7 {

        %get loop index
        /i exch def

        %add offset to knight to get possible moves at offset 
        dx i get
        x add /x exch def
        dy i get
        y add /y exch def

        x -1 gt y -1 gt x 8 lt y 8 lt and and and {
            gpm
        } if


        %set back knight to original position to calculate next offset correctly
        dx i get neg
        x add /x exch def
        dy i get neg
        y add /y exch def

    } for

} def

/gpm { %get possible moves at current x/y location 

    /moves { 0 } def

    0 1 7 {
        /j { exch } def
        
        0 index
        dy j get
        exch
        dx j get

        dup x add -1 gt exch x add 8 lt and exch
        dup y add -1 gt exch y add 8 lt and and
        {
            moves 1 add /moves exch def
            
            
        } if
    } for
    y x moves
} def

