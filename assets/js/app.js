/**
 * The App page (app.html): the video plays by itself, muted and looping, unless the visitor asked their system for
 * less motion; the button pauses and resumes it either way.
 */
(function () {
    var video = document.querySelector('[data-app-video]');
    var button = document.querySelector('[data-app-video-toggle]');
    if (!video || !button) return;

    function show(playing) {
        button.setAttribute('data-state', playing ? 'playing' : 'paused');
        button.setAttribute('aria-label', playing ? 'Pause the video' : 'Play the video');
    }

    video.addEventListener('play', function () { show(true); });
    video.addEventListener('pause', function () { show(false); });
    button.addEventListener('click', function () {
        if (video.paused) {
            video.play().catch(function () { show(false); });
        } else {
            video.pause();
        }
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.play().catch(function () { show(false); });  // a browser that blocks autoplay leaves the poster
    }
})();
