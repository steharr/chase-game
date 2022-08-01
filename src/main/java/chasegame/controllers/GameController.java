package chasegame.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import chasegame.data.GameSetupRepository;
import chasegame.models.GameBoard;
import chasegame.models.GameSetup;

@Controller
public class GameController {

	private GameBoard gameBoard;

	@Autowired
	private GameSetupRepository gameSetupRepository;

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
		Optional<GameSetup> gameSetup = gameSetupRepository.findById(1L);
		if (gameSetup.isPresent()) {
			model.addAttribute("gameSetup", gameSetup.get());
		}
		return "setup";
	}

	@PostMapping("/setup")
	public void setupGame(@RequestBody String gameSetup) {

	}

}
