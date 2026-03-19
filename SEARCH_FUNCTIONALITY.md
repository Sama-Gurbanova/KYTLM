# Axtarış Funksionallığı - Texniki Sənəd

## Ümumi Məlumat

Bu sənəd, KYLTM veb-saytı üçün hazırlanmış axtarış funksionallığının texniki təsvirini və xüsusiyyətlərini əhatə edir.

---

## 1. Funksionallığın Təsviri

### 1.1. Əsas Xüsusiyyətlər

- **Full-Screen Overlay**: Axtarış aktivləşdirildikdə bütün ekranı örtən bulanıq overlay
- **Full-Width Search Bar**: Ekranın tam enini tutan axtarış sahəsi
- **Real-time Search**: İstifadəçi yazdıqca nəticələrin göstərilməsi
- **Smart Highlighting**: Axtarış mətninin vurğulanması
- **Smooth Animations**: Yumşaq keçid animasiyaları

### 1.2. İstifadəçi İnterfeysi

- **Açılış**: Header-dakı search ikonuna klikləməklə
- **Bağlanma**: 
  - Close (×) düyməsi ilə
  - ESC düyməsi ilə
  - Overlay-ə klikləməklə
- **Axtarış**: Input sahəsinə mətn yazılması
- **Nəticələr**: Aşağıda dropdown şəklində göstərilir

---

## 2. Texniki Arxitektura

### 2.1. HTML Strukturu

```html
<!-- Search Button -->
<div class="header-box search-box" id="searchBox">
    <svg class="search-icon">...</svg>
</div>

<!-- Search Overlay və Expanded -->
<div class="search-overlay" id="searchOverlay">
    <div class="search-expanded" id="searchExpanded">
        <svg class="search-icon-inside">...</svg>
        <input type="text" id="searchInput" placeholder="Axtarış...">
        <button class="search-close" id="searchClose">×</button>
    </div>
</div>
```

### 2.2. CSS Komponentləri

#### 2.2.1. Search Overlay
- **Position**: Fixed (bütün ekranı örtür)
- **Background**: `rgba(255, 255, 255, 0.5)` - Yarımşəffaf ağ
- **Backdrop Filter**: `blur(8px)` - Arxa fon bulanıqlığı
- **Z-index**: 9999
- **Animation**: Fade-in effekti

#### 2.2.2. Search Expanded
- **Width**: 100% (tam genişlik)
- **Height**: 80px (desktop), 70px (tablet), 60px (mobil)
- **Background**: `rgba(255, 255, 255, 0.95)` - Şəffaf ağ
- **Position**: Ekranın yuxarısında (top: 0)
- **Padding**: 40px (hər tərəfdən)
- **Animation**: Slide-down effekti

#### 2.2.3. Search Results
- **Position**: Absolute (search-expanded-in altında)
- **Background**: Ağ fon
- **Max-height**: 400px (scroll ilə)
- **Styling**: Modern dropdown dizaynı

### 2.3. JavaScript Funksionallığı

#### 2.3.1. Əsas Funksiyalar

**openSearch()**
- Overlay-i aktivləşdirir
- Input sahəsinə fokus verir
- Body scroll-u bloklayır

**closeSearch()**
- Overlay-i deaktivləşdirir
- Input sahəsini təmizləyir
- Nəticələri gizlədir
- Body scroll-u aktivləşdirir

**performSearch(query)**
- Səhifədəki mətnlərdə axtarış aparır
- H1, H2, H3, H4, H5, H6, P, .service-title, .media-heading, .project-caption elementlərində axtarış
- Nəticələri formatlaşdırır və göstərir

**highlightText(text, query)**
- Axtarış mətnini vurğulayır
- HTML span ilə highlight edir

**displaySearchResults(results, query)**
- Nəticələri dropdown-da göstərir
- Maksimum 10 nəticə
- Kliklədikdə həmin elementə scroll edir

#### 2.3.2. Event Listeners

1. **Search Icon Click**: Axtarışı açır
2. **Close Button Click**: Axtarışı bağlayır
3. **ESC Key**: Axtarışı bağlayır
4. **Overlay Click**: Axtarışı bağlayır
5. **Input Event**: Real-time axtarış (300ms debounce)
6. **Enter Key**: Axtarışı icra edir
7. **Result Click**: Həmin elementə scroll edir

---

## 3. Xüsusiyyətlər

### 3.1. Axtarış Alqoritmi

- **Minimum Query Length**: 2 simvol
- **Debounce Time**: 300ms (performans üçün)
- **Case Insensitive**: Böyük/kiçik hərf fərqi yoxdur
- **Multiple Elements**: Müxtəlif HTML elementlərində axtarış

### 3.2. Nəticələrin Göstərilməsi

- **Limit**: Maksimum 10 nəticə
- **Highlighting**: Axtarış mətninin vurğulanması
- **Scroll to Element**: Nəticəyə kliklədikdə həmin elementə scroll
- **Visual Feedback**: Hover effektləri

### 3.3. Animasiyalar

- **Fade In**: Overlay-in açılışı
- **Slide Down**: Search bar-ın görünməsi
- **Fade In Down**: Nəticələrin göstərilməsi
- **Smooth Transitions**: Bütün keçidlər yumşaqdır

---

## 4. Responsive Dizayn

### 4.1. Desktop (> 768px)
- Height: 80px
- Padding: 40px
- Font size: 18px

### 4.2. Tablet (≤ 768px)
- Height: 70px
- Padding: 30px
- Font size: 16px

### 4.3. Mobil (≤ 480px)
- Height: 60px
- Padding: 20px
- Font size: 15px

---

## 5. Performans Optimallaşdırmaları

1. **Debouncing**: Input event-ləri üçün 300ms debounce
2. **Event Delegation**: Effektiv event idarəetməsi
3. **Lazy Loading**: Nəticələr yalnız lazım olduqda yaradılır
4. **CSS Animations**: JavaScript əvəzinə CSS animasiyaları

---

## 6. Browser Dəstəyi

- Chrome/Edge: Tam dəstək
- Firefox: Tam dəstək
- Safari: Tam dəstək (webkit prefix ilə)
- Opera: Tam dəstək

---

## 7. İstifadə Təlimatı

### 7.1. İstifadəçi üçün:
1. Header-dakı search ikonuna klikləyin
2. Axtarış sahəsinə mətn yazın
3. Nəticələri görün və istədiyinizə klikləyin
4. ESC və ya × düyməsi ilə bağlayın

### 7.2. Developer üçün:
- `searchBox` - Search button elementi
- `searchOverlay` - Overlay container
- `searchExpanded` - Search input container
- `searchInput` - Input sahəsi
- `searchClose` - Close button
- `searchResults` - Nəticələr container (dinamik yaradılır)

---

## 8. Gələcək Təkmilləşdirmələr

1. **Keyboard Navigation**: Arrow keys ilə nəticələr arasında hərəkət
2. **Search History**: Son axtarışların saxlanması
3. **Categories**: Nəticələrin kateqoriyalara bölünməsi
4. **Advanced Filters**: Əlavə filtrlər
5. **Analytics**: Axtarış statistikaları

---

## 9. Texniki Detallar

### 9.1. Fayllar
- **HTML**: `index.html` (sətir 49-65)
- **CSS**: `style/style.css` (sətir 106-370)
- **JavaScript**: `js/main.js` (sətir 350-527)

### 9.2. Dependencies
- Heç bir xarici library tələb olunmur
- Vanilla JavaScript
- Pure CSS

### 9.3. Z-index Hierarchy
- Overlay: 9999
- Search Expanded: 10000
- Search Results: 10001

---

## 10. Nümunə Kod

### 10.1. Axtarışı Proqramatik Açmaq
```javascript
document.getElementById('searchBox').querySelector('.search-icon').click();
```

### 10.2. Axtarışı Proqramatik Bağlamaq
```javascript
// ESC düyməsini simulyasiya etmək
const event = new KeyboardEvent('keydown', { key: 'Escape' });
document.dispatchEvent(event);
```

---

## 11. Test Senaryoları

1. ✅ Search ikonuna klikləməklə açılması
2. ✅ ESC düyməsi ilə bağlanması
3. ✅ Close button ilə bağlanması
4. ✅ Overlay-ə klikləməklə bağlanması
5. ✅ Real-time axtarış
6. ✅ Nəticələrin göstərilməsi
7. ✅ Nəticəyə kliklədikdə scroll
8. ✅ Responsive dizayn
9. ✅ Body scroll-un bloklanması
10. ✅ Minimum 2 simvol tələbi

---

## 12. Qeydlər

- Axtarış funksionallığı tamamilə client-side-dır
- Server tərəfində heç bir sorğu göndərilmir
- Bütün axtarış səhifədəki mövcud məzmun üzərində aparılır
- Performans üçün debouncing istifadə olunur

---

**Hazırlanma tarixi**: 2024  
**Versiya**: 1.0  
**Status**: ✅ Tam funksional
