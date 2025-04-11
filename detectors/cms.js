(function () {
    window.hasWordPress = function (html) {
        return html.includes('wp-content') ||
            html.includes('wp-admin');
    };

    window.hasPrestaShop = function (html, scripts) {
        console.log('Checking for PrestaShop...');

        // Check for PrestaShop in HTML
        const hasPrestaShopInHTML = html.includes('prestashop') ||
            html.includes('PrestaShop') ||
            html.includes('ps_') ||
            html.includes('prestashop.js') ||
            html.includes('prestashop.css');

        if (hasPrestaShopInHTML) {
            console.log('Found PrestaShop markers in HTML');
        }

        // Check for PrestaShop in scripts
        const hasPrestaShopScript = scripts.some(script => {
            const src = script.src.toLowerCase();
            const isPrestaShop = src.includes('prestashop') ||
                src.includes('ps_') ||
                src.includes('prestashop.js');

            if (isPrestaShop) {
                console.log('Found PrestaShop script:', script.src);
            }
            return isPrestaShop;
        });

        // Check for PrestaShop in meta tags
        const hasPrestaShopMeta = Array.from(document.getElementsByTagName('meta')).some(meta =>
            meta.content.includes('PrestaShop') ||
            meta.name.includes('prestashop')
        );

        if (hasPrestaShopMeta) {
            console.log('Found PrestaShop meta tags');
        }

        const result = hasPrestaShopInHTML || hasPrestaShopScript || hasPrestaShopMeta;
        console.log('PrestaShop detection result:', result);
        return result;
    };

    window.hasShopify = function (html, scripts) {
        return html.includes('shopify') ||
            scripts.some(script => script.src.includes('shopify'));
    };

    window.hasMagento = function (html, scripts) {
        return html.includes('magento') ||
            scripts.some(script => script.src.includes('magento')) ||
            html.includes('Mage.') ||
            html.includes('Varien.');
    };

    window.hasDrupal = function (html, scripts) {
        return html.includes('drupal') ||
            scripts.some(script => script.src.includes('drupal'));
    };

    window.hasJoomla = function (html, scripts) {
        return html.includes('joomla') ||
            scripts.some(script => script.src.includes('joomla'));
    };
})(); 