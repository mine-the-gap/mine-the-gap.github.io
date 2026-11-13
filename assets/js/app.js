/**
 * The App page (app.html): the video plays by itself, muted and looping, unless the visitor asked their system for
 * less motion; the button pauses and resumes it either way.
 *
 * The video comes in two cuts of one timeline: wide (16:9), and for a phone held upright, the same two images
 * larger, with larger type (6:5). The cut follows the screen's width, as the frame and the poster do in mtg.css
 * (40rem); turning a phone switches the cut where the video was.
 */
(function () {
    var video = document.querySelector('[data-app-video]');
    var button = document.querySelector('[data-app-video-toggle]');
    if (!video || !button) return;
    var narrow = window.matchMedia('(max-width: 40rem)');

    function show(playing) {
        button.setAttribute('data-state', playing ? 'playing' : 'paused');
        button.setAttribute('aria-label', playing ? 'Pause the video' : 'Play the video');
    }

    function play() {
        video.play().catch(function () { show(false); });  // a browser that blocks autoplay leaves the poster
    }

    function pick() {
        var cut = narrow.matches ? 'phone' : 'wide';
        if (video.getAttribute('data-cut') === cut) return;
        var at = video.currentTime;
        var playing = !video.paused;
        video.setAttribute('data-cut', cut);
        video.poster = video.getAttribute('data-poster-' + cut);
        video.src = video.getAttribute('data-src-' + cut);
        if (at > 0) {
            video.addEventListener('loadedmetadata', function () { video.currentTime = at; }, { once: true });
        }
        if (playing) play();
    }

    video.addEventListener('play', function () { show(true); });
    video.addEventListener('pause', function () { show(false); });
    button.addEventListener('click', function () {
        if (video.paused) {
            play();
        } else {
            video.pause();
        }
    });

    pick();
    if (narrow.addEventListener) {
        narrow.addEventListener('change', pick);
    } else if (narrow.addListener) {
        narrow.addListener(pick);  // Safari before 14
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
})();
