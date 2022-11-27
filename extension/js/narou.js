$(() => {
    const reader = $('#novel_honbun');
    if (reader.length) {
        const prepareHead = () => {
            $('head')
            .append('<link rel="preconnect" href="https://fonts.googleapis.com">')
            .append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>')
            .append('<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300&display=swap" rel="stylesheet">');
        }

        const prepareUpperPager = () => {
            const bn = $('.novel_bn:eq(0)');
            const up = $('<div class="tnn-pager">\
                            <div class="tnn-next"></div>\
                            <div class="tnn-no"></div>\
                            <div class="tnn-prev"></div>\
                        </div>');
            const prev = bn.children('a:contains("<<")');
            if (prev.length) {
                prev.text(prev.text().replace(/<</, '') + ' >>');
                up.children('.tnn-prev').append(prev);    
            }
            const next = bn.children('a:contains(">>")');
            if (next.length) {
                next.text('<< ' + next.text().replace(/>>/,''));
                up.children('.tnn-next').append(next);
            }
            const no = $('#novel_no');
            if (no.length) {
                up.children('.tnn-no').text(no.text());
                no.remove();
            }
            $('#novel_color').prepend(up);
            bn.remove();
        }

        const prepareBottomPager = () => {
            const bn = $('.novel_bn:eq(0)');
            const btm = $('<div class="tnn-pager">\
                            <div class="tnn-next"></div>\
                            <div class="tnn-no"></div>\
                            <div class="tnn-prev"></div>\
                        </div>');
            const prev = bn.children('a:contains("<<")');
            if (prev.length) {
                prev.text(prev.text().replace(/<</, '') + ' >>').addClass('js_prev-link');
                btm.children('.tnn-prev').append(prev);    
            }
            const next = bn.children('a:contains(">>")');
            if (next.length) {
                next.text('<< ' + next.text().replace(/>>/,'')).addClass('js_next-link');
                btm.children('.tnn-next').append(next);
            }
            const toc  = bn.children('a:contains("目次")');
            if (toc.length) {
                btm.children('.tnn-no').append(toc);
            }
            $('#novel_color').append(btm);
            bn.remove();
        }

        const prepareMain = () => {
            reader.prepend($('#novel_p')); // 前文
            reader.prepend($('p.novel_subtitle')); // 章タイトル
            reader.append($('#novel_a')); // あとがき
        }

        prepareHead();
        prepareUpperPager();
        prepareBottomPager();
        prepareMain();
        
        NovelReader(reader, {
            prevFunc: () => $('.js_prev-link').jump(),
            nextFunc: () => $('.js_next-link').jump(),
            bookmarkFunc: () => $('.set_siori:eq(0)').click(),
            myPageFunc: () => $('.list_menu_novelview_after:eq(0)>a').jump(),
            indexFunc: () => $('#container>.contents1>a:eq(0)').jump(),
            articleSelector: '#novel_honbun'
        });

        // <!-- avoid chromium bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1383753
        $('#novel_color').prepend('<div id="scroll-log" class="scroll-log"></div>');
        const scrollLog = $('#scroll-log').css({
            height: 1,
            width: 1,
            overflow: 'hidden',
            marginBottom: -1
        });
        reader.on('scroll', (e) => {
            scrollLog.text(`scroll=${reader[0].scrollLeft}`);
        })
        // -->
    }
});
