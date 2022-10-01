package chasegame.service;

import chasegame.data.ScoreRepository;
import chasegame.models.Score;
import chasegame.submit.ScoreSubmit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private UserService userService;

    public List<Score> getScores() {
        List<Score> scores = scoreRepository.findAll();
        return sortByHighestScore(scores);
    }

    public void submitScore(ScoreSubmit submit) {

        Score persistScore = new Score();
        persistScore.setScore(submit.getScore());
        persistScore.setDate(submit.getDate());
        persistScore.setUser(userService.getDummyUser());
        persistScore.setRouteDirections(" ");
        persistScore.setRouteCoordinates(" ");

        submit.getRoute().stream().forEach(data -> {
            String[] coordinateArray = {data.get(0), data.get(1)};
            String coordinate = String.join(",", coordinateArray);
            String direction = data.get(2);

            persistScore.setRouteCoordinates(String.join("+", new String[]{persistScore.getRouteCoordinates(), coordinate}));
            persistScore.setRouteDirections(String.join("+", new String[]{persistScore.getRouteDirections(), direction}));
        });

        scoreRepository.saveAndFlush(persistScore);
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
