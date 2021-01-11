import * as Header from '/src/header.js';
import * as Main from '/src/main.js';


const body = document.querySelector(".body");
body.appendChild(Header.div);
body.appendChild(Main.div);


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
}
