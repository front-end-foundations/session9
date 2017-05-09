# Foundations Session 9

## Homework
Continue on your final projects.

![image](siteDesign.png)

## Tooling

petershift:

```
Windows users for browser sync you must `\"` the package.json file so

"scripts": {
   "start": "browser-sync start --browser \"chrome\" --server \"app\" --files \"app\"",
   "startUp": "browser-sync start --browser \"chrome\" --server \"definition-list\" --files \"definition-list\""
 },

notice also 'google chrome' becomes 'chrome' on windows
```

```
$ cd <session9>
$ npm install
```

`$ npm run boom!`


Review: 

1) Video Switcher - JavaScript with Active class

```
const iFrame = document.querySelector('iframe')
const videoLinks = document.querySelectorAll('.content-video a')
const videoLinksArray = [...videoLinks]
videoLinksArray.forEach( videoLink => videoLink.addEventListener('click', selectVideo ))

function selectVideo(){
	removeActiveClass()
	this.classList.add('active')
	const videoToPlay = this.getAttribute('href')
	iFrame.setAttribute('src', videoToPlay)
	event.preventDefault()
}

function removeActiveClass(){
	videoLinksArray.forEach( videoLink => videoLink.classList.remove('active'))
}
```

2) JavaScript and css for nav-sub 

```css
.nav-sub {
    padding: 10px 20px;
    background-color: $lt-yellow;
    border: 1px solid $dk-yellow;
    @media (min-width: $break-med){
        width: 40%;
        float: right;
        border-radius: $radius;
        margin: 0;
        float: none;
        width: auto;
    }
    ul {
        display:none;
    }
    li:first-child ul {
        display:block;
    }
    > li > a { 
        font-weight:bold; 
    }
    ul li {
        padding-left:12px;
    }
    .active {display: block !important}
}
```

Note the `>` [selector](https://www.w3schools.com/cssref/css_selectors.asp). Also see [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Simple_selectors)

[DOM Traversal](https://www.w3schools.com/jsref/dom_obj_document.asp)
nextElementSibling, nextSibling, previousSibling, childNodes, firstChild, etc.

```
const subnavLinks = document.querySelectorAll('.nav-sub > li > a')
const subnavLinksArray = [...subnavLinks]
subnavLinksArray.forEach( subnavLink => subnavLink.addEventListener('click', openAccordion))
subnavLinksArray[0].nextElementSibling.classList.add('active')

function openAccordion(){
	removeActiveClass()
	this.nextElementSibling.classList.toggle('active')
	event.preventDefault()
}

function removeActiveClass(){
	subnavLinksArray.forEach( subnavLink => subnavLink.nextElementSibling.classList.remove('active'))
}
```

Note the lack of animation.

===== END REVIEW =====


### Image Carousel 

Do a DOM review of this section of the page.

In _carousel.scss:

```css
.secondary aside {
	ul {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;
		li {
			margin: 6px;
		}
		li img {
			width: 80px;
			padding: 10px;
			background-color: #fff;
			border: 1px solid $lt-yellow;
			transition: all 0.2s linear;
			&:hover {
				transform: scale(1.1);
				box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
			}
		}
	}
}
```

Note transition:

```css
li img {
	...
	transition: all 0.2s linear;
	&:hover {
		transform: scale(1.1);
		box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
	}
```

Content Slider - examine image

```css
figure {
	position: relative;
	figcaption {
		padding: 6px;
		background: rgba(255,255,255,0.7);
		position: absolute;
		bottom: 0;
	}
}	
```

### Image Carousel - JavaScript

change the # links to point to high res images:

```
<ul class="image-tn">
  <li>
    <a href="img/bamboo.jpg"><img src="img/bamboo-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
  <li>
    <a href="img/bridge.jpg"><img src="img/bridge-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
  <li>
    <a href="img/pagoda.jpg"><img src="img/pagoda-tn.jpg" alt="" title="Link to original photo on Flickr" /></a>
  </li>
```

Old school JavaScript:

```js
$('.image-tn a').on('click tap', function(){
    var imgsrc = $(this).attr('href');
    var titleText = $(this).find('img').attr('title');
    $('figure > img').attr('src', imgsrc);
    $('figcaption').html(titleText);
    return false;
});
```

```
const carouselLinks = document.querySelectorAll('.image-tn a')
const carouselLinksArray = [...carouselLinks]
const carousel = document.querySelector('figure img')

carouselLinksArray.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

function runCarousel(){
	const imageHref = this.getAttribute('href')
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```

Set the text in the carousel.

Find the appropriate traversal `const titleText = this.firstChild.title`:

```
function runCarousel(){
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	console.log(titleText)
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```

Create a pointer to the figcaption in order to manipulate its content:

```
const carouselPara = document.querySelector('figcaption')
```

Set the innerHTML `carouselPara.innerHTML = titleText` of the paragraph:

```
function runCarousel(){
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	console.log(carouselPara)
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```

Final script:

```
const carouselLinks = document.querySelectorAll('.image-tn a')
const carouselLinksArray = [...carouselLinks]
const carousel = document.querySelector('figure > img')
const carouselPara = document.querySelector('figcaption')
carouselLinksArray.forEach( carouselLink => carouselLink.addEventListener('click', runCarousel ))

function runCarousel(){
	const imageHref = this.getAttribute('href')
	const titleText = this.firstChild.title
	carouselPara.innerHTML = titleText
	carousel.setAttribute('src', imageHref)
	event.preventDefault()
}
```



### The Panels (the third and final section)

Review the design. Let's try floats and absolute/relative positioning.

In _panels.scss:

```css
.hentry {
  position: relative;
  float: left;
  width: 50%;
}
```

The little date area

```css
.hentry {
	position: relative;
	float: left;
	box-sizing: border-box;
	width: 50%;
	padding: 1rem;
	.published {
		position: absolute;
		top: 250px;
		left: 1rem;
		display: block;
		width: 30px;
		padding: 5px 10px;
		background-color: $link;
		font-size: 10px;
		text-align: center;
		text-transform: uppercase;
		color: #fff;
	}
	.day {
		font-size: 32px;
	}
	h4 {
		margin: 0 0 10px 60px;
		font-size: 20px;
	}
	p {
		margin-left: 60px;
	}
}
```

Parent container .hentries is used here.

Adding abbr formatting, removing positioning and using flexbox and floats.

```css
.hentries {
	display: flex;
	abbr {
		text-decoration: none;
		text-align: center;
	}
	.hentry {
		float: left;
		box-sizing: border-box;
		width: 50%;
		padding: 1rem;
		.published {
			float: left;
			width: 24%;
			box-sizing: border-box;
		// position: absolute;
		// top: 250px;
		// left: 1rem;
		display: block;
		// width: 50px;
		padding: 5px 10px;
		background-color: $link;
		font-size: 10px;
		text-align: center;
		text-transform: uppercase;
		color: #fff;
	}
	.day {
		font-size: 32px;
	}
	h4 {
		// margin: 0 0 10px 60px;
		font-size: 20px;
	}
	p {
		// margin-left: 60px;
		margin-top: 0;
		float: right;
		width: 70%;
		box-sizing: border-box;
	}
}
}
```

Final _panels.scss:

```
.hentries {
	display: flex;
	abbr {
		text-decoration: none;
	}
	.hentry {
		float: left;
		box-sizing: border-box;
		width: 50%;
		padding: 0 8px;
		.published {
			text-align: center;
			float: left;
			width: 24%;
			box-sizing: border-box;
			display: block;
			padding: 2px 6px;
			background-color: $link;
			font-size: 10px;
			text-align: center;
			text-transform: uppercase;
			color: #fff;
		}
		.day {
			font-size: 32px;
		}
		h4 {
			font-size: 20px;
		}
		p {
			margin-top: 0;
			float: right;
			width: 70%;
			box-sizing: border-box;
		}
	}
}
```

Note RSS feed attribute selectors

```css
a[rel="alternate"] {
	padding-left: 20px;
	background: url(../img/a-rss.png) no-repeat 0 50%;
}
```

with svg:

```css
a[rel="alternate"] {
	padding-left: 20px;
	background: url(../img/feed-icon.svg) no-repeat 0 50%;
    background-size: contain;
}
```



## Notes

### Sticky Nav

### Links

`<li><a href="#two">Summary</a></li>`

`<div class="secondary" id="two">`

```
html {
  scroll-behavior: smooth;
}
```

https://www.sitepoint.com/smooth-scrolling-vanilla-javascript/

```
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






```



Additional Tweaks for Mobile (need to test on phone)

the tap event in JS

```js
$('.image-tn a').on('click tap', function(){
    var imgsrc = $(this).attr('href');
    var titleText = $(this).find('img').attr('title');
    $('.content-slider > img').attr('src',imgsrc);
    $('.caption').html(titleText);
    return false;
});
```

the z-index for images and navbar

```css
nav {
	height: 40px;
	width:100%;
	background: $link;
	font-size: 1rem;
	position: fixed;
	z-index: 20;
	top: 0;
```

media queries for transform effects (on hover)

```css
.secondary .content-sub {
	li {
		float: left;
		width: 33.333%;
		padding: 10px;
	}

	li img {
		padding: 10px;
		background-color: #fff;
		border: 1px solid #bfbfbf;
		border-bottom-color: #7c7c7a;
		width: 100%;
		height: auto;
		@media (min-width: $breakpoint-med){
			transition: all 0.2s linear;
			&:hover {
				-webkit-transform: scale(1.1);
				transform: scale(1.1);
				box-shadow: 1px 1px 4px rgba(0,0,0,0.4);
			}
		}
	}
}
```














