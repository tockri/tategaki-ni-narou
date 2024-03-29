$.fn.jump = function () {
    if (this[0] && this[0].href) {
        location.href = this[0].href;
    }
}
const NovelReader = (reader, conf) => {
    let locked = false;
    const scrollLeftBy = (h) => {
        if (!locked) {
            locked = true;
            const sl = reader.scrollLeft() - h;
            reader.animate({ scrollLeft: sl }, () => { locked = false });
        }
    }
    const pageUp = (rate = 1.0) => {
        const rw = reader.width();
        const pw = rw * (rw >= 360 ? 0.96 : 3.5);
        scrollLeftBy(-pw * rate);
    }
    const pageDown = (rate = 1.0) => {
        const rw = reader.width();
        const pw = rw * (rw >= 360 ? 0.96 : 3.5);
        scrollLeftBy(pw * rate);
    }
    const rotateParentheses = ($elem) => {
        const html = $elem.html();
        $elem.html(html.replace(/[（）｛｝〔〕【】《》〈〉「」『』［］]/g, (m) => {
            switch (m) {
                case '（':
                    return '︵';
                case '）':
                    return '︶';
                case '｛':
                    return '︷';
                case '｝':
                    return '︸';
                case '〔':
                    return '︹';
                case '〕':
                    return '︺';
                case '【':
                    return '︻';
                case '】':
                    return '︼';
                case '《':
                    return '︽';
                case '》':
                    return '︾';
                case '〈':
                    return '︿';
                case '〉':
                    return '﹀';
                case '「':
                    return '﹁';
                case '」':
                    return '﹂';
                case '『':
                    return '﹃';
                case '』':
                    return '﹄';
                case '［':
                    return '﹇';
                case '］':
                    return '﹈';
            }
        }));
    }
    const mapping = {
        // SPACE
        32: (e) => e.shiftKey ? pageUp() : pageDown(),
        // PAGEUP
        33: (e) => pageUp(),
        // PAGEDOWN
        34: (e) => pageDown(),
        // END
        35: (e) => scrollLeftBy(-99999),
        // HOME
        36: (e) => scrollLeftBy(99999),
        // LEFT
        37: (e) => e.shiftKey ? pageDown(0.5) : scrollLeftBy(200),
        // RIGHT
        39: (e) => e.shiftKey ? pageUp(0.5) : scrollLeftBy(-200),
        // B
        66: conf.bookmarkFunc,
        // N
        78: conf.nextFunc,
        // M
        77: conf.myPageFunc,
        // P
        80: conf.prevFunc,
        // L
        76: conf.indexFunc,
        // Z
        90: (e) => pageDown(0.5),
        // X
        88: (e) => pageUp(0.5)
    };
    $(document).on('keydown', (e) => {
        const func = mapping[e.which];
        if (func) {
            func(e);
            e.preventDefault();
            e.stopPropagation();
        }
    });
    reader.before(
        '<div class="tategaki-left"></div><div class="tategaki-right"></div>'
    );
    $(document).on('click', (e) => {
        if (e.target.className === 'tategaki-left') {
            pageDown(0.5);
        } else if (e.target.className === 'tategaki-right') {
            pageUp(0.5);
        }
    });
    rotateParentheses($(conf.articleSelector));
};
