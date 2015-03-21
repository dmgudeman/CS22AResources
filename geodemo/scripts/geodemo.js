

// Show the latitude and the longitude corresponding to the given position
function showPosition(position)
  {
      document.getElementById("latitude").textContent = position.coords.latitude;
      document.getElementById("longitude").textContent = position.coords.longitude;
  }
document.getElementById("findme").addEventListener("click", function (){
    navigator.geolocation.getCurrentPosition(showPosition);
});