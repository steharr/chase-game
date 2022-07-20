package chasegame;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import chasegame.data.ScoreRepository;
import chasegame.data.UserRepository;
import chasegame.models.Score;
import chasegame.models.User;

@Component
public class DataLoader implements ApplicationRunner {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private ScoreRepository scoreRepository;

	@Autowired
	public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder, ScoreRepository scoreRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.scoreRepository = scoreRepository;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		User dev = new User("dev", passwordEncoder.encode("password"), "developer");
		userRepository.save(dev);

		scoreRepository.save(new Score(3L, new Date(), 200L, dev.getUsername()));
	}

}
