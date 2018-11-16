//右侧菜单活动
function rightMenu() {
  'use strict';
  var toggle = document.querySelectorAll(".toggle")[0];
  var nav = document.querySelectorAll("nav")[0];
  var toggle_open_text = 'Menu';
  var toggle_close_text = 'Close';

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');

    if (nav.classList.contains('open')) {
      toggle.innerHTML = toggle_close_text;
    } else {
      toggle.innerHTML = toggle_open_text;
    }
  }, false);
}