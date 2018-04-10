const iFrame = document.querySelector('iframe');
const videoLinks = document.querySelectorAll('.content-video a');
const videoLinksArray = [...videoLinks];
videoLinksArray.forEach(videoLink => videoLink.addEventListener('click', selectVideo));

function selectVideo() {
	removeActiveClass();
	this.classList.add('active');
	const videoToPlay = this.getAttribute('href');
	iFrame.setAttribute('src', videoToPlay);
	event.preventDefault();
}

function removeActiveClass() {
	videoLinksArray.forEach(videoLink => videoLink.classList.remove('active'));
}
