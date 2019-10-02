package maroon.auth.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import maroon.auth.base.Board;
import maroon.auth.base.Game;
import maroon.auth.base.RequestWrapper;
import maroon.auth.base.User;
import maroon.auth.repository.GameRepository;
import maroon.auth.service.UserServiceImpl;

@Controller
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserServiceImpl userService;

    private Game cachedGame;

    //  Model and view for the menu page(menu.html) GET
    @GetMapping("/menu")
    public String menu(Model model) {
        return "menu";
    }

    // Model and view for the game page(game.html) GET
    @GetMapping("/game")
    public String game(Model model) {
        return "game";
    }

    @PostMapping("/startNewGame")
    public String startNewGame(){
        //make a new game
        cachedGame = new Game(getCachedUser().getUsername());
        gameRepository.save(cachedGame); //make a new game
        return "redirect:/game";
    }
  
    @GetMapping("/getGames") 
    public @ResponseBody List<Game> getGames(Model model) {
        User cachedUser = getCachedUser();
        List<Game> gameList = gameRepository.findByOwner(cachedUser.getUsername());
        return gameList;
    }  
 
    @PostMapping(value="/sendGameData", consumes = "application/json", produces = "application/json")
    public  @ResponseBody ResponseEntity<RequestWrapper> sendGameData(@RequestBody RequestWrapper gameWrapper){

        //strip data from gameWrapper to Board
        Board newBoard = new Board(); 
        newBoard.setP1_pieces(gameWrapper.getP1());
        newBoard.setP2_pieces(gameWrapper.getP2());
        newBoard.setTurn(gameWrapper.getTurn());
        // check turn
        if(newBoard.getTurn() == 0){
            //turn 0, initliaze the first board and Game object
            cachedGame.setWinner(-1); //nobody is a winner
            cachedGame.setTurns(0); //set the turns to start at 0
            List<Board> boardList = new ArrayList<Board>(); //create new list
            boardList.add(newBoard); //add the board to the list
            cachedGame.setBoards(boardList); //add it to the game
        } 
        else {
            //turn n, add another board
            cachedGame.incrementTurns(); //increment the turn
            cachedGame.addBoard(newBoard); // add board to list
        }
        //check if there was a winner
        //update gamerepository.save()
        gameRepository.save(cachedGame);
        //return the JSON back to frontend saying everything went okay
        return new ResponseEntity<RequestWrapper>(gameWrapper, HttpStatus.OK);
    }

    public User getCachedUser(){
        //GET THE USER logged in 
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUsername(auth.getName());
        return user;
 
    }

}