const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const APIKEY = '57720182d2d648eb944328be5f50ae34'
const jokeAPI =  'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

//disable/enable the button
function disableButton(){
    button.disabled = !button.disabled;
}


// joke will be contructed when it has two parts
function constructJoke (data){
    // return data.setup+data.delivery;
    if (data.error === false) {
        if (data.setup) {
            return `${data.setup}... ${data.delivery}` ;
        }else{
            return data.joke;
        }        
    }
}


function textToSpeech(joke){
    VoiceRSS.speech({
        key: APIKEY,
        src: joke,
        hl: 'en-in',
        v: 'Eka',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


async function tellMeAJoke(){
    let response;
    let data;
    let joke ;
    try {
        //the button will be disabled , when the joke is being told.
        disableButton(); 
        response = await fetch(jokeAPI);
        data = await response.json();
        //console.log(data);
        joke = constructJoke(data);
        // console.log(joke);
        //pass the joke 
        textToSpeech(joke);
                   
        } catch (error) {
        console.log(error); 
    }   
    
}

//add event listener
//button event listener
button.addEventListener('click',tellMeAJoke);
audioElement.addEventListener('ended',disableButton);




























// 
// const APIURL = 

// fetch(`https://voicerss-text-to-speech.p.rapidapi.com/?key=${APIKEY}&hl=en-us&src=Hello%2C%20world!&f=8khz_8bit_mono&c=mp3&r=0`, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
// 		"x-rapidapi-key": "56728f4a54msh59a420ffda5a2c2p1963bbjsnd35fdd28d0b9"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });