var log = console.log;

document.addEventListener('click', (e) => {
	log(event.target)
	if ( e.target.id == 'pull') {
		makeHamburgers()
	}
})

// Functions called elsewhere
var removeActiveClass = function (elements) {
	document.querySelectorAll(elements).forEach( (elem) => {
		elem.classList.remove('active')
	})
}

var addActiveClass = function (element) {
	element.classList.add('active')
}

// --- DOM Scripts ---- //

// Hamburger
var makeHamburgers = function () {
	event.preventDefault();
	var body = document.querySelector('body');
	body.classList.toggle('show-nav');
}


// Video switcher

var videoSwitcher = function () {
	const videoLinks = document.querySelectorAll('.content-video a');
	const iFrame = document.querySelector('iframe')
	
	videoLinks.forEach( (videoLink) => {
		videoLink.addEventListener('click', selectVideo)
	});
	
	function selectVideo() {
		event.preventDefault();
		removeActiveClass('.content-video a');
		addActiveClass(event.target)
		// log(event.target)
		const videoToPlay = event.target.getAttribute('href');
		iFrame.setAttribute('src', videoToPlay);
	}
}


// Accordion
var accordion = function () {
	const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
	// log(subnavLinks)
	subnavLinks[0].nextElementSibling.classList.add('active')
	
	subnavLinks.forEach(subnavLink => subnavLink.addEventListener('click', openAccordion))
	
	function openAccordion() {
		event.preventDefault()
		removeActiveClass('.nav-sub > li > ul');
		addActiveClass(event.target.nextElementSibling)
	}
}

// carousel

const carouselLinks = document.querySelectorAll('.image-tn a')
const carousel = document.querySelector('figure img')
const carouselPara = document.querySelector('figcaption')
// log(carouselPara)
carouselLinks.forEach( function(link) {
	link.addEventListener('click', runCarousel)
})

function runCarousel() {
	event.preventDefault()
	// log(this.getAttribute('href'))
	// log(event.target.parentElement.getAttribute('href'))
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	log(titleText)
	carousel.setAttribute('src', imageHref)
	
}

// ---- Initialization ---- //

// makeHamburgers();
accordion();
videoSwitcher();