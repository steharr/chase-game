package chasegame.service;

import chasegame.data.ScoreRepository;
import chasegame.models.Score;
import chasegame.models.User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

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

        score.setUser(currentUser);
        scoreRepository.save(score);
    }

    public List<Score> getScores() {
        List<Score> scores = scoreRepository.findAll();
        return sortByHighestScore(scores);
    }

    private List<Score> sortByHighestScore(List<Score> scores) {

        Collections.sort(scores, new Comparator<Score>() {
            @Override
            public int compare(Score s1, Score s2) {
                return s2.getScore().compareTo(s1.getScore());
            }
        });

        return scores;
    }

}
