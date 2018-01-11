if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register( 
        '/service-worker-test/service-worker.js'/*?v=' + Date.now()*/, 
        { 
            scope: '/service-worker-test/' 
        }
    ).then(function(reg) {
        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }

        if ( serviceWorker.controller ) {
            serviceWorker.controller.postMessage('Hello world from App.js');
        } else {
            console.log('serviceWorker.controller invalide');
        }
    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}