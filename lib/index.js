'use strict';
const path = require('path');
const fs = require('fs');

const vendor = path.resolve(__dirname, '../vendor');

const dataBindingLocation = (function(){
	if(process.platform === 'linux'){
		return path.resolve(vendor,'linux',process.arch,'jpegtran');
	} else if(process.platform === 'freebsd'){
		return path.resolve(vendor,'freebsd', process.arch, 'jpegtran');
	} else if(process.platform === 'darwin'){
		return path.resolve(vendor,'macos/jpegtran');
	} else {
		return path.resolve(vendor,'win/jpegtran');
	}
})();
const dest = path.resolve(vendor,'jpegtran', process.platform === 'win32' ? '.exe' : '');

if(!fs.existsSync(vendor)){
	fs.mkdirSync(vendor);
}

fs.createReadStream(dataBindingLocation).pipe(fs.createWriteStream(dest,{
	mode: 755,
	autoClose: true
}));

module.exports = {
	path: function(){
		return dest;
	},
	run: function(opts,callback){
		fs.stat(dest,callback);
	}
}

// 'use strict';
// const path = require('path');
// const BinWrapper = require('bin-wrapper');
// const pkg = require('../package.json');

// const url = `https://raw.githubusercontent.com/imagemin/jpegtran-bin/v${pkg.version}/vendor/`;

// module.exports = new BinWrapper()
// 	.src(`${url}macos/jpegtran`, 'darwin')
// 	.src(`${url}linux/x86/jpegtran`, 'linux', 'x86')
// 	.src(`${url}linux/x64/jpegtran`, 'linux', 'x64')
// 	.src(`${url}freebsd/x86/jpegtran`, 'freebsd', 'x86')
// 	.src(`${url}freebsd/x64/jpegtran`, 'freebsd', 'x64')
// 	.src(`${url}sunos/x86/jpegtran`, 'sunos', 'x86')
// 	.src(`${url}sunos/x64/jpegtran`, 'sunos', 'x64')
// 	.src(`${url}win/x86/jpegtran.exe`, 'win32', 'x86')
// 	.src(`${url}win/x64/jpegtran.exe`, 'win32', 'x64')
// 	.src(`${url}win/x86/libjpeg-62.dll`, 'win32', 'x86')
// 	.src(`${url}win/x64/libjpeg-62.dll`, 'win32', 'x64')
// 	.dest(path.join(__dirname, '../vendor'))
// 	.use(process.platform === 'win32' ? 'jpegtran.exe' : 'jpegtran');
