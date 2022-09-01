const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let currentCategoriesArray = [];



function getData(){

getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products;
          
            productos();
        }
    });
   
}



document.addEventListener("DOMContentLoaded", getData);


function productos(){

    
console.log(currentCategoriesArray)
   let htmlContentToAppend = "";
   for(let i = 0; i < currentCategoriesArray.length; i++){
       let category = currentCategoriesArray[i];
       

           htmlContentToAppend += `
           <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
               <div class="row">
                   <div class="col-3">
                       <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                   </div>
                   <div class="col">
                       <div class="d-flex w-100 justify-content-between">
                           <h4 class="mb-1">${category.name}-${category.currency} ${category.cost} </h4>
                           <small class="text-muted">${category.soldCount} vendidos</small>
                       </div>
                       <p class="mb-1">${category.description}</p>
                   </div>
               </div>
           </div>
           `
       
   }
   document.getElementById("productos").innerHTML = htmlContentToAppend;

}
   