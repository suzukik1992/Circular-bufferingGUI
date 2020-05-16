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
var blue = [0.427451, 0.831373, 1, 1];
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
var binNum = 150;
var binR_arr = [];
var pointerR = 1.5;

init();

function init() {
    for(var i=0; i<binNum; i++) {
        binR_arr.push(TWOPI*i/binNum);
    }
}

function paint() {

    mgraphics.translate(c[0], c[1]);
    var fromBuf_arr = buf_GUI_r.peek(1, 0, 2)
    var mCout_GUI = fromBuf_arr[0];
    var lenSamps = fromBuf_arr[1];
    var mCout_GUI_r = TWOPI*mCout_GUI/lenSamps
    var recSamps_arr = buf_GUI.peek(1, 0, Math.floor(lenSamps));


    var cursor_halfD = 1.1*maxSamps_d*0.5*recSamps_arr[Math.floor(mCout_GUI)];
    var cursor_dMin = d - cursor_halfD;
    var cursor_dMax = d + cursor_halfD;
    var cursor_sin = Math.sin(mCout_GUI_r);
    var cursor_cos = Math.cos(mCout_GUI_r);

    // if(cursor_halfD > 0.1) {
    //     mgraphics.set_line_width(0.75);
    //     mgraphics.set_source_rgba(blue[0], blue[1], blue[2], blue[3]);
    //     mgraphics.arc(0, 0, cursor_dMin, 0, TWOPI);
    //     mgraphics.stroke();
    // }

    mgraphics.set_line_width(0.75);
    mgraphics.set_source_rgba(gray[0], gray[1], gray[2], gray[3]);
    for(var i=0; i<binNum; i++) {
        var samps_halfD = maxSamps_d*0.5*recSamps_arr[Math.floor(i/binNum*lenSamps)];
        var samps_dMin = d - samps_halfD;
        var samps_dMax = d + samps_halfD;
        var sin = Math.sin(binR_arr[i]);
        var cos = Math.cos(binR_arr[i]);
        mgraphics.move_to(samps_dMin*cos, samps_dMin*sin);
        mgraphics.line_to(samps_dMax*cos, samps_dMax*sin);
        //log(samps_dMin, samps_dMax);
    }
    mgraphics.stroke();

    mgraphics.set_line_width(0.75);
    mgraphics.set_source_rgba(yellow[0], yellow[1], yellow[2], yellow[3]);
    mgraphics.move_to(cursor_dMin*cursor_cos, cursor_dMin*cursor_sin);
    mgraphics.line_to(cursor_dMax*cursor_cos, cursor_dMax*cursor_sin);
    mgraphics.stroke();

    mgraphics.set_source_rgba(yellow[0], yellow[1], yellow[2], yellow[3]);
    mgraphics.arc(cursor_cos*d, cursor_sin*d, pointerR, 0, TWOPI);
    mgraphics.fill();



}

function bang() {
    mgraphics.redraw();
}