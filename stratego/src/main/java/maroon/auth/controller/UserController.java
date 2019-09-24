package maroon.auth.controller;

import maroon.auth.base.User;
import maroon.auth.service.SecurityService;
import maroon.auth.service.UserServiceImpl;
import maroon.auth.validator.UserValidator;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

	// Return registration form template
	@GetMapping("/register")
	public String showRegistrationPage(Model model){
        return "register";
	}
    //Model and view for the register page(register.html) POST
    @PostMapping("/register")
    public String registerUserAccount(@ModelAttribute("userForm") @Valid User userForm, BindingResult bindingResult) {
        User userExists = userService.findByUsername(userForm.getUsername());
        if(userExists != null){
			bindingResult.rejectValue("username", "Username already registered.");
        }
        if(bindingResult.hasErrors()){
            return "register";
        }
        else{
            userService.saveUser(userForm);
            securityService.autoLogin(userForm.getUsername(), userForm.getPasswordConfirm());
            //we still have to hash passwordconfirm
        }
        return "redirect:/menu";
    }

    //Model and view for the login page(login.html) GET
    @GetMapping({"/", "/login"})
    public String login(Model model, String error, String logout){
        if(error != null){
            model.addAttribute("error", "Invalid username and password");
        }
        if(logout != null){
            model.addAttribute("message", "You have been logged out successfully.");
        }
        return "login";
    }
        
    //Model and view for the menu page(menu.html) GET
    @GetMapping("/menu")
    public String menu(Model model){
        
        return "menu";
    }
}
