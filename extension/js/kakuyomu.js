$(() => {
    const reader = $('.js-episode-body');
    if (reader.length) {
        $(document).scrollTop(0);
        reader.prepend($('#contentMain-header'));
        NovelReader(reader, {
            prevFunc: () => $('#contentMain-previousEpisode>a').jump(),
            nextFunc: () => $('#contentMain-nextEpisode>a').jump(),
            bookmarkFunc: null,
            myPageFunc: () => location.href = 'https://kakuyomu.jp/my/antenna/works',
            indexFunc: () => $('#worksEpisodesEpisodeHeader-breadcrumbs a:first-child').jump(),
            articleSelector: '.widget-episodeBody'
        });
        // <!-- avoid chromium bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1383753
        $('.js-episode-body-container').prepend('<div id="scroll-log" class="scroll-log"></div>');
        const scrollLog = $('#scroll-log').css({
            height: 1,
            width: 1,
            overflow: 'hidden'
        });
        reader.on('scroll', (e) => {
            scrollLog.text(`scroll=${reader[0].scrollLeft}`);
        })
        // -->
    }
});

