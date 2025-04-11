(function () {
    window.hasReact = function (html, scripts) {
        return !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ||
            document.getElementById('root') !== null ||
            document.getElementById('app') !== null ||
            html.includes('__react') ||
            html.includes('react-dom') ||
            html.includes('React.createElement') ||
            html.includes('data-reactroot') ||
            html.includes('data-reactid') ||
            html.includes('react.development.js') ||
            html.includes('react.production.min.js') ||
            html.includes('_react') ||
            html.includes('react-internal') ||
            html.includes('react-reconciler') ||
            html.includes('react-shared') ||
            html.includes('react-is') ||
            html.includes('react/jsx-runtime') ||
            scripts.some(script => script.src.includes('react')) ||
            scripts.some(script => script.src.includes('react-dom')) ||
            scripts.some(script => script.src.includes('react/jsx-runtime')) ||
            scripts.some(script => script.src.includes('react-is')) ||
            scripts.some(script => script.src.includes('react-shared'));
    };

    window.hasVue = function (html, scripts) {
        return html.includes('__vue') ||
            html.includes('vue.min.js') ||
            scripts.some(script => script.src.includes('vue'));
    };

    window.hasAngular = function (html, scripts) {
        return html.includes('ng-app') ||
            html.includes('ng-controller') ||
            scripts.some(script => script.src.includes('angular'));
    };

    window.hasSvelte = function (html, scripts) {
        return html.includes('svelte') ||
            scripts.some(script => script.src.includes('svelte'));
    };

    window.getReactLibraries = function (html, scripts) {
        const libraries = [];
        if (html.includes('redux') || scripts.some(script => script.src.includes('redux'))) {
            libraries.push('Redux');
        }
        if (html.includes('react-router') || scripts.some(script => script.src.includes('react-router'))) {
            libraries.push('React Router');
        }
        if (html.includes('styled-components') || scripts.some(script => script.src.includes('styled-components'))) {
            libraries.push('Styled Components');
        }
        return libraries;
    };

    window.getVueLibraries = function (html, scripts) {
        const libraries = [];
        if (html.includes('vuex') || scripts.some(script => script.src.includes('vuex'))) {
            libraries.push('Vuex');
        }
        return libraries;
    };
})(); 