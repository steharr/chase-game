package chasegame.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import chasegame.GameBoard;

@RequestMapping("/")
@Controller
public class GameController {

	@ModelAttribute(name = "gameBoard")
	public GameBoard gameBoard() {
		return new GameBoard(10, 10);
	}

	@GetMapping
	public String startGame() {
		return "game";
	}

}
