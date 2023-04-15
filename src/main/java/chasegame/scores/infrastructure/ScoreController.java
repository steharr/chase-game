package chasegame.scores.infrastructure;

import chasegame.scores.application.ScoreService;
import chasegame.scores.model.ScoreModel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping
    public ResponseEntity<List<Score>> getScores() {
        try {
            return new ResponseEntity<>(scoreService.getScores(), HttpStatus.OK);
        } catch (Exception e) {
            log.error("ScoreController::getScores" + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public void saveScore(@RequestBody ScoreModel submit) {
        scoreService.submitScore(submit);
    }

}
