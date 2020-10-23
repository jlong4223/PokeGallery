//IPO Input -> Process -> Output


// Constants & state Variables (data)


//Constant Data
const Base_URL = 'https://pokeapi.co/api/v2/pokemon/'


//State Date
let pokemonData; 


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

function getData() {
    //fetch data using AJAX
    $.ajax(Base_URL).then(function(data){
        //take the returned data and assigned it to global state variable
         pokemonData = data;
         //call render to visualize it to the DOM
         render();
    }, function(error) {
        console.log('Error: ', error)
    })
}


function handleClick() {
    alert('a card was clicked')
}

function render() {
    // map over the objects inside of the pokemonData results array
    //dynamically generate html for each element in the array 
    //add that html to our collection element 
    const htmlArray = pokemonData.results.map((pokemon) => {
        return`
        <article class="card flex-ctr">
            <h3>${pokemon.name}</h3>
        </article>`;
    } )
    $collection.html(htmlArray)
}