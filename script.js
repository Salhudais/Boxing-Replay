// ==UserScript==
// @name         YouTube Slow Motion Replay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replays the last 5 seconds in slow motion on Backspace key press
// @author       Salah Alhudais
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace') {
            let player = document.querySelector('.html5-video-player');
            if (player && player.getPlayerState() === 1) { 
                let video = player.getElementsByTagName("video")[0];
                let currentTime = video.currentTime;
                let startTime = Math.max(0, currentTime - 5);

                video.currentTime = startTime;
                video.playbackRate = 0.25;

                setTimeout(function() {
                    video.playbackRate = 1;
                }, (currentTime - startTime + 2) * 1000 / 0.25);
            }
        }
    });
})();
