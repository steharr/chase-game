package chasegame.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

//(access = AccessLevel.PRIVATE, force = true)

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date date;

    private Long score;

    @ManyToOne
    private User user;

    @Lob
    private String routeCoordinates;
    @Lob
    private String routeDirections;

}
