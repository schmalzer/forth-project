/sz {40 mul} def

/over {1 index} def
/2dup {1 index 1 index} def

% possible moves of knight
/dx [0 1 2 2 1 -1 -2 -2 -1] def %https://imgur.com/a/NqdFIoo
/dy [0 2 1 -1 -2 -2 -1 1 2] def

% draw chessboard
/dcb {
    1 1 n {
        1 1 n {over exch csq} for
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

% marks the square
% input: x y
/msq {
    newpath
    x sz y sz moveto
    1 sz 0 sz rlineto
    0 sz 1 sz rlineto
    -1 sz 0 sz rlineto
    closepath
    stroke
} def

% draws line to next position
% input: nextLocation
/l2l{ 
    0.5 setgray
    newpath
    %move to current location
    x sz 20 add y sz 20 add moveto

    %draw to next location
    nl
    0 get sz 20 add nl 1 get sz 20 add lineto
    2 setlinewidth
    stroke
} def

% create chessboard
% input: n
/ccb {
    /cb [ 0 1 n -1 add {pop n array} for ] def
    icb
} def

% init chessboard
% input: n chessboard
/icb {
    0 1 n -1 add {
        /i exch def
        icr 
    }for
} def

% init chessboard row
% input: n chessboard i
/icr {
    0 1 n -1 add {
        /j exch def
        cb i get j 0 put
    }for
} def

% get possible move count of neighbors
% input: x y
% output: [[x y moves], [x y moves], ....]
/gpmon {
    % for all neighbors
    1 1 8 {
        % get loop index
        /i exch def

        % add offset to knight to get possible moves at offset 
        dx i get
        x add /x exch def
        dy i get
        y add /y exch def

        % only check the possible moves of the calculated offset if the offset is within the bounds of the chessboard
        % and the calculated offset is not visited already
        x 0 gt y 0 gt and x n 1 add lt y n 1 add lt and and {
            pl{
                gpm
            } if
        } if

        % set back knight to original position to calculate next offset correctly
        dx i get neg
        x add /x exch def
        dy i get neg
        y add /y exch def
    } for
} def

% get possible moves at location
% input: x y
/gpm {
    /moves { 0 } def

    % for all neighbors
    1 1 8 {
        /j exch def

        dx j get
        x add /x exch def
        dy j get
        y add /y exch def

        x 0 gt x n 1 add lt and y 0 gt y n 1 add lt and and
        {
            pl{
                moves 1 add /moves exch def
            } if
        } if

        dx j get neg
        x add /x exch def
        dy j get neg
        y add /y exch def

    } for

    % put on stack
    [x y moves]
} def

% marks the current position of the knight as visited
% input: x y
/mp {
    cb x -1 add get y -1 add 1 put
} def

% check if field was not already visited
% input: x y
/pl {
    cb x -1 add get y -1 add get 0 eq
} def

% check if knights tour is complete
% input: n cb
/fin {
    % define finished all as true
    /fina true def

    0 1 n -1 add {
        /i exch def
        finr
    }for
} def

% check if knights tour is complete for row
% input: n cb i
/finr{
    0 1 n -1 add {
        /j exch def
        cb i get j get 0 eq {
            /fina false def
        }if
    }for
} def

% start the programm
/start {
    % check if n is bigger than x y
    x n 1 add lt y n 1 add lt and{
        % create the chessboard with size n
        ccb

        % draw the chessboard
        dcb
        /nl [8 8 8] def

        % mark the start square with green
        0 1 0 setrgbcolor
        msq

        {
            % mark position as visited
            mp

            % cannot have more moves than 7 hence min is initalized to 8
            /min 8 def 
            
            % calculate all possible moves of neighbors
            gpmon

            % check if we found some moves
            count 0 gt{
                % more moves are possible
                count {
                    dup
                    2 get dup min lt {
                        %if possible move count is less than minimum encountered movecount
                        % store position candidate for next move
                        /min exch def
                        /nl exch def
                    }{
                        % else forget current position candidate since minimum is not smaller
                        pop pop 
                    } ifelse

                } repeat

                % draw line to next position
                l2l

                % update to next position
                nl dup
                0 get
                /x exch def
                1 get
                /y exch def
            } {
                % either we are done or no more moves possible

                % check if knight tour is complete
                fin

                fina true eq{
                    % mark the end square with red
                    1 0 0 setrgbcolor
                    msq
                    stop
                } {
                    (No more moves possible)
                    pstack
                    pop
                    stop
                }ifelse                
            }ifelse
        } loop
    }{
        (X or Y out of bounds)
        pstack
        pop
    }ifelse
} def