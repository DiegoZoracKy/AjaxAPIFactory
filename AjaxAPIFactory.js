/**
 * AjaxAPIFactory
 *
 * Gets an object with a desired API structure and, based on it, creates a well defined interface to handle "$.ajax" calls.
 *
 * Depends on jQuery
 *
 * Check: https://github.com/DiegoZoracKy/AjaxAPIFactory
 *
 * Author: Diego ZoracKy | @DiegoZoracKy | http://diegozoracky.com
 */

 var AjaxAPIFactory = (function() {
    "use strict";

    var go = function(schema, settings){
        if(!schema.route)
            return;

        return $.ajax($.extend(true, {}, {
            type: schema.method,
            url: schema.route,
            data: (schema.data && schema.data.defaults)? schema.data.defaults : {}
        }, settings));
    };

    var createMethod = function(api){
        return function(settings){
           return go(api, settings);
        };
    };

    var makeApi = function(schema, api){
        api = api || {};
        for (var key in schema){
            if(schema[key].apiSchema){
                api[key] = createMethod(schema[key].apiSchema);
                api[key].schema = schema[key].apiSchema;
            }else{
                api[key] = {};
                makeApi(schema[key], api[key]);
            }
        }
        return api;
    };

    return {
        make: function(schema){
            return makeApi(schema);
        }
    };
}());