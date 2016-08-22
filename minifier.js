var compressor = require('node-minify');

new compressor.minify({
	type: 'uglifyjs',
	fileIn: 'public/index.js',
	fileOut: 'public/index.min.js',
	buffer: 50000 * 1024,
	callback: function(err){
		console.log(err);
	}
});

