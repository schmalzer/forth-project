def count_knight_moves(x, y, board_size):
  # define the possible moves for a knight
  moves = [(2,1), (2,-1), (-2,1), (-2,-1), (1,2), (1,-2), (-1,2), (-1,-2)]
  
  # initialize count to 0
  count = 0
  
  # loop through the possible moves
  for move in moves:
    # get the new x and y coordinates by adding the move to the current x and y
    new_x = x + move[0]
    new_y = y + move[1]
    
    # check if the new coordinates are within the bounds of the board
    if 0 <= new_x < board_size and 0 <= new_y < board_size:
      # if the new coordinates are within the bounds of the board, increment the count
      count += 1
  
  # return the count
  return count

print(count_knight_moves(7,7,8)) # x y and boardsize