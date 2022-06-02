package chasegame.controllers;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import chasegame.models.Score;
import chasegame.service.ScoreService;

@Controller
@RequestMapping("/leaderboards")
public class LeaderboardsController {

	private ScoreService scoreService;

	public LeaderboardsController(ScoreService scoreService) {
		this.scoreService = scoreService;
	}

	@GetMapping
	public String leaderboards(Model model) {
		List<Score> scores = scoreService.getScores();
		model.addAttribute("scores", scores);
		return "leaderboards";
	}
}
