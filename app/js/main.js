// === SELECT ===
// Полифил для метода forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// select 
document.querySelectorAll('.select-wrapper').forEach(function(selectWrapper) {

    const selectBtn = selectWrapper.querySelector('.select-btn'),
        selectList = selectWrapper.querySelector('.select-list'),
        selectListItems = selectList.querySelectorAll('.select-list__item'),
        selectInput = selectWrapper.querySelector('.select-hidden');

    selectBtn.addEventListener('click', function() {
        selectList.classList.toggle('select-list--visible');
        selectBtn.classList.toggle('select-btn--active');
    });

    selectListItems.forEach(function(listItem) {
        listItem.addEventListener('click', function(e) {
            e.stopPropagation();
            selectBtn.innerText = this.innerText;
            selectInput.value = this.dataset.value;
            selectList.classList.remove('select-list--visible');
        });
    });
    // Нажатие снаружи select. Закрыть select
    document.addEventListener('click', function(e) {
        if (e.target !== selectBtn) {
            selectList.classList.remove('select-list--visible');
        }
    });
    // Нажатие Tab || Escape. Закрыть select
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            selectList.classList.remove('select-list--visible');
        }
    });

});
// === / SELECT ===

// === POPUP ===
const CLASS_LIST = {
    MODAL: 'popup-wrapper',
    MODAL_ACTIVE: 'popup--active',
    TRIGGER_OPEN: 'js-modal-open',
    TRIGGER_CLOSE: 'js-modal-close',
}

const showScroll = (event) => {
    if (event.propertyName === 'transform') {
        document.body.style.paddingRight = '';
        document.body.style.overflow = 'visible';
        event.target.closest(`.${CLASS_LIST.MODAL}`).removeEventListener('transitionend', showScroll);
    }
}

document.addEventListener('click', (event) => {
    // open popup
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();
        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const modalId = target.getAttribute('href').replace('#', '');
        const modal = document.getElementById(modalId);
        document.body.style.paddingRight = `${getScrollBarWidth()}px`;
        document.body.style.overflow = 'hidden';
        modal.classList.add(CLASS_LIST.MODAL_ACTIVE);
    }
    // close popup
    if (
        event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
        event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
    ) {
        event.preventDefault();
        const modal = event.target.closest(`.${CLASS_LIST.MODAL_ACTIVE}`);
        modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
        modal.addEventListener('transitionend', showScroll);
    }
});

const getScrollBarWidth = () => {
    const item = document.createElement('div');
    item.style.position = 'absolute';
    item.style.top = '-9999px';
    item.style.width = '50px';
    item.style.hight = '50px';
    item.style.overflow = 'scroll';
    item.style.visibility = 'hidden';
    document.body.appendChild(item);
    const scrollBarWidth = item.offsetWidth - item.clientWidth;
    document.body.removeChild(item);
    return scrollBarWidth;
}

// === / POPUP ===

// === TABS ===
document.querySelectorAll('.popup-content').forEach(function(popupContent) {

    const tabsBtn = popupContent.querySelectorAll('.popup-tab');
    const tabsItems = popupContent.querySelectorAll('.popup-tab__item');

    tabsBtn.forEach(onTabClick);

    document.querySelector('.popup-tab').click();

    function onTabClick(item) {
        item.addEventListener('click', function() {
            let currentBtn = item;
            let tabId = currentBtn.getAttribute("data-tab");
            let currentTab = popupContent.querySelector(tabId);
            if (!currentBtn.classList.contains('popup-tab--active')) {
                tabsBtn.forEach(function(item) {
                    item.classList.remove('popup-tab--active');
                });
                tabsItems.forEach(function(item) {
                    item.classList.remove('popup-tab__content--active');
                });
            }
            currentBtn.classList.add('popup-tab--active');
            currentTab.classList.add('popup-tab__content--active');
        });
    };
});

// === / TABS ===

// === SWIPER-SLIDER ===
let menu = ['2016', '2017', '2018', '2019', '2020', '2021']
let mySwiper = new Swiper('.history__slider-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },
    }
});
// === / SWIPER-SLIDER ===

// === TOGGLE MENU ===
const btn = document.querySelector('.btn-burger');
const nav = document.querySelector('.header-navigation--mobile');
const mainNavigation = document.getElementById('main-navigation');
const headerSection = document.querySelector('.section-header');
btn.addEventListener('click', function(event) {
    nav.classList.toggle('header-navigation--active');
    headerSection.classList.toggle('section-header--active');
    if (nav.classList.contains('header-navigation--active') || headerSection.classList.contains('section-header--active')) {
        hideScroll();
    } else {
        displayScroll();
    }
});
const hideScroll = () => {
    const scrollWidth = `${getScrollbarWidth()}px`;
    document.body.style.paddingRight = scrollWidth;
    document.body.style.overflow = 'hidden';
    mainNavigation.style.paddingRight = scrollWidth;
};

const displayScroll = () => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = 'visible';
    mainNavigation.style.paddingRight = '';
};

const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.overflow = 'scroll';
    outer.style.visibility = 'hidden';
    document.body.appendChild(outer);
    const ScrollBarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return ScrollBarWidth;
};

// === /TOGGLE MENU ===

// === RESULT SECTION ===
(function() {
    'use strict';
    const breakpoint = window.matchMedia('(min-width:900px)');
    let mySwiper;
    const breakpointChecker = function() {
        if (breakpoint.matches === true) {
            if (mySwiper !== undefined) mySwiper.destroy(true, true);
            return;
        } else if (breakpoint.matches === false) {
            return enableSwiper();
        }
    };
    const enableSwiper = function() {
        mySwiper = new Swiper('.result-container', {
            slidesPerView: '2',
            spaceBetween: 30,
            centeredSlides: true,
            a11y: true,

        });
    };
    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
})();
// === / RESULT SECTION ===