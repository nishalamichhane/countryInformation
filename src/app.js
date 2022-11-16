import axios from "axios";
async function findCountry(){
    const BASE_URI = 'https://restcountries.com/'
    const ENDPOINT = 'v2/name/netherlands'
    try{
        const response = await axios.get(BASE_URI + ENDPOINT);
        const {data:countries} = response;
         console.log(countries[0]);
         console.log(countries[0].name);
         console.log(countries[0].population);
        // console.log('test')
        const listOfCountries = document.getElementById('country-list');
        //console.log(listOfCountries);
        listOfCountries.innerHTML = `<li>${countries[0].name} <img src = "${countries[0].flags.png}" alt = "${countries[0].name}" class="flag-class"/> 
is situated in ${countries[0].subregion} . It has a population of ${countries[0].population} .
 <p>The capital city is ${countries[0].capital} and you can pay with ${localCurrency(countries[0].currencies)}</p>  
 <p>They speak language  ${localLanguage(countries[0].languages)}</p> 
</li>
`
    }catch (error){
        console.error(error)
    }
}
findCountry()
const localCurrency = (currencies) => {
    let local = "";
    for (let i = 0; i < currencies.length; i++) {
        if (i>0) {
            local += ' and ' + currencies[i].name + 's.';
        }
        else {
            local= currencies[i].name;
        }
    }
    console.log(local);
    return local;
}
const localLanguage = (languages) => {
    let localLan = "";
    for (let i = 0; i < languages.length; i++) {
        if (i>0) {
            localLan += ' and ' + languages[i].name + 's.';
        }
        else {
            localLan= languages[i].name;
        }
    }
    console.log(localLan);
    return localLan;
}
async function fetchCountries(name) {
    console.log("name is "+name);
    const URI = "https://restcountries.com/";
    //const ENDPOINT = "v2/name/"+name;
    let ENDPOINT ='';
    const countryList = document.getElementById('list-of-countries');
    const errorMessage = document.getElementById("error-message");
    // console.log("testing");
    // console.log(URI + ENDPOINT);
    try {
        if(name === '')
            ENDPOINT =  "v2/all";
                else
                    ENDPOINT = "v2/name/"+name;


        const response = await axios.get(URI + ENDPOINT)
        //console.log(response);
        // const response = await axios.get(URI + ENDPOINT, {params: {id:id || null} });
        const {data: countries} = response;

        console.log(countries);
        //console.log(countries);

        //console.log(countryList);
        countryList.replaceChildren();
        errorMessage.replaceChildren();

        countries.map((country) => {

            countryList.innerHTML += `
            <li>            
            <h3 class = "${country.region}">${country.name}</h3>
            <p>It has a population of ${country.population} people</p>         
            <p>${country.name} is situated in ${country.region} </p>  
            <p>The capital city is ${country.capital} and you can pay with ${localCurrency(country.currencies)}</p> 
            <p>They speak language ${localLanguage(country.languages)}</p> 
            <img src = "${country.flags.png}" alt = "${country.name}"/>
            </li>
            `
        })

}

    catch(err){
        countryList.replaceChildren();
        errorMessage.replaceChildren();
        //console.error(err);


        if ( err.response.status === 404 ){
            errorMessage.innerHTML = "Invalid Country Specified"
        }
    }
}
//Event Listener
const btn = document.getElementById('button');
const countryName = document.getElementById('country-name');
btn.addEventListener('click', () => {
    fetchCountries(countryName.value)
} )