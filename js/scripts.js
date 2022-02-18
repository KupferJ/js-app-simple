
let pokemonRepository = (function() {
  // Creatie an array for the pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // add pokemon to  pokemonList
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }


  // function to load list of pokemon from API-url
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      hideLoadingMessage();
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item) {
        let pokemon  = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  // load details of the pokemon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      hideLoadingMessage();
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;

      //loop to get the pokemon type
      item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  // animated loading spinner
  function showLoadingMessage() {
    let loading = document.querySelector('#loading-spinner');
    loading.classList.add('visibility');
  }

  // function to hide the spinner when content is done loading
  function hideLoadingMessage() {
    let loading = document.querySelector('#loading-spinner');
    loading.classList.remove('visibility');
  }

  // creates button
  function addListItem(pokemon) {
    let listElement = document.querySelector('.pokemon-list');
    let listButton = document.createElement('button');
    listButton.innerText = pokemon.name;
    listButton.classList.add('text-center', 'text-uppercase', 'btn', 'btn-outline-secondary', 'btn-pk', 'search-pkm-btn');

    listButton.setAttribute('data-toggle', 'modal');
    listButton.setAttribute('data-target', '#poke-Modal');

    listElement.appendChild(listButton);

    // add event listener
    buttonEventListener(listButton,pokemon);
  }

  // event listener to show detaily
  function buttonEventListener(button,pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  // function to load detaily from API and display them
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // function to show modal with pokemon details
  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // clears existing content from the modal
    modalTitle.empty();
    modalBody.empty();

    // creates the elements for the modal
    let titleElement = $('<h1 class="text-uppercase">' + pokemon.name + '</h1>');
    modalTitle.append(titleElement);

    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let pokeTypes = pokemon.types;
    let typesElement = $('<p>' + 'Type: ' + pokeTypes.join(', ') + '</p>');

    // appends elements to modalBody
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    }

  //adding a jQuery function to search for the individual pokemon via their name
  $(document).ready(function(){
    $("#pokemon-search").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $(".search-pkm-btn").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});