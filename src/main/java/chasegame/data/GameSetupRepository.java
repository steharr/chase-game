package chasegame.data;

import org.springframework.data.jpa.repository.JpaRepository;

import chasegame.models.GameSetup;

public interface GameSetupRepository extends JpaRepository<GameSetup, Long> {

}
