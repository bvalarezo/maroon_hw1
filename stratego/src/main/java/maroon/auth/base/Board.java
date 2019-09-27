package maroon.auth.base;

import java.util.ArrayList;

public class Board {
    private ArrayList<Piece> p1_pieces =  new ArrayList<Piece>();
    private ArrayList<Piece> p2_pieces =  new ArrayList<Piece>();
    private Piece moved;

    public ArrayList<Piece> getP1_pieces(){
        return p1_pieces;
    }

    public void setP1_pieces(ArrayList<Piece> p1_pieces){
        this.p1_pieces = p1_pieces;
    } 

    public ArrayList<Piece> getP2_pieces(){
        return p2_pieces;
    }

    public void setP2_pieces(ArrayList<Piece> p2_pieces){
        this.p2_pieces = p2_pieces;
    } 

    public Piece getMoved(){
        return moved;
    }

    public void setMoved(Piece moved){
        this.moved = moved;
    }
}