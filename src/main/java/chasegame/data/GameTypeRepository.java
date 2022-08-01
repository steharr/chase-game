package chasegame.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import chasegame.models.GameType;

public interface GameTypeRepository extends JpaRepository<GameType, Long> {

	@Query(value = "SELECT * FROM game_type WHERE selected = TRUE", nativeQuery = true)
	GameType findBySelectedGameType();
}
