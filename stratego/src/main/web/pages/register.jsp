<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="en-us">
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
        <div class="container">
            <img src="../assets/logo.svg" alt="Avatar" class="avatar">
            <form:form method="POST" modelAttribute="userForm">
                <spring:bind path="username">
                <div class="form-group ${status.error ? 'has-error' : ''}">
                    <form:input type="text" path="username" placeholder="Enter username" autofocus="true"></form:input>
                    <form:errors path="username"></form:errors>
                </div>
                </spring:bind>

                <spring:bind path="password">
                <div class="form-group ${status.error ? 'has-error' : ''}">
                    <form:input type="password" path="password" class="form-control" placeholder="Enter password"></form:input>
                    <form:errors path="password"></form:errors>
                </div>
                </spring:bind>

                <spring:bind path="passwordConfirm">
                <div class="form-group ${status.error ? 'has-error' : ''}">
                    <form:input type="password" path="passwordConfirm" class="form-control" placeholder="Confirm your password"></form:input>
                    <form:errors path="passwordConfirm"></form:errors>
                </div>
                </spring:bind>

            <button class="center" type="submit">Submit</button>
            </form:form>
        </div>
    </div>
</body>
</html>
