
let pokemonList= [
  {name:'Bulbasaur', height:2.04, type:['grass', 'poison'], weaknesses:['fire', 'psychich', 'flying', 'ice']},
  {name:'Charmander', height:2, type:'fire', weaknesses:['water', 'ground', 'rock']},
  {name:'Lugia', height:17.01, type:['psychic', 'flying'], weaknesses:['ghost', 'dark', 'electric', 'ice', 'rock']},
  {name:'Mew', height:1.04, type:'psychic', weaknesses:['ghost', 'dark', 'bug']},
  {name:'Bellsprout', height:2.04, type:['grass', 'poison'], weaknesses:['fire', 'psychic', 'flying', 'ice']},
  {name:'Meowth', height:1.04, type:'normal', weaknesses:'fighting'},
  {name:'Mimikyu', height:.08, type:['ghost', 'fairy'], weaknesses:['ghost', 'steel']}
]


pokemonList.forEach (function(property) {
  if (property.height > 10) {
    document.write(`${property.name} [height: ${property.height}] - Wow, that's big!! <br> `)
  } else if(property.height < .1) {
    document.write(`${property.name} [height: ${property.height}] - That's tiny! <br> `)
  } else {
    document.write(`${property.name} [height: ${property.height}]<br> `)
  }
});

/*
for(let i=0; i<pokemonList.length; i++){
  // adds messages for cases in which a pokemon is extraordinarily big or small
  if(pokemonList[i].height > 10) {
    document.write(`${pokemonList[i].name} [height: ${pokemonList[i].height}] - Wow, that's big!! <br> `)
  } else if(pokemonList[i].height < .1) {
    document.write(`${pokemonList[i].name} [height: ${pokemonList[i].height}] - That's tiny! <br> `)
  } else {
    document.write(`${pokemonList[i].name} [height: ${pokemonList[i].height}]<br> `)
  }
}*/
