package maroon.auth.base;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Document(collection = "game")
public class Game {
    @Id
    private String id;
    private String owner;
    private int winner; // -1, 0, 1 [-1 is nobody][0 is player 1][1 is player 2]
    private int turns;
    private List<Board> boards;
    private boolean complete = false;
    private String timestamp;

    public Game(String owner){
        this.owner = owner;
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        Date date = new Date();
        date.setTime(ts.getTime());
        this.timestamp = new SimpleDateFormat("EEE, d MMM yyyy hh:mm aaa z").format(date);
    }

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

    public String getOwner(){
        return owner;
    }

    public void setOwner(String owner){
        this.owner = owner;
    }
    public List<Board> getBoards(){
        return boards;
    }

    public void setBoards(List<Board> boards){
        this.boards = boards;
    }

    public void addBoard(Board board){
        this.boards.add(this.boards.size(),board);
    }

    public int getTurns(){
        return turns;
    }

    public void setTurns(int turns){
        this.turns = turns;
    }

    public void incrementTurns(){
        this.turns++;
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

    public String getTimestamp(){
        return timestamp;
    }


}