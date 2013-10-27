module.exports = function (grunt) {

  var readOptionalJSON = function (filepath) {
      var data = {};
      try {
        data = grunt.file.readJSON(filepath);
      } catch (e) {}
      return data;
    },
    srcHintOptions = readOptionalJSON('src/.jshintrc');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      dist: {
        src: [ "src/JSONC.js" ],
        options: srcHintOptions
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'versions/',
        src: ['jsonc.min.js'],
        dest: 'versions/'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['jsonc.js'], dest: 'versions/'}
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! JSONC.js v<%= pkg.version %> | Date:<%= grunt.template.today("yyyy-mm-dd") %> |' +
          ' License: https://raw.github.com/tcorral/JSONC/master/LICENSE|' +
          ' (c) 2013\n' +
          '//@ sourceMappingURL=jsonc.min.map\n' +
          '*/\n',
        preserveComments: "some",
        sourceMap: 'versions/jsonc.min.map',
        sourceMappingURL: "jsonc.min.map",
        report: "min",
        beautify: {
          ascii_only: true
        },
        compress: {
          hoist_funs: false,
          join_vars: false,
          loops: false,
          unused: false
        },
        mangle: {
          // saves some bytes when gzipped
          except: [ "undefined" ]
        }
      },
      build: {
        src: 'src/JSONC.js',
        dest: 'versions/jsonc.min.js'
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'karma', 'uglify', 'compress', 'copy']);

};