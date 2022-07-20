package chasegame.service;

import java.util.List;

import org.springframework.stereotype.Service;

import chasegame.data.ScoreRepository;
import chasegame.models.Score;
import chasegame.models.User;

@Service
public class ScoreService {

	private ScoreRepository scoreRepository;

	private UserService userService;

	public ScoreService(ScoreRepository scoreRepository, UserService userService) {
		this.scoreRepository = scoreRepository;
		this.userService = userService;
	}

	public void saveScore(Score score) {
		User currentUser = userService.getCurrentUser();
		score.setUsername(currentUser.getUsername());
		scoreRepository.save(score);
	}

	public List<Score> getScores() {
		List<Score> scores = scoreRepository.findAll();
		return scores;
	}

}
