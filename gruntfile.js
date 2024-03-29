module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["client/assets/css"]
        },
          files: {
            "client/assets/css/game.css": "client/assets/css/game.less",
            "client/assets/css/styles.css": "client/assets/css/styles.less"
          }
        }
      },
      watch: {
        files: "client/assets/css/*",
        tasks: ["less"]
      }
   });
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.registerTask('default', ['less']);
 };
