// $('#pull').on('click', function() {
// 	$('nav ul').slideToggle();
// 	return false;
// });

const menuButton = document.querySelector('#pull')
const menu = document.querySelector('nav ul')
menuButton.addEventListener('click', toggleMenu)

function toggleMenu(){
	menu.classList.toggle('show');
	event.preventDefault();
}


// $('.content-video a').on('click',function(){
// 	$('.content-video a').removeClass('active');
// 	$(this).addClass('active');
// 	var videoToPlay = $(this).attr('href');
// 	$('iframe').attr('src',videoToPlay);
// 	console.log(videoToPlay);
// 	return false;
//  });


const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( 
	videoLink => videoLink.addEventListener('click', selectVideo ))
 
function selectVideo(){
	removeActiveClass('video')
	const videoToPlay = this.getAttribute('href')
	iFrame.setAttribute('src', videoToPlay)
	this.classList.add('active')
	// console.log(videoToPlay)
	event.preventDefault()
}

// function removeActiveClass(){
// 	videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
// }



// $('.nav-sub>li a').on('click tap', function(){
// 	$('.nav-sub ul').slideUp();
// 	$(this).next().slideToggle();
// 	console.log(this);
// 	return false;
// });

const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))
subnavLinksArray[0].nextElementSibling.classList.add('active')

function openAccordion(){
	removeActiveClass('accordion')
	this.nextElementSibling.classList.toggle('active')
	event.preventDefault()
}

function removeActiveClass(locale){
    if (locale === 'accordion') {
        subnavLinksArray.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
    } else if (locale === 'video') {
        videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
    }
}

// $('.image-tn a').on('click tap', function(){
//     var imgsrc = $(this).attr('href');
//     var titleText = $(this).find('img').attr('title');
//     $('figure > img').attr('src', imgsrc);
//     $('figcaption').html(titleText);
//     return false;
// });

const carouselLinks = document.querySelectorAll('.image-tn a')
// const carouselLinksArray = [...carouselLinks]
const carousel = document.querySelector('figure img')

const carouselPara = document.querySelector('figcaption')

carouselLinks.forEach(carouselLink => 
	carouselLink.addEventListener('click', runCarousel))

function runCarousel(){
	const imageHref = this.getAttribute('href')
	carousel.setAttribute('src', imageHref)
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	console.log(titleText)
	event.preventDefault()
}



initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothSCrollSupported()) {
    return;
  }

  var duration = 400;

  var pageUrl = location.hash ?
    stripHash(location.href) :
    location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) {
        a.addEventListener('click', onClick, false);
      });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' &&
      n.hash.length > 0 &&
      stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }

}

function jump(target, options) {
  var
    start = window.pageYOffset,
    opt = {
      duration: options.duration,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad
    },
    distance = typeof target === 'string' ?
    opt.offset + document.querySelector(target).getBoundingClientRect().top :
    target,
    duration = typeof opt.duration === 'function' ?
    opt.duration(distance) :
    opt.duration,
    timeStart, timeElapsed;

  requestAnimationFrame(function(time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
      requestAnimationFrame(loop)
    else
      end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
      opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

}






















