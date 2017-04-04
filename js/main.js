// Login App
//   - Create a user database.
  
//   - Try to login.
//     + Cycle through database and see if credentials match.
//     + If credentials match display SUCCESS message.
//       * When logged in allow user to use to-do list.
    
//     + If not then display ERROR message (Suggest to user to create a login).
  
//   - Allow user to create a login.
//     + When username and password are entered into input fields,
//     cycle through database to see if username already exist.
//     + If username already exist, tell user to user to use a different username.

//   - Create error and success container and messages on login screen.

var loginApp = (function(){

  var database = [
    {
      username: "foolofsoul",
      password: "942860"
    },
    {
      username: "realbwoi",
      password: "942867"
    },
   {
      username: "sanskiii",
      password: "123roxyy"
    },
     {
      username: "moki",
      password: "yoda55"
    }
  ]

  var getElById = function(id) {
    return document.getElementById(id);
  }

  var signUpDOM = false;

  // CACHE DOM
  var form = getElById('form');
  var h2 = getElById('form-header');
  var message = getElById('message');
  var btn = getElById('btn');
  var signUp = getElById('sign-up');
  
  var errorMsg = function() {
    message.className = "error";
  }

  // BIND EVENTS
  function bindEvents() {
    if (signUpDOM) {
      btn.removeEventListener('click' || 'keydown', logIn);
      btn.addEventListener('click' || 'keydown', addUser);
    } else {
      btn.removeEventListener('click' || 'keydown', addUser);
      btn.addEventListener('click' || 'keydown', logIn);
    }
  
    if (signUp.id === "log-in") {
      signUp.removeEventListener('click', signUpForm);
      signUp.addEventListener('click', logInForm);
    } else {
      signUp.removeEventListener('click', logInForm);
      signUp.addEventListener('click', signUpForm);
    }
  }

  // LOG USER IN
  function logIn(event) {
    if( event.keyCode === "13" || event ) {
      event.preventDefault();
      var username = getElById('username');
      var password = getElById('password');
      var loggedIn = false;

      for(var i = 0; i < database.length; i++){
        if ( username.value.toLowerCase() === database[i].username && password.value === database[i].password ) {
          loggedIn = true;
          break;
        }
      }

      if ( loggedIn ) {
        form.innerHTML = '<div class="login-success">' + username.value + " has successfully logged in.</div>";
      } else if ( username.value === "" || password.value === "") {
        message.textContent = "Please enter a username and password.";
        errorMsg();
      } else {
        message.textContent = "Username and/or password does not match our database.";
        errorMsg();
      }
    }
  }

  // ADD USER
  function addUser(event) {
    if( event.keyCode === "13" || event ) {
      event.preventDefault();
      var userExists = false;
      var noInput = false;

      for( var i = 0; i < database.length; i++ ) {
        if ( username.value.toLowerCase() === database[i].username ) {
          userExists = true;
          break;
        } else if (username.value === "" || password.value === "") {
          noInput = true;
        }
      }

      if(userExists) {
        message.textContent = "Username already exists. Use a different username.";
        errorMsg();
      } else if (noInput) {
        message.textContent = "Create a username and password to make an account."
        errorMsg(); 
      } else {
        database.push({
          username: username.value.toLowerCase(),
          password: password.value
        });
        logInForm();
        console.log(database);
        return
      }
    }
  }

  // SWITCH TO SIGN UP FORM
  function signUpForm(event) {
    if(event){ event.preventDefault(); }
    form.style.opacity = "0";
    setTimeout(function(){
      getElById('username').value = "";
      getElById('password').value = "";
      signUpDOM = true;
      h2.textContent = "Sign Up";
      message.className = "hidden";
      btn.textContent = "Submit";
      getElById('sign-up-text').innerHTML = "Already have an account?&nbsp;";
      signUp.textContent = "Log In";
      form.style.opacity = "1"; 
      signUp.id = "log-in";   
      bindEvents();
    }, 500);
  }

  // SWITCH TO LOG IN FORM
  function logInForm(event) {
    if(event){ event.preventDefault(); }
    form.style.opacity = "0";
    setTimeout(function(){ 
      getElById('username').value = "";
      getElById('password').value = "";
      signUpDOM = false;
      h2.textContent = "Login";
      message.className = "hidden";
      btn.textContent = "Sign In";
      getElById('sign-up-text').innerHTML = "Need an account?&nbsp;";
      signUp.textContent = "Sign Up";
      form.style.opacity = "1"; 
      signUp.id = "sign-up";
      bindEvents();
    }, 500);
  }

  bindEvents();
  

})();