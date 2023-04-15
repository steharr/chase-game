package chasegame.scores.application;

import chasegame.common.MessageConstants;
import chasegame.scores.infrastructure.Score;
import chasegame.scores.infrastructure.ScoreMapper;
import chasegame.scores.infrastructure.ScoreRepository;
import chasegame.scores.model.ScoreModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private ScoreMapper scoreMapper;

    public List<Score> getScores() {
        List<Score> scores = scoreRepository.findAll();
        return sortByHighestScore(scores);
    }

    public boolean submitScore(ScoreModel submit) {
        try {
            scoreRepository.saveAndFlush(scoreMapper.modelToEntity(submit));
            return true;
        } catch (Exception e) {
            log.error(MessageConstants.EXCEPTION_OCCURRED, "submitScore", e.getMessage());
            return false;
        }
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
