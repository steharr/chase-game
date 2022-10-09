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
        scoreRepository.save(new Score(3L, new Date(), 200L, dev, mockCoords(), mockDirs()));
        scoreRepository.save(new Score(4L, new Date(), 202L, dev, "", ""));
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

    private String mockCoords() {
        return "+1,1+1,2+1,3+2,3+3,3+3,4+4," +
                "4+5,4+5,5+5,6+6,6+7,6+8,6+9," +
                "6+10,6+11,6+12,6+13,6+14,6+15," +
                "6+16,6+16,7+16,6+16,5+16,4+16," +
                "3+15,3+14,3+13,3+12,3+11,3+10," +
                "3+10,4+9,4+9,5+8,5+8,6+7,6+6,6+6," +
                "7+5,7+5,8+5,9+5,10+5,11+5,12+5,13+6," +
                "13+6,14+7,14+8,14+8,15+9,15+10,15+11," +
                "15+12,15+13,15+14,15+15,15+16,15+16," +
                "14+17,14";
    }

    private String mockDirs() {
        return "+circle+arrow-up+arrow-up+arrow-right+arrow-right+" +
                "arrow-up+arrow-right+arrow-right+arrow-up+" +
                "arrow-up+arrow-right+arrow-right+arrow-right+" +
                "arrow-right+arrow-right+arrow-right+arrow-right+" +
                "arrow-right+arrow-right+arrow-right+arrow-right+" +
                "arrow-up+arrow-down+arrow-down+arrow-down+arrow-down+" +
                "arrow-left+arrow-left+arrow-left+arrow-left+arrow-left+" +
                "arrow-left+arrow-up+arrow-left+arrow-up+arrow-left+arrow-up+" +
                "arrow-left+arrow-left+arrow-up+arrow-left+arrow-up+arrow-up+arrow-up+" +
                "arrow-up+arrow-up+arrow-up+arrow-right+arrow-up+arrow-right+arrow-right+" +
                "arrow-up+arrow-right+arrow-right+arrow-right+arrow-right+" +
                "arrow-right+arrow-right+arrow-right+arrow-right+arrow-down+arrow-right";
    }

}
