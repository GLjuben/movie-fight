const fetchData = async function(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/",{
        params: {
            apikey: "87b3cfc",
            s: searchTerm
        }
    });
    return response.data.Search;
}

const searchInput = document.querySelector('input')


const onInput = async (event) => {
   const movies =  await fetchData(event.target.value)
   for(let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}"/>
        <h2>${movie.Title}</h2>
        `
        document.querySelector('#target').appendChild(div)
   }
}

searchInput.addEventListener('input', debounce(onInput,750))
