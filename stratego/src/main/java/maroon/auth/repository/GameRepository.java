package maroon.auth.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import maroon.auth.base.Game;


public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findByOwner(String owner);
}