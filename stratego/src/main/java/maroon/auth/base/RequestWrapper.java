package maroon.auth.base;

import java.util.List;

public class RequestWrapper {
    List<List<Integer>> map;
    List<Piece> p1;
    List<Piece> p2;
    int turn;

    public List<List<Integer>> getMap(){
        return map;
    }

    public void setMap(List<List<Integer>> map){
        this.map = map;
    }

    public List<Piece> getP1(){
        return p1;
    }

    public void setP1(List<Piece> p1){
        this.p1 = p1;
    }

    public List<Piece> getP2(){
        return p2;
    }

    public void setP2(List<Piece> p2){
        this.p2 = p2;
    }
    
    public int getTurn(){
        return turn;
    }

    public void setTurn(int turn){
        this.turn = turn;
    }
}