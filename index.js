const fetchData = async function(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/",{
        params: {
            apikey: "87b3cfc",
            s: searchTerm
        }
    });
    console.log(response.data);
}

const searchInput = document.querySelector('input')

const debounce = (func,delay = 1000) => {
    let timeoutId;
    return (...args)=> {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        
        timeoutId = setTimeout(()=>{
            func.apply(null,args)
        },delay)
    };
};

const onInput = (event) => {
    fetchData(event.target.value)
}

searchInput.addEventListener('input', debounce(onInput,750))
