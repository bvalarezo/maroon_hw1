package maroon.auth.controller;

import maroon.auth.base.User;
import maroon.auth.repository.GameRepository;
import maroon.auth.service.SecurityService;
import maroon.auth.service.UserServiceImpl;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    GameRepository gameRepository;
    
    // Return registration form template
    @GetMapping({"/register"})
    public String showRegistrationPage(Model model) {
        return "register";
    }

    // Model and view for the register page(register.html) POST
    @PostMapping("/register")
    public String registerUserAccount(@ModelAttribute("userForm") @Valid User userForm, BindingResult bindingResult,
            Model model) {
        if (userForm.getUsername().trim().isEmpty() || userForm.getPassword().trim().isEmpty() || userForm.getPasswordConfirm().trim().isEmpty() ) {
            bindingResult.rejectValue("username", "blank");
            bindingResult.rejectValue("password", "blank");
            bindingResult.rejectValue("passwordConfirm", "blank");
            model.addAttribute("blankError", "Please fill in the blank fields.");
        } else {
            User userExists = userService.findByUsername(userForm.getUsername());
            if (userExists != null) {
                bindingResult.rejectValue("username", "duplicate username");
                model.addAttribute("usernameDupError", "Username is already taken.");
            }
            if (userForm.getUsername().length() < 6 || userForm.getUsername().length() > 32) {
                bindingResult.rejectValue("username", "invalid username");
                model.addAttribute("usernameLengthError", "Username must be between 6 and 32 characters.");
            }
            if (userForm.getPassword().length() < 8 || userForm.getPassword().length() > 32) {
                bindingResult.rejectValue("password", "invalid password");
                model.addAttribute("passwordLengthError", "Password must be between 8 and 32 characters.");
            }
            if (!userForm.getPasswordConfirm().equals(userForm.getPassword())) {
                bindingResult.rejectValue("password", "nonmatching password");
                model.addAttribute("passwordMatchError", "Passwords do not match.");
            }
        }
        if (bindingResult.hasErrors()) {
            return "register";
        } else {
            String password = userForm.getPasswordConfirm();
            userService.saveUser(userForm);
            securityService.autoLogin(userForm.getUsername(), password);
        }
        return "redirect:/menu";
    }

    // Model and view for the login page(login.html) GET
    @GetMapping({"/login" , "/"})
    public String login(Model model, String error, String logout) {
        if (error != null) {
            model.addAttribute("error", "Invalid username and password");
        }
        if (logout != null) {
            model.addAttribute("message", "You have been logged out successfully.");
        }
        return "login";
    }


}
