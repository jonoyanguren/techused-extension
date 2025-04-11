(function () {
    window.hasWebpack = function (html, scripts) {
        return html.includes('webpack') ||
            scripts.some(script => script.src.includes('webpack'));
    };

    window.hasVite = function (html, scripts) {
        return html.includes('vite') ||
            scripts.some(script => script.src.includes('vite'));
    };

    window.hasParcel = function (html, scripts) {
        return html.includes('parcel') ||
            scripts.some(script => script.src.includes('parcel'));
    };
})(); 