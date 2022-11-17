import CONFIG from './config.js';
import {
	smileys,
	gestures_and_body_parts,
	people_and_fantasy,
	clothing_and_accessories,
	pale,
	cream_white,
	brown,
	dark_brown,
	black,
	animals_nature,
	food_drink,
	activity_and_sports,
	travel_places,
	objects,
	symbols,
	unicode_symbols,
	flags
} from './data.js';

let en = CONFIG.en;

const CONTAINER = document.querySelector('#emojis');
const ANCHORS = document.querySelector('#anchors');

const EMOJIS_ARR = [
	smileys,
	gestures_and_body_parts,
	people_and_fantasy,
	clothing_and_accessories,
	pale,
	cream_white,
	brown,
	dark_brown,
	black,
	animals_nature,
	food_drink,
	activity_and_sports,
	travel_places,
	objects,
	symbols,
	unicode_symbols,
	flags
]

renderAnchors(ANCHORS, EMOJIS_ARR);

let emojistr = '';
EMOJIS_ARR.map(item => {
	emojistr += genEmojistr(item);
})

renderEmojistr(CONTAINER, emojistr);


let clipboard = new ClipboardJS('.clip');
clipboard.on('success', function (e) {
	console.info('Text:', e.text);

	Toastify({
		text: '! Copied ' + e.text,
		duration: 1000,
		// gravity: 'bottom',
		position: 'right',
		position: 'center',
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
			"font-family": "Segoe Script",
			"font-size": ".24rem",
		},
	}).showToast();

	e.clearSelection();
});

clipboard.on('error', function (e) {
	console.error('Action:', e.action);
	console.error('Trigger:', e.trigger);
});

function renderAnchors(anchors, emojisArr) {
	let _str = '';

	emojisArr.map(item => {
		_str += `<a href="#${item.id}">${en ? item.title : item.title_zh}</a>`;
	})

	anchors.innerHTML = _str;
}

function renderEmojistr(container, emojistr) {
	container.innerHTML = emojistr;
}

function genEmojistr(emojis) {
	let _emojistr = '';
	let _arr = emojis.value.split(' ');

	_arr.map(item => {
		if (item) _emojistr +=
			`<div data-clipboard-text="${item}" class="clip">${item}</div>`
	})

	return `<div id="${emojis.id}" class="title">${en ? emojis.title : emojis.title_zh}</div>` + _emojistr;
}