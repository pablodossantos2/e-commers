const numerodeproducto = localStorage.getItem("catID");
const url = 'https://japceibal.github.io/emercado-api/cats_products/' + numerodeproducto + '.json';
let currentCategoriesArray = [];
let categoriesName = '';

const ORDER_ASC_BY_$ = "0";
const ORDER_DESC_BY_$ = "10000000";
const ORDER_BY_PROD_REL = "Rel.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;




function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_$) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_$) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}



function getData() {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data.products;
            categoriesName = resultObj.data.catName;
            productos();
            document.getElementsByClassName("lead")[0].innerHTML = `<p> veras aqui todos los poductos de la categoria <b>${categoriesName}</b></p>`

        }


        document.getElementById("sortAsc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_ASC_BY_$);
        });

        document.getElementById("sortDesc").addEventListener("click", function () {
            sortAndShowCategories(ORDER_DESC_BY_$);
        });

        document.getElementById("sortByCount").addEventListener("click", function () {
            sortAndShowCategories(ORDER_BY_PROD_REL);
        });

        document.getElementById("clearRangeFilter").addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";

            minCount = undefined;
            maxCount = undefined;

            productos();
        });

        document.getElementById("rangeFilterCount").addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;

            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
                minCount = parseInt(minCount);
            }
            else {
                minCount = undefined;
            }

            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
                maxCount = parseInt(maxCount);
            }
            else {
                maxCount = undefined;
            }
            productos();

        });

    });
}

document.addEventListener("DOMContentLoaded", getData);



function productos() {

    
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];
       
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
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
}


function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    productos();
}
