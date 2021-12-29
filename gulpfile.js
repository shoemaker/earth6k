var _ = require('lodash'),
    gulp = require('gulp');

var assets = [
    {
        source: './node_modules/@fortawesome/fontawesome-free/**/*',
        destination: './public/library/fontawesome'
    }
];

/**
 * Copy files that don't require any processing, or where the destination doesn't match the source. 
 */
 function copyAssets(done) {
    _.forEach(assets, function(path) {
        gulp.src(path.source)
        .pipe(gulp.dest(path.destination));
    });
    
    done();
}

/**
 * Define all the Tasks we want Gulp to handle. 
 */
gulp.task('build',
    gulp.series(copyAssets)
);

