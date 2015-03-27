/******
* Super Colour Contrast Checker
*
* by tellthemachines.com
*
* based on WebAIM's color contrast tool by Jared Smith.
* http://webaim.org/resources/contrastchecker/
*
******/


// do the contrast checking thing

function checkcontrast() {
  var fgbgcontrast = document.getElementById("fg-bg");
  var lnbgcontrast = document.getElementById("ln-bg");
  var lnfgcontrast = document.getElementById("ln-fg");

  // get input values

	var color = getColor("foreground");
	var bgcolor = getColor("background");
	var lncolor = getColor("link");

  // get sRGB from input

	var L1 = getL(color);
	var L2 = getL(bgcolor);
	var L3 = getL(lncolor);


	if (L1!==false && L2!==false && L3!==false) {

    // change body background and color to input values

    var bod = document.getElementsByTagName("body")[0];
    bod.style.backgroundColor = "#" + bgcolor;
    bod.style.color = "#" + color;

    // change link color to input value

    var anchors = document.getElementsByTagName("a");
    var anlen = anchors.length;

    for (var i=0; i < anlen; i++){
      anchors[i].style.color = "#" + lncolor;
    }

    // calculate ratios

    var fgbgratio = (Math.round(((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05))*100)/100);
    var lnbgratio = (Math.round(((Math.max(L3, L2) + 0.05)/(Math.min(L3, L2) + 0.05))*100)/100);
		var lnfgratio = (Math.round(((Math.max(L3, L1) + 0.05)/(Math.min(L3, L1) + 0.05))*100)/100);

    // display ratios

    fgbgcontrast.innerHTML = fgbgratio + ":1";
    lnbgcontrast.innerHTML = lnbgratio + ":1";
		lnfgcontrast.innerHTML = lnfgratio + ":1";

    // evaluate ratios and display pass or fail

    if(fgbgratio >= 7) {
			ntaaa.innerHTML = "Passes";
      ntaaa.className = "pass";
		}
    else {
			ntaaa.innerHTML = "Fails";
      ntaaa.className = "fail";
		}

		if(fgbgratio >= 4.5) {
			ntaa.innerHTML = "Passes";
      ntaa.className = "pass";
			ltaaa.innerHTML = "Passes";
      ltaaa.className = "pass";
		}
    else {
			ntaa.innerHTML = "Fails";
      ntaa.className = "fail";
			ltaaa.innerHTML = "Fails";
      ltaaa.className = "fail";
		}

		if(fgbgratio >= 3) {
			ltaa.innerHTML = "Passes";
      ltaa.className = "pass";
		}
    else {
			ltaa.innerHTML = "Fails";
      ltaa.className = "fail";
		}

    if (lnbgratio >= 7 && lnfgratio >= 3) {
			nlaaa.innerHTML = "Passes";
      nlaaa.className = "pass";
		}
    else {
			nlaaa.innerHTML = "Fails";
      nlaaa.className = "fail";
		}

    if (lnbgratio >= 4.5 && lnfgratio >= 3) {
			nlaa.innerHTML = "Passes";
      nlaa.className = "pass";
			llaaa.innerHTML = "Passes";
      llaaa.className = "pass";
		}
    else {
			nlaa.innerHTML = "Fails";
      nlaa.className = "fail";
			llaaa.innerHTML = "Fails";
      llaaa.className = "fail";
		}

		if (lnbgratio >= 3 && lnfgratio >= 3) {
			llaa.innerHTML = "Passes";
      llaa.className = "pass";
		}
    else {
			llaa.innerHTML = "Fails";
      llaa.className = "fail";
		}

	}
}

// helper functs for check contrast

function getColor(location) {
	colorobj = document.getElementById(location);
	var color=colorobj.value.replace("#","");
	return color;
}

function getL(color) {
  var update;
	if(color.length == 3) {
		var R = getsRGB(color.substring(0,1) + color.substring(0,1));
		var G = getsRGB(color.substring(1,2) + color.substring(1,2));
		var B = getsRGB(color.substring(2,3) + color.substring(2,3));
		update = true;
	}
	else if(color.length == 6) {
		var R = getsRGB(color.substring(0,2));
		var G = getsRGB(color.substring(2,4));
		var B = getsRGB(color.substring(4,6));
		update = true;
	}
	else {
		update = false;
	}
	if (update == true) {
		var L = (0.2126 * R + 0.7152 * G + 0.0722 * B);
		return L;
	}
	else {
		return false;
	}

}

function getsRGB(color) {
	color=getRGB(color);
	if(color === false) {
    return false;
  }
  color = color/255;
	color = (color <= 0.03928) ? color/12.92 : Math.pow(((color + 0.055)/1.055), 2.4);
	return color;
}

function getRGB(color) {

	var color = parseInt(color, 16);

  if (color === NaN) {
    return false;
  }
	return color;
}


// do the lighten - darken thing

function changehue(loc,dir) {
  var update,
	    color = getColor(loc);
	if(color.length == 3) {
		var R = color.substring(0,1) + color.substring(0,1);
		var G = color.substring(1,2) + color.substring(1,2);
		var B = color.substring(2,3) + color.substring(2,3);
	}
	else if(color.length == 6) {
		var R = color.substring(0,2);
		var G = color.substring(2,4);
		var B = color.substring(4,6);
		update = true;
	}
	else {
		update = false;
	}
	R = getRGB(R);
	G = getRGB(G);
	B = getRGB(B);

	HSL = RGBtoHSL(R, G, B);
	var lightness = HSL[2];
	if (update==true) {
		lightness = (dir=="lighten") ? lightness+6.25 : lightness-6.25;
		if (lightness>100) {
			lightness=100;
		}
		if (lightness<0) {
			lightness=0;
		}
		RGB = hslToRgb(HSL[0],HSL[1],lightness);
		R = RGB[0];
		G = RGB[1];
		B = RGB[2];
		if(!(R>=0)&&!(R<=255)) R=0
		if(!(G>=0)&&!(G<=255)) G=0
		if(!(B>=0)&&!(B<=255)) B=0
		R = (R >= 16) ? R.toString(16) : "0" + R.toString(16);
		G = (G >= 16) ? G.toString(16) : "0" + G.toString(16);
		B = (B >= 16) ? B.toString(16) : "0" + B.toString(16);
		R = (R.length==1) ? R + R : R;
		G = (G.length==1) ? G + G : G;
		B = (B.length==1) ? B + B : B;
		document.getElementById(loc).value=R + G + B;
		checkcontrast();
	}
}

// helper functs for change hue

function RGBtoHSL(r,g,b)
{
	var Min=0;
	var Max=0;
	r=(eval(r)/51)*.2;
	g=(eval(g)/51)*.2;
	b=(eval(b)/51)*.2;

	if (eval(r)>=eval(g))
		Max=eval(r);
	else
		Max=eval(g);
	if (eval(b)>eval(Max))
		Max=eval(b);

	if (eval(r)<=eval(g))
		Min=eval(r);
	else
		Min=eval(g);
	if (eval(b)<eval(Min))
		Min=eval(b);

	L=(eval(Max)+eval(Min))/2;
	if (eval(Max)==eval(Min))
	{
		S=0;
		H=0;
	}
	else
	{
		if (L < .5)
			S=(eval(Max)-eval(Min))/(eval(Max)+eval(Min));
		if (L >= .5)
			S=(eval(Max)-eval(Min))/(2-eval(Max)-eval(Min));
		if (r==Max)
			H = (eval(g)-eval(b))/(eval(Max)-eval(Min));
		if (g==Max)
			H = 2+((eval(b)-eval(r))/(eval(Max)-eval(Min)));
		if (b==Max)
			H = 4+((eval(r)-eval(g))/(eval(Max)-eval(Min)));
	}
	H=Math.round(H*60);
	if(H<0) H += 360;
	if(H>=360) H -= 360;
	S=Math.round(S*100);
	L=Math.round(L*100);
	return  [H, S, L];
}

function hslToRgb(H, S, L){
   	var p1,p2;
	L/=100;
	S/=100;
	if (L<=0.5) p2=L*(1+S);
	else p2=L+S-(L*S);
	p1=2*L-p2;
	if (S==0)
	{
		R=L;
		G=L;
		B=L;
	}
	else
	{
		R=FindRGB(p1,p2,H+120);
		G=FindRGB(p1,p2,H);
		B=FindRGB(p1,p2,H-120);
	}
	R *= 255;
	G *= 255;
	B *= 255;
	R=Math.round(R);
	G=Math.round(G);
	B=Math.round(B);

    return [R, G, B];
};

function FindRGB(q1,q2,hue)
{
	if (hue>360) hue=hue-360;
	if (hue<0) hue=hue+360;
	if (hue<60) return (q1+(q2-q1)*hue/60);
	else if (hue<180) return(q2);
	else if (hue<240) return(q1+(q2-q1)*(240-hue)/60);
	else return(q1);
}

// get the whole thing going

window.onload = function() {

	var foreground = document.getElementById("foreground");
	var background = document.getElementById("background");
  var link = document.getElementById("link");
	foreground.onchange = checkcontrast;
	background.onchange = checkcontrast;
  link.onchange = checkcontrast;

	checkcontrast();

  changeBoxLoc();

}

// display color picker box on right on larger screens


function changeBoxLoc(){

  var mq = window.matchMedia( "(min-width: 30em)" );

  if(mq.matches) {
    var inputs = document.getElementsByTagName("input");
    var inlen = inputs.length;

    for(var j = 0; j<inlen; j++){
      inputs[j].className = "color {hash:false,caps:false,styleElement:'bob',pickerPosition:'right',pickerBorderColor:'#666',pickerInsetColor:'#666'}";
    }
  }
}
