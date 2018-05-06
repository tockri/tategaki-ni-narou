const reader = $('#novel_honbun');
if (reader.length) {
    $('.novel_bn a').each((i, elem) => {
        const e = $(elem);
        const t = e.text();
        if (t.match(/>>/)) {
            e.text('<< ' + t.replace(/>>/, '')).addClass('js_next-link');
        } else if (t.match(/<</)) {
            e.text(t.replace(/<</, '') + ' >>').addClass('js_prev-link');
        }
    });
    reader.prepend($('#novel_p').remove())
    .prepend($('p.novel_subtitle').remove());
    new NovelReader({
        reader: reader,
        prevFunc: () => $('.js_prev-link').jump(),
        nextFunc: () => $('.js_next-link').jump(),
        bookmarkFunc: () => $('.set_siori:eq(0)').click(),
        myPageFunc: () => $('.userfavnovellist').jump()
    });
}