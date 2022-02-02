
// pokemonList wrappet into an IIFE
let pokemonRepository = (function () {
  let pokemonList= [
    {name:'Bulbasaur', height:2.04, type:['grass', 'poison'], weaknesses:['fire', 'psychich', 'flying', 'ice']},
    {name:'Charmander', height:2, type:'fire', weaknesses:['water', 'ground', 'rock']},
    {name:'Lugia', height:17.01, type:['psychic', 'flying'], weaknesses:['ghost', 'dark', 'electric', 'ice', 'rock']},
    {name:'Meowth', height:1.04, type:'normal', weaknesses:'fighting'},
    {name:'Mimikyu', height:.08, type:['ghost', 'fairy'], weaknesses:['ghost', 'steel']}
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
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

// testing the getAll and add functions (because it is declared below, the added 'jigglypuff' is updated in the console, but not the document)
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name:'Jigglypuff', height:1.08, type:['normal', 'fairy'], weaknesses:['steel', 'poison']}));
console.log(pokemonRepository.getAll());
