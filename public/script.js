// script.js

// Switch between login and registration forms
$("#switchToRegister").click(function () {
    $("#loginForm").hide();
    $("#registerForm").show();
  });
  
  $("#switchToLogin").click(function () {
    $("#registerForm").hide();
    $("#loginForm").show();
  });
  
  // AJAX request for login
  $("#loginBtn").click(function () {
    $.ajax({
      url: "/api/login",
      type: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: $("#loginForm").serialize(),
      success: function (response) {
        alert(response.message);
        if (response.success) {
          window.location.href = "/display"; // Redirect on successful login
        }
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        alert("Login failed: " + xhr.responseText);
      },
    });
  });
  
  // AJAX request for registration
  $("#registerBtn").click(function () {
    $.ajax({
      url: "/api/register",
      type: "POST",
      contentType: "application/x-www-form-urlencoded",
      data: $("#registerForm").serialize(),
      success: function (response) {
        if (response.success) {
          alert(response.message);
          $("#registerForm").hide();
          $("#loginForm").show();
        } else {
          alert(response.message); // Display the error message
        }
      },
      error: function (xhr) {
        alert("An error occurred: " + xhr.responseText);
      },
    });
  });
  
  // Function to open popup with user data
  function openUserPopup() {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      success: function (response) {
        let userTable = '<table border="1" cellpadding="10" cellspacing="0">' +
          '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Mobile</th>' +
          '<th>Email</th>' +
          '<th>Street</th>' +
          '<th>City</th>' +
          '<th>State</th>' +
          '<th>Country</th>' +
          '<th>Username</th>' +
          '</tr>';
  
        response.users.forEach(user => {
          userTable += '<tr>' +
            '<td>' + user.firstName + '</td>' +
            '<td>' + user.lastName + '</td>' +
            '<td>' + user.mobile + '</td>' +
            '<td>' + user.email + '</td>' +
            '<td>' + user.street + '</td>' +
            '<td>' + user.city + '</td>' +
            '<td>' + user.state + '</td>' +
            '<td>' + user.country + '</td>' +
            '<td>' + user.username + '</td>' +
            '</tr>';
        });
  
        userTable += '</table>';
  
        // Display popup with user data
        const popup = window.open('', '', 'width=800,height=600');
        popup.document.write('<html><head><title>User Data</title></head><body>' +
          '<h2>User Information</h2>' +
          userTable +
          '</body></html>');
        popup.document.close();
      },
      error: function (xhr) {
        alert("An error occurred: " + xhr.responseText);
      }
    });
  }
  
  // Add event listener to a button to open user popup
  $("#viewUsersBtn").click(function () {
    openUserPopup();
  });
  