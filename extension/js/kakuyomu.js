const reader = $('.js-episode-body');
if (reader.length) {
    $(document).scrollTop(0);
    reader.prepend($('#contentMain-header').remove());
    NovelReader(reader, {
        prevFunc: () => $('#contentMain-previousEpisode>a').jump(),
        nextFunc: () => $('#contentMain-nextEpisode>a').jump(),
        bookmarkFunc: null,
        myPageFunc: () => location.href = 'https://kakuyomu.jp/my/antenna/works',
        indexFunc: () => $('#worksEpisodesEpisodeHeader-breadcrumbs a:first-child').jump()
    });
}
