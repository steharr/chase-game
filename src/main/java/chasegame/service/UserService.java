package chasegame.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import chasegame.models.User;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
public class UserService {

	public User getCurrentUser() {

		SecurityContext securityContext = SecurityContextHolder.getContext();
		Authentication authentication = securityContext.getAuthentication();

		return (User) authentication.getPrincipal();
	}
}
