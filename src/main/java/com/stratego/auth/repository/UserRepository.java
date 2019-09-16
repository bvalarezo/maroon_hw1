
package com.stratego.auth.repository;

import com.stratego.springbootmongodbsecurity.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.stratego.auth.base.User;

public interface UserRepository extends MongoRepository<User, String> {
    
    User findByUsername(String username);

}