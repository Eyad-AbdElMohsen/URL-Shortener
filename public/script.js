document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('urlForm');
    const table = document.getElementById('urlTable');
    const urlInput = document.getElementById('urlInput');
    const aliasInput = document.getElementById('aliasInput');

    // Fetch existing URLs when the page loads
    await fetchExistingUrls();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = urlInput.value;
        const alias = aliasInput.value;
        try {
            const response = await fetch('/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl: url, alias: alias })
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            appendRow(data.originalUrl, data.shortUrl);
        } catch (error) {
            console.log(error.message);
            alert('Failed to shorten URL');
        }
    });

    async function fetchExistingUrls() {
        try {
            const response = await fetch('/urls');
            if (!response.ok) {
                throw new Error('Failed to fetch existing URLs');
            }
            const data = await response.json();
            data.forEach(({ originalUrl, shortUrl }) => appendRow(originalUrl, shortUrl));
        } catch (error) {
            console.log(error.message);
            alert('Failed to fetch existing URLs');
        }
    }

    function appendRow(originalUrl, shortenedUrl) {
        const row = table.insertRow(-1);
        const originalUrlCell = row.insertCell(0);
        const shortenedUrlCell = row.insertCell(1);

        originalUrlCell.innerHTML = `<a href="${originalUrl}">${originalUrl}</a>`;
        shortenedUrlCell.innerHTML = `<a href="${shortenedUrl}">${shortenedUrl}</a>`;
    }
});
