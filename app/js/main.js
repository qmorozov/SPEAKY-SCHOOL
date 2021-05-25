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
const btn = document.querySelector('.btn-burger'),
    nav = document.querySelector('.header-navigation--mobile'),
    mainNavigation = document.getElementById('main-navigation'),
    headerSection = document.querySelector('.section-header');
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

// === PACKAGES ===
document.querySelectorAll('.packages__content-item').forEach(function(item) {
    const circle = item.querySelector('.packages__content-item-circle');
    circle.addEventListener('click', function() {
        item.classList.toggle('packages__content-item--active');
    });
});
/////////////////////////////////////////////////////////////////////////////
const duration = document.querySelector('.packages__content-item-duration'),
    label = document.querySelectorAll('.packages__lesson-radio-label'),
    time = document.querySelector('.packages__content-item-time'),
    range = document.querySelectorAll('.packages__content-item-circle'),
    box = document.querySelectorAll('.packages__content-item'),
    itemTitleViewTeaching = document.querySelector('.packages__content-item-title--view-teaching'),
    itemTitleViewTraining = document.querySelector('.packages__content-item-title--view-training'),
    itemTitleViewDuration = document.querySelector('.packages__content-item-title--view-duration');

const offline = document.getElementById('lesson-offline'),
    online = document.getElementById('lesson-online'),
    individual = document.getElementById('lesson-individual'),
    group = document.getElementById('lesson-group'),
    spoken = document.getElementById('lesson-spoken'),
    thirty = document.getElementById('lesson-thirty-minutes'),
    sixty = document.getElementById('lesson-sixty-minutes');


// === CARD ===
const cardTime = document.querySelectorAll('.packages-card__time'),
    cardPrice = document.querySelectorAll('.packages-card__price'),
    cards = document.querySelector('.packages__content-item-cards');

document.querySelectorAll('.packages__lesson-radio').forEach(function(item) {
    item.addEventListener('click', function() {

        ///////////////////////////////////////////////////////////////

        if (thirty.checked || sixty.checked) {
            range[2].classList.add('packages__content-item-circle--checked');
        };

        // === GENERAL ===

        if (online.checked || offline.checked) {
            range[0].classList.add('packages__content-item-circle--checked');
            box[1].classList.add('packages__content-item--active');
        };

        if (individual.checked || group.checked || spoken.checked) {
            box[2].classList.add('packages__content-item--active');
            range[1].classList.add('packages__content-item-circle--checked');
        };

        ////////////

        if (individual.checked) {
            itemTitleViewTraining.innerHTML = 'Индивидуально';
        } else if (group.checked) {
            itemTitleViewTraining.innerHTML = 'В группе';
        } else if (spoken.checked) {
            itemTitleViewTraining.innerHTML = 'Разговорный клуб';
        };

        if (thirty.checked) {
            itemTitleViewDuration.innerHTML = '30 мин';
            range[2].classList.add('packages__content-item-circle--checked');
        } else if (sixty.checked) {
            itemTitleViewDuration.innerHTML = '60 мин';
        };

        // === OFFLINE ===

        if (offline.checked) {
            label[3].style.display = 'block';
            itemTitleViewTeaching.innerHTML = 'Офлайн';
            time.classList.remove('packages__content-item-time--visible');
        };

        if (offline.checked && individual.checked || group.checked || spoken.checked) {
            duration.innerHTML = '60 минут';
            range[2].classList.add('packages__content-item-circle--checked');
            itemTitleViewDuration.innerHTML = 'Длительность: 60 мин';
        };

        // === ONLINE ===

        if (online.checked) {
            itemTitleViewTeaching.innerHTML = 'Онлайн';
            label[3].style.display = 'none';
        };

        if (online.checked && individual.checked) {
            duration.innerHTML = '';
            time.classList.remove('packages__content-item-time--visible');
            time.classList.add('packages__content-item-time--visible');
        } else if (online.checked && spoken.checked) {
            duration.innerHTML = '60 минут';
            time.classList.remove('packages__content-item-time--visible');
        };

        ////////////////////////////////////////////////////////////////////
        // === OFFLINE CARD ===

        if (offline.checked && individual.checked && itemTitleViewDuration.innerHTML == 'Длительность: 60 мин') {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 60 мин';
            cardPrice[0].innerHTML = '5400 ₽';

            cardTime[1].innerHTML = '8 занятий по 60 мин';
            cardPrice[1].innerHTML = '10800 ₽';

            cardTime[2].innerHTML = '12 занятий по 60 мин';
            cardPrice[2].innerHTML = '16200 ₽';
        };

        if (offline.checked && group.checked && itemTitleViewDuration.innerHTML == 'Длительность: 60 мин') {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 60 мин';
            cardPrice[0].innerHTML = '4300 ₽';

            cardTime[1].innerHTML = '8 занятий по 60 мин';
            cardPrice[1].innerHTML = '7900 ₽';

            cardTime[2].innerHTML = '12 занятий по 60 мин';
            cardPrice[2].innerHTML = '11850 ₽';
        };

        if (offline.checked && spoken.checked && itemTitleViewDuration.innerHTML == 'Длительность: 60 мин') {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 60 мин';
            cardPrice[0].innerHTML = '3600 ₽ ';

            cardTime[1].innerHTML = '8 занятий по 60 мин';
            cardPrice[1].innerHTML = '6800 ₽';

            cardTime[2].innerHTML = '12 занятий по 60 мин';
            cardPrice[2].innerHTML = '11850 ₽';
        };

        // === ONLINE CARD ===

        if (online.checked && individual.checked && thirty.checked) {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 30 мин';
            cardPrice[0].innerHTML = '3400 ₽';

            cardTime[1].innerHTML = '8 занятий по 30 мин';
            cardPrice[1].innerHTML = '6800 ₽';

            cardTime[2].innerHTML = '12 занятий по 30 мин';
            cardPrice[2].innerHTML = '10200  ₽';
        };

        if (online.checked && individual.checked && sixty.checked) {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 60 мин';
            cardPrice[0].innerHTML = '5400 ₽';

            cardTime[1].innerHTML = '8 занятий по 60 мин';
            cardPrice[1].innerHTML = '10800 ₽';

            cardTime[2].innerHTML = '12 занятий по 60 мин';
            cardPrice[2].innerHTML = '16200  ₽';
        };

        if (online.checked && spoken.checked && itemTitleViewDuration.innerHTML === 'Длительность: 60 мин') {
            cards.classList.add('packages__content-item-cards--active');

            cardTime[0].innerHTML = '4 занятия по 60 мин';
            cardPrice[0].innerHTML = '5400 ₽';

            cardTime[1].innerHTML = '8 занятий по 60 мин';
            cardPrice[1].innerHTML = '4800 ₽';

            cardTime[2].innerHTML = '12 занятий по 60 мин';
            cardPrice[2].innerHTML = '16200  ₽';
        };
        /////////////////////////////////////////////////////

        if (document.documentElement.clientWidth <= 700) {

            if (range[0].classList.contains('packages__content-item-circle--checked')) {
                if (box[0].classList.contains('packages__content-item--active')) {
                    box[0].classList.remove('packages__content-item--active');
                };
            };

            if (range[1].classList.contains('packages__content-item-circle--checked')) {
                if (box[1].classList.contains('packages__content-item--active')) {
                    box[1].classList.remove('packages__content-item--active');
                };
            };

            if (range[2].classList.contains('packages__content-item-circle--checked')) {
                if (box[2].classList.contains('packages__content-item--active')) {
                    box[2].classList.remove('packages__content-item--active');
                };
            };

        };

        if (document.documentElement.clientWidth >= 700) {

            if (range[0].classList.contains('packages__content-item-circle--checked')) {
                if (box[0].classList.contains('packages__content-item--active')) {
                    box[0].classList.add('packages__content-item--active');
                };
            };

            if (range[1].classList.contains('packages__content-item-circle--checked')) {
                if (box[1].classList.contains('packages__content-item--active')) {
                    box[1].classList.add('packages__content-item--active');
                };
            };

            if (range[2].classList.contains('packages__content-item-circle--checked')) {
                if (box[2].classList.contains('packages__content-item--active')) {
                    box[2].classList.add('packages__content-item--active');
                };
            };

        };
        //////////////////////////////////////////////////////////////
    });
});

// === PACKAGES ===

// === TABS ===
class Tabs {
    constructor(root) {
        this.root = root;
        this.list = this.root.querySelector(':scope > [data-list]');
        this.buttons = new Map([...this.list.querySelectorAll(':scope > [data-target]')]
            .map(entry => [
                entry.dataset.target,
                entry,
            ])
        );
        this.containers = new Map([...this.root.querySelectorAll(':scope > [data-tab]')]
            .map(entry => [entry.dataset.tab, entry])
        );
        this.salt = Math.random().toString(36).slice(2);
        this.current = null;
        this.active = null;
    }
    select(name) {
        const keys = [...this.buttons.keys()];
        for (let [key, button] of this.buttons.entries()) {
            button.setAttribute('aria-selected', key === name);
        }
        for (let [key, container] of this.containers.entries()) {
            if (key === name) {
                container.removeAttribute('hidden');
            } else {
                container.setAttribute('hidden', true);
            }
        }
        this.active = keys.indexOf(name);
    }
    init() {
        const keys = [...this.buttons.keys()];
        this.list.setAttribute('role', 'tablist');
        this.list.addEventListener('keydown', event => {
            if (event.code === 'Home') {
                event.preventDefault();
                this.buttons.get(keys[0]).focus();
            }
            if (event.code === 'End') {
                event.preventDefault();
                this.buttons.get(keys[keys.length - 1]).focus();
            }
            if (event.code === 'ArrowLeft') {
                event.preventDefault();
                this.buttons.get(keys[Math.max(0, this.current - 1)]).focus();
            }
            if (event.code === 'ArrowRight') {
                event.preventDefault();
                this.buttons.get(keys[Math.min(keys.length - 1, this.current + 1)]).focus();
            }
        });
        for (let [key, button] of this.buttons.entries()) {
            button.setAttribute('tabindex', '0');
            button.setAttribute('id', `button_${this.salt}_${key}`);
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-controls', `container_${this.salt}_${key}`);
            button.addEventListener('click', event => {
                event.preventDefault();
                this.select(key);
            });
            button.addEventListener('focus', event => {
                this.current = keys.indexOf(key);
            });
            button.addEventListener('keypress', event => {
                if (event.code === 'Enter' || event.code === 'Space') {
                    event.preventDefault();
                    this.select(key);
                }
            });
        }
        for (let [key, container] of this.containers.entries()) {
            container.setAttribute('id', `container_${this.salt}_${key}`);
            container.setAttribute('role', 'tabpanel');
            container.setAttribute('aria-labelledby', `button_${this.salt}_${key}`);
        }
        this.select(keys[0]);
    }
    static create(element) {
        const instance = new Tabs(element);
        instance.init();
        return instance;
    }
}
const containers = document.querySelectorAll('[data-tabs]');
for (let container of containers) {
    const tabs = Tabs.create(container);
    //  console.log(tabs)
}

// === / TABS ===