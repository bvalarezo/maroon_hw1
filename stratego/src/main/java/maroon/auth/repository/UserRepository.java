
package maroon.auth.repository;

import maroon.auth.base.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    
    User findByUsername(String username);

}