const reader = $('.js-episode-body');
if (reader.length) {
    $(document).scrollTop(0);
    reader.prepend($('#contentMain-header').remove());
    new NovelReader({
        reader: reader,
        prevFunc: () => $('#contentMain-previousEpisode>a').jump(),
        nextFunc: () => $('#contentMain-nextEpisode>a').jump(),
        bookmarkFunc: null
    });
}
