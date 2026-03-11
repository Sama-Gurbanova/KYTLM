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

    const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    const header = item.querySelector('.service-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Digər açıq olanları bağla
        serviceItems.forEach(el => {
            el.classList.remove('active');
            el.querySelector('.service-content').style.display = 'none';
            el.querySelector('.service-toggle').textContent = '+';
        });

        // Seçiləni aç
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.service-content').style.display = 'block';
            item.querySelector('.service-toggle').textContent = '−';
        }
    });
});
});