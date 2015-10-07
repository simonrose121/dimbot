var gulp = require('gulp');

gulp.task('annotate', function() {
	return gulp.src('src/app.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});
