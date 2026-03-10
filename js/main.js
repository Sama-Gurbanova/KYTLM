document.addEventListener('DOMContentLoaded', function() {
    
    // Dropdown Menyu İdarəetməsi
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownParent = document.querySelector('.dropdown');

    if(dropdownTrigger) {
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownParent.classList.toggle('open');
            
            const arrow = this.querySelector('.arrow-icon');
            if(arrow) {
                arrow.textContent = dropdownParent.classList.contains('open') ? '▴' : '▾';
            }
        });
    }

    // Kənara kliklədikdə bağlamaq
    window.addEventListener('click', function(e) {
        if (dropdownParent && !dropdownParent.contains(e.target)) {
            dropdownParent.classList.remove('open');
            const arrow = dropdownTrigger.querySelector('.arrow-icon');
            if(arrow) arrow.textContent = '▾';
        }
    });
});