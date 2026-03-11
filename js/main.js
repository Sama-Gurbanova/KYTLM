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

    // Hero Slider Funksionallığı
    const slides = document.querySelectorAll('.hero-slide');
    const prevButton = document.querySelector('.hero .prev');
    const nextButton = document.querySelector('.hero .next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Slider funksiyası
    function showSlide(index) {
        // İndeksin düzgün olmasını təmin et
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Bütün slideları gizlət
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });

        // Aktiv slide-i göstər
        slides[currentSlide].classList.add('active');
    }

    // Növbəti slide
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetAutoSlide();
    }

    // Əvvəlki slide
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetAutoSlide();
    }

    // Avtomatik slider
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 saniyədə bir dəyişir
    }

    // Avtomatik slider-i sıfırla
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Button event listener-ləri
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }

    // İlk slide-i göstər və avtomatik slider-i başlat
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    // Mouse hover olduqda avtomatik slider-i dayandır
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        heroSection.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }

    // Service Items Funksionallığı
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

    // Layihələr Slideri
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectsPrev = document.querySelector('.projects-prev');
    const projectsNext = document.querySelector('.projects-next');
    let currentProject = 0;

    function showProject(index) {
        if (projectSlides.length === 0) return;

        if (index >= projectSlides.length) {
            currentProject = 0;
        } else if (index < 0) {
            currentProject = projectSlides.length - 1;
        } else {
            currentProject = index;
        }

        projectSlides.forEach(slide => slide.classList.remove('active'));
        projectSlides[currentProject].classList.add('active');
    }

    if (projectsNext) {
        projectsNext.addEventListener('click', () => {
            showProject(currentProject + 1);
        });
    }

    if (projectsPrev) {
        projectsPrev.addEventListener('click', () => {
            showProject(currentProject - 1);
        });
    }

    if (projectSlides.length > 0) {
        showProject(0);
    }
});