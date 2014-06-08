var SerialPort = require('serialport').SerialPort,
	five = require('johnny-five'),
	Printer = require('thermalprinter'),
	os = require('os'),
	$ = require('jquery'),
	path = require('path'),
	cwd = path.join(path.dirname(window.location.pathname), '/img/cases/'),
	j = 0,
	cpt = [0,0,0,0,0],
	bgp = [0,0,0,0,0],
	numImg = {},
	printer,
	canPrint = false,
	board = new five.Board({
		port: '/dev/ttyACM0'
	});

// init stored images for each column
numImg.col1 = 0;
numImg.col2 = 0;
numImg.col3 = 0;
numImg.col4 = 0;

// serial port used for the printer (mac or linux)
var port = os.platform() === 'linux' ? '/dev/ttyUSB0' : '/dev/tty.usbserial';
var serialPort = new SerialPort(port, {
	baudrate: 19200
});

// init printer
serialPort.on('open',function() {
	var opts = {
		maxPrintingDots: 15,
		heatingTime: 150,
		heatingInterval: 4,
		commandDelay: 5
	};
	printer = new Printer(serialPort, opts);
	printer.on('ready', function() {
		canPrint = true;
	});
});


// init arduino
board.on('ready', function() {
	new five.Led(11).pulse(2000);
	var button = new five.Button({
		pin: 2,
		isPullup: true
	});
	button.on('down', function() {
		if (canPrint) {
			canPrint = false;
			mix();
		}
	});
});

var resize = function() {
	var HauteurW = window.innerHeight + 'px';
	$('#container').css('height', HauteurW);

	$('#banditCadre').css('height', $('#banditCadre').width() * 0.65);
	$('#banditCadre').css('margin-top', $('#banditCadre').height() * -0.5);

	var HauteurBM = document.getElementById('banditCadre').offsetWidth * 0.205;
	$('#container_cols').css( 'height', HauteurBM );

	var coloneWidth = parseInt(($('#container_cols').width()) * 23 / 100);
	$('.colone').css('width',coloneWidth);
	$('.colone').css('height', Math.round(HauteurBM));

	var topBT = $('#banditCadre').height() * 0.7535;
	$('#bouton').css('top', topBT + 'px');
};

var mix = function() {
	j++;
	if (j>=5) {
		cpt = [0,0,0,0,0];
		j=0;
	}
	for (i = 1; i <= 4; i++){
		cpt[i]-= Math.floor(Math.random()*10 + 10);
		bgp[i]= cpt[i] * $('#colone'+i).width() * 450 / 343;
		$('#colone'+i).css({ 'background-position': '0px ' + bgp[i] + 'px' });
	}
	numImg.col1 = (cpt[1]%9*-1) + 10;
	numImg.col2 = (cpt[2]%9*-1) + 20;
	numImg.col3 = (cpt[3]%10*-1) + 30;
	numImg.col4 = (cpt[4]%10*-1) + 40;
	console.dir(numImg);
	printer
		.lineFeed(3)
		.printImage(cwd + numImg.col1 + '.png')
		.printImage(cwd + numImg.col2 + '.png')
		.printImage(cwd + numImg.col3 + '.png')
		.printImage(cwd + numImg.col4 + '.png')
		.lineFeed(3)
		.print(function() {
			console.log('done');
			canPrint = true;
		});
};

$(window).resize(resize);
resize();
