package chasegame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import chasegame.data.UserRepository;
import chasegame.models.User;

@Component
public class DataLoader implements ApplicationRunner {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		userRepository.save(new User("dev", passwordEncoder.encode("password"), "developer"));
	}

}
