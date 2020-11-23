
const gulp = require("gulp");
const src = "src";
const dist = "dist";
const port = 5070;
const path = {
    img: {
        src: src + "/images/",
        dist: dist + "/images/",
        exc: "!./images/sprite/*.*"
    },
    js: {
        src: src + "/js/*.js",
        dist: dist + "/js/"
    },
    scss: {
        src: src + "/sass/**/*.scss",
        result: src + "/sass/**/*.scss",
        dist: dist + "/css/",
        autoprefixer: dist + "/css/*.css"
    },
    sprite: {
        src: src + "/images/sprite/",
        dist: dist + "/images/sprite/",
        css: src + "/sass/vendor/"
    },
    html: {
        src: src + "/html/**/*.html",
        dist: dist + "/html/",
        exc: "!./html/include/**/*.html"
    }
}

//怨듭슜
const browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    sourcemaps = require("gulp-sourcemaps"),
    del = require("del"),
    fs = require('fs'),
    paths = require('path');


//js min �뚯씪�앹꽦
const minify = require("gulp-minify");
function minJs(){
    return gulp
        .src(path.js.src)
        .pipe(minify({
            ext: {
                min: ".min.js"
            }
        }))
        .pipe(gulp.dest(path.js.dist))
        .pipe(browserSync.stream({match: "**/*.js"}))
        .on("finish", reload);
}


//釉뚮씪�곗� �깊겕
function bs(){
    browserSync.init({
        /*proxy: "localhost"*/
        server: {
            baseDir: dist,
            //index: "./html/index.html"
            directory:true
        },
        port: port,
        ui: {port: port + 1},
        ghostMode: false
    });
}



//�대�吏� �ㅽ봽�쇱씠�� �대뜑�ㅼ젙
const spritesmith = require("gulp.spritesmith");
const getFolders = function (dir_path) {
    return fs.readdirSync(dir_path).filter(function (file) {
        return fs.statSync(paths.join(dir_path, file)).isDirectory();
    });
};
//�대�吏� �ㅽ봽�쇱씠��
async function spriteIcon(){
    //珥덇린媛� �ㅼ젙
    var imgName = "sprite.",
        cssName = "_sprite.",
        padding = 5,
        cssTemplate = "sprite.css.handlebars",
        layout = 'left-right',
        folders = getFolders(path.sprite.src); //�대뜑蹂� �ㅽ봽�쇱씠�몄깮��

    //�대뜑�놁씠 硫붿씤猷⑦듃�쇰븣
    var spriteData = gulp.src(path.sprite.src + "*.*")
        .pipe(spritesmith({
            imgName: imgName + "png",
            cssName: cssName + "scss",
            padding: padding,
            cssTemplate: cssTemplate
        }));
    spriteData.img.pipe(gulp.dest(path.sprite.dist));
    spriteData.css.pipe(gulp.dest(path.sprite.css));

    //�대뜑蹂� �ㅽ봽�쇱씠�몄깮��
    folders.forEach(function (folder) {
        spriteData = gulp.src(path.sprite.src + folder + '/*.png')
            .pipe(spritesmith({
                imgName: imgName + folder + '.png',
                cssName: cssName + folder + '.scss',
                padding: padding,
                //algorithm: layout,
                cssTemplate: cssTemplate
            }));
        spriteData.img.pipe(gulp.dest(path.sprite.dist));
        spriteData.css.pipe(gulp.dest(path.sprite.css));
    });
}


//gulp-sass
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");//踰ㅻ뜑�꾨━�쎌뒪 �ㅼ젙
const dgbl = require("del-gulpsass-blank-lines"); //compact 紐⑤뱶 �쇱씤 ��젣
function gulpSass(){
    return gulp
        .src(path.scss.result)
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: "compressed"}).on("error", sass.logError)) //nested compact expanded compressed
        //.pipe(dgbl()) //compact �쇱씤��젣
        /*.pipe(autoprefixer({
            browsers: [
                "ie >= 7",
                "last 10 Chrome versions",
                "last 10 Firefox versions",
                "last 2 Opera versions",
                "iOS >= 7",
                "Android >= 4.1"
            ],
            cascade: true,
            remove: false
        }))*/
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.scss.dist))
        .pipe(browserSync.stream({match: "**/*.css"}))
        .on("finish", reload);
}

//html 釉뚮씪�곗� �명솚�� css 異붽�蹂�寃�
function autopreFixer(){
    return gulp.src(path.scss.autoprefixer)
        .pipe(autoprefixer({
            browsers: [
                "ie >= 10",
                "last 10 Chrome versions",
                "last 10 Firefox versions",
                "last 2 Opera versions",
                "iOS >= 10",
                "Android >= 4.4"
            ],
            cascade: true,
            remove: false
        }))
        .on("finish", reload);
}


//�대�吏� �뺤텞
var imagemin = require("gulp-imagemin");
function imgMin(){
    return gulp
        .src([path.img.src, path.img.exc])
        .pipe(imagemin())
        .pipe(gulp.dest(path.img.dist))
        .on("finish",reload);
}


//html �뚯씪 include
const include = require("gulp-html-tag-include");
function includeHTML(){
    return gulp.src(path.html.src)
        .pipe(include())
        .pipe(gulp.dest(path.html.dist))
        .on("finish", reload);
}


//�대�吏� 蹂듭궗
function imgCopy(){
    return gulp
        .src([path.img.src + "**/*.*","!"+path.sprite.src+"*.*","!"+path.sprite.src+"**/*.*"])
        .pipe(gulp.dest(path.img.dist))
        .pipe(browserSync.stream({match: "**/images/*.*"}))
        .on("finish", reload);
}

//clean-image
function imgClean(){return del(path.img.dist)}

//clean-html
function htmlClean(){return del(path.html.dist)}


//clean-html-include
function includeHtmlClean(){
    return del([path.html.dist + "**/include"])
}


// �뚯씪 ��移�
function watchFiles(){
    gulp.watch(path.js.src, minJs);
    gulp.watch(path.scss.src, gulpSass);
    gulp.watch(path.html.src, html);
    gulp.watch(path.img.src, imgCopy);
    // gulp.watch(path.sprite.src + "*.png",spriteIcon);
};


// 痍⑦빀 �ㅼ쨷 �ㅽ뻾
const watch = gulp.parallel(watchFiles,bs);
const imgUpdate = gulp.series(imgClean, imgCopy, spriteIcon);
const html = gulp.series(htmlClean,gulp.series(includeHTML,includeHtmlClean));
const build = gulp.series(imgUpdate,html, minJs , gulpSass);

// tasks �좎뼵
exports.watch = watch;
exports.minJs = minJs;
exports.bs = bs;
exports.spriteIcon = spriteIcon;
exports.gulpSass = gulpSass;
exports.autopreFixer = autopreFixer;
exports.imgeMin =imgMin;
exports.includeHTML = includeHTML;
exports.includeHtmlClean = includeHtmlClean;
exports.imgCopy = imgCopy; //src �대�吏�瑜� dist�대룄�� 蹂듭궗
exports.imgClean = imgClean; //dist �대�吏��대뜑 �댁슜 ��젣
exports.htmlClean = htmlClean; // dist html �뚯씪 ��젣
exports.imgUpdate = imgUpdate; // 遺덊븘�뷀븳 �대�吏� ��젣�� 媛깆떊
exports.html = html; // html include 痍⑦빀
exports.build = build; // 諛고룷�섍린�꾪븳 紐⑤뱺 �묒뾽
exports.default = watch; // �뚯씪��移섏� 釉뚮씪�곗��깊겕 �먮룞�ㅽ뻾