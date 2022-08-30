package chasegame.controllers;

import chasegame.data.GameSetupRepository;
import chasegame.data.GameTypeRepository;
import chasegame.models.GameBoard;
import chasegame.models.GameSetup;
import chasegame.models.GameType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class GameController {

    private GameBoard gameBoard;

    @Autowired
    private GameTypeRepository gameTypeRepo;

    @Autowired
    private GameSetupRepository gameSetupRepo;

    public void createGameBoard(Model model) {
        this.gameBoard = new GameBoard(15, 30);
        model.addAttribute(gameBoard);
    }

    public void createGameSetup(Model model) {
        GameSetup gameSetup = gameSetupRepo.getGameSetup();
        model.addAttribute("gameSetup", gameSetup);
    }

    @GetMapping("/game")
    public String startGame(Model model) {
        createGameBoard(model);
        createGameSetup(model);
        return "game";
    }

    @GetMapping("/setup")
    public String displaySetup(Model model) {
        List<GameType> gameTypes = gameTypeRepo.findAll();

        GameType selectedGameType = gameTypeRepo.findBySelectedGameType();
        model.addAttribute("gameType", selectedGameType);
        
        return "setup";
    }

    @PostMapping("/setup")
    public void setupGame(@RequestBody GameSetup gameSetup) {
        gameSetupRepo.saveAndFlush(gameSetup);
    }

    //	Test development using js game frame
    @GetMapping("/test")
    public String testFramework(Model model) {
        return "test";
    }
}
