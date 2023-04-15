package chasegame.scores.infrastructure;

import chasegame.scores.application.ScoreService;
import chasegame.scores.model.LeaderBoardInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/leaderboards")
public class LeaderboardsController {

    @Autowired
    private ScoreService scoreService;

    @GetMapping
    public String getLeaderboard(Model model) {

        List<Score> scores = scoreService.getScores();
        LeaderBoardInfo leaderboard = new LeaderBoardInfo(scores, 15, 30);
        model.addAttribute("leaderboard", leaderboard);
        return "leaderboards";
    }

}
