async function readVisitas() {
  const response = await fetch("https://dictated-reader.000webhostapp.com/get-counter.php");
  const jsonData = await response.json();
  console.log("Read visitas json: " + jsonData);
  if (jsonData["status"] == "success"){
    document.getElementById("contador-visitas").innerHTML = jsonData["contador"];
  }
}

async function updateVisitas() {
  const response = await fetch("https://dictated-reader.000webhostapp.com/update-counter.php");
  const jsonData = await response.json();
  console.log("Update visitas json: " + jsonData);
  readVisitas();
}