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
@Table(name = "GAME_SETUP")
public class GameSetup {

    @Id
    private Long id;
    private String mode;
    private int difficulty;
    private int enemies;
    private String obstacles;

}
