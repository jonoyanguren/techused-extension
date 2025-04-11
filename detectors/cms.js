(function () {
    window.hasWordPress = function (html) {
        return html.includes('wp-content') ||
            html.includes('wp-admin');
    };

    window.hasPrestaShop = function (html) {
        return html.toLowerCase().includes('prestashop');
    };

    window.hasShopify = function (html, scripts) {
        return html.includes('shopify') ||
            scripts.some(script => script.src.includes('shopify'));
    };

    window.hasMagento = function (html, scripts) {
        return html.includes('magento') ||
            scripts.some(script => script.src.includes('magento'));
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