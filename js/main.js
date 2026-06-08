document.addEventListener('DOMContentLoaded', function() {
    
    // Dropdown Menyu İdarəetməsi (Haqqımızda, Media və s.)
    const dropdownParents = document.querySelectorAll('.dropdown');
    const dropdownTriggers = document.querySelectorAll('.dropdown .dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const currentDropdown = this.closest('.dropdown');
            if (!currentDropdown) return;

            const willOpen = !currentDropdown.classList.contains('open');

            // Digər açıq dropdown-ları bağla
            dropdownParents.forEach(dropdown => {
                dropdown.classList.remove('open');
                const arrow = dropdown.querySelector('.dropdown-trigger .arrow-icon');
                if (arrow) arrow.textContent = '▾';
            });

            // Cari dropdown-u aç/bağla
            currentDropdown.classList.toggle('open', willOpen);
            const currentArrow = this.querySelector('.arrow-icon');
            if (currentArrow) {
                currentArrow.textContent = willOpen ? '▴' : '▾';
            }
        });
    });

    // Kənara kliklədikdə bütün dropdown-ları bağla
    window.addEventListener('click', function(e) {
        dropdownParents.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                const arrow = dropdown.querySelector('.dropdown-trigger .arrow-icon');
                if (arrow) arrow.textContent = '▾';
            }
        });
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

    // Layihələr Slideri (ana səhifə)
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        const projectSlides = projectsSection.querySelectorAll('.project-slide');
        const projectsPrev = projectsSection.querySelector('.projects-prev');
        const projectsNext = projectsSection.querySelector('.projects-next');
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
            document.body.classList.add('search-open');
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
            document.body.classList.remove('search-open');
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

    // News səhifəsi üçün pagination funksionallığı
    const newsGrid = document.querySelector('.news-grid');
    const newsCards = document.querySelectorAll('.news-grid .news-card');
    const newsPagination = document.querySelector('.news-pagination');
    const newsPageNumbers = document.querySelector('.news-page-numbers');
    const newsPrevButton = document.querySelector('.news-page-prev');
    const newsNextButton = document.querySelector('.news-page-next');

    if (newsGrid && newsCards.length > 0 && newsPagination && newsPageNumbers && newsPrevButton && newsNextButton) {
        let currentNewsPage = 1;
        const totalPages = 4;
        let isAnimating = false;

        function renderNewsPage(page) {
            if (isAnimating) return;
            isAnimating = true;
            currentNewsPage = Math.min(Math.max(1, page), totalPages);

            newsGrid.classList.add('is-switching');

            setTimeout(() => {
                newsCards.forEach(card => {
                    card.style.display = 'block';
                });

                newsPageNumbers.innerHTML = '';
                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.textContent = String(i);
                    if (i === currentNewsPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => renderNewsPage(i));
                    newsPageNumbers.appendChild(pageButton);
                }

                newsPrevButton.disabled = currentNewsPage === 1;
                newsNextButton.disabled = currentNewsPage === totalPages;

                requestAnimationFrame(() => {
                    newsGrid.classList.remove('is-switching');
                    setTimeout(() => {
                        isAnimating = false;
                    }, 300);
                });
            }, 120);
        }

        newsPrevButton.addEventListener('click', () => renderNewsPage(currentNewsPage - 1));
        newsNextButton.addEventListener('click', () => renderNewsPage(currentNewsPage + 1));

        renderNewsPage(1);
    }

    // Layihələr səhifəsi üçün pagination
    const layihelerGrid = document.querySelector('.layiheler-grid');
    const layihelerCards = document.querySelectorAll('.layiheler-grid .layiheler-card');
    const layihelerPagination = document.querySelector('.layiheler-pagination');
    const layihelerPageNumbers = document.querySelector('.layiheler-page-numbers');
    const layihelerPrevButton = document.querySelector('.layiheler-page-prev');
    const layihelerNextButton = document.querySelector('.layiheler-page-next');

    if (layihelerGrid && layihelerCards.length > 0 && layihelerPagination && layihelerPageNumbers && layihelerPrevButton && layihelerNextButton) {
        let currentLayihelerPage = 1;
        const totalLayihelerPages = 24;
        const contentPages = 4;
        let isLayihelerAnimating = false;

        function getVisibleContentPage(page) {
            return ((page - 1) % contentPages) + 1;
        }

        function buildLayihelerPaginationItems(currentPage) {
            const items = [];
            if (totalLayihelerPages <= 7) {
                for (let i = 1; i <= totalLayihelerPages; i++) {
                    items.push(i);
                }
                return items;
            }

            items.push(1, 2, 3, 4, 'ellipsis', totalLayihelerPages);
            if (currentPage > 4 && currentPage < totalLayihelerPages) {
                return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalLayihelerPages];
            }
            return items;
        }

        function renderLayihelerPage(page) {
            if (isLayihelerAnimating) return;
            isLayihelerAnimating = true;
            currentLayihelerPage = Math.min(Math.max(1, page), totalLayihelerPages);
            const visibleContentPage = getVisibleContentPage(currentLayihelerPage);

            layihelerGrid.classList.add('is-switching');

            setTimeout(() => {
                layihelerCards.forEach(card => {
                    const cardPage = Number(card.getAttribute('data-page'));
                    card.style.display = cardPage === visibleContentPage ? '' : 'none';
                });

                layihelerPageNumbers.innerHTML = '';
                buildLayihelerPaginationItems(currentLayihelerPage).forEach(item => {
                    if (item === 'ellipsis') {
                        const ellipsis = document.createElement('span');
                        ellipsis.className = 'pagination-ellipsis';
                        ellipsis.textContent = '...';
                        layihelerPageNumbers.appendChild(ellipsis);
                        return;
                    }

                    const pageButton = document.createElement('button');
                    pageButton.type = 'button';
                    pageButton.textContent = String(item);
                    if (item === currentLayihelerPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => renderLayihelerPage(item));
                    layihelerPageNumbers.appendChild(pageButton);
                });

                layihelerPrevButton.disabled = currentLayihelerPage === 1;
                layihelerNextButton.disabled = currentLayihelerPage === totalLayihelerPages;

                requestAnimationFrame(() => {
                    layihelerGrid.classList.remove('is-switching');
                    setTimeout(() => {
                        isLayihelerAnimating = false;
                    }, 300);
                });
            }, 120);
        }

        layihelerPrevButton.addEventListener('click', () => renderLayihelerPage(currentLayihelerPage - 1));
        layihelerNextButton.addEventListener('click', () => renderLayihelerPage(currentLayihelerPage + 1));

        renderLayihelerPage(1);
    }

    // Foto qalereya — pagination
    const fotoGalleryGrid = document.querySelector('.foto-gallery-grid');
    const fotoGalleryItems = document.querySelectorAll('.foto-gallery-grid .foto-gallery-item');
    const fotoQalereyaPagination = document.querySelector('.foto-qalereya-pagination');
    const fotoQalereyaPageNumbers = document.querySelector('.foto-qalereya-page-numbers');
    const fotoQalereyaPrevButton = document.querySelector('.foto-qalereya-page-prev');
    const fotoQalereyaNextButton = document.querySelector('.foto-qalereya-page-next');

    if (fotoGalleryGrid && fotoGalleryItems.length > 0 && fotoQalereyaPagination && fotoQalereyaPageNumbers && fotoQalereyaPrevButton && fotoQalereyaNextButton) {
        let currentFotoPage = 1;
        const totalFotoPages = 24;
        const fotoContentPages = 4;
        let isFotoAnimating = false;

        function getVisibleFotoContentPage(page) {
            return ((page - 1) % fotoContentPages) + 1;
        }

        function buildFotoPaginationItems(currentPage) {
            if (totalFotoPages <= 7) {
                const items = [];
                for (let i = 1; i <= totalFotoPages; i++) {
                    items.push(i);
                }
                return items;
            }
            if (currentPage > 4 && currentPage < totalFotoPages) {
                return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalFotoPages];
            }
            return [1, 2, 3, 4, 'ellipsis', totalFotoPages];
        }

        function renderFotoGalleryPage(page) {
            if (isFotoAnimating) return;
            isFotoAnimating = true;
            currentFotoPage = Math.min(Math.max(1, page), totalFotoPages);
            const visibleContentPage = getVisibleFotoContentPage(currentFotoPage);

            fotoGalleryGrid.classList.add('is-switching');

            setTimeout(() => {
                fotoGalleryItems.forEach(item => {
                    const itemPage = Number(item.getAttribute('data-page'));
                    item.style.display = itemPage === visibleContentPage ? '' : 'none';
                });

                fotoQalereyaPageNumbers.innerHTML = '';
                buildFotoPaginationItems(currentFotoPage).forEach(item => {
                    if (item === 'ellipsis') {
                        const ellipsis = document.createElement('span');
                        ellipsis.className = 'pagination-ellipsis';
                        ellipsis.textContent = '...';
                        fotoQalereyaPageNumbers.appendChild(ellipsis);
                        return;
                    }

                    const pageButton = document.createElement('button');
                    pageButton.type = 'button';
                    pageButton.textContent = String(item);
                    if (item === currentFotoPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => renderFotoGalleryPage(item));
                    fotoQalereyaPageNumbers.appendChild(pageButton);
                });

                fotoQalereyaPrevButton.disabled = currentFotoPage === 1;
                fotoQalereyaNextButton.disabled = currentFotoPage === totalFotoPages;

                requestAnimationFrame(() => {
                    fotoGalleryGrid.classList.remove('is-switching');
                    setTimeout(() => {
                        isFotoAnimating = false;
                    }, 300);
                });
            }, 120);
        }

        fotoQalereyaPrevButton.addEventListener('click', () => renderFotoGalleryPage(currentFotoPage - 1));
        fotoQalereyaNextButton.addEventListener('click', () => renderFotoGalleryPage(currentFotoPage + 1));

        renderFotoGalleryPage(1);
    }

    // Foto qalereya — lightbox (Figma)
    const fotoLightbox = document.getElementById('fotoLightbox');
    const fotoLightboxImage = document.getElementById('fotoLightboxImage');
    const fotoLightboxThumbs = document.getElementById('fotoLightboxThumbs');
    const fotoLightboxClose = document.getElementById('fotoLightboxClose');
    const fotoLightboxBackdrop = document.getElementById('fotoLightboxBackdrop');
    const fotoLightboxPrev = document.getElementById('fotoLightboxPrev');
    const fotoLightboxNext = document.getElementById('fotoLightboxNext');
    const fotoLightboxThumbsScroll = document.getElementById('fotoLightboxThumbsScroll');
    const fotoLightboxInner = fotoLightbox ? fotoLightbox.querySelector('.foto-lightbox-inner') : null;

    if (fotoLightbox && fotoLightboxImage && fotoGalleryItems && fotoGalleryItems.length > 0) {
        let lightboxSources = [];
        let lightboxIndex = 0;

        function getVisibleGalleryItems() {
            return Array.from(fotoGalleryItems).filter(item => {
                const display = window.getComputedStyle(item).display;
                return display !== 'none';
            });
        }

        function scrollActiveThumbIntoView() {
            const activeThumb = fotoLightboxThumbs.querySelector('.foto-lightbox-thumb.active');
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }

        function updateLightboxView() {
            if (!lightboxSources.length) return;
            lightboxIndex = (lightboxIndex + lightboxSources.length) % lightboxSources.length;
            fotoLightboxImage.src = lightboxSources[lightboxIndex];
            fotoLightboxImage.alt = 'Qalereya şəkli ' + (lightboxIndex + 1);

            fotoLightboxThumbs.innerHTML = '';
            lightboxSources.forEach((src, index) => {
                const thumbBtn = document.createElement('button');
                thumbBtn.type = 'button';
                thumbBtn.className = 'foto-lightbox-thumb' + (index === lightboxIndex ? ' active' : '');
                thumbBtn.setAttribute('aria-label', 'Şəkil ' + (index + 1));
                thumbBtn.setAttribute('aria-current', index === lightboxIndex ? 'true' : 'false');
                const thumbImg = document.createElement('img');
                thumbImg.src = src;
                thumbImg.alt = '';
                thumbBtn.appendChild(thumbImg);
                thumbBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    lightboxIndex = index;
                    updateLightboxView();
                });
                fotoLightboxThumbs.appendChild(thumbBtn);
            });

            requestAnimationFrame(scrollActiveThumbIntoView);
        }

        function openLightbox(startIndex) {
            const visibleItems = getVisibleGalleryItems();
            if (!visibleItems.length) return;

            lightboxSources = visibleItems.map(item => {
                return item.getAttribute('data-src') || (item.querySelector('img') && item.querySelector('img').src) || '';
            }).filter(Boolean);

            if (!lightboxSources.length) return;

            lightboxIndex = Math.min(Math.max(0, startIndex), lightboxSources.length - 1);
            updateLightboxView();
            fotoLightbox.hidden = false;
            fotoLightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('foto-lightbox-open');
            document.body.style.overflow = 'hidden';
            fotoLightboxClose.focus();
        }

        function closeLightbox() {
            fotoLightbox.hidden = true;
            fotoLightbox.setAttribute('aria-hidden', 'true');
            fotoLightboxImage.removeAttribute('src');
            document.body.classList.remove('foto-lightbox-open');
            document.body.style.overflow = '';
        }

        function showPrevImage() {
            lightboxIndex -= 1;
            updateLightboxView();
        }

        function showNextImage() {
            lightboxIndex += 1;
            updateLightboxView();
        }

        fotoGalleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const visibleItems = getVisibleGalleryItems();
                const visibleIndex = visibleItems.indexOf(item);
                openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
            });
        });

        if (fotoLightboxClose) {
            fotoLightboxClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        if (fotoLightboxBackdrop) {
            fotoLightboxBackdrop.addEventListener('click', closeLightbox);
        }

        if (fotoLightboxInner) {
            fotoLightboxInner.addEventListener('click', (e) => e.stopPropagation());
        }

        if (fotoLightboxPrev) {
            fotoLightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrevImage();
            });
        }

        if (fotoLightboxNext) {
            fotoLightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                showNextImage();
            });
        }

        if (fotoLightboxThumbsScroll && fotoLightboxThumbs) {
            fotoLightboxThumbsScroll.addEventListener('click', (e) => {
                e.stopPropagation();
                fotoLightboxThumbs.scrollBy({ left: 220, behavior: 'smooth' });
            });
        }

        document.addEventListener('keydown', (e) => {
            if (fotoLightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
    }

    // Video qalereya — pagination
    const videoGalleryGrid = document.querySelector('.video-gallery-grid');
    const videoGalleryItems = document.querySelectorAll('.video-gallery-grid .video-gallery-item');
    const videoQalereyaPagination = document.querySelector('.video-qalereya-pagination');
    const videoQalereyaPageNumbers = document.querySelector('.video-qalereya-page-numbers');
    const videoQalereyaPrevButton = document.querySelector('.video-qalereya-page-prev');
    const videoQalereyaNextButton = document.querySelector('.video-qalereya-page-next');

    if (videoGalleryGrid && videoGalleryItems.length > 0 && videoQalereyaPagination && videoQalereyaPageNumbers && videoQalereyaPrevButton && videoQalereyaNextButton) {
        let currentVideoPage = 1;
        const totalVideoPages = 24;
        const videoContentPages = 4;
        let isVideoAnimating = false;

        function getVisibleVideoContentPage(page) {
            return ((page - 1) % videoContentPages) + 1;
        }

        function buildVideoPaginationItems(currentPage) {
            if (totalVideoPages <= 7) {
                const items = [];
                for (let i = 1; i <= totalVideoPages; i++) {
                    items.push(i);
                }
                return items;
            }
            if (currentPage > 4 && currentPage < totalVideoPages) {
                return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalVideoPages];
            }
            return [1, 2, 3, 4, 'ellipsis', totalVideoPages];
        }

        function renderVideoGalleryPage(page) {
            if (isVideoAnimating) return;
            isVideoAnimating = true;
            currentVideoPage = Math.min(Math.max(1, page), totalVideoPages);
            const visibleContentPage = getVisibleVideoContentPage(currentVideoPage);

            videoGalleryGrid.classList.add('is-switching');

            setTimeout(() => {
                videoGalleryItems.forEach(item => {
                    const itemPage = Number(item.getAttribute('data-page'));
                    item.style.display = itemPage === visibleContentPage ? '' : 'none';
                });

                videoQalereyaPageNumbers.innerHTML = '';
                buildVideoPaginationItems(currentVideoPage).forEach(item => {
                    if (item === 'ellipsis') {
                        const ellipsis = document.createElement('span');
                        ellipsis.className = 'pagination-ellipsis';
                        ellipsis.textContent = '...';
                        videoQalereyaPageNumbers.appendChild(ellipsis);
                        return;
                    }

                    const pageButton = document.createElement('button');
                    pageButton.type = 'button';
                    pageButton.textContent = String(item);
                    if (item === currentVideoPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => renderVideoGalleryPage(item));
                    videoQalereyaPageNumbers.appendChild(pageButton);
                });

                videoQalereyaPrevButton.disabled = currentVideoPage === 1;
                videoQalereyaNextButton.disabled = currentVideoPage === totalVideoPages;

                requestAnimationFrame(() => {
                    videoGalleryGrid.classList.remove('is-switching');
                    setTimeout(() => {
                        isVideoAnimating = false;
                    }, 300);
                });
            }, 120);
        }

        videoQalereyaPrevButton.addEventListener('click', () => renderVideoGalleryPage(currentVideoPage - 1));
        videoQalereyaNextButton.addEventListener('click', () => renderVideoGalleryPage(currentVideoPage + 1));

        renderVideoGalleryPage(1);
    }

    // Video qalereya — lightbox
    const videoLightbox = document.getElementById('videoLightbox');
    const videoLightboxPlayer = document.getElementById('videoLightboxPlayer');
    const videoLightboxClose = document.getElementById('videoLightboxClose');
    const videoLightboxBackdrop = document.getElementById('videoLightboxBackdrop');
    const defaultVideoSrc = videoGalleryGrid
        ? videoGalleryGrid.getAttribute('data-video-src')
        : '/style/assets/videos/kyltm-gallery.mp4';

    if (videoLightbox && videoLightboxPlayer && videoGalleryItems && videoGalleryItems.length > 0) {
        function openVideoLightbox(videoSrc) {
            if (!videoSrc) return;
            videoLightboxPlayer.src = videoSrc;
            videoLightbox.hidden = false;
            videoLightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('video-lightbox-open');
            document.body.style.overflow = 'hidden';
            const playPromise = videoLightboxPlayer.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {});
            }
            if (videoLightboxClose) videoLightboxClose.focus();
        }

        function closeVideoLightbox() {
            videoLightboxPlayer.pause();
            videoLightboxPlayer.removeAttribute('src');
            videoLightboxPlayer.load();
            videoLightbox.hidden = true;
            videoLightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('video-lightbox-open');
            document.body.style.overflow = '';
        }

        videoGalleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video-src') || defaultVideoSrc;
                openVideoLightbox(videoSrc);
            });
        });

        if (videoLightboxClose) {
            videoLightboxClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeVideoLightbox();
            });
        }

        if (videoLightboxBackdrop) {
            videoLightboxBackdrop.addEventListener('click', closeVideoLightbox);
        }

        document.addEventListener('keydown', (e) => {
            if (videoLightbox.hidden) return;
            if (e.key === 'Escape') closeVideoLightbox();
        });
    }
});