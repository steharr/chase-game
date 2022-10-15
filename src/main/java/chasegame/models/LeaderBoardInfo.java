package chasegame.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardInfo {

    private List<Score> scores;
    private int gameBoardRows;
    private int gameBoardColumns;

}
