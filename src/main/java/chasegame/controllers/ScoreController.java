package chasegame.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chasegame.models.Score;
import chasegame.service.ScoreService;

@RestController
@RequestMapping("/score")
public class ScoreController {

	private ScoreService scoreService;

	public ScoreController(ScoreService scoreService) {
		this.scoreService = scoreService;
	}

	@GetMapping
	public ResponseEntity<List<Score>> getScores() {
		return new ResponseEntity<>(scoreService.getScores(), HttpStatus.OK);
	}

	@PostMapping
	public void saveScore(@RequestBody Score score) {
		scoreService.saveScore(score);
	}

}
