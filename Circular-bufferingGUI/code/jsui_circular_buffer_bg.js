include("mylib.js");
autowatch = 1;
outlets = 1;

// jsui init
mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

// color var
var borderC = [0.652, 0.666, 0.663, 1];
var yellow = [0.96, 0.83, 0.15, 1];
var gray = [0.325, 0.345, 0.372, 1];
var blackGray = [0.12, 0.12, 0.12, 1];
var blue = [0.318, 0.654, 0.976, 1];
var offwhite = [0.831373, 0.835294, 0.890196, 1];

// jsui var
var w = 150;
var h = w;
var c = [w*0.5, h*0.5];
var d = w/2.5;
var maxSamps_d = w/6;
var dRatio = 0.75;
var dRange = [d - maxSamps_d/2*dRatio, d + maxSamps_d/2*dRatio];

var buf_GUI = new  Buffer(jsarguments[1]);
var buf_GUI_r = new Buffer(jsarguments[2]);

var rec = 0;
var sr = 48000;
var TWOPI = 2*Math.PI;
var lenSamps = 480;
var binNum = 150;
var binR_arr = [];

function paint() {

    mgraphics.translate(c[0], c[1]);
    mgraphics.set_line_width(0.75);
    mgraphics.set_source_rgba(gray[0], gray[1], gray[2], gray[3]);
    mgraphics.arc(0, 0, d, 0, TWOPI);
    mgraphics.stroke();

}