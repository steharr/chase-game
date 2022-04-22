package chasegame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import chasegame.GameBoard;

@RequestMapping("/")
@Controller
public class GameController {

	private GameBoard gameBoard;

	public void createGameBoard(Model model) {
		this.gameBoard = new GameBoard(15, 30);

		int[] gameRows = new int[this.gameBoard.getRows()];
		int[] gameColumns = new int[this.gameBoard.getColumns()];

		model.addAttribute("rows", gameRows);
		model.addAttribute("columns", gameColumns);
		model.addAttribute("rowstotal", 15);
		model.addAttribute("columnstotal", 30);
	}

	@GetMapping
	public String startGame(Model model) {
		createGameBoard(model);
		return "game";
	}

}
