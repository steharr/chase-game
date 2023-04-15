package chasegame.common;

/**
 * Interface for a mapper class which maps a db entity to model object (and vice versa)
 *
 * @param <M>
 * @param <E>
 */
public interface DbMapper<M, E> {
    M entityToModel(E ent);

    E modelToEntity(M model);
}

