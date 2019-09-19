package maroon.auth.controller;

import maroon.auth.base.User;
import maroon.auth.service.SecurityService;
import maroon.auth.service.UserServiceImpl;
import maroon.auth.validator.UserValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    //Model and view for the register page(register.html) GET
    @GetMapping("/register")
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("register");
        return modelAndView;
    }

    //Model and view for the register page(register.html) POST
    @PostMapping("/register")
    public ModelAndView registration(@ModelAttribute("user") User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("register");
        }
        else{
            userService.saveUser(user);
            securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());
            modelAndView.setViewName("menu");
        }
        return modelAndView;
    }

    //Model and view for the login page(login.html) GET
    @GetMapping("/login")
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }
        
    //Model and view for the menu page(menu.html) GET
    @GetMapping({"/menu"})
    public ModelAndView menu(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        User user = userService.findByUsername(auth.getName());
        modelAndView.addObject("currentUser", user);
        modelAndView.addObject("name", "Welcome " + user.getUsername()); 
        modelAndView.setViewName("menu");
        return modelAndView;
    }
}
