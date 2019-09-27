package maroon.auth.base;

public class Piece {
    boolean placed = false;
    boolean lost = false;
    String id;
    int value;
    int x;
    int y;

    public Piece(String id, int value){
        this.id = id;
        this.value = value;
    }
    public boolean getPlaced(){
        return placed;
    }

    public void setPlaced(){
        this.placed = true;
    }

    public boolean getLost(){
        return lost;
    }

    public void setLost(){
        this.lost = true;
    }

    public String getId() {
        return id;
    }

    public int getValue(){
        return value;
    }

    public int getX(){
        return x;
    }

    public void setX(int x){
        this.x = x;
    }

    public int getY(){
        return y;
    }

    public void setY(int y){
        this.y = y;
    }



}