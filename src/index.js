import * as Header from '/src/header.js';
import * as Main from '/src/main.js';


const body = document.querySelector(".body");
body.appendChild(Header.div);
body.appendChild(Main.div);



if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("Service Worker Work ")
    }).catch(error => console.log("error : " + error))


    // let deferredPrompt; // Allows to show the install prompt
    // const installButton = document.getElementById("install_button");

    // window.addEventListener("beforeinstallprompt", e => {
    // console.log("beforeinstallprompt fired");
    // // Prevent Chrome 76 and earlier from automatically showing a prompt
    // e.preventDefault();
    // // Stash the event so it can be triggered later.
    // deferredPrompt = e;
    // // Show the install button
    // installButton.hidden = false;
    // installButton.addEventListener("click", installApp);
    // });

    // window.addEventListener("appinstalled", evt => {
    //     console.log("appinstalled fired", evt);
    //   });
}
   

// function installApp() {
//     // Show the prompt
//     deferredPrompt.prompt();
//     installButton.disabled = true;
  
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then(choiceResult => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("PWA setup accepted");
//         installButton.hidden = true;
//       } else {
//         console.log("PWA setup rejected");
//       }
//       installButton.disabled = false;
//       deferredPrompt = null;
//     });
//   }