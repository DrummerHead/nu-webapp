const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

const sourceStream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const rollupify = require('rollupify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');

const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');


// Style
// =======================

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});


// Style minification
// -----------------------

gulp.task('styles-min', ['styles'], () => {
  return gulp.src('.tmp/styles/main.css')
    .pipe($.cssnano({
      safe: true,
      autoprefixer: false,
    }))
    .pipe(gulp.dest('dist/styles'));
});


// Style linting
// -----------------------

gulp.task('sass-lint', () =>
  gulp.src('app/styles/**/*.scss')
    .pipe($.sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
);

gulp.task('scss-lint', ['sass-lint']);


// JavaScript
// =======================

const browserifyBabelify = ({ sourceFile = 'main', watch = true } = {}) => {
  const rebundle = bundler => {
    return bundler.bundle()
      .on('error', err => {
        $.util.error(err);
        this.emit('end');
      })
      .pipe(sourceStream(`${sourceFile}.js`))
      .pipe(buffer())
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./.tmp/scripts'))
      .pipe(reload({ stream: true }));
  };

  if (watch) {
    const bundler = watchify(
      browserify(`./app/scripts/${sourceFile}.js`, { debug: true })
        .transform(babelify)
    );
    rebundle(bundler);
    bundler.on('update', () => {
      $.util.log('browserify bundling...');
      rebundle(bundler);
    });
  } else {
    const bundler = browserify(`./app/scripts/${sourceFile}.js`, { debug: true })
      .transform(rollupify)
      .transform(babelify)
      .transform(uglifyify);

    return rebundle(bundler);
  }
};

gulp.task('scripts-build', () => browserifyBabelify({ watch: false }));

gulp.task('scripts-watch', () => browserifyBabelify());


// JavaScript minification
// -----------------------

gulp.task('scripts-min', ['scripts-build'], () => {
  return gulp.src('.tmp/scripts/main.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/scripts'));
});



// JavaScript linting
// -----------------------


// HTML
// =======================


// HTML minification
// -----------------------

gulp.task('html-min', () => {
  return gulp.src('app/*.html')
    .pipe($.htmlmin({
      collapseWhitespace: true,
      quoteCharacter: "'",
    }))
    .pipe(gulp.dest('dist'));
});


// HTML linting
// -----------------------


// Image optimization
// =======================

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});


// Helper
// =======================

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));


// Serving
// =======================

gulp.task('serve', ['styles', 'scripts-watch'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});


// Building
// =======================

gulp.task('build', ['html-min', 'images', 'styles-min', 'scripts-min', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});


// Default
// =======================

