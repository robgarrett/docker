"use strict";

import path from "path";
import gulp from "gulp";
import rename from "gulp-rename";
import eslint from "gulp-eslint";
import tsc from "gulp-typescript";
import clean from "gulp-clean";
import run from "gulp-run";
import mocha from "gulp-mocha";
import sourcemaps from "gulp-sourcemaps";

var paths = {
  tscripts: {
    // All source files, including unit tests.
    srcFiles: [
      "src/**/*.ts",
      "!src/**/*.sample.ts"
    ],
    destDir: "lib",
    appDir: "lib/app",
  }
};

// ** Clean ** /
gulp.task("clean", function doCleanWork() {
  return gulp.src([
    paths.tscripts.destDir
  ], { read: false, allowEmpty: true }).pipe(clean());
});

// ** Linting ** //
gulp.task("lint", function doLintWork() {
  return gulp.src(paths.tscripts.srcFiles)
    .pipe(eslint({ formatter: "verbose" }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// ** Compilation ** //
gulp.task("preprocess", function doPreProcessWork() {
    return gulp.src("src/app/config.sample.ts").
      pipe(rename("config.ts")).
      pipe(gulp.dest("src/app", { overwrite: false }))
  });
gulp.task("compile:typescript", gulp.series("preprocess", function doCompileWork() {
  var project = tsc.createProject("tsconfig.json", { declaration: true });
  var built = gulp.src(paths.tscripts.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(project());
  return built.js
    .pipe(sourcemaps.mapSources(function (sourcePath) {
      // Make sure the source path is correct.
      return '../' + sourcePath;
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.tscripts.destDir));
}));
gulp.task("build", gulp.series("clean", "lint", "compile:typescript"));

// ** Run **
gulp.task("doRun", function doRunWork() {
  return run("node " + path.join(paths.tscripts.appDir, "index.js")).exec();
});

// ** Watching **
gulp.task("watch", function doWatchWork() {
  // If src files change, recompile them.
  return gulp.watch(paths.tscripts.srcFiles, gulp.series("compile:typescript"));
});

// ** Unit Tests ** //
gulp.task("run-tests", function doTestsWork() {
  return gulp.src(paths.tscripts.destDir + "/*.test.js", { read: false }).
    pipe(mocha({
      reporter: 'spec'
    }));
});
gulp.task("test", gulp.series("build", "run-tests"));

// ** Default ** //
gulp.task("run", gulp.series("build", "doRun"));
gulp.task("default", gulp.series("build", "doRun"));