(function () {
  const header = document.getElementById('site-header');
  let root = document.documentElement;

  if(header) {

    document.addEventListener("resize", () => {
      root.style.setProperty('--site-header-height', header.offsetHeight + "px");
    });
  }

})();
(function () {
  var gallery = document.getElementById('l-work-gallery');

  if(gallery) {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
  });
  }

})();
(function () {
  var intro = document.getElementById('work-content-intro');
  var more = document.getElementById('work-content-more');
  var btn = document.getElementById('work-btn-more');

  if(btn) {

    gsap.set(more, { autoAlpha: 0, display:"none"});

    btn.addEventListener("click", () => {

      const tl = gsap.timeline()
      .to([intro, btn], { autoAlpha: 0, display:"none",  duration:0.5})
      .to(more, { autoAlpha: 1, delay:0.2, display:"block", duration:0.5});

      tl.play();

    });
  }

})();
(function () {

	// Does the browser actually support the video element?
	var supportsVideo = !!document.createElement('video').canPlayType;
  var video = document.getElementById('video-full');

	if (supportsVideo && video) {
		// Obtain handles to main elements
		var videoContainer = document.getElementById('videoContainer');
		var videoControls = document.getElementById('video-controls');

		// Hide the default controls
		video.controls = false;

		// Display the user defined video controls
		videoControls.setAttribute('data-state', 'visible');

		// Obtain handles to buttons and other elements
		var playpause = document.getElementById('playpause');
		var mute = document.getElementById('mute');


    playpause.setAttribute('data-state', 'play');
    mute.setAttribute('data-state', 'unmute');


		// Check the volume
		var checkVolume = function(dir) {
			if (dir) {
				var currentVolume = Math.floor(video.volume * 10) / 10;
				if (dir === '+') {
					if (currentVolume < 1) video.volume += 0.1;
				}
				else if (dir === '-') {
					if (currentVolume > 0) video.volume -= 0.1;
				}
				// If the volume has been turned off, also set it as muted
				// Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
				if (currentVolume <= 0) video.muted = true;
				else video.muted = false;
			}
			changeButtonState('mute');
		}

		// Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
		if (document.addEventListener) {
			// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video

			// Changes the button state of certain button's so the correct visuals can be displayed with CSS
			var changeButtonState = function(type) {
				// Play/Pause button
				if (type == 'playpause') {
					if (video.paused || video.ended) {
						playpause.setAttribute('data-state', 'play');
					}
					else {
						playpause.setAttribute('data-state', 'pause');
					}
				}
				// Mute button
				else if (type == 'mute') {
					mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
				}
			}

			// Add event listeners for video specific events
			video.addEventListener('play', function() {
        console.log('Play');
				changeButtonState('playpause');
			}, false);
			video.addEventListener('pause', function() {
				changeButtonState('playpause');
			}, false);
			video.addEventListener('volumechange', function() {
				checkVolume();
			}, false);

			// Add events for all buttons
			playpause.addEventListener('click', function(e) {
				if (video.paused || video.ended) video.play();
				else video.pause();
			});

			mute.addEventListener('click', function(e) {
				video.muted = !video.muted;
				changeButtonState('mute');
			});
		}
	 }

 })();
