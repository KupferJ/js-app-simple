
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
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-btn');
    listItem.appendChild(button);
    listElement.appendChild(listItem);
    // add event listener
    buttonEventListener(button,pokemon);
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
      showModal(pokemon.name, 'Height: ' + pokemon.height, pokemon.imageUrl);
    });
  }

  // function to show modal with pokemon details
  function showModal(title, text, img_src) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    //add content to modal
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = '[X]';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let textElement = document.createElement('p');
    textElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.classList.add('poke-img');
    imageElement.src = img_src;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(textElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    // make modal visible
    modalContainer.classList.add('is-visible');

    //close modal with close button
    closeButtonElement.addEventListener('click', hideModal);

    //close modal by clicking outside area
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      }
    });
  }

  // function to hide modal
  function hideModal(){
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //close modal with Esacpe key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  return {
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});