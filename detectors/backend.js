(function () {
    window.hasDjango = function (html) {
        return document.querySelector('input[name="csrfmiddlewaretoken"]') ||
            html.includes('django') ||
            html.includes('csrf_token');
    };

    window.hasLaravel = function (html, scripts) {
        return html.includes('laravel') ||
            scripts.some(script => script.src.includes('laravel'));
    };

    window.hasSymfony = function (html, scripts) {
        return html.includes('symfony') ||
            scripts.some(script => script.src.includes('symfony'));
    };

    window.hasExpress = function (html, scripts) {
        return html.includes('express') ||
            scripts.some(script => script.src.includes('express'));
    };
})(); 