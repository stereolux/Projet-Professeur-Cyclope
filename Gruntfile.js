module.exports = function (grunt) {

	grunt.initConfig({
		clean: ['./webkitbuilds/releases'],
		nodewebkit: {
			options: {
				build_dir: './webkitbuilds',
				version: '0.8.6',
				mac_icns: './img/banditManchot.icns',
				mac: true,
				win: false,
				linux32: false,
				linux64: true
			},
			src: ['./**/*']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-node-webkit-builder');

	grunt.registerTask('default', ['clean', 'nodewebkit']);
};
