module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dist: {
                files: {
                    'build/hearthclone.js': ['js/**/*.js']
                },
                options: {
                    browserifyOptions: {
                        "debug": true
                    }
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', 'browserify');
}