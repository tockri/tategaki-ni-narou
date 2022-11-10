$(() => {
    const reader = $('#novel_honbun');
    if (reader.length) {
        $('head')
            .append('<link rel="preconnect" href="https://fonts.googleapis.com">')
            .append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
            .append('<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap" rel="stylesheet">');

        $('.novel_bn a').each((i, elem) => {
            const e = $(elem);
            const t = e.text();
            if (t.match(/>>/)) {
                e.text('<< ' + t.replace(/>>/, '')).addClass('js_next-link').show();
            } else if (t.match(/<</)) {
                e.text(t.replace(/<</, '') + ' >>').addClass('js_prev-link').show();
            }
        })
        reader.prepend($('#novel_p'))
            .prepend($('p.novel_subtitle'))
            .append($('#novel_a'));
        NovelReader(reader, {
            prevFunc: () => $('.js_prev-link').jump(),
            nextFunc: () => $('.js_next-link').jump(),
            bookmarkFunc: () => $('.set_siori:eq(0)').click(),
            myPageFunc: () => $('.list_menu_novelview_after:eq(0)>a').jump(),
            indexFunc: () => $('#container>.contents1>a:eq(0)').jump(),
            articleSelector: '#novel_honbun'
        });
    }
});
