// Init  SpeechSynth API
const synth = window.speechSynthesis;

// DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querrySelector('body');

// Init voices Array
let voices = [];

const getVoices = () => {
	Voices = synth.getVoices();
	
	
	//loop through voices and create an option for each one
	voices.forEach(voice => {
	//create option element
	const option = document.createElement('option');
	//fill option with voice language
	option.textContent = voice.name + '('+ voice.lang +')';
	
	// set needed option attributes
	option.setAttribute('data-lang', voice.lang);
	option.setAttribute('data-name', voice.name);
	voiceSelect.appendChild(option);
		
	});
	
};

getVoices();
 If(synth.onvoiceschanged !== undefined) {
	synth.onvoiceschanged = getVoices;
}



//Speak
const speak = () => {
	
	//check if speaking
	if(synth.speaking) {
		console.error('Already speaking...');
		return;
	}
if(textInput.value !== '') {
	// Add background animation
body.style.background = '#141414 src(wave.gif)';
body.style.backgroundRepeat = 'repeat-X';
body.style.backgroundSize = '100% 100%' ;
 //Get speek text
 const speakText = new SpeechSynthesisUtterance(textInput.value)
;
 // speak end
 speakText.onend = e => {
 console.log('Done speaking...');
 body.style.background = '#141414';
 }
// speak error
speakText.onerror = e => {
console.error('Something went wrong');
}

// Selected voice
 const selectedVoice = voiceSelect.selectedOptions[0]	
 .getAttribute('data-name');
 
 // Loop through voices 
 voices.forEach(voice =>{
	 if(voice.name === selectedVoice) {
		 speakText.voice = voice;
	 }
 });

//Set pitch and rate
speakText.rate = rate.value;
speakText.pitch = pitch.value;

// Speak
synth.speak(speakText);
} 	
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
	e.preventDefault();
	speak();
	textInput.blur();
});

// Rate value change
rate.addEventListener('change' , e => rateValue.textContent =
rate.value)

// Rate value change
rate.addEventListener('change' , e => pitchValue.textContent =
pitch.value)

//Voice select change
voiceSelect.addEventListener('change' , e => speak());

