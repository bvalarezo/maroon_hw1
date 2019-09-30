package maroon.auth.base;

import java.util.List;

public class Board {
    private List<Piece> p1_pieces;
    private List<Piece> p2_pieces;
    private Piece moved;
    private int turn;

    public List<Piece> getP1_pieces() {
        return p1_pieces;
    }

    public void setP1_pieces(List<Piece> p1_pieces) {
        this.p1_pieces = p1_pieces;
    }

    public List<Piece> getP2_pieces() {
        return p2_pieces;
    }

    public void setP2_pieces(List<Piece> p2_pieces) {
        this.p2_pieces = p2_pieces;
    }

    public Piece getMoved() {
        return moved;
    }

    public void setMoved(Piece moved) {
        this.moved = moved;
    }

    public int getTurn(){
        return turn;
    }

    public void setTurn(int turn){
        this.turn = turn;
    }
}