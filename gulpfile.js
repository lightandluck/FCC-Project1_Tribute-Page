var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');

gulp.task('webserver', () => {
    connect.server({
        root: 'build',
        livereload: true,
        port: 9002
    });
});

gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build/'))
});

gulp.task('js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./build/js/'))
});

gulp.task('css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('json', () => {
    return gulp.src('./src/data/*.json')
        .pipe(gulp.dest('./build/data/'))
})

gulp.task('watch', () => {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/data/*.json', ['json'])
})

gulp.task('reload', () => {
        watch(['build/index.html', 'build/js/*.js', 'build/css/*.css', 'build/data/*.json'])
        .pipe(connect.reload());
})

gulp.task('default', ['webserver', 'html', 'js', 'css', 'json', 'watch', 'reload']);