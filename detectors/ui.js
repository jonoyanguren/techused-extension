(function () {
    window.hasTailwind = function (html, scripts) {
        const tailwindPatterns = [
            // Common utility classes
            'flex', 'items-center', 'space-x-4', 'min-h-screen', 'rounded-xl',
            'text-gray-900', 'bg-primary', 'hover:bg-primary', 'sm:px-6',
            'text-text-secondary',

            // Breakpoints
            'sm:', 'md:', 'lg:', 'xl:', '2xl:',

            // States
            'hover:', 'focus:', 'active:', 'group-hover:', 'group-focus:',
            'dark:', 'motion-safe:', 'motion-reduce:',

            // Pseudo-classes
            'first:', 'last:', 'odd:', 'even:', 'visited:', 'checked:',
            'empty:', 'disabled:', 'focus-within:', 'focus-visible:',

            // Groups
            'group:', 'group-hover:', 'group-focus:', 'group-active:',
            'group-disabled:', 'group-visited:', 'group-checked:',
            'group-empty:', 'group-focus-within:', 'group-focus-visible:'
        ];

        // Check for Tailwind in HTML classes
        const classList = Array.from(document.querySelectorAll('[class]'))
            .flatMap(el => {
                const className = el.className;
                if (typeof className === 'string') {
                    return className.split(/\s+/);
                } else if (typeof className === 'object' && className.baseVal) {
                    return className.baseVal.split(/\s+/);
                }
                return [];
            });

        const hasTailwindClasses = classList.some(cls =>
            tailwindPatterns.some(pattern => cls.startsWith(pattern) || cls === pattern)
        );

        // Check for Tailwind in CSS
        const hasTailwindCSS = Array.from(document.styleSheets).some(sheet => {
            try {
                return sheet.href && (
                    sheet.href.includes('tailwind') ||
                    Array.from(sheet.cssRules).some(rule =>
                        rule.cssText.includes('tailwind') ||
                        rule.cssText.includes('@tailwind')
                    )
                );
            } catch (e) {
                return false;
            }
        });

        return hasTailwindClasses || hasTailwindCSS;
    };

    window.hasBootstrap = function (html, scripts) {
        return html.includes('bootstrap') ||
            scripts.some(script => script.src.includes('bootstrap'));
    };

    window.hasMaterialUI = function (html, scripts) {
        return html.includes('material-ui') ||
            scripts.some(script => script.src.includes('material-ui'));
    };
})(); 