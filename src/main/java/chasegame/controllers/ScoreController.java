package chasegame.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chasegame.models.Score;

@RestController
@RequestMapping("/score")
public class ScoreController {

	@PostMapping
	public void saveScore(@RequestBody Score score) {
		DateFormat df = new SimpleDateFormat("HH:mm:ss dd-MM-yyy");
		String test = df.format(score.getDate());
	}

}
