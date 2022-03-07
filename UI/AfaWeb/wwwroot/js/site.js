﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var xhr = (function () {

    var apiUrl = 'https://localhost:7226/api';

    /**
     * Make request with Get Verb
     * @param {string} url url to send get request
     */
    async function getAsync(url) {
        var response = await sendAsJsonAsync(apiUrl + url);
        return await response;
    }


    async function putAsync(url, data) {

        var putUrl = apiUrl + url;

        return await sendAsJsonAsync(putUrl, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }



    async function sendAsJsonAsync(url, options = {}) {
        var response = await sendAsync(url, options);
        console.log(response.body);
        if (response.body) {
            try {
                return await response.json();
            } catch (error) {
                console.error(error);
                return response;
            }

        }
        return response;
    }

    async function sendAsync(url, options = {}) {
        var response = await fetch(url, options);
        return response;
    }


    return {
        apiUrl,
        getAsync,
        putAsync
    }
})();