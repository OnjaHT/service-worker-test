// console.log('Service worker', this);

var CACHE_VERSION = '1.0';

/**
 * 
 * 
 * @since 1.0.0
 */
self.addEventListener('install', function(event) {
    
});


/**
 * 
 * 
 * @since 1.0.0
 */
self.addEventListener('activate', function() {
    
});


/**
 * Déclenché lorsque la page veut accéder à une ressource
 * 
 * @since 1.0.0
 */
self.addEventListener('fetch', function(event) {
    console.log('Fetch [' + event.request.url + ']');
    if ( event.request.url == 'https://onjaharitiana.github.io/service-worker-test/app.js' ) {
        console.log('Fetch => App.js');
        return;
    }

    event.respondWith(
        //Retourne l'objet en cache
        caches.match(event.request)
        .then(function(response) {
            
            if ( response !== undefined ) {
                console.log('FETCH > Ressource en cache => ', event.request.url );
                return response;
            }

            //Recupere l'objet depuis son URL
            return fetch(event.request)
            .then(function(response) { //Si pas d'erreur 
                let responseClone = response.clone();

                caches.open(CACHE_VERSION) //On ouvre le cache
                .then(function(cache) {
                    cache.put(event.request, responseClone); //On l'ajoute au cache
                })
                .catch(function() {
                    console.log('FETCH > Error open cache');
                });
            })
            .catch(function() { //Si la resource n'est pas accessible
                console.log('FETCH > Error 404 => ', event.request);
                return Response.error();
            });
        })
    );
});


/**
 * Déclenché lorsque le worker reçoit un message
 * 
 * @since 1.0.0
 */
self.addEventListener('message', function(e) {

});

/**
 * 
 * 
 * @since 1.0.0
 */
self.addEventListener('push', function(e) {

});
