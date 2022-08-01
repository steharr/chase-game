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
public class GameType {

	@Id
	private Long id;
	private String modeName;
	private int possibleEnemies;
	private boolean selected;
}
