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

    // About bölməsi üçün sayğac animasiyası
    const aboutSection = document.querySelector('.about-section');
    const statNumbers = document.querySelectorAll('.about-section .stat-number');

    function animateStatNumber(element, duration = 1400) {
        const originalText = element.dataset.targetValue || element.textContent.trim();
        const hasPlus = originalText.endsWith('+');
        const targetValue = parseInt(originalText.replace(/\D/g, ''), 10);

        if (Number.isNaN(targetValue)) return;

        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(targetValue * easedProgress);

            element.textContent = hasPlus ? `${currentValue}+` : `${currentValue}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = hasPlus ? `${targetValue}+` : `${targetValue}`;
            }
        }

        requestAnimationFrame(update);
    }

    if (aboutSection && statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            stat.dataset.targetValue = stat.textContent.trim();
        });

        let hasAnimatedInView = false;

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hasAnimatedInView) {
                        statNumbers.forEach(stat => {
                            const targetText = stat.dataset.targetValue || '0';
                            stat.textContent = targetText.endsWith('+') ? '0+' : '0';
                            animateStatNumber(stat);
                        });
                        hasAnimatedInView = true;
                    }
                } else {
                    hasAnimatedInView = false;
                }
            });
        }, {
            threshold: 0.35
        });

        statsObserver.observe(aboutSection);
    }

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
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle && navLinks) {
        function setMobileMenuState(isOpen) {
            navLinks.classList.toggle('active', isOpen);
            if (navbar) {
                navbar.classList.toggle('menu-open', isOpen);
            }
            mobileMenuToggle.textContent = isOpen ? '✕' : '☰';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        mobileMenuToggle.addEventListener('click', function() {
            const willOpen = !navLinks.classList.contains('active');
            setMobileMenuState(willOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                setMobileMenuState(false);
            }
        });

        // Mobil menyuda link davranışı:
        // - Dropdown trigger-ə klikləyəndə menyu bağlanmasın (alt menyu açılsın)
        // - Alt maddəyə və ya adi linkə klikləyəndə menyu bağlansın
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', event => {
                if (window.innerWidth <= 360) {
                    const isDropdownTrigger = link.classList.contains('dropdown-trigger');
                    if (isDropdownTrigger) {
                        event.preventDefault();
                        return;
                    }
                    setMobileMenuState(false);
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 360 && navLinks.classList.contains('active')) {
                setMobileMenuState(false);
            }
        });
    }

    // Search Funksionallığı
    const searchBox = document.getElementById('searchBox');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchExpanded = document.getElementById('searchExpanded');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchIcon = searchBox ? searchBox.querySelector('.search-icon') : null;
    let searchResults = null;

    // Search results container yarat
    function createSearchResults() {
        if (!searchResults && searchExpanded) {
            searchResults = document.createElement('div');
            searchResults.className = 'search-results';
            searchExpanded.appendChild(searchResults);
        }
        return searchResults;
    }

    // Search box-u aç/bağla
    if (searchBox && searchOverlay && searchExpanded) {
        // Search icon-a kliklədikdə
        if (searchIcon) {
            searchIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                openSearch();
            });
        }

        // Search box-a kliklədikdə (icon olmasa belə)
        searchBox.addEventListener('click', function(e) {
            if (e.target === searchBox || e.target.closest('.search-box')) {
                e.stopPropagation();
                openSearch();
            }
        });

        // Overlay-ə kliklədikdə bağlamaq
        if (searchOverlay) {
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    closeSearch();
                }
            });
        }

        // Close button-a kliklədikdə
        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSearch();
            });
        }

        // ESC düyməsi ilə bağlamaq
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

    function openSearch() {
        if (searchOverlay && !searchOverlay.classList.contains('active')) {
            searchOverlay.classList.add('active');
            if (searchBox) {
                searchBox.classList.add('active');
            }
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
            // Body scroll-u blokla
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            if (searchBox) {
                searchBox.classList.remove('active');
            }
            if (searchInput) {
                searchInput.value = '';
            }
            if (searchResults) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
            }
            // Body scroll-u aktivləşdir
            document.body.style.overflow = '';
        }
    }

    // Axtarış funksiyası
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                if (searchResults) {
                    searchResults.classList.remove('active');
                    searchResults.innerHTML = '';
                }
                return;
            }

            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // Enter düyməsi ilə axtarış
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length >= 2) {
                    performSearch(query);
                }
            }
        });
    }

    function performSearch(query) {
        const results = [];
        const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .service-title, .media-heading, .project-caption');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                const fullText = element.textContent;
                const highlightedText = highlightText(fullText, query);
                
                results.push({
                    text: fullText,
                    highlighted: highlightedText,
                    element: element
                });
            }
        });

        displaySearchResults(results, query);
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    function displaySearchResults(results, query) {
        const resultsContainer = createSearchResults();
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-result-item">
                    <div class="search-result-text">Nəticə tapılmadı</div>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.slice(0, 10).map(result => {
                const title = result.text.length > 60 ? result.text.substring(0, 60) + '...' : result.text;
                return `
                    <div class="search-result-item" data-target="${result.element.tagName.toLowerCase()}">
                        <div class="search-result-title">${result.highlighted}</div>
                    </div>
                `;
            }).join('');

            // Nəticələrə kliklədikdə scroll et
            resultsContainer.querySelectorAll('.search-result-item').forEach((item, index) => {
                item.addEventListener('click', function() {
                    const targetElement = results[index].element;
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetElement.style.transition = 'background 0.3s';
                    targetElement.style.background = 'rgba(0, 169, 145, 0.2)';
                    setTimeout(() => {
                        targetElement.style.background = '';
                    }, 2000);
                    closeSearch();
                });
            });
        }

        resultsContainer.classList.add('active');
    }
});