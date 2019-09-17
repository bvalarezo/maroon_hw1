<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html>

<head>
    <title>Maroon_HW1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../main.css">
    <link rel="stylesheet" href="../menu.css">

    <script>
        var bleep = new Audio();
        bleep.src = "../audio/button.wav";
    </script>

</head>

<body>
    <div class="bg">
        <div class="menuholder">
            <c:if test="${pageContext.request.userPrincipal.name != null}">
                <form id="logoutForm" method="POST" action="${contextPath}/logout">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                </form>
                <h2>Welcome ${pageContext.request.userPrincipal.name} | <a onclick="document.forms['logoutForm'].submit()">Logout</a></h2>
            </c:if>
            <div class="imgcontainer">
                <img src="../assets/logo.svg" alt="Avatar" class="logo">
                <img src="../assets/leaderboard.svg" class="leaderboard">
                <div class="buttons">
                    <img src="../assets/playbutton.svg" class="playbutton" onmousedown="bleep.play()">
<!--                </div>-->
<!--                <div class="rulesbuttonholder">-->
                    <img src="../assets/rulesbutton.svg" class="rulesbutton" onmousedown="bleep.play()">
<!--                </div>-->
<!--                <div class="logoutbuttonholder">-->
                    <img src="../assets/logoutbutton.svg" class="logoutbutton" onmousedown="bleep.play()">
                </div>
            </div>
        </div>
    </div>
</body>

</html>
