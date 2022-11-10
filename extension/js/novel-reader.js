$.fn.jump = function () {
    if (this[0] && this[0].href) {
        location.href = this[0].href;
    }
}
const NovelReader = (reader, conf) => {
    var locked = false;
    const scrollLeftBy = (h) => {
        if (!locked) {
            locked = true;
            const sl = reader.scrollLeft() - h;
            reader.animate({ scrollLeft: sl }, () => { locked = false });
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
    $(document).keydown((e) => {
        const func = mapping[e.which];
        if (func) {
            func(e);
            e.preventDefault();
            e.stopPropagation();
        }
    });
    rotateParentheses($(conf.articleSelector));
    reader.on('scroll', (e) => {
        if (reader.scrollLeft() < -2000 && reader.parent().css('padding-bottom') !== '1px') {
            reader.parent().css('padding-bottom', 1);
            console.log('repaint!');
        }
    });
};
