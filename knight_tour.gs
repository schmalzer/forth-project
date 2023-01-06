/sz {40 mul} def

/over {1 index} def
/2dup {1 index 1 index} def

/chessboard [  
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
  [0 0 0 0 0 0 0 0]
] def

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


/gpmon {  %get possible move count of neighbors -- Structure on the stack after this function [[x y moves], [x y moves], ....]
    0 1 7 {

        %get loop index
        /i exch def

        %add offset to knight to get possible moves at offset 
        dx i get
        x add /x exch def
        dy i get
        y add /y exch def

        %only check the possible moves of at the calculated offset if the offset is within the bounds of the chessboard
        %and the calculated offset is not visited already
        x -1 gt y -1 gt x 8 lt y 8 lt and and and {
            isPossibleLocation{
                gpm
            } if
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
        /j exch def

        dx j get
        x add /x exch def
        dy j get
        y add /y exch def

        x -1 gt x 8 lt and
        y -1 gt y 8 lt and and
        {
            isPossibleLocation{
                moves 1 add /moves exch def
            } if
        } if

        dx j get neg
        x add /x exch def
        dy j get neg
        y add /y exch def

    } for
    [x y moves]
} def

/markPositionAsVisited { %marks the current (x,y) of the knight as visited on the chessboard
    chessboard x get y 1 put
} def

/isPossibleLocation {
    chessboard x get y get 0 eq
} def

/start {
    cb
    /nextLocation [8 8 8] def

    63 {

        markPositionAsVisited
        /minimum 8 def %cannot have more moves than 7 hence minimum is initalized to 8
        
        gpmon

        count {
            dup
            2 get dup minimum lt { %if current possible move count is less than minimum encountered movecount
                
                /minimum exch def
                /nextLocation exch def
                
            }{
                pop pop %forget current position candidate since minimum is not smaller
            } ifelse

        } repeat

        % to see the locations step by step comment in the next 3 lines
        %nextLocation
        %pstack
        %pop

        drawLineToLocation

        %update to next position
        nextLocation dup
        0 get
        /x exch def
        1 get
        /y exch def

    } repeat
    

} def

/drawLineToLocation{ %expects nextLocation on top of the stack
    0.5 setgray
    newpath
    %move to current location
    x y pstack
    pop pop
    x sz 60 add y sz 60 add moveto

    %draw to next location
    nextLocation
    pstack
    0 get sz 60 add nextLocation 1 get sz 60 add lineto
    2 setlinewidth
    stroke
}def





