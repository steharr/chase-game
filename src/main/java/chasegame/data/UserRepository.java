package chasegame.data;

import org.springframework.data.repository.CrudRepository;

import chasegame.User;

public interface UserRepository extends CrudRepository<User, Long> {

	User findByUsername(String username);

}
