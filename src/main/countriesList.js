export let List = axios.get('https://restcountries.eu/rest/v2/all')
.then(function (response) {
    return response.data
})
.catch(function (error) {
console.log(error);
})