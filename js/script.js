//IPO Input -> Process -> Output


// Constants & state Variables (data)


//Constant Data
const Base_URL = 'https://pokeapi.co/api/v2/pokemon/'


//State Date
let pokemonData, pokemonDetail; 


//Cached element references 
    //(selected DOM elements stored in a variable)

const $collection = $('#collection');




// Attached event listeners
    //clickwill only work when the article with class of card is clicked
$collection.on('click', 'article.card', handleClick)

 
// Functions 

//call immediately - this could be getData() 
init();

function init() {
    getData()
}

function getData(detailURL) {
    console.log('detailURL', detailURL)
    //declare a local variable to take whichever url we need 
    let url; 
    if(detailURL === undefined) {
        //we want all the pokemon
        url = Base_URL
    } else {
        // we want a single pokemon
        url = detailURL;
    }
    //fetch data using AJAX
    $.ajax(url).then(function(data){
        //take the returned data and assigned it to global state variable
        // the below if is getting all the pokemon
         if(detailURL === undefined){
            pokemonData = data;
            //call render to visualize it to the DOM
            render();         
         } else {
             pokemonDetail = data; 
             //call render and tell it 
             render(true)
         }
         
    }, function(error) {
        console.log('Error: ', error)
    })
}


function handleClick() {
   getData(this.dataset.url)
}

function render(showModal) {
    if(showModal === true){
        //show the modal
        //generate the html for the inner conent for the modal
        //call the modal function on the modal element
        const $modalContent = $(`
            <img src="${pokemonDetail.sprites.front_default}"/>
            <h5>${pokemonDetail.name}</h5>
            <p>Height:${pokemonDetail.height}</p>
            <p>Moves:${pokemonDetail.moves.length}</p>
            <p>abilities: ${pokemonDetail.abilities.length}</p>
        `)
        const $modal = $('#pokemodal')
        $modal.html($modalContent)
        $modal.modal()
    } else{
        // map over the objects inside of the pokemonData results array
         //dynamically generate html for each element in the array 
         //add that html to our collection element 
    const htmlArray = pokemonData.results.map((pokemon) => {
        return`
        <article data-url="${pokemon.url}" class="card flex-ctr">
            <h3>${pokemon.name}</h3>
        </article>`;
    } )
    $collection.html(htmlArray)
    }
}