
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

  return {
    add: add,
    getAll: getAll,
  };
})();

// forEach loop that prints the list
pokemonRepository.getAll().forEach (function(property) {
  if (property.height > 10) {
    document.write(`${property.name} [height: ${property.height}] - Wow, that's big!! <br> `)
  } else if(property.height < .1) {
    document.write(`${property.name} [height: ${property.height}] - That's tiny! <br> `)
  } else {
    document.write(`${property.name} [height: ${property.height}]<br> `)
  }
});

// testing the getAll and add functions
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name:'Jigglypuff', height:1.08, type:['normal', 'fairy'], weaknesses:['steel', 'poison']}));
console.log(pokemonRepository.getAll());
