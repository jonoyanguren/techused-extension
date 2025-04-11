const TECH_INFO = {
    // Frontend frameworks
    'React': { logo: 'https://reactjs.org/favicon.ico', url: 'https://reactjs.org' },
    'Redux': { logo: 'https://redux.js.org/img/favicon/favicon.ico', url: 'https://redux.js.org' },
    'React Router': { logo: 'https://reactrouter.com/favicon.ico', url: 'https://reactrouter.com' },
    'Styled Components': { logo: 'https://styled-components.com/favicon.png', url: 'https://styled-components.com' },
    'Vue.js': { logo: 'https://vuejs.org/images/icons/favicon-32x32.png', url: 'https://vuejs.org' },
    'Vuex': { logo: 'https://vuex.vuejs.org/logo.png', url: 'https://vuex.vuejs.org' },
    'Angular': { logo: 'https://angular.io/assets/images/favicons/favicon.ico', url: 'https://angular.io' },
    'Svelte': { logo: 'https://svelte.dev/favicon.png', url: 'https://svelte.dev' },

    // Build tools
    'Webpack': { logo: 'https://webpack.js.org/assets/favicon.ico', url: 'https://webpack.js.org' },
    'Vite': { logo: 'https://vitejs.dev/logo.svg', url: 'https://vitejs.dev' },
    'Parcel': { logo: 'https://parceljs.org/favicon.ico', url: 'https://parceljs.org' },

    // CMS
    'WordPress': { logo: 'https://wordpress.org/favicon.ico', url: 'https://wordpress.org' },
    'PrestaShop': { logo: 'https://www.prestashop.com/favicon.ico', url: 'https://www.prestashop.com' },
    'Shopify': { logo: 'https://www.shopify.com/favicon.ico', url: 'https://www.shopify.com' },
    'Magento': { logo: 'https://magento.com/favicon.ico', url: 'https://magento.com' },
    'Drupal': { logo: 'https://www.drupal.org/favicon.ico', url: 'https://www.drupal.org' },
    'Joomla': { logo: 'https://www.joomla.org/favicon.ico', url: 'https://www.joomla.org' },

    // Backend frameworks
    'Django': { logo: 'https://www.djangoproject.com/favicon.ico', url: 'https://www.djangoproject.com' },
    'Laravel': { logo: 'https://laravel.com/favicon.ico', url: 'https://laravel.com' },
    'Symfony': { logo: 'https://symfony.com/favicon.ico', url: 'https://symfony.com' },
    'Express.js': { logo: 'https://expressjs.com/images/favicon.png', url: 'https://expressjs.com' },

    // UI Libraries
    'Tailwind CSS': { logo: 'https://tailwindcss.com/favicon.ico', url: 'https://tailwindcss.com' },
    'Bootstrap': { logo: 'https://getbootstrap.com/docs/5.3/assets/img/favicons/favicon.ico', url: 'https://getbootstrap.com' },
    'Material-UI': { logo: 'https://mui.com/static/favicon.ico', url: 'https://mui.com' },

    // Analytics & Marketing
    'Google Analytics': { logo: 'https://analytics.google.com/favicon.ico', url: 'https://analytics.google.com' },
    'Facebook Pixel': { logo: 'https://www.facebook.com/favicon.ico', url: 'https://www.facebook.com/business/help/952192354843755' },
    'Hotjar': { logo: 'https://www.hotjar.com/favicon.ico', url: 'https://www.hotjar.com' }
};

window.detectTechUsed = function () {
    const html = document.documentElement.innerHTML;
    const scripts = Array.from(document.scripts);
    const detectedTech = [];

    // Frontend frameworks
    if (window.hasReact(html, scripts)) {
        detectedTech.push('React');
        detectedTech.push(...window.getReactLibraries(html, scripts));
    }
    if (window.hasVue(html, scripts)) {
        detectedTech.push('Vue.js');
        detectedTech.push(...window.getVueLibraries(html, scripts));
    }
    if (window.hasAngular(html, scripts)) {
        detectedTech.push('Angular');
    }
    if (window.hasSvelte(html, scripts)) {
        detectedTech.push('Svelte');
    }

    // Build tools
    if (window.hasWebpack(html, scripts)) {
        detectedTech.push('Webpack');
    }
    if (window.hasVite(html, scripts)) {
        detectedTech.push('Vite');
    }
    if (window.hasParcel(html, scripts)) {
        detectedTech.push('Parcel');
    }

    // CMS
    if (window.hasWordPress(html)) {
        detectedTech.push('WordPress');
    }
    if (window.hasPrestaShop(html, scripts)) {
        detectedTech.push('PrestaShop');
    }
    if (window.hasShopify(html, scripts)) {
        detectedTech.push('Shopify');
    }
    if (window.hasMagento(html, scripts)) {
        detectedTech.push('Magento');
    }
    if (window.hasDrupal(html, scripts)) {
        detectedTech.push('Drupal');
    }
    if (window.hasJoomla(html, scripts)) {
        detectedTech.push('Joomla');
    }

    // Backend frameworks
    if (window.hasDjango(html)) {
        detectedTech.push('Django');
    }
    if (window.hasLaravel(html, scripts)) {
        detectedTech.push('Laravel');
    }
    if (window.hasSymfony(html, scripts)) {
        detectedTech.push('Symfony');
    }
    if (window.hasExpress(html, scripts)) {
        detectedTech.push('Express.js');
    }

    // UI Libraries
    if (window.hasTailwind(html, scripts)) {
        detectedTech.push('Tailwind CSS');
    }
    if (window.hasBootstrap(html, scripts)) {
        detectedTech.push('Bootstrap');
    }
    if (window.hasMaterialUI(html, scripts)) {
        detectedTech.push('Material-UI');
    }

    // Analytics & Marketing
    const hasGoogleAnalytics = scripts.some(script =>
        script.src.includes('google-analytics.com') ||
        script.src.includes('analytics.js') ||
        script.src.includes('gtag.js') ||
        script.src.includes('ga.js')
    );

    if (hasGoogleAnalytics || html.includes('google-analytics.com') || html.includes('analytics.js')) {
        detectedTech.push('Google Analytics');
    }

    if (html.includes('fbq') || scripts.some(script => script.src.includes('fbq'))) {
        detectedTech.push('Facebook Pixel');
    }
    if (html.includes('hotjar') || scripts.some(script => script.src.includes('hotjar'))) {
        detectedTech.push('Hotjar');
    }

    return detectedTech.map(tech => ({
        name: tech,
        logo: TECH_INFO[tech]?.logo || '',
        url: TECH_INFO[tech]?.url || ''
    }));
};

// Initial detection
const detectedTech = window.detectTechUsed();
console.log(`🛠️ TechUsed detected:`, detectedTech);
window.techUsedDetected = detectedTech;
