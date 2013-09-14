module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                seperator: ''
            },
            dist: {
                files: {
                    //'public/js/models.js':         ['public/js/models/*.js'],
                    //'public/js/collections.js':    ['public/js/collections/*.js'],
                    //'public/js/views.js':          ['public/js/views/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);
}
