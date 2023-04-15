package chasegame.setup.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "GAME_TYPE")
public class GameType {

    @Id
    private Long id;
    private String modeName;
    private int possibleEnemies;
    private boolean selected;
}
