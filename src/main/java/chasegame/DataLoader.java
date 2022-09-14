package chasegame;

import chasegame.data.GameSetupRepository;
import chasegame.data.GameTypeRepository;
import chasegame.data.ScoreRepository;
import chasegame.data.UserRepository;
import chasegame.models.GameSetup;
import chasegame.models.GameType;
import chasegame.models.Score;
import chasegame.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;

@Component
public class DataLoader implements ApplicationRunner {

    private UserRepository userRepository;
    private GameTypeRepository gameTypeRepo;
    private GameSetupRepository gameSetupRepo;
    private PasswordEncoder passwordEncoder;
    private ScoreRepository scoreRepository;

    @Autowired
    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder, ScoreRepository scoreRepository,
                      GameTypeRepository gameTypeRepository, GameSetupRepository gameSetupRepository) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.scoreRepository = scoreRepository;
        this.gameTypeRepo = gameTypeRepository;
        this.gameSetupRepo = gameSetupRepository;

    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User dev = new User("dev", passwordEncoder.encode("password"), "developer");
        userRepository.save(dev);
        scoreRepository.save(new Score(3L, new Date(), 200L, dev, new ArrayList<>()));
        scoreRepository.save(new Score(4L, new Date(), 202L, dev, new ArrayList<>()));
        scoreRepository.save(new Score(5L, new Date(), 122L, dev, new ArrayList<>()));
        addGameSetup();
    }

    private void addGameSetup() {
        GameType gameType = new GameType(1L, "Escape The Chase", 6, true);
        GameType gameType2 = new GameType(2L, "Capture The Flag", 6, false);
        gameTypeRepo.save(gameType);
        gameTypeRepo.save(gameType2);

        GameSetup defaultGameSetup = new GameSetup(1L, "Escape The Chase", 2, 3, "many");
        gameSetupRepo.save(defaultGameSetup);
    }

}
