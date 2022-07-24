package chasegame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import chasegame.models.GameBoard;
import chasegame.models.GameSetup;

@Controller
public class GameController {

	private GameBoard gameBoard;

	public void createGameBoard(Model model) {
		this.gameBoard = new GameBoard(15, 30);
		model.addAttribute(gameBoard);
	}

	@GetMapping("/game")
	public String startGame(Model model) {
		createGameBoard(model);
		return "game";
	}

	@GetMapping("/setup")
	public String displaySetup(Model model) {
		return "setup";
	}

	@PostMapping("/setup")
	public void setupGame(GameSetup gameSetup) {

	}

}
