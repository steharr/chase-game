package chasegame.setup.application;

import chasegame.setup.infrastructure.GameSetup;
import chasegame.setup.infrastructure.GameSetupRepository;
import chasegame.setup.infrastructure.GameType;
import chasegame.setup.infrastructure.GameTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class GameSetupDataLoader implements ApplicationRunner {

    @Autowired
    private GameTypeRepository gameTypeRepo;
    @Autowired
    private GameSetupRepository gameSetupRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        addGameSetup();
    }

    @Transactional
    public void addGameSetup() {
        GameType gameType = new GameType(1L, "Escape The Chase", 6, true);
        GameType gameType2 = new GameType(2L, "Capture The Flag", 6, false);
        gameTypeRepo.save(gameType);
        gameTypeRepo.save(gameType2);

        GameSetup defaultGameSetup = new GameSetup(1L, "Escape The Chase", 2, 3, "many");
        gameSetupRepo.save(defaultGameSetup);
    }


}
