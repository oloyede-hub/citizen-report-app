


// //crimereport-app.000webhostapp.com


$(document).ready(function () {
  var rootUrl = 'https://crimereport-app.000webhostapp.com';
  
  const url = `${rootUrl}/wp-json/wp/v2/posts`;
  
  var tokenUrl = `${rootUrl}/wp-json/jwt-auth/v1/token`;
  
  var adminDet = {
  username: "admin",
  password: "Dev_Snowman295"
  };

  var token;
  loadData();
  

  $.post(tokenUrl, adminDet,
  function (data, status) {
  console.log("token: " + data.token);
  token = data.token;
  });
  
  function loadData() {
  $.getJSON(url, function (data) {
  console.log(data); 
  
  $("#spinner").remove();
  

  $("#mainDiv").empty();
 
  
  for (var i = 0; i < data.length; i++) {
  var div = document.createElement('div');
  div.innerHTML = `
  <div class="card pt-1">
  <div class="card-body">
  <h4 class="card-title">${data[i].title.rendered}</h4>
  <h4 class="card-title">${data[i].categories.rendered}</h4>
  <h4 class="card-title">${data[i].date.rendered}</h4>
  <p class="card-text textwrap">${data[i].author.rendered}</p>
  <p class="card-text textwrap">${data[i].content.rendered}</p>
  </div>
  </div>
  `;
  $("#mainDiv").append(div);
  };
  });
  }


  $("#location_input").click(getLocation);
  

  $("#image").click(takePhoto);

  
 


  function takePhoto(){
    var opts = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encordingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        targetWidth: 300,
        targetWidth:400
    };
    navigator.camera.getPicture( ftw , wtf , opts);
    console.log("something is wrong")
}
 function ftw(IMAGE_URI) {
 $('#msg').html(IMAGE_URI);
 $("#image-input").val() = IMAGE_URI
}
 function wtf(msg) {
    $('#msg').textContent = msg;

}

  function getLocation () {
    ///LOCATION

    function onSuccess(position) {
      $('#lat_log').html('Lt: ' + position.coords.latitude + " " +
          'Lg: ' + position.coords.longitude );
  }

  function onError(error) {
      alert('code: ' + error.code + 'n' +
          'message: ' + error.message + 'n');
  }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
  }
  

  $('form').submit(function (event) {
  // stop the form from submitting the normal way and refreshing the pa
  event.preventDefault();
  


  

 


  var formData = {
  author: $('input[name=fullname]').val(),
  title: $('input[name=title]').val(),
  IMAGE_URI: $('input[name=image-input]').val(),
  categories:$('select[name=categories]').children('option:selected').val(),
  content: $('textarea[name=content]').val(),
  date: $('input[name=date]').val(),
  status: 'publish'
  }; 

  
  console.log(formData);
  $.ajax({
  url: url,
  method: 'POST',
  data: JSON.stringify(formData),
  crossDomain: true,
  contentType: 'application/json',
  headers: {
  'Authorization': 'Bearer ' + token
  },
  success: function (data) {
  console.log(data);
  /**
  * refreshes app-content to display latest posts
  */
  loadData();
  },
  error: function (error) {
  console.log(error);
  }
  });



  });

  
  }); 







