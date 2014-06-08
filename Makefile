linux-dep:
	npm i; \
	cd node_modules/serialport; \
	node-pre-gyp rebuild --runtime=node-webkit --target=0.8.6; \
	cd ../thermalprinter/node_modules/canvas; \
	nw-gyp configure --target=0.8.6; \
	nw-gyp build; \
	cd ../sleep; \
	nw-gyp configure --target=0.8.6; \
	nw-gyp build; \
	cd ../../../..

mac-dep:
	export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/X11/lib/pkgconfig; \
	npm i; \
	cd node_modules/serialport; \
	node-pre-gyp rebuild --runtime=node-webkit --target=0.8.6 --target_arch=ia32; \
	cd ../thermalprinter/node_modules/canvas; \
	nw-gyp configure --target=0.8.6; \
	nw-gyp build; \
	cd ../sleep; \
	nw-gyp configure --target=0.8.6; \
	nw-gyp build; \
	cd ../../../..
