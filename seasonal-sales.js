
function domString(malls) {
	
	console.log(malls);
	var mallString = "";
	for (var i =0; i < malls.length; i++) {
		mallString += `<div class="mall">`;
		mallString += `<div class="name">${malls[i].name}</div>`;
		mallString += `<div class="price">${malls[i].price}</div>`;
		mallString += `<div class="category">${malls[i].category_id}</div>`;
		mallString += `<div class="id">${malls[i].id}</div>`;
		mallString += `</div><br>`;
	}
	writeToDom(mallString); 
}

function writeToDom(string) {
  document.getElementById("prod").innerHTML= string;

}


function executeCodeAfterLoads1 () {
  var data = JSON.parse(this.responseText);
  domString(data.products);
 

}

// function executeCodeAfterLoads2 () {
//   var data = JSON.parse(this.responseText);
//   domString(data.store);
// }

function executeCodeAfterFileError() {
  console.log("D'oh");
}


var myRequest = new XMLHttpRequest();
myRequest.addEventListener("load", executeCodeAfterLoads1);
myRequest.addEventListener("error", executeCodeAfterFileError);
myRequest.open("GET", "product.json");
myRequest.send();

function selectOption(){
  var x = document.getElementById("select");
  var i = x.selectedIndex;
  document.getElementById("prod").innerHTML = x.option[i].text;

}


