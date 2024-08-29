// Add any front-end validation or interactivity if needed
document.getElementById("signupForm").addEventListener("submit", function(event) {
    alert("Form submitted successfully!");
    const email = document.getElementById('email').value;   

    const password = document.getElementById('password').value;   
  
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Store the token in local storage or a cookie
        localStorage.setItem('token', data.token);
        // Redirect to a protected route
        window.location.href = '/protected';
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
});
