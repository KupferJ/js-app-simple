
// pokemonList API link
let pokemonRepository = (function () {
  let pokemonList= [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'


  function add(pokemon) {
    // validation to check if the parameter is an object, has "name" in it
      if (
        typeof pokemon === "object" &&
        "name" in pokemon) {
        pokemonList.push(pokemon);
    } else {
      console.log("error - parameters not fulfilled");
    }
  }

  function getAll() {
    return pokemonList;
  }

  // function to create button for each item on list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(  ) {
      showDetails(pokemon);
    });
  }
  
  // function to load the pokemon list from the API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }  

  // function to load pokemon details from the API
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // executed when user clicks on pokemon
  function showDetails (item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // function to show animation when loading pokemon details
  function showLoadingMessage() {
    let loading = document.querySelector('#loading-spinner');
    loading.classList.add('visibility');
  }

  // function to hide loading animation once loading is complete
  function hideLoadingMessage() {
    let loading = document.querySelector('#loading-spinner');
    loading.classList.remove('visibility');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
