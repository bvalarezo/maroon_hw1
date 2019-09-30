package maroon.auth.base;


public class Piece {
    boolean placed = false;
    boolean lost = false;
    int x;
    int y;
    String value;
    String id;

    public Piece(String id, String value){
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

    public String getValue(){
        return value;
    }

    public void setValue(String value){
        this.value = value;
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