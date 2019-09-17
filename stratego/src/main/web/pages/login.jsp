<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>

<head>
    <title>Maroon_HW1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../main.css">
    <link href='https://fonts.googleapis.com/css?family=Charm' rel='stylesheet'>
    <script>
        var bleep = new Audio();
        bleep.src = "../audio/button.wav";
    </script>
</head>

<body>
    <div class="bg">
            <img src="../assets/logo.svg" alt="Avatar" class="avatar">
            <div class="container">

            <form method="POST" action="${contextPath}/login" class="form-signin">
                <h2>Log in</h2>
        
                <div class="form-group ${error != null ? 'has-error' : ''}">
                    <span>${message}</span>
                    <input name="username" type="text" placeholder="Username" autofocus="true"/>
                    <input name="password" type="password" placeholder="Password"/>
                    <span>${error}</span>
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
        
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
                    <h4><a href="${contextPath}/register">Create an account</a></h4>
                </div>
            </form>
<!--            <label for="uname"><b>Username</b></label>
                <br>
                <input type="text" placeholder="Enter Username" name="uname" required>
                <br>
                <br>
                <label for="psw"><b>Password</b></label>
                <br>
                <input type="password" placeholder="Enter Password" name="psw" required>
                <br>
-->
            </div>
            <a href="register.jsp"><img class="button" id="signup" src="../assets/signupbutton.svg" onmousedown="bleep.play()"></a>
            <img class="button" id="login" src="../assets/signin.svg" onmousedown="bleep.play()">
    </div>
</body>

</html>
