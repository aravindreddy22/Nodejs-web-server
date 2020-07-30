console.log('client side java script file is loaded ');

fetch('http://puzzle.mead.io/puzzle').then((respone) => {
    respone.json().then((data) => {
        console.log(data);
    });
});



const weatherForm = document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#message-1');
const messageTwo= document.querySelector('#message-2');

//messageOne.textContent='From JavaScript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location=search.value;
    console.log(location);
    messageOne.textContent='Loading......';
    messageTwo.textContent='';

    //calling from the client side.
    fetch('http://localhost:3000/weather?address='+location).then(forcastData => {
        forcastData.json().then(data => {
            if (data.error) {
                messageOne.textContent=data.error;
                console.log(data.error)
            } else{
                messageOne.textContent=data.location;
                messageTwo.textContent=data.forecast.weather;
                console.log(data)
                console.log(data.location);
                console.log(data.forecast.weather);
            }
        });
    })

});