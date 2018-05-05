const reader = $('.js-episode-body');
if (reader.length) {
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

    var locked = false;
    const scrollLeftBy = (h) => {
        if (!locked) {
            locked = true;
            const sl = reader.scrollLeft() - h;
            reader.animate({scrollLeft: sl}, () => {locked = false});
        }
    }
    const pageUp = (rate = 1.0) => {
        const pw = reader.width() - 50;
        scrollLeftBy(-pw * rate);
    }
    const pageDown = (rate = 1.0) => {
        const pw = reader.width() - 50;
        scrollLeftBy(pw * rate);
    }
    const stop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const jump = (i, a) => {
        location.href = a.href;
    }
    const mapping = {};
    mapping[VK_SPACE] = (e) => e.shiftKey ? pageUp() : pageDown();
    mapping[VK_PAGEUP] = pageUp;
    mapping[VK_PAGEDOWN] = pageDown;
    mapping[VK_RIGHT] = (e) => e.shiftKey ? pageUp(0.5) : scrollLeftBy(-200);
    mapping[VK_LEFT] = (e) => e.shiftKey ? pageDown(0.5) : scrollLeftBy(200);
    mapping[VK_HOME] = (e) => scrollLeftBy(99999);
    mapping[VK_END] = (e) => scrollLeftBy(-99999);
    mapping[VK_P] = (e) => $('#contentMain-previousEpisode>a:eq(0)').each(jump);
    mapping[VK_N] = (e) => $('#contentMain-nextEpisode>a:eq(0)').each(jump);

    $(document).scrollTop(reader.offset().top - 100)
    .keydown((e) => {
        const func = mapping[e.which];
        if (func) {
            func(e);
            stop(e);
        }
    });
}