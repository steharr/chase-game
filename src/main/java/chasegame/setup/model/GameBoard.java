package chasegame.setup.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GameBoard {

    public int totalRows;
    public int totalColumns;
    public List<List<GameBoardCell>> gameBoardRows = new ArrayList<>();

    public GameBoard(int totalRows, int totalColumns) {
        this.totalRows = totalRows;
        this.totalColumns = totalColumns;
        addCoordinatesToGameBoard();
    }

    private void addCoordinatesToGameBoard() {
        for (int r = this.totalRows; r > 0; r--) {
            List<GameBoardCell> gameBoardRow = new ArrayList<>();
            for (int c = 0; c < this.totalColumns; c++) {
                GameBoardCell gameBoardCell = new GameBoardCell(r, c);
                gameBoardRow.add(gameBoardCell);
            }
            this.gameBoardRows.add(gameBoardRow);
        }
    }
}
