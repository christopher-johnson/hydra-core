global.Promise = require('es6-promise').Promise;


/**
 * !!! change this to true if you want to keep the created objects !!!
 */
var dontDelete = false;


var
    hydra = require('../'),
    jsonldp = require('jsonld').promises(),
    uriTemplates = require('uri-templates');

var config = {
    base: 'http://localhost:3000',
    user: 'hydracore',
    email: 'hydracore@test.com',
    password: '123456'
};

var ns = {
    Manifest: 'http://iiif.io/api/presentation/2#Manifest'
};

var manifest = {
    '@type': ns.Manifest,
    node: 'edition/0097'
};

Promise.resolve()
    .then(function () {
        return hydra.loadDocument(config.base)
            .then(function (document) {
                var graphs = document.findOperation(ns.Manifest, 'GET').invoke;
                var doc = document.findOperation(ns.Manifest, 'GET');
                var template = uriTemplates(doc.link);
                var uri1 = template.fill({node : manifest.node});
                return graphs(uri1)
                    .then(function (response) {
                        out = response;
                        console.log(out);
                    })
            });
    })
    .then(function () {
            return Promise.resolve();
    })
.catch(function (error) {
    console.error(error.stack);
});