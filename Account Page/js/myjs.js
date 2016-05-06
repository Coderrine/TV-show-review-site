
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        testAPI();
        $("status").hide();
      }
      else {
        var button = document.createElement("button");
        button.onclick = function(){fblogin();};
        button.innerHTML = "Login";
        document.getElementById("status").appendChild(button);
      }
  }
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1026339967412747',
      xfbml      : true,
      version    : 'v2.5'
    });

    //login
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var fblogin = function() {
  FB.login(function(){
    //login
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }, {scope: 'public_profile,user_birthday,user_friends,email,user_about_me,user_likes,user_posts'});
}

// Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=cover,bio,birthday,first_name,friends,likes{about,description,picture.width(100).height(100),name},picture.width(800).height(800)', function(response) {
      console.log(response);
      document.getElementById("profilePhoto").src = response.picture.data.url;
      document.getElementById("profilePhotoLink").href = response.picture.data.url;
      document.getElementById("nameHolder").innerHTML = "Hello " + response.first_name;
        if(response.bio === undefined) {
          document.getElementById("bioHolder").innerHTML = "Welcome to your profile page!";
        }
        else {
          document.getElementById("bioHolder").innerHTML = response.bio;
        }

      $("#aboutMe").append("<p>" + "Birthday: " + response.birthday + "</p>");

var tableBody = document.createElement("tbody");
var photoCounter = 0;
for (var i = 0; i<response.likes.data.length; i++) {
    var row = document.createElement("tr");
    for (var x = 0; x < 4; x++) {

      var cell = document.createElement("td");
      if (photoCounter >= response.likes.data.length) {
        continue;
      }


      $(cell).append("<img src='" + response.likes.data[photoCounter].picture.data.url + "' >" );
      $(cell).append("<p>" + response.likes.data[photoCounter].name + "</p><br>");
      row.appendChild(cell);
      photoCounter++;

    }
    $(tableBody).append(row);
  }
$("#likesTable").append(tableBody);

// for (var i = 0; i<response.friends.data.length; i++) {
//     $("#friendsTab").append("<img src='" + response.friends.data[i].picture.data.url + "' >" );
//     $("#friendsTab").append("<p>" + response.friends.data[i].name + "</p><br>");
//   }

//     854735951248511/friends?limit=25&offset=0
//   //full name, address, birthday, school, phone number, social media, life events
   });
 }


//About me doesnt work anymore, and i need to get friends...
