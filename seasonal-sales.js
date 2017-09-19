
var productInfo;

function executeProductAfterLoads () {
  var productData = JSON.parse(this.responseText).products;
  //console.log("products", productData);
  getStore(productData);

}


function executeCodeAfterFileError() {
  console.log("D'oh");
}


var myProduct = new XMLHttpRequest;
myProduct.addEventListener("load", executeProductAfterLoads);
myProduct.addEventListener("error", executeCodeAfterFileError);
myProduct.open("GET", "product.json");
myProduct.send();


function getStore(productz) {
	var myStore = new XMLHttpRequest;
	myStore.addEventListener("load", executeStoreAfterLoads);
	myStore.addEventListener("error", executeCodeAfterFileError);
	myStore.open("GET", "store.json");
	myStore.send();


	function executeStoreAfterLoads() {
		var storeData = JSON.parse(this.responseText).categories;
 
        //console.log("store", storeData);
        combinedArray(productz, storeData);
	}

}


function combinedArray(productsArray, storeArray) {
  

	productsArray.forEach(function(product) {

		var currentStoreId = product["category_id"];
		
		//console.log("one product", currentStoreId);

		storeArray.forEach(function(category){
			if (currentStoreId === category.id) {
				product['categoryName'] = category.name;
				product['finalPrice'] = (product.price - category.discount * product.price).toFixed(2);
				product['season'] = category.season;
				product['priceDiscount'] = category.discount;

			//console.log("one store", store);
			}

			
		});
	});
	console.log("all prods", productsArray);
	domString(productsArray);
	productInfo = productsArray;
}

var eventChange;
document.getElementById("select").addEventListener('change', function(e){
  eventChange = e.target.options;
  console.log(eventChange);
  //changePrice(eventChange);
  var selected = eventChange[event.target.options.selectedIndex];
  changePrice(selected.value);
  console.log(selected.value);
});



function domString(products) {
  var longDomString = '';
  
  for (var i = 0; i < products.length; i++){
  longDomString += `<div><h2>${products[i].name}</h2>`;
  longDomString += `<p>Original Price: ${products[i].price}</p>`;
  longDomString += `<p class="${products[i].categoryName}">Category Name: ${products[i].categoryName}</p>`;
  longDomString += `</div>`;
  }

  
  writeToDom(longDomString);

}

function changePrice(xx) {
	var domString = '';
	
	if (xx === "Spring") {
		 console.log(productInfo);
		 //console.log(productInfo[3].categoryName);
		 
		 for (var a = 0; a < productInfo.length; a++){
			if (productInfo[a].categoryName == "Household") {
				console.log(productInfo[a].categoryName);
		    	domString += `<div><h2>${productInfo[a].name}</h2>`;
     		    domString += `<p>Sale Price: ${productInfo[a].finalPrice}</p>`;
                domString += `<p class="${productInfo[a].categoryName}">Category Name: ${productInfo[a].categoryName}</p>`;
   				domString += `</div>`;

		 	 //return domString; not to put outside of function 

	  		}
		} 
			  	  	
    } else if (xx === "Fall"){
		 for (var a = 0; a < productInfo.length; a++){
			if (productInfo[a].categoryName == "Furniture") {
				console.log(productInfo[a].categoryName);
		    	domString += `<div><h2>${productInfo[a].name}</h2>`;
     		    domString += `<p>Sale Price: ${productInfo[a].finalPrice}</p>`;
                domString += `<p class="${productInfo[a].categoryName}">Category Name: ${productInfo[a].categoryName}</p>`;
   				domString += `</div>`;
	  		}
		} 

    } else if (xx === "Winter"){
    	for (var a = 0; a < productInfo.length; a++){
			if (productInfo[a].categoryName == "Apparel") {
				console.log(productInfo[a].categoryName);
		    	domString += `<div><h2>${productInfo[a].name}</h2>`;
     		    domString += `<p>Sale Price: ${productInfo[a].finalPrice}</p>`;
                domString += `<p class="${productInfo[a].categoryName}">Category Name: ${productInfo[a].categoryName}</p>`;
   				domString += `</div>`;
	  		}
		} 

    } else if (xx === "all"){
    	for (var a = 0; a < productInfo.length; a++){		
			  domString += `<div><h2>${productInfo[a].name}</h2>`;
			  domString += `<p>Original Price: ${productInfo[a].price}</p>`;
			  domString += `<p class="${productInfo[a].categoryName}">Category Name: ${productInfo[a].categoryName}</p>`;
			  domString += `</div>`;
	  		}
		} 



    writeToDom(domString);


}





// write to innerHTML
function writeToDom(string) {
  document.getElementById("prod").innerHTML = string;

}


