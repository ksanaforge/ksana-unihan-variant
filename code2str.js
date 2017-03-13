var code2str=function(value){
	if (typeof value=="string") {
		value=parseInt(value,16);
	}
	var out="";
	if (value > 0xFFFF) {
          value -= 0x10000;
          out=String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800);
          value = 0xDC00 | (value & 0x3FF);
  }
  out+=String.fromCharCode(value);
  return out;
}   
module.exports=code2str;