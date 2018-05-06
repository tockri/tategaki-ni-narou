
$.fn.jump = function() {
    if (this[0] && this[0].href) {
        location.href = this[0].href;
    }
}

class NovelReader {
    constructor(conf) {
        this.reader = conf.reader;
        this.prevFunc = conf.prevFunc;
        this.nextFunc = conf.nextFunc;
        this.bookmarkFunc = conf.bookmarkFunc;
        this.myPageFunc = conf.myPageFunc;
        this._initKeyMap();
    }
    scrollLeftBy(h) {
        if (!this.locked) {
            this.locked = true;
            const sl = this.reader.scrollLeft() - h;
            this.reader.animate({scrollLeft: sl}, () => {this.locked = false});
        }
    }
    pageUp(rate = 1.0) {
        const pw = this.reader.width() - 50;
        this.scrollLeftBy(-pw * rate);
    }
    pageDown(rate = 1.0) {
        const pw = this.reader.width() - 50;
        this.scrollLeftBy(pw * rate);
    }
    _initKeyMap() {
        const mapping = {
            // SPACE
            32: (e) => e.shiftKey ? this.pageUp() : this.pageDown(),
            // PAGEUP
            33: (e) => this.pageUp(),
            // PAGEDOWN
            34: (e) => this.pageDown(),
            // END
            35: (e) => this.scrollLeftBy(-99999),
            // HOME
            36: (e) => this.scrollLeftBy(99999),
            // LEFT
            37: (e) => e.shiftKey ? this.pageDown(0.5) : this.scrollLeftBy(200),
            // RIGHT
            39: (e) => e.shiftKey ? this.pageUp(0.5) : this.scrollLeftBy(-200),
            // B
            66: this.bookmarkFunc,
            // N
            78: this.nextFunc,
            // M
            77: this.myPageFunc,
            // P
            80: this.prevFunc
        }
        $(document).keydown((e) => {
            const func = mapping[e.which];
            if (func) {
                func(e);
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }
}
