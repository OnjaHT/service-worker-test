if ('serviceWorker' in navigator) {
    //Enregistrement et lancement du service Worker
    navigator.serviceWorker.register( 
        '/service-worker-test/service-worker.js'/*?v=' + Date.now()*/, 
        { 
            scope: '/service-worker-test/' 
        }
    ).then(function(serviceWorkerRegistration) {
        //
        navigator.serviceWorker.addEventListener('message', function(e) {
            console.log('On App.js message: ', e.data);
        });
        
        // if ( serviceWorkerRegistration.active ) {
        //     serviceWorkerRegistration.active.postMessage('Hello world from App.js');
        // }

        subscribeToPush();

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });

    /**
     * Enregistre les service worker au Push
     * 
     * @since 1.0.0
     */
    function subscribeToPush() {
        navigator.serviceWorker.ready
        .then(function(serviceWorkerRegistration) {
            //Retourne la subscription existant si existe
            return serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                console.log('Déjà inscrit, ', subscription);
                if ( subscription ) {
                    return subscription;
                }

                console.log('Pas encore inscrit');
                // Demande d'inscription au Push Server
                return serviceWorkerRegistration.pushManager.subscribe({ 
                    userVisibleOnly: true 
                });
            });
        }).then(function(subscription) {
            console.log('Subscription Push Server', subscription);
            console.log('JSON.stringify(subscription)', JSON.stringify(subscription));

            //sauvegarde de l'inscription dans sur le serveur (serveur du site)
            // fetch(ROOT_URL + '/register-to-notification', {
            //     method: 'post',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     credentials: 'same-origin',
            //     body: JSON.stringify(subscription)
            // })
            // .then(function(response) {
            //     return response.json();
            // }).catch(function (err) {
            //     console.log('Could not register subscription into app server', err);
            // });
        })
        .catch(function(subscriptionErr) {
            // Check for a permission prompt issue
            console.log('Subscription failed ', subscriptionErr);
        });
    }
}