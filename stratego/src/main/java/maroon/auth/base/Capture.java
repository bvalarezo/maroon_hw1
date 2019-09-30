package maroon.auth.base;

public class Capture {
    private int direction;
    private int enemyValue;
    private Piece enemyPiece;

    public int getDirection(){
        return direction;
    }

    public void setDirection(int direction){
        this.direction = direction;
    }

    public int getEnemyValue(){
        return enemyValue;
    }

    public void setEnemyValue(int enemyValue){
        this.enemyValue = enemyValue;
    }


}
