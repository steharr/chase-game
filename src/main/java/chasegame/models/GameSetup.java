package chasegame.models;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameSetup {

	@Id
	private Long id;
	private String mode;
	private int possibleEnemies;
//	private String difficulty;
//	private String obstacles;
}
