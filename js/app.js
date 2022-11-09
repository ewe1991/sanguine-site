( function ()
{

const workSlider = document.querySelector( '.js-swiper--default' );

if(!workSlider) return;

const swiper = new Swiper('.js-swiper--default', {
  // Optional parameters
  loop: true,
  cssMode: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

} )();

( function ()
{
  const header = document.getElementById( 'site-header' );
  let root = document.documentElement;

  if ( header )
  {

    document.addEventListener( "resize", () =>
    {
      root.style.setProperty( '--site-header-height', header.offsetHeight + "px" );
    } );
  }

} )();
( function ()
{
  var gallery = document.getElementById( 'l-work-gallery' );

  if ( gallery )
  {
    const lightbox = GLightbox( {
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    } );
  }

} )();

( function ()
{
  var profiles = document.getElementById( 'js-profiles' );

  if ( profiles )
  {
    const lightbox = GLightbox( {
      touchNavigation: true,
      loop: true,
      width: "75vw",
      autoplayVideos: true,      
      height: "auto"
    } );
  }

} )();

( function ()
{
  var intro = document.getElementById( 'work-content-intro' );
  var more = document.getElementById( 'work-content-more' );
  var btn = document.getElementById( 'work-btn-more' );

  if ( btn )
  {

    gsap.set( more, { autoAlpha: 0, display: "none" } );

    btn.addEventListener( "click", () =>
    {

      const tl = gsap.timeline()
        .to( [ intro, btn ], { autoAlpha: 0, display: "none", duration: 0.5 } )
        .to( more, { autoAlpha: 1, delay: 0.2, display: "block", duration: 0.5 } );

      tl.play();

    } );
  }

} )();
( function ()
{

  // Does the browser actually support the video element?
  var supportsVideo = !!document.createElement( 'video' ).canPlayType;
  var video = document.getElementById( 'video-full' );

  if ( supportsVideo && video )
  {
    // Obtain handles to main elements
    var videoContainer = document.getElementById( 'videoContainer' );
    var videoControls = document.getElementById( 'video-controls' );

    // Hide the default controls
    video.controls = false;

    // Display the user defined video controls
    videoControls.setAttribute( 'data-state', 'visible' );

    // Obtain handles to buttons and other elements
    var playpause = document.getElementById( 'playpause' );
    // var mute = document.getElementById( 'mute' );


    playpause.setAttribute( 'data-state', 'play' );
    // mute.setAttribute( 'data-state', 'unmute' );


    // Check the volume
    var checkVolume = function ( dir )
    {
      if ( dir )
      {
        var currentVolume = Math.floor( video.volume * 10 ) / 10;
        if ( dir === '+' )
        {
          if ( currentVolume < 1 ) video.volume += 0.1;
        }
        else if ( dir === '-' )
        {
          if ( currentVolume > 0 ) video.volume -= 0.1;
        }
        // If the volume has been turned off, also set it as muted
        // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
        if ( currentVolume <= 0 ) video.muted = true;
        else video.muted = false;
      }
      changeButtonState( 'mute' );
    }

    // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
    if ( document.addEventListener )
    {
      // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video

      // Changes the button state of certain button's so the correct visuals can be displayed with CSS
      var changeButtonState = function ( type )
      {
        // Play/Pause button
        if ( type == 'playpause' )
        {
          if ( video.paused || video.ended )
          {
            playpause.setAttribute( 'data-state', 'play' );
          }
          else
          {
            playpause.setAttribute( 'data-state', 'pause' );
          }
        }
        // Mute button
        else if ( type == 'mute' )
        {
          // mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
        }
      }

      // Add event listeners for video specific events
      video.addEventListener( 'play', function ()
      {        
        changeButtonState( 'playpause' );
      }, false );
      video.addEventListener( 'pause', function ()
      {
        changeButtonState( 'playpause' );
      }, false );
      video.addEventListener( 'volumechange', function ()
      {
        checkVolume();
      }, false );

      // Add events for all buttons
      playpause.addEventListener( 'click', function ( e )
      {
        if ( video.paused || video.ended ) video.play();
        else video.pause();
      } );

      // mute.addEventListener( 'click', function ( e )
      // {
      // 	video.muted = !video.muted;
      // 	changeButtonState( 'mute' );
      // } );
    }
  }

} )();

( function ()
{
// Get the disclosure buttons
var disclosures = Array.prototype.slice.call(document.querySelectorAll('[data-disclosure]'));

// Loop through them with Array.forEach()
disclosures.forEach(function (disclosure) {

	// Get the content associated with the button
	var content = document.querySelector('#' + disclosure.getAttribute('aria-controls'));

	// If there's no content, don't show the button
	if (!content) return;

	// Show the button and hide the content
	disclosure.removeAttribute('hidden');
	content.setAttribute('hidden', '');

});

let siteNavTimeline;

function menu() {
    const siteNavBtnOpen = document.getElementById('js-c-btn-menu__open');
    const siteNavBtnClose = document.getElementById('js-c-btn-menu__close');
  
    const siteNav = document.getElementById("js-site-nav");
    const navItems = document.querySelectorAll("#js-site-nav nav a");
    let mql = window.matchMedia('(min-width: 1024px)');
    let open = false;
    

    siteNavTimeline = new gsap.timeline({
      paused: true,
      onComplete: () => {
        open = !open;        
      },
    }),
  
    siteNavTimeline.to(
      siteNav,
      1,
      {
        autoAlpha: 1,
        ease: "power4.out"
      },
      "start"
    )
    .staggerFromTo(
      navItems,
      0.4,
      {
        x: -30,
        autoAlpha: 0
      },
      {
        x: 0,
        autoAlpha: 1,
        delay: 0.35,
        ease: "back.out(1)"
      },
      0.15,
      "start"
    );

    siteNavBtnOpen.addEventListener('click', (event) => {
      siteNavTimeline.play();

      document.body.classList.add('s-menu-open'); 
      siteNavBtnOpen.setAttribute('hidden', '');
      siteNavBtnClose.removeAttribute('hidden');
    });

    siteNavBtnClose.addEventListener('click', (event) => {    
      siteNavTimeline.timeScale(1.25);
      siteNavTimeline.reverse();

      document.body.classList.remove('s-menu-open');        
      siteNavBtnOpen.removeAttribute('hidden');
      siteNavBtnClose.setAttribute('hidden', '');

    });

  mql.addEventListener('change', event => {
    if (event.matches) {
      gsap.set(siteNav, {clearProps: true})
      gsap.set(navItems, {clearProps: true})
    } else {
      gsap.set(navItems, {x: -30, autoAlpha: 0})
    }
  })    
    

}
menu();


// Toggle content on click
document.addEventListener('click', function (event) {

	// Only run on elements that have the [data-disclosure] attribute
	// If the event.target doesn't have the attribute, return ends the callback function
	if (!event.target.hasAttribute('data-disclosure')) return;

	// Get the content to toggle
	// If no matching content is found, end the function with return
	var content = document.querySelector('#' + event.target.getAttribute('aria-controls'));

  
	if (!content || !event.target.classList.contains('c-btn-menu')) return;

	// If the content is visible, hide it
	// Otherwise, show it
	if (event.target.getAttribute('aria-expanded') === 'true') {

      event.target.setAttribute('aria-expanded', false);
      content.setAttribute('hidden', '');
      content.classList.remove('s-active');
	
	} else {

      event.target.setAttribute('aria-expanded', true);
      content.removeAttribute('hidden');
      content.classList.add('s-active');      
  }
    		

});

} )();