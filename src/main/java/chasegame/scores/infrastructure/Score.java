package chasegame.scores.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "high_scores")
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "high_id")
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(name = "high_date")
    private Date date;

    @Column(name = "high_score")
    private Long score;

    @Column(name = "high_user")
    private String user;

    @Column(name = "high_route_coord")
    @Lob
    private String routeCoordinates;
    @Column(name = "high_route_dir")
    @Lob
    private String routeDirections;

}
