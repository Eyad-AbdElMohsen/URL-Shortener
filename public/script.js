document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    const table = document.getElementById('urlTable');
    const urlInput = document.getElementById('urlInput');
    const aliasInput = document.getElementById('aliasInput');

    form.addEventListener('submit',  async(e) => {
        e.preventDefault();
        const url = urlInput.value;
        const alias = aliasInput.value;
        try {
            const response = await  fetch('/shorten', { 
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

    function appendRow(originalUrl, shortenedUrl) {
        const row = table.insertRow(-1);
        const originalUrlCell = row.insertCell(0);
        const shortenedUrlCell = row.insertCell(1);

        originalUrlCell.innerHTML = `<a href="${originalUrl}">${originalUrl}</a>`;
        shortenedUrlCell.innerHTML = `<a href="${shortenedUrl}">${shortenedUrl}</a>`;
    }
});