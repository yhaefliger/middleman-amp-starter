var gulp = require('gulp-help')(require('gulp')),
  postcss = require('gulp-postcss');

var
  dest         = '.tmp/',   // The "hot" build folder used by Middleman's external pipeline
  css_source   = 'css/**/*.css';
  css_dest     = dest+'css/';

gulp.task('postcss', 'build postcss files', function() {
  const plugins = [
    require('postcss-import')(),
    require('autoprefixer')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-custom-properties')(),
    require('postcss-discard-comments')(),
    require('postcss-custom-media')(),
    require('cssnano')({zindex: false}),
  ];
  const replace = require('gulp-replace');
  const options = {};
  return gulp.src(css_source)
    .pipe(postcss(plugins, options))
    .pipe(replace('!important', ''))
    .pipe(gulp.dest(css_dest))
});

gulp.task('build', ['postcss']);

gulp.task('watch', function(){
  gulp.watch('css/**/*.css', ['postcss']);
})
