package chasegame.controllers;

import chasegame.models.Score;
import chasegame.service.ScoreService;
import chasegame.service.UserService;
import chasegame.submit.ScoreSubmit;
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

    @Autowired
    private UserService userService;


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
    public void saveScore(@RequestBody ScoreSubmit submit) {
        try {
            scoreService.submitScore(submit);
        } catch (Exception e) {
            log.error("ScoreController::saveScore" + e.getMessage());
        }
    }

}
