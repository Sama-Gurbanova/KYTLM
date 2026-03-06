document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('govCheckBtn');
    const panel = document.getElementById('govInfoPanel');
    
    if(btn && panel) {
        btn.addEventListener('click', function() {
            const arrow = this.querySelector('.arrow-icon');
            panel.classList.toggle('active');
            arrow.textContent = panel.classList.contains('active') ? '▴' : '▾';
        });
    }
});