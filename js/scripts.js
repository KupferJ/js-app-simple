
// pokemonList wrapped into an IIFE
let pokemonRepository = (function () {
  let pokemonList= [
    {name:'Bulbasaur', height:2.04, type:['grass', 'poison'], weaknesses:['fire', 'psychich', 'flying', 'ice']},
    {name:'Charmander', height:2, type:'fire', weaknesses:['water', 'ground', 'rock']},
    {name:'Lugia', height:17.01, type:['psychic', 'flying'], weaknesses:['ghost', 'dark', 'electric', 'ice', 'rock']},
    {name:'Meowth', height:1.04, type:'normal', weaknesses:'fighting'},
    {name:'Mimikyu', height:.08, type:['ghost', 'fairy'], weaknesses:['ghost', 'steel']}
  ];

  function add(pokemon) {
    // validation to check if the parameter is an object
      if(typeof pokemon === 'object'){
    // validation to check whether all parameters are equal to the expected keys    
      if (Object.keys(pokemon)[0] === 'name' &&
          Object.keys(pokemon)[1] === 'height' &&
          Object.keys(pokemon)[2] === 'type' &&
          Object.keys(pokemon)[3] === 'weaknesses') {
        pokemonList.push(pokemon);
      }
    }
  }    

  function getAll() {
    return pokemonList;
  }

  //created button for each Item of the pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
   // Event Listener function to show details of the pokemon list
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
    button.innerText = pokemon.name;
    button.classList.add('btn-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

//function to display details from the pokemon list in console, called with the event listener
function showDetails(pokemon) {
  console.log(pokemon);
}


// testing the getAll and add functions
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name:'Jigglypuff', height:1.08, type:['normal', 'fairy'], weaknesses:['steel', 'poison']}));
console.log(pokemonRepository.getAll());



pokemonRepository.getAll().forEach (function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});