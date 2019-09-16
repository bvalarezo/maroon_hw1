package com.stratego.auth.base;

import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="user")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String passwordConfirm;

    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public String getUsername(){
        return username;
    }

    public String setUsername(String username){
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

}