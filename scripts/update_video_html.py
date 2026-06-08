import re
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "video-qalereya.html"
content = path.read_text(encoding="utf-8")
content = re.sub(r' data-video-id="[^"]+"', "", content)
content = content.replace(
    '<div class="video-gallery-grid" id="videoGalleryGrid">',
    '<div class="video-gallery-grid" id="videoGalleryGrid" data-video-src="/style/assets/videos/kyltm-gallery.mp4">',
)
content = content.replace(
    '<iframe class="video-lightbox-iframe" id="videoLightboxIframe" src="" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    '<video class="video-lightbox-player" id="videoLightboxPlayer" controls playsinline preload="metadata" poster="/style/assets/videos/kyltm-gallery-poster.jpg"></video>',
)
path.write_text(content, encoding="utf-8")
