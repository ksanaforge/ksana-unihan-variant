var fs=require("fs");
var unihanvariants=require("./unihanvariants");//created by gen.js

var code2str=function(value){
	var out="";
	if (value > 0xFFFF) {
          value -= 0x10000;
          out=String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800);
          value = 0xDC00 | (value & 0x3FF);
  }
  out+=String.fromCharCode(value);
  return out;
}    

var removeDuplicate=function(){
	for (var i in variants) {
		var v=variants[i];
		for (var j=0;j<variants[i].length;j++) {
			var c=variants[i][j];
			if (variants[c]) {
				var a=variants[c].indexOf(i);
				if (a>-1) {
					variants[c].splice(a,1);
				}
			}
		}
	}
}
var removeEmpty=function(variants){
	var out=[];
	for (var i in variants) {
			if (variants[i].length) {
				variants[i].unshift(i);
				out.push(variants[i]);
			}
	}
	return out;
}
var convertoString=function(arr,charset){
	var out=[];
	for (var i=0;i<arr.length;i++) {
		var t="",count=0;
		for (var j=0;j<arr[i].length;j++)	{
			var ch=code2str(parseInt(arr[i][j],16));
			if (j&&charset && charset.indexOf(ch)==-1) continue;
			t+=ch;
			count++;
		}
		if (count>1) out.push(t);
	}
	return out;
}
/*
supply a charset to reduce size
*/
var gen=function(charset){
	var out=removeEmpty(unihanvariants);
	var str=convertoString(out,charset);
	return str;
}
if (process.argv[1].indexOf("index")>-1){
	var str=gen();
	console.log("str length",str.length)
	fs.writeFileSync("variant.js",'module.exports="'+str.join(",")+'"',"utf8");	
}
module.exports=gen;