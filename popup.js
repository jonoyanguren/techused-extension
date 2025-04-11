function updateDetection() {
    const resultElement = document.getElementById('result');
    const statusElement = document.getElementById('status');
    const refreshButton = document.getElementById('refresh');
    const techList = document.getElementById('techList');

    // Reset UI state
    resultElement.textContent = 'Detecting...';
    resultElement.className = 'detecting';
    refreshButton.classList.add('rotating');
    statusElement.textContent = 'Scanning page...';
    techList.innerHTML = '';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs[0]) {
            resultElement.textContent = 'Error: No active tab';
            resultElement.className = 'error';
            statusElement.textContent = 'Error: No tab found';
            refreshButton.classList.remove('rotating');
            return;
        }

        statusElement.textContent = 'Analyzing content...';

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                if (typeof window.detectTechUsed === 'function') {
                    return window.detectTechUsed();
                }
                return [];
            }
        }, (results) => {
            if (chrome.runtime.lastError) {
                resultElement.textContent = 'Error: ' + chrome.runtime.lastError.message;
                resultElement.className = 'error';
                statusElement.textContent = 'Error: ' + chrome.runtime.lastError.message;
                refreshButton.classList.remove('rotating');
                return;
            }

            const techs = results && results[0] ? results[0].result : [];

            if (techs.length > 0) {
                resultElement.textContent = `${techs.length} technologies detected`;
                resultElement.className = 'detected';

                // Clear previous content
                techList.innerHTML = '';

                // Add each technology to the list
                techs.forEach(tech => {
                    const techItem = document.createElement('div');
                    techItem.className = 'tech-item';

                    const logo = document.createElement('img');
                    logo.src = tech.logo;
                    logo.alt = `${tech.name} logo`;
                    logo.className = 'tech-logo';

                    const link = document.createElement('a');
                    link.href = tech.url;
                    link.target = '_blank';
                    link.className = 'tech-link';
                    link.textContent = tech.name;

                    techItem.appendChild(logo);
                    techItem.appendChild(link);
                    techList.appendChild(techItem);
                });
            } else {
                resultElement.textContent = 'No technologies detected';
                resultElement.className = 'detected';
                techList.innerHTML = '<p>No technologies detected</p>';
            }

            statusElement.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
            refreshButton.classList.remove('rotating');
        });
    });
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Initial detection
    updateDetection();

    // Add refresh button handler
    const refreshButton = document.getElementById('refresh');
    if (refreshButton) {
        refreshButton.addEventListener('click', function (e) {
            e.preventDefault();
            updateDetection();
        });
    }
});
