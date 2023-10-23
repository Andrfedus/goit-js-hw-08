
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe, {
  loop: true,
  fullscreen: true,
  quality: '1080p',
});

const TIME_KEYS = "videoplayer-current-time";

const getPlayTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem(TIME_KEYS, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(getPlayTime,1000));



player.setCurrentTime(JSON.parse(localStorage.getItem(TIME_KEYS)) || 0);
