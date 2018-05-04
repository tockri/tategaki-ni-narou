const honbun = $('#novel_honbun');
if (honbun.length) {
    const VK_SPACE = 32;
    const VK_HOME = 36;
    const VK_END = 35;
    const VK_RIGHT = 39;
    const VK_LEFT = 37;
    const VK_PAGEDOWN = 34;
    const VK_PAGEUP = 33;
    const VK_N = 78;
    const VK_P = 80;
    const VK_B = 66;

    const scrollLeftBy = (h) => {
        const sl = honbun.scrollLeft() - h;
        honbun.animate({scrollLeft: sl});
    }
    const pageUp = () => {
        const pw = honbun.width() - 50;
        scrollLeftBy(-pw);
    }
    const pageDown = () => {
        const pw = honbun.width() - 50;
        scrollLeftBy(pw);
    }
    const stop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const jump = (i, a) => {
        location.href = a.href;
    }
    const mapping = {};
    mapping[VK_SPACE] = (e) => {
        if (e.shiftKey) {
            pageUp();
        } else {
            pageDown();
        }
    };
    mapping[VK_PAGEUP] = pageUp;
    mapping[VK_PAGEDOWN] = pageDown;
    mapping[VK_RIGHT] = (e) => e.shiftKey ? pageUp() : scrollLeftBy(-200);
    mapping[VK_LEFT] = (e) => e.shiftKey ? pageDown() : scrollLeftBy(200);
    mapping[VK_HOME] = (e) => scrollLeftBy(99999);
    mapping[VK_END] = (e) => scrollLeftBy(-99999);
    mapping[VK_P] = (e) => $('.js_prev-link:eq(0)').each(jump);
    mapping[VK_N] = (e) => $('.js_next-link:eq(0)').each(jump);
    mapping[VK_B] = (e) => $('.set_siori:eq(0)').click();

    $(document).scrollTop(honbun.offset().top - 100)
    .keydown((e) => {
        const func = mapping[e.which];
        if (func) {
            func(e);
            stop(e);
        }
    });
    $('.novel_bn a').each((i, elem) => {
        const e = $(elem);
        const t = e.text();
        if (t.match(/>>/)) {
            e.text('<< ' + t.replace(/>>/, '')).addClass('js_next-link');
        } else if (t.match(/<</)) {
            e.text(t.replace(/<</, '') + ' >>').addClass('js_prev-link');
        }
    });
}