package chasegame.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.stereotype.Service;

import chasegame.data.ScoreRepository;
import chasegame.info.ScoreInfo;
import chasegame.models.Score;

@Service
public class ScoreService {

	private ScoreRepository scoreRepository;

	public ScoreService(ScoreRepository scoreRepository) {
		this.scoreRepository = scoreRepository;
	}

	public void saveScore(Score score) {
		scoreRepository.save(score);
	}

	public List<Score> getScores() {
		List<Score> scores = scoreRepository.findAll();
		return scores;
	}

	private String convertDate(ScoreInfo scoreInfo) {
		DateFormat df = new SimpleDateFormat("HH:mm:ss dd-MM-yyy");
		return df.format(scoreInfo.getDate());
	}
}
