package maroon.auth.base;

import java.util.ArrayList;

public class Game {
    private int winner; // -1, 0, 1 [-1 is nobody][0 is player 1][1 is player 2]
    private String id;
    private int turn;
    private ArrayList<Board> boards;
    private boolean complete = false;
    private boolean player = false; //false = AI, true = Human

    public int getWinner(){
        return winner;
    }

    public void setWinner(int winner){
        this.winner = winner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }
    public ArrayList<Board> getBoards(){
        return boards;
    }

    public int getTurn(){
        return turn;
    }

    public void setTurn(int turn){
        this.turn = turn;
    }

    public void incrementTurn(){
        this.turn++;
    }
    public void setBoards(ArrayList<Board> boards){
        this.boards = boards;
    }

    public Board getBoard(int turn){
        return this.boards.get(turn);
    }

    public boolean getComplete(){
        return complete;
    }

    public void setComplete(){
        this.complete = true;
    }

    public boolean getPlayer(){
        return player;
    }

    public void setPlayer(){
        this.player = true;
    }


}