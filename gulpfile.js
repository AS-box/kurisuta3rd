/*
src 参照元を指定
dest 出力さきを指定
watch ファイル監視
series(直列処理)とparallel(並列処理)
*/
const { src, dest, watch, series, parallel } = require('gulp');
// プラグインを呼び出し
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");    // PostCSS利用
const cssnext = require("postcss-preset-env");
const sourcemaps = require("gulp-sourcemaps");

//画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

//JSminify
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

//ejs
const ejs = require('gulp-ejs'); //ejsコンパイル

//サーバー起動
const webserver = require("gulp-webserver");
const GulpClient = require('gulp');

//postcss-cssnext ブラウザ対応条件 prefix 自動付与
const browsers = [
  'last 2 versions',
  '> 5%',
  'ie = 11',
  'not ie <= 10',
  'ios >= 8',
  'and_chr >= 5',
  'Android >= 5',
 ]

const path = {
  scss: 'src/scss/**/*.scss',
  image: './src/image/**/**/*.{jpg,png,gif,svg}',
  js: 'src/js/*.js',
  ejs:'src/ejs/**/',
 }

// プラグインの処理をまとめる
const Sass = () => {
  return src(path.scss) //コンパイル元
    .pipe(sourcemaps.init())//gulp-sourcemapsを初期化
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([cssnext(browsers)]))
    .pipe(sourcemaps.write('/maps'))
    .pipe(dest('dist/css'))     //コンパイル先
}

//画像圧縮（デフォルトの設定）
const imgImagemin = () => {
  return src(path.image)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 80
          }),
          imageminPngquant(),
          imageminSvgo()
        ]
      )
    )
    .pipe(dest('./dist/image/'))
}

const JSminify = () => {
  return src(path.js,'!'+path.js)
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest('./dist/'));
}
 
const server = () => {
  return src('dist')
    .pipe(webserver({
      livereload: true,
      open:true
  }))
}

const htmlFunc = () => {
  return src([path.ejs + '*.ejs', '!' + path.ejs + '_*.ejs'])
    .pipe(ejs({}, {}))
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('./dist/'))
}

const Watch = () => {
  watch(path.scss,series(Sass))
  watch(path.image, series(imgImagemin))
  watch(path.js, series(JSminify))
  watch(path.ejs+'*.ejs',series(htmlFunc))
}
 // タスクをまとめて実行
exports.default = series(series(Sass,imgImagemin,server,JSminify,htmlFunc),parallel(Watch));