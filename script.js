/**
 * C24 Platform
 * 展开状态由 JS + CSS Grid 流式动画共同控制
 */

const IMAGE_CONFIG = [
    { index: '1', src: '/xxzz01/image/1.jpg', alt: 'Project 1' },
    { index: '2', src: '/xxzz01/image/2.jpg', alt: 'Project 2' },
    { index: '3', src: '/xxzz01/image/3.jpg', alt: 'Project 3' },
    { index: '4', src: '/xxzz01/image/6.jpg', alt: 'Project 4' },
    { index: '5', src: '/xxzz01/image/7.jpg', alt: 'Project 5' },
    { index: '6', src: '/xxzz01/image/4.jpg', alt: 'Project 6' },
    { index: '7', src: '/xxzz01/image/8.jpg', alt: 'Project 7' },
    { index: '8', src: '/xxzz01/image/9.jpg', alt: 'Project 8' },
    { index: '9', src: '/xxzz01/image/10.jpg', alt: 'Project 1' },
    { index: '10', src: '/xxzz01/image/11.jpg', alt: 'Project 2' },
    { index: '11', src: '/xxzz01/image/12.jpg', alt: 'Project 3' },
    { index: '12', src: '/xxzz01/image/13.jpg', alt: 'Project 4' },
    { index: '13', src: '/xxzz01/image/14.jpg', alt: 'Project 5' },
    { index: '14', src: '/xxzz01/image/15.jpg', alt: 'Project 6' },
    { index: '15', src: '/xxzz01/image/16.jpg', alt: 'Project 7' },
    { index: '16', src: '/xxzz01/image/17.jpg', alt: 'Project 16' }
];

const TEXT_CONFIG = [
    { target: '1', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '2', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '3', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '4', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '5', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '6', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '7', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '8', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '9', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '10', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '11', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '12', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '13', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '14', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '15', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' },
    { target: '16', text: 'TNF 北面 UE 系列 ，六月kv，拍摄has taken in both internationally' }
];

const PROJECT_DETAIL_CONFIG = {
    introCn: 'NIKE, Inc. 的足迹遍及全球，我们拥有创新文化，并始终秉持以团队为先的精神。以此基础，我们积极采取行动，旨在为运动员、体育行业和世界创造不断进步的未来。NIKE, Inc. 的足迹遍及全球，我们拥有创新文化，并始终秉持以团队为先的精神。以此基础，我们积极采取行动，旨在为运动员、体育行业和世界创造不断进步的未来。',
    introEn: `Around 2017, the brief arrived for a new golf shoe for Jordan Brand, straight from MJ: the Air Rev. He wanted an innovative, research-backed golf spike to give even the most powerful golfers an edge, helping them drive the ball further. "MJ is adamant on creating the most performance-oriented golf product in the industry," says Matt Plumb, NIKE, Inc. Men's Sport Footwear Director. "He wanted to create a footwear system that could help players generate more rotational power. Whatever margin we could find, it was our job to find it. He knew we had the tools, the expertise, and the curiosity to find new solutions through footwear."`,
    images: [
        { src: '/xxzz01/image/project-detail/detail-1.png', alt: 'Project detail image 1' },
        { src: '/xxzz01/image/project-detail/detail-2.png', alt: 'Project detail image 2' },
        { src: '/xxzz01/image/project-detail/detail-3.png', alt: 'Project detail image 3' }
    ]
};

const CURSOR_CLOSED = 'hand/111.png';
const CURSOR_OPEN   = 'hand/222.png';
const MOBILE_WHEEL_STEP = 140;
const DESKTOP_SCROLL_COMFORT = 0.28;

let resizeRaf = null;
let masonryRaf = null;

// ===================== DOM 构建 =====================
function buildImages() {
    const container = document.getElementById('leftImages');
    IMAGE_CONFIG.forEach(item => {
        const div = document.createElement('div');
        div.className = 'img-item';
        div.setAttribute('data-index', item.index);
        div.style.filter = 'blur(12px)';
        div.style.opacity = '0.4';
        div.style.transform = 'scale(0.98)';
        div.style.zIndex = '10';
        const num = document.createElement('span');
        num.className = 'img-number';
        num.textContent = item.index;
        num.style.opacity = '0.4';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'eager';
        img.decoding = 'async';
        img.addEventListener('load', scheduleMasonryLayout);
        div.append(num, img);
        container.appendChild(div);
    });
}

function buildTexts() {
    const container = document.getElementById('middleText');
    TEXT_CONFIG.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'text-wrapper';
        wrapper.setAttribute('data-target', item.target);

        const div = document.createElement('div');
        div.className = 'text-item';
        div.setAttribute('data-target', item.target);
        div.textContent = item.text;

        const detail = document.createElement('div');
        detail.className = 'text-detail';
        detail.setAttribute('data-target', item.target);
        detail.innerHTML = `
            <div class="text-detail-inner">
                <div class="project-detail-intro-cn">${PROJECT_DETAIL_CONFIG.introCn}</div>
                <div class="project-detail-intro-en">${PROJECT_DETAIL_CONFIG.introEn}</div>
            </div>
        `;

        wrapper.append(div, detail);
        container.appendChild(wrapper);
    });
}

function buildMobileProjects() {
    const container = document.getElementById('mobileProjects');
    if (!container) return;

    const gallery = document.createElement('section');
    gallery.className = 'mobile-project-gallery';
    gallery.setAttribute('aria-label', 'Project images');

    const galleryTrack = document.createElement('div');
    galleryTrack.className = 'mobile-project-gallery-track';
    gallery.appendChild(galleryTrack);

    const copy = document.createElement('section');
    copy.className = 'mobile-project-copy';
    copy.setAttribute('aria-label', 'Project titles');

    const titleTrack = document.createElement('div');
    titleTrack.className = 'mobile-project-title-track';

    IMAGE_CONFIG.forEach(imageItem => {
        const textItem = TEXT_CONFIG.find(item => item.target === imageItem.index);
        const visual = document.createElement('button');
        visual.className = 'mobile-project-visual';
        visual.type = 'button';
        visual.setAttribute('data-index', imageItem.index);
        visual.setAttribute('aria-label', `Focus project ${imageItem.index}`);

        const num = document.createElement('span');
        num.className = 'mobile-project-number';
        num.textContent = imageItem.index;

        const media = document.createElement('span');
        media.className = 'mobile-project-media';
        const img = document.createElement('img');
        img.src = imageItem.mobileSrc || imageItem.src;
        img.alt = imageItem.alt;
        img.loading = 'eager';
        img.decoding = 'async';
        img.addEventListener('load', () => {
            if (img.naturalWidth / Math.max(1, img.naturalHeight) > 1.2) {
                visual.classList.add('is-landscape');
            }
            window.dispatchEvent(new CustomEvent('mobile-project-image-loaded'));
        }, { once: true });
        media.appendChild(img);

        visual.append(num, media);
        galleryTrack.appendChild(visual);

        const item = document.createElement('article');
        item.className = 'mobile-project-item';
        item.setAttribute('data-index', imageItem.index);
        item.setAttribute('data-mobile-title-id', imageItem.index);

        const title = document.createElement('button');
        title.className = 'mobile-project-title';
        title.type = 'button';
        title.textContent = textItem ? textItem.text : '';

        const detail = document.createElement('div');
        detail.className = 'mobile-project-description';
        const detailText = document.createElement('p');
        detailText.textContent = PROJECT_DETAIL_CONFIG.introCn;
        detail.appendChild(detailText);

        item.append(title, detail);
        titleTrack.appendChild(item);
    });

    copy.appendChild(titleTrack);
    container.append(gallery, copy);
}

function buildProjectDetail() {
    const copyContainer = document.getElementById('projectExpandedCopy');
    if (copyContainer) copyContainer.style.display = 'none';

    const imageContainer = document.getElementById('projectDetailImages');
    if (!imageContainer) return;
    imageContainer.innerHTML = '';
    PROJECT_DETAIL_CONFIG.images.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = `project-detail-image project-detail-image-${index + 1}`;
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        img.loading = 'lazy';
        wrapper.appendChild(img);
        imageContainer.appendChild(wrapper);
    });
}

// ===================== 响应式布局 =====================
function isMobileLayout() {
    return window.matchMedia('(max-width: 700px)').matches;
}

function getMasonryImageRatio(img) {
    if (img.naturalWidth && img.naturalHeight) {
        return img.naturalHeight / img.naturalWidth;
    }
    return 4 / 3;
}

function layoutMasonry() {
    const container = document.getElementById('leftImages');
    if (!container || isMobileLayout()) return;

    const items = Array.from(container.querySelectorAll('.img-item'));
    if (!items.length) return;

    const styles = getComputedStyle(container);
    const gap = parseFloat(styles.getPropertyValue('--masonry-gap')) || 16;
    const columnWidth = (container.clientWidth - gap) / 2;
    const columnHeights = [0, 0];

    items.forEach(item => {
        const img = item.querySelector('img');
        const column = columnHeights[0] <= columnHeights[1] ? 0 : 1;
        const height = columnWidth * getMasonryImageRatio(img);
        const left = column * (columnWidth + gap);
        const top = columnHeights[column];

        item.style.left = `${left}px`;
        item.style.top = `${top}px`;
        item.style.width = `${columnWidth}px`;
        item.style.height = `${height}px`;

        columnHeights[column] += height + gap;
    });

    container.style.height = `${Math.max(...columnHeights) - gap}px`;
}

function scheduleMasonryLayout() {
    if (masonryRaf) cancelAnimationFrame(masonryRaf);
    masonryRaf = requestAnimationFrame(layoutMasonry);
}

function resizeFrame() {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
        const frame = document.getElementById('frame');
        if (!frame) return;
        if (isMobileLayout()) {
            const mobileHeight = Math.max(
                window.innerHeight + (IMAGE_CONFIG.length - 1) * MOBILE_WHEEL_STEP + 360,
                1720
            );
            frame.style.transform = 'none';
            frame.style.width = '';
            frame.style.removeProperty('--desktop-edge-gap');
            frame.style.removeProperty('--desktop-image-title-gap');
            frame.style.height = `${mobileHeight}px`;
            document.body.style.minHeight = `${mobileHeight}px`;
            return;
        }
        frame.style.transform = '';
        frame.style.width = '';
        frame.style.height = '';
        frame.style.removeProperty('--desktop-edge-gap');
        frame.style.removeProperty('--desktop-image-title-gap');
        document.body.style.minHeight = '';
        scheduleMasonryLayout();
    });
}

// ===================== 交互逻辑 =====================
function initInteraction() {
    const textItems = Array.from(document.querySelectorAll('.text-item'));
    const imgItems = Array.from(document.querySelectorAll('.img-item'));
    const numItems = Array.from(document.querySelectorAll('.img-number'));
    const mobileItems = Array.from(document.querySelectorAll('.mobile-project-item'));
    const mobileVisuals = Array.from(document.querySelectorAll('.mobile-project-visual'));
    const mobileTitleButtons = Array.from(document.querySelectorAll('.mobile-project-title'));
    const mobileGallery = document.querySelector('.mobile-project-gallery');
    const mobileGalleryTrack = document.querySelector('.mobile-project-gallery-track');
    const mobileTitleTrack = document.querySelector('.mobile-project-title-track');
    const blurLayer = document.getElementById('blurLayer');
    const hint = document.getElementById('hint');
    const frame = document.getElementById('frame');
    const detailImages = document.getElementById('projectDetailImages');
    const middleText = document.getElementById('middleText');

    let hoveredTarget = null;
    let expandedTarget = null;
    let mobileActiveTarget = null;
    let leaveTimer = null;
    let mobileScrollRaf = null;

    // ---------- 悬停预览 ----------
    function applyHoverState(targetIndex) {
        if (expandedTarget) return;
        blurLayer.className = 'blur-layer active-' + targetIndex;
        hint.classList.add('hidden');

        imgItems.forEach(img => {
            const isCurrent = img.getAttribute('data-index') === targetIndex;
            img.style.filter = isCurrent ? 'blur(0px)' : 'blur(12px)';
            img.style.opacity = isCurrent ? '1' : '0.4';
            img.style.transform = isCurrent ? 'scale(1)' : 'scale(0.98)';
            img.style.zIndex = isCurrent ? '60' : '10';
        });

        textItems.forEach(text => {
            const isCurrent = text.getAttribute('data-target') === targetIndex;
            text.style.opacity = isCurrent ? '1' : '0.4';
            text.style.fontWeight = isCurrent ? '700' : '300';
            text.style.filter = isCurrent ? 'blur(0px)' : 'blur(2px)';
            text.style.transform = isCurrent ? 'scale(1)' : 'scale(0.98)';
            text.style.zIndex = isCurrent ? '60' : '10';
        });

        numItems.forEach(num => {
            const isCurrent = num.closest('.img-item')?.getAttribute('data-index') === targetIndex;
            num.style.opacity = isCurrent ? '1' : '0.4';
            num.style.fontWeight = isCurrent ? '700' : '300';
        });

        mobileItems.forEach(item => {
            const isCurrent = item.getAttribute('data-index') === targetIndex;
            item.classList.toggle('is-active', isCurrent);
            item.classList.toggle('is-muted', !isCurrent);
        });
        mobileVisuals.forEach(item => {
            const isCurrent = item.getAttribute('data-index') === targetIndex;
            item.classList.toggle('is-active', isCurrent);
            item.classList.toggle('is-muted', !isCurrent);
        });
    }

    function resetHoverState() {
        if (expandedTarget) return;
        hoveredTarget = null;
        hint.classList.remove('hidden');
        blurLayer.className = 'blur-layer active-0';

        imgItems.forEach(img => {
            img.style.filter = 'blur(12px)';
            img.style.opacity = '0.4';
            img.style.transform = 'scale(0.98)';
            img.style.zIndex = '10';
        });
        textItems.forEach(text => {
            text.style.opacity = '0.4';
            text.style.fontWeight = '300';
            text.style.filter = 'blur(2px)';
            text.style.transform = 'scale(0.98)';
            text.style.zIndex = '10';
        });
        numItems.forEach(num => {
            num.style.opacity = '0.4';
            num.style.fontWeight = '300';
        });
        mobileItems.forEach(item => {
            item.classList.remove('is-active', 'is-muted', 'is-open');
        });
        mobileVisuals.forEach(item => {
            item.classList.remove('is-active', 'is-muted');
        });
    }

    function getMobileTitleCenters() {
        return mobileItems.map(item => item.offsetTop + item.offsetHeight / 2);
    }

    function getMobileVisualCenters() {
        return mobileVisuals.map(item => item.offsetTop + item.offsetHeight / 2);
    }

    function applyMobileActive(targetIndex) {
        if (!isMobileLayout() || !targetIndex) return;
        mobileActiveTarget = targetIndex;
        hoveredTarget = targetIndex;
        applyHoverState(targetIndex);
    }

    function updateMobileWheel() {
        if (!isMobileLayout() || expandedTarget || !mobileTitleTrack || !mobileGalleryTrack || mobileItems.length === 0) return;
        const maxIndex = mobileItems.length - 1;
        const progress = Math.max(0, Math.min(maxIndex, window.scrollY / MOBILE_WHEEL_STEP));
        const activeIndex = Math.max(0, Math.min(maxIndex, Math.round(progress)));
        const lowerIndex = Math.floor(progress);
        const upperIndex = Math.min(maxIndex, lowerIndex + 1);
        const localProgress = progress - lowerIndex;
        const centers = getMobileTitleCenters();
        const lowerCenter = centers[lowerIndex] ?? centers[0] ?? 0;
        const upperCenter = centers[upperIndex] ?? lowerCenter;
        const targetCenter = lowerCenter + (upperCenter - lowerCenter) * localProgress;
        const viewportCenter = mobileTitleTrack.parentElement.clientHeight / 2;

        mobileTitleTrack.style.transform = `translate3d(0, ${viewportCenter - targetCenter}px, 0)`;

        const visualCenters = getMobileVisualCenters();
        const lowerVisualCenter = visualCenters[lowerIndex] ?? visualCenters[0] ?? 0;
        const upperVisualCenter = visualCenters[upperIndex] ?? lowerVisualCenter;
        const visualTargetCenter = lowerVisualCenter + (upperVisualCenter - lowerVisualCenter) * localProgress;
        const visualViewportCenter = mobileGallery.clientHeight / 2;
        mobileGalleryTrack.style.transform = `translate3d(0, ${visualViewportCenter - visualTargetCenter}px, 0)`;

        const targetIndex = mobileItems[activeIndex]?.getAttribute('data-index');
        if (targetIndex && targetIndex !== mobileActiveTarget) {
            applyMobileActive(targetIndex);
        }
    }

    function scheduleMobileScrollUpdate() {
        if (mobileScrollRaf) cancelAnimationFrame(mobileScrollRaf);
        mobileScrollRaf = requestAnimationFrame(updateMobileWheel);
    }

    function scrollImageIntoView(targetIndex) {
        if (isMobileLayout()) return;
        const image = imgItems.find(img => img.getAttribute('data-index') === targetIndex);
        if (!image) return;

        const rect = image.getBoundingClientRect();
        const imageCenter = rect.top + rect.height / 2;
        const comfortTop = window.innerHeight * DESKTOP_SCROLL_COMFORT;
        const comfortBottom = window.innerHeight * (1 - DESKTOP_SCROLL_COMFORT);
        if (imageCenter >= comfortTop && imageCenter <= comfortBottom) return;

        const targetTop = window.scrollY + imageCenter - window.innerHeight / 2;
        const maxTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        window.scrollTo({
            top: Math.max(0, Math.min(targetTop, maxTop)),
            behavior: 'smooth'
        });
    }

    function scrollTitleIntoView(targetIndex) {
        if (isMobileLayout() || !middleText) return;
        const targetText = textItems.find(text => text.getAttribute('data-target') === targetIndex);
        if (!targetText) return;

        const containerRect = middleText.getBoundingClientRect();
        const textRect = targetText.getBoundingClientRect();
        const relativeTop = textRect.top - containerRect.top + middleText.scrollTop;

        middleText.scrollTo({
            top: Math.max(0, relativeTop - 20),
            behavior: 'smooth'
        });
    }

    function applyExpandedVisualState(targetIndex) {
        if (!targetIndex) return;
        imgItems.forEach(img => {
            const isCurrent = img.getAttribute('data-index') === targetIndex;
            if (isCurrent) {
                img.style.filter = 'blur(0px)';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.style.zIndex = '60';
            } else {
                img.style.filter = 'blur(14px)';
                img.style.opacity = '0.25';
                img.style.transform = 'scale(0.96)';
                img.style.zIndex = '10';
            }
        });

        textItems.forEach(text => {
            const isCurrent = text.getAttribute('data-target') === targetIndex;
            if (isCurrent) {
                text.style.opacity = '1';
                text.style.fontWeight = '700';
                text.style.filter = 'blur(0px)';
                text.style.transform = 'scale(1)';
                text.style.zIndex = '70';
            } else {
                text.style.opacity = '0.2';
                text.style.fontWeight = '300';
                text.style.filter = 'blur(2px)';
                text.style.transform = 'scale(0.98)';
                text.style.zIndex = '10';
            }
        });

        numItems.forEach(num => {
            const isCurrent = num.closest('.img-item')?.getAttribute('data-index') === targetIndex;
            num.style.opacity = isCurrent ? '1' : '0.4';
            num.style.fontWeight = isCurrent ? '700' : '300';
        });

        mobileItems.forEach(item => {
            const isCurrent = item.getAttribute('data-index') === targetIndex;
            item.classList.toggle('is-active', isCurrent);
            item.classList.toggle('is-muted', !isCurrent);
        });
    }

    function muteSideSections() {
        const aboutSection = document.querySelector('.about-section');
        const contactSection = document.querySelector('.contact-section');
        if (aboutSection) {
            aboutSection.style.filter = 'blur(10px) drop-shadow(0px 3px 10px rgba(0,0,0,0.3))';
            aboutSection.style.opacity = '0.3';
            aboutSection.style.pointerEvents = 'none';
        }
        if (contactSection) {
            contactSection.style.filter = 'blur(8px)';
            contactSection.style.opacity = '0.3';
        }
    }

    function restoreSideSections() {
        const aboutSection = document.querySelector('.about-section');
        const contactSection = document.querySelector('.contact-section');
        if (aboutSection) {
            aboutSection.style.filter = '';
            aboutSection.style.opacity = '';
            aboutSection.style.pointerEvents = '';
        }
        if (contactSection) {
            contactSection.style.filter = '';
            contactSection.style.opacity = '';
        }
    }

    // ---------- 展开 / 收起 ----------
    function expandProject(targetIndex) {
        clearTimeout(leaveTimer);

        if (expandedTarget && expandedTarget !== targetIndex) {
            document.querySelectorAll('.text-wrapper.is-expanded').forEach(w => w.classList.remove('is-expanded'));
        }

        expandedTarget = targetIndex;
        hoveredTarget = targetIndex;

        const wrapper = document.querySelector(`.text-wrapper[data-target="${targetIndex}"]`);
        if (wrapper) wrapper.classList.add('is-expanded');

        document.body.classList.add('project-expanded');
        frame.classList.add('project-expanded-frame');
        detailImages?.setAttribute('aria-hidden', 'false');
        hint.classList.add('hidden');

        applyExpandedVisualState(targetIndex);
        muteSideSections();
        scrollImageIntoView(targetIndex);
        scrollTitleIntoView(targetIndex);

        resizeFrame();
    }

    function collapseProject() {
        clearTimeout(leaveTimer);
        expandedTarget = null;
        document.body.classList.remove('project-expanded');
        frame.classList.remove('project-expanded-frame');
        detailImages?.setAttribute('aria-hidden', 'true');
        hint.classList.remove('hidden');

        document.querySelectorAll('.text-wrapper.is-expanded').forEach(w => w.classList.remove('is-expanded'));
        blurLayer.className = 'blur-layer active-0';

        imgItems.forEach(img => {
            img.style.filter = 'blur(12px)';
            img.style.opacity = '0.4';
            img.style.transform = 'scale(0.98)';
            img.style.zIndex = '10';
        });
        textItems.forEach(text => {
            text.style.opacity = '0.4';
            text.style.fontWeight = '300';
            text.style.filter = 'blur(2px)';
            text.style.transform = 'scale(0.98)';
            text.style.zIndex = '10';
        });
        numItems.forEach(num => {
            num.style.opacity = '0.4';
            num.style.fontWeight = '300';
        });
        mobileItems.forEach(item => {
            item.classList.remove('is-active', 'is-muted', 'is-open');
        });
        mobileVisuals.forEach(item => {
            item.classList.remove('is-active', 'is-muted');
        });

        restoreSideSections();
        resizeFrame();
    }

    // ---------- 事件绑定 ----------
    textItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const targetIndex = this.getAttribute('data-target');
            this.style.cursor = `url('${CURSOR_OPEN}'), auto`;

            if (expandedTarget) {
                if (expandedTarget !== targetIndex) {
                    collapseProject();
                    clearTimeout(leaveTimer);
                    hoveredTarget = targetIndex;
                    applyHoverState(targetIndex);
                }
                return;
            }

            if (hoveredTarget === targetIndex) return;
            clearTimeout(leaveTimer);
            hoveredTarget = targetIndex;
            applyHoverState(targetIndex);
        });

        item.addEventListener('mouseleave', function() {
            const targetIndex = this.getAttribute('data-target');
            this.style.cursor = `url('${CURSOR_CLOSED}'), auto`;
            leaveTimer = setTimeout(() => {
                if (hoveredTarget === targetIndex) resetHoverState();
            }, 80);
        });

        item.addEventListener('click', function() {
            const targetIndex = this.getAttribute('data-target');
            expandedTarget === targetIndex ? collapseProject() : expandProject(targetIndex);
        });
    });

    imgItems.forEach(item => {
        item.style.cursor = `url('${CURSOR_CLOSED}'), pointer`;

        item.addEventListener('mouseenter', function() {
            const targetIndex = this.getAttribute('data-index');
            this.style.cursor = `url('${CURSOR_OPEN}'), pointer`;

            if (expandedTarget) {
                if (expandedTarget !== targetIndex) {
                    collapseProject();
                    clearTimeout(leaveTimer);
                    hoveredTarget = targetIndex;
                    applyHoverState(targetIndex);
                }
                return;
            }
            applyHoverState(targetIndex);
        });

        item.addEventListener('mouseleave', function() {
            const targetIndex = this.getAttribute('data-index');
            this.style.cursor = `url('${CURSOR_CLOSED}'), pointer`;
            if (expandedTarget) return;
            leaveTimer = setTimeout(resetHoverState, 80);
        });

        item.addEventListener('click', function() {
            const targetIndex = this.getAttribute('data-index');
            expandedTarget === targetIndex ? collapseProject() : expandProject(targetIndex);
        });
    });

    document.getElementById('middleText').addEventListener('mouseleave', function() {
        clearTimeout(leaveTimer);
        if (expandedTarget) return;
        leaveTimer = setTimeout(() => { if (hoveredTarget) resetHoverState(); }, 100);
    });

    mobileItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!isMobileLayout()) return;
            applyMobileActive(this.getAttribute('data-index'));
        });
    });

    mobileTitleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.mobile-project-item');
            const targetIndex = item?.getAttribute('data-index');
            if (!targetIndex) return;
            window.scrollTo({
                top: mobileItems.findIndex(project => project.getAttribute('data-index') === targetIndex) * MOBILE_WHEEL_STEP,
                behavior: 'smooth'
            });
        });
    });

    mobileVisuals.forEach(item => {
        item.addEventListener('click', function() {
            const targetIndex = this.getAttribute('data-index');
            window.scrollTo({
                top: mobileItems.findIndex(project => project.getAttribute('data-index') === targetIndex) * MOBILE_WHEEL_STEP,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', scheduleMobileScrollUpdate, { passive: true });
    window.addEventListener('mobile-project-image-loaded', scheduleMobileScrollUpdate);
    window.addEventListener('resize', () => {
        resizeFrame();
        if (expandedTarget) {
            requestAnimationFrame(() => applyExpandedVisualState(expandedTarget));
        }
        scheduleMobileScrollUpdate();
    }, { passive: true });

    requestAnimationFrame(() => {
        applyMobileActive('1');
        scheduleMobileScrollUpdate();
    });
}

// ===================== 初始化 =====================
document.addEventListener('DOMContentLoaded', function() {
    buildImages();
    buildTexts();
    buildMobileProjects();
    buildProjectDetail();
    initInteraction();
    resizeFrame();
});