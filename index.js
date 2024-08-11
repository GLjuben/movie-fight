const fetchData = async function(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/",{
        params: {
            apikey: "87b3cfc",
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const autoCompleteRoot = document.querySelector('.autocomplete')
autoCompleteRoot.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input"/>
    <div class="dropdown dp">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    <div id="target"></div>
`;
const searchInput = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async (event) => {
   const movies =  await fetchData(event.target.value)
   resultsWrapper.innerHTML='';
   dropdown.classList.add('is-active');

   for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        option.classList.add('dropdown-item');
        option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
        `
        resultsWrapper.appendChild(option)
   }
};

searchInput.addEventListener('input', debounce(onInput,750));
document.addEventListener('click', (event) => {
    if (!autoCompleteRoot.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
})
