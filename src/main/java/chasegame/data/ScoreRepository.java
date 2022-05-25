package chasegame.data;

import org.springframework.data.jpa.repository.JpaRepository;

import chasegame.models.Score;

public interface ScoreRepository extends JpaRepository<Score, Long> {

}
