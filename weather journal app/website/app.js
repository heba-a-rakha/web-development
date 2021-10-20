
/* Global Variables */
/*
*
*/
//my api key from weather open map api
const apiKey = "9a17f83b0b39e888edc94f1c4e6155fe";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth())+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//an async function that uses fetch() to make a GET request to the OpenWeatherMap API.
const getInput = async (url ,zCode , key ,f)=>{
    //fetching data from the api
    let incoming= await fetch(url);
    // changing the incoming stream into  a json form
    incoming = await incoming.json();
    //saving fetched data in an opject to save it to use later
    let data ={
        temp: incoming.main.temp,
        name: incoming.name,
        feeling: f,
        date: newDate
      }
    return  data;
};
/*a function that makes a POST request to add the API data, 
as well as data entered by the user to our endpoint*/
const saveData = async (result)=>{
    await fetch('/savedata' , {
        method : 'POST' ,
        credentials : 'same-origin' ,
        headers: {'Content-Type':'application/json'} ,
        body: JSON.stringify(result)
    })
};
//a function that updates the UI dynamically
const updateUI=async ()=>{
    try{
    //fetching previously saved data from the local endpoint
    let data =await fetch ('/getendpoint');

    // changing the incoming stream into  a json form
         data= await data.json();
    //updating the values of the holding divs to the recieved values
    document.getElementById('date').innerHTML=`DATE: ${data.date}`;
    document.getElementById('temp').innerHTML=`TEMPERATURE: ${data.temp}`;
    document.getElementById('content').innerHTML=`FEELING: ${data.feeling}`;
    document.getElementById('city').innerHTML=`CITY: ${data.name}`;
    }catch(error){
        console.log(error);
    }
};
// Event listener to start the program(boom!)
document.getElementById('generate').addEventListener('click' , ()=>{
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    //making the zipcode input a requirement
    if (!zipCode){
        alert('please enter a zip code');
    }
    /*making the url that is used to fetch the data from the open weather map 
    using user entered data and the base url of the api*/
    let apiURL=`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

    //calling main functions&promises
    getInput(apiURL , zipCode , apiKey , feeling)
    .then(saveData)
    .then(updateUI);

    /*removing the class i used to hide the holder entry div to make it visible
    after data is ready*/
    const result=document.getElementsByClassName('holderentry');
    result[0].classList.remove('holderentry');
});