//Gruntfile

module.exports = function(grunt) {
    //Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'client/pictureisworth.css': 'client/styles/pictureisworth.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');

};
