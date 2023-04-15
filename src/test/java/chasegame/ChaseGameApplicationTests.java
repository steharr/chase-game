package chasegame;

import chasegame.scores.application.ScoreService;
import chasegame.scores.model.ScoreModel;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

@SpringBootTest
class ChaseGameApplicationTests {

    @Autowired
    ScoreService scoreService;

    @Test
    void contextLoads() {
    }

    @Test
    void test_save_high_score() {
        boolean result = scoreService.submitScore(new ScoreModel(new Date(), 223L, "ABC", List.of(mockCoord(), mockCoord())));
        Assertions.assertTrue(result);
    }

    @Test
    void test_get_high_score() {
        var result = scoreService.getScores();
        Assertions.assertNotNull(result);
    }

    private List<String> mockCoord() {
        return List.of("1", "2", "arrow-right");
    }

}
