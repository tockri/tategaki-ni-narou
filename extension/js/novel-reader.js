
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
        const VK_M = 77;
        const mapping = {}
        mapping[VK_SPACE] = (e) => e.shiftKey ? this.pageUp() : this.pageDown();
        mapping[VK_PAGEUP] = this.pageUp.bind(this);
        mapping[VK_PAGEDOWN] = this.pageDown.bind(this);
        mapping[VK_RIGHT] = (e) => e.shiftKey ? this.pageUp(0.5) : this.scrollLeftBy(-200);
        mapping[VK_LEFT] = (e) => e.shiftKey ? this.pageDown(0.5) : this.scrollLeftBy(200);
        mapping[VK_HOME] = (e) => this.scrollLeftBy(99999);
        mapping[VK_END] = (e) => this.scrollLeftBy(-99999);
        mapping[VK_P] = this.prevFunc;
        mapping[VK_N] = this.nextFunc;
        mapping[VK_B] = this.bookmarkFunc;
        mapping[VK_M] = this.myPageFunc;
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
