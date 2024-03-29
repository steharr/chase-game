package chasegame.setup.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface GameSetupRepository extends JpaRepository<GameSetup, Long> {

    @Query(value = "SELECT * FROM GAME_SETUP WHERE ID=1", nativeQuery = true)
    GameSetup getGameSetup();
}
