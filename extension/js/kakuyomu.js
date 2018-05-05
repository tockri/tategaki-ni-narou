const reader = $('.js-episode-body');
if (reader.length) {
    new NovelReader({
        reader: reader,
        prevFunc: () => $('#contentMain-previousEpisode>a').jump(),
        nextFunc: () => $('#contentMain-nextEpisode>a').jump(),
        bookmarkFunc: null
    });
}
