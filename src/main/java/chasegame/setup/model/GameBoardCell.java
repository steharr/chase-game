package chasegame.setup.model;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class GameBoardCell {
    private int xValue;
    private int yValue;
    public Map<String, Integer> coordinates = new HashMap<>();

    public GameBoardCell(int x, int y) {
        this.xValue = x;
        this.yValue = y;
        coordinates.put("x", this.xValue);
        coordinates.put("y", this.yValue);
    }
}
