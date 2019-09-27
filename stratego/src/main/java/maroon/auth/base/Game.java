package maroon.auth.base;

import java.util.ArrayList;

public class Game {
    User player;
    String winner;
    ArrayList<GameState> transactions = new ArrayList<GameState>();

    public User getPlayer() {
        return player;
    }

    public void setPlayer(User player) {
        this.player = player;
    }

    public String getWinner(){
        return winner;
    }

    public void setWinner(String winner){
        this.winner = winner;
    }

    public ArrayList<GameState> getTransactions(){
        return transactions;
    }

    //append to the end of the transactions list
    public void addTransaction(GameState gamestate){
        this.transactions.add(transactions.size()-1, gamestate);
    }


}