function openUrl(url) {
    window.open(url, '_blank');
}

function toggleSettings() {
    const modal = document.getElementById('myModal')
    modal.style.display === 'block' ? modal.style.display = 'none' : modal.style.display = 'block'
}