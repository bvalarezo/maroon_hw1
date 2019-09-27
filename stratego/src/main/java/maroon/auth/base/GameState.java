package maroon.auth.base;

import java.util.ArrayList;

public class GameState {
    String move;
    ArrayList<String> p1_pieces_lost;
    ArrayList<String> p2_pieces_lost;
    ArrayList<ArrayList<Integer>> board;

    public GameState() {
        p1_pieces_lost = new ArrayList<String>();
        p2_pieces_lost = new ArrayList<String>();
        board = new ArrayList<ArrayList<Integer>>(10);
        // create a board
        for (int i = 0; i < 10; i++) {
            ArrayList<Integer> temp = new ArrayList<Integer>();
            for (int j = 0; j < 10; j++) {
                temp.add(0);
            }
            board.add(temp);
        }
    }

    public String getMove() {
        return move;
    }

    public void setMove(String move) {
        this.move = move;
    }

    public ArrayList<String> get_p1_pieces_lost() {
        return p1_pieces_lost;
    }

    public void append_p1_pieces_lost(String piece) {
        this.p1_pieces_lost.add(piece);
    }

    public ArrayList<String> get_p2_pieces_lost() {
        return p2_pieces_lost;
    }

    public void append_p2_pieces_lost(String piece) {
        this.p2_pieces_lost.add(piece);
    }

    public ArrayList<ArrayList<Integer>> getBoard() {
        return board;
    }

    public void setBoard(int x, int y, int piece_value){
        this.board.get(x).set(y, Integer.valueOf(piece_value));
    }
    
    //overloading setBoard for the full board
    public void setBoard(ArrayList<ArrayList<Integer>> board){
        this.board = board;
    }

}