package chasegame.service;

import chasegame.data.UserRepository;
import chasegame.models.User;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();

        try {
            return (User) authentication.getPrincipal();
        } catch (ClassCastException e) {
            return new User("anonymous", "", "");
        }
    }

    public User getDummyUser() {
        return userRepository.findByUsername("dev");
    }
}
