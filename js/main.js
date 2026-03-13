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

    // Tərəfdaşlarımız Slideri (2 sətir - hər sətirdə 6 loqo)
    const partnersRows = document.querySelectorAll('.partners-row .partners-track');
    const partnersPrev = document.querySelector('.partners-prev');
    const partnersNext = document.querySelector('.partners-next');
    let currentPartnerIndex = [0, 0]; // Hər sətir üçün ayrı indeks

    function getLogosPerView() {
        const width = window.innerWidth;
        // Desktop-da 6 loqo görünür (hər sətirdə)
        if (width > 1400) return 6;
        if (width > 1200) return 5;
        if (width > 900) return 4;
        if (width > 600) return 3;
        return 2;
    }

 function updatePartnersSlider(rowIndex) {
    if (!partnersRows[rowIndex]) return;
    
    const track = partnersRows[rowIndex];
    const firstLogo = track.querySelector('.partner-logo');
    if (!firstLogo) return;
    
    // Loqonun enini və aradakı boşluğu (gap) brauzerdən real vaxtda götürürük
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    const logoWidth = firstLogo.offsetWidth;
    
    const logosPerView = getLogosPerView();
    const totalLogos = track.querySelectorAll('.partner-logo').length;
    const maxIndex = Math.max(0, totalLogos - logosPerView);
    
    currentPartnerIndex[rowIndex] = Math.min(Math.max(0, currentPartnerIndex[rowIndex]), maxIndex);
    
    // Hesablama avtomatikləşdi
    const translateX = -currentPartnerIndex[rowIndex] * (logoWidth + gap);
    track.style.transform = `translateX(${translateX}px)`;
}

    function updateAllRows() {
        partnersRows.forEach((row, index) => {
            updatePartnersSlider(index);
        });
    }

    function showNextPartners() {
        const logosPerView = getLogosPerView();
        partnersRows.forEach((row, rowIndex) => {
            const logosInRow = row.querySelectorAll('.partner-logo');
            const totalLogos = logosInRow.length;
            const maxIndex = Math.max(0, totalLogos - logosPerView);
            currentPartnerIndex[rowIndex] = Math.min(currentPartnerIndex[rowIndex] + 1, maxIndex);
            updatePartnersSlider(rowIndex);
        });
    }

    function showPrevPartners() {
        partnersRows.forEach((row, rowIndex) => {
            currentPartnerIndex[rowIndex] = Math.max(0, currentPartnerIndex[rowIndex] - 1);
            updatePartnersSlider(rowIndex);
        });
    }

    if (partnersNext) {
        partnersNext.addEventListener('click', showNextPartners);
    }

    if (partnersPrev) {
        partnersPrev.addEventListener('click', showPrevPartners);
    }

    // Responsive update
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateAllRows();
        }, 250);
    });

    // Initialize after page load
    if (partnersRows.length > 0) {
        window.addEventListener('load', () => {
            setTimeout(updateAllRows, 100);
        });
        updateAllRows();
    }

    // Media Slider
    const mediaTrack = document.querySelector('.media-track');
    const mediaPrev = document.querySelector('.media-prev');
    const mediaNext = document.querySelector('.media-next');
    const mediaItems = document.querySelectorAll('.media-item');
    let currentMediaIndex = 0;

    function getMediaPerView() {
        const width = window.innerWidth;
        // Desktop
        if (width >= 1400) return 3;
        // Tablet (o cümlədən 768px ətrafı) – 2 kart yan‑yana
        if (width >= 768) return 2;
        // Mobil – 1 kart
        return 1;
    }

    function updateMediaSlider() {
        if (!mediaTrack || mediaItems.length === 0) return;
        
        const mediaPerView = getMediaPerView();
        const totalMedia = mediaItems.length;
        const maxIndex = Math.max(0, totalMedia - mediaPerView);
        
        currentMediaIndex = Math.min(currentMediaIndex, maxIndex);
        currentMediaIndex = Math.max(0, currentMediaIndex);
        
        if (mediaItems[0]) {
            const firstItem = mediaItems[0];
            const style = window.getComputedStyle(mediaTrack);
            const gap = parseFloat(style.gap) || 0;
            const itemWidth = firstItem.offsetWidth;
            const translateX = -currentMediaIndex * (itemWidth + gap);
            mediaTrack.style.transform = `translateX(${translateX}px)`;
        }
    }

    function showNextMedia() {
        const mediaPerView = getMediaPerView();
        const totalMedia = mediaItems.length;
        const maxIndex = Math.max(0, totalMedia - mediaPerView);
        currentMediaIndex = Math.min(currentMediaIndex + 1, maxIndex);
        updateMediaSlider();
    }

    function showPrevMedia() {
        currentMediaIndex = Math.max(0, currentMediaIndex - 1);
        updateMediaSlider();
    }

    if (mediaNext) {
        mediaNext.addEventListener('click', showNextMedia);
    }

    if (mediaPrev) {
        mediaPrev.addEventListener('click', showPrevMedia);
    }

    // Responsive update for media
    let mediaResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(mediaResizeTimeout);
        mediaResizeTimeout = setTimeout(() => {
            updateMediaSlider();
        }, 250);
    });

    // Initialize media slider
    if (mediaItems.length > 0) {
        window.addEventListener('load', () => {
            setTimeout(updateMediaSlider, 100);
        });
        updateMediaSlider();
    }

    // Mobile Menu Toggle (360px)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
});