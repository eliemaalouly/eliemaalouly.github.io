document.addEventListener('DOMContentLoaded', function () {
    const masthead = document.querySelector('.masthead');
    const body = document.body;

    if (body.classList.contains('masthead-fixed')) {
        return;
    }

    if (body.classList.contains('masthead-relative')) {
        return;
    }

    let lastScrollTop = 0;
    const DOWN_SCROLL_THRESHOLD = 75;
    const UP_SCROLL_THRESHOLD = 100;
    const DOWN_SCROLL_HIDE_THRESHOLD = 100;
    let scrollUpAmount = 0;
    let scrollDownAmount = 0;
    let isInPageNavigation = false;
    let inPageNavigationTimer = null;

    document.addEventListener('click', function (e) {
        const link = e.target.closest('a');
        if (link && link.hash && link.hostname === window.location.hostname && link.pathname === window.location.pathname) {
            isInPageNavigation = true;
            masthead.classList.add('masthead--hidden');

            if (inPageNavigationTimer) {
                clearTimeout(inPageNavigationTimer);
            }

            inPageNavigationTimer = setTimeout(function () {
                isInPageNavigation = false;
            }, 1000);
        }
    });

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (isInPageNavigation) {
            masthead.classList.add('masthead--hidden');
            return;
        }

        if (scrollTop <= DOWN_SCROLL_THRESHOLD) {
            masthead.classList.remove('masthead--hidden');
            scrollUpAmount = 0;
            scrollDownAmount = 0;
        }
        else if (scrollTop > lastScrollTop) {
            scrollDownAmount += (scrollTop - lastScrollTop);
            scrollUpAmount = 0;

            if (scrollDownAmount >= DOWN_SCROLL_HIDE_THRESHOLD) {
                masthead.classList.add('masthead--hidden');
            }
        }
        else {
            scrollUpAmount += (lastScrollTop - scrollTop);
            scrollDownAmount = 0;

            if (scrollUpAmount >= UP_SCROLL_THRESHOLD) {
                masthead.classList.remove('masthead--hidden');
            }
        }

        lastScrollTop = scrollTop;
    }, { passive: true });

    masthead.classList.remove('masthead--hidden');
});