function checkInput(){ 
    const x = document.forms["login-form"]["username"].value,
        y = document.forms["login-form"]["password"].value,
        ln = document.forms["login-form"]["lastName"].value,
        fn = document.forms["login-form"]["firstName"].value,
        email = document.forms["login-form"]["email"].value,
        // Must contain at least 1 lowercase alphabetical character,
        // 1 uppercase alphabetical character, 1 numeric character, 
        // 1 special character, and must be eight characters or longer
        pwdFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(x == null || x == "") {
        alert("Username cannot be blank!");
        username.focus();
        return false;
    }
    if(!x.match(/\w+/)) {
        alert("Username must contain only alphanumeric characters and underscores!");
        username.focus();
        return false;
    }
    if(y == null || y == "" || !y.match(pwdFormat)) {
        alert("Password must contain at least (1) one lowercase alphabetical character, (1) one uppercase alphabetical character, (1) one numeric character, (1) one special character, and must be (8) eight characters or longer!");
        password.focus();
        return false;
    }
    if(fn != null && fn != "" && !fn.match(/^[A-Za-z]+$/)) {
        alert("First Name must contain only alphabet characters!");
        username.focus();
        return false;
    }
    if(ln != null && ln != "" && !ln.match(/^[A-Za-z]+$/)) {
        alert("Last Name must contain only alphabet characters!");
        username.focus();
        return false;
    }
    if(email != null && email != "" && !email.match(emailFormat)) {
        alert("You have entered an invalid email address!");
        username.focus();
        return false;
    }
    return true;
}