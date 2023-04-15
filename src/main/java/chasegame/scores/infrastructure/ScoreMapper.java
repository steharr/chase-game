package chasegame.scores.infrastructure;

import chasegame.common.DbMapper;
import chasegame.scores.model.ScoreModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScoreMapper implements DbMapper<ScoreModel, Score> {

    @Override
    public ScoreModel entityToModel(Score ent) {
//        TODO: add implementation
        
        return null;
    }

    @Override
    public Score modelToEntity(ScoreModel model) {
        Score ent = new Score();

        ent.setDate(model.getDate());
        ent.setScore(model.getScore());
        ent.setUser(model.getUser());
        ent.setRouteDirections(this.getDirectionString(model.getRoute()));
        ent.setRouteCoordinates(this.getCoordString(model.getRoute()));

        return ent;
    }


    private String getCoordString(List<List<String>> coords) {
        return coords.stream().map(c -> {
            return String.join("+", List.of(c.get(0), c.get(1)));
        }).collect(Collectors.joining(","));
    }

    private String getDirectionString(List<List<String>> coords) {
        return coords.stream().map(c -> {
            return c.get(2);
        }).collect(Collectors.joining("+"));
    }
}
