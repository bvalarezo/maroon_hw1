
package maroon.auth.repository;

import com.stratego.springbootmongodbsecurity.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import maroon.auth.base.User;

public interface UserRepository extends MongoRepository<User, String> {
    
    User findByUsername(String username);

}