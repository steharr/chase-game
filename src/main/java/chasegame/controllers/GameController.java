package chasegame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import chasegame.models.GameBoard;

@RequestMapping("/")
@Controller
public class GameController {

	private GameBoard gameBoard;

	public void createGameBoard(Model model) {

		this.gameBoard = new GameBoard(15, 30);

		model.addAttribute(gameBoard);
	}

	@GetMapping
	public String startGame(Model model) {
		createGameBoard(model);
		return "game";
	}

}
