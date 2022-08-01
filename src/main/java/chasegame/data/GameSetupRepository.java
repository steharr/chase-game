package chasegame.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import chasegame.models.GameSetup;

public interface GameSetupRepository extends JpaRepository<GameSetup, Long> {

	@Query(value = "SELECT * FROM GAME_SETUP WHERE ID=1", nativeQuery = true)
	GameSetup getGameSetup();
}
