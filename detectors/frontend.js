(function () {
    window.hasVite = function (html, scripts) {
        // Check for Vite in scripts
        const hasViteScript = scripts.some(script => {
            const isVite = script.type === 'module' ||
                script.crossOrigin !== null ||
                /\/assets\/.*\-[a-zA-Z0-9]{6,}\.js$/.test(script.src) ||
                script.src.includes('vite');
            return isVite;
        });

        // Check for Vite in HTML
        const hasViteInHTML = html.includes('import.meta.env') ||
            html.includes('vite/client') ||
            html.includes('/assets/') && html.includes('.css') ||
            html.includes('vite');

        return hasViteScript || hasViteInHTML;
    };

    window.hasReact = function (html, scripts) {
        // Check for React in window object
        const hasReactGlobal = !!window.React || !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

        // Check for React in scripts
        const hasReactScript = scripts.some(script => {
            const isReact = script.src.includes('react') ||
                script.src.includes('react-dom') ||
                script.src.includes('React');
            return isReact;
        });

        // Check for React in HTML
        const hasReactInHTML = html.includes('__react') ||
            html.includes('react-root') ||
            html.includes('data-reactroot') ||
            html.includes('React.createElement') ||
            html.includes('ReactDOM.render');

        // Check for React root element
        const rootElement = document.getElementById('root') ||
            document.getElementById('app') ||
            document.querySelector('[data-reactroot]');

        return hasReactGlobal || hasReactScript || hasReactInHTML || !!rootElement;
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