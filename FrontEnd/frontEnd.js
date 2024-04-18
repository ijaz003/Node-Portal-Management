const port = 8000;
function showSignUpForm() {
  document.getElementById('displayForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'block';
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('studentSignInForm').style.display = 'none'; // Hide student sign-in form
}

function showSignInForm() {
  document.getElementById('displayForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'none';
  document.getElementById('signInForm').style.display = 'block';
  document.getElementById('studentSignInForm').style.display = 'none'; // Hide student sign-in form
}

function showStudentSignInForm() {
  document.getElementById('displayForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'none';
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('studentSignInForm').style.display = 'block'; // Show student sign-in form
}

function showForgotPasswordForm(formType) {
  // Hide other forms
  document.getElementById('displayForm').style.display = 'none';
  document.getElementById('signUpForm').style.display = 'none';
  document.getElementById('signInForm').style.display = 'none';
  document.getElementById('studentSignInForm').style.display = 'none';

  // Show password recovery form
  document.getElementById('passwordRecoveryForm').style.display = 'block';

  // If the formType is 'signIn', pre-fill email from signInForm
  if (formType === 'signIn') {
    document.getElementById('recoveryEmail').value = document.getElementById('username1').value;
  }

  // If the formType is 'studentSignIn', pre-fill email from studentSignInForm
  if (formType === 'studentSignIn') {
    document.getElementById('recoveryEmail').value = document.getElementById('studentEmail').value;
  }
}



// SignUP
const signUp = async () => {
  const Name = document.getElementById("username").value;
  const Name1 = document.getElementById("name").value;
  const Password = document.getElementById("password").value;
  const response = await fetch(`http://localhost:${port}/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: Name, password: Password,name:Name1 })
  })
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    alert("Data Added successfully ")
  }
  else {
    alert(data.error || 'Error signing up');
  }

}
// SignIn
const signIn = async () => {
  const userName = document.getElementById("username1").value;
  const password = document.getElementById("password1").value;

  try {
    const response = await fetch(`http://localhost:${port}/signIn/${userName}/${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    console.log("Response:", response);
    console.log("Data:", data);

    if (response.ok) {
      localStorage.setItem('token',data.token)
      alert("Login successful",data)
      window.location.href = 'index1.html';
    } 
    else {
      alert(data.message || 'Error signing in');
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please try again later.");
  }
};

const studentSignIn = async () => {
  const userName = document.getElementById("studentEmail").value;
  const password = document.getElementById("studentPassword").value;

  try {
    const response = await fetch(`http://localhost:${port}/studentSignIn/${userName}/${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log("Response:", response);
    console.log("Data:", data);

    if (response.ok) {
      localStorage.setItem('token',data.token)
      alert("Login successful",data)
      window.location.href = 'student.html';
    } 
    else {
      alert(data.message || 'Error signing in');
    }
  } catch (error) {
    console.error('Error:', error);
    alert("An error occurred. Please try again later.");
  }
};


// Assuming you're using fetch API
const recoverPassword = async () => {
  try {
    const email = document.getElementById("recoveryEmail").value;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    const response = await fetch(`http://localhost:${port}/forgotPassword`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          password: oldPassword,
          newPassword: newPassword
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      
      alert(data.message)
    } else {
      // Failed to update password
      console.log(data.error)
    }
  } catch (error) {
    alert(error)
  }
};




