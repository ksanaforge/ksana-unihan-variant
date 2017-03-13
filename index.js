const unihanvariants=require("./unihanvariants"); //run gen to get the file
const expandVariant=function(ch){
	var out=[ch];

	const s=unihanvariants[ch];
	if (s) {
		if (typeof s=="string") {
			out.push(s);
		} else {
			out=out.concat(s);
		}
	}

	for (var i=0;i<out.length;i++) {
		const s2=unihanvariants[out[i]];
		if (s2) {
			if (typeof s2=="string") {
				if (out.indexOf(s2)==-1) out.push(s2);
			} else {
				for (var j=0;j<s2.length;j++) {
					if (out.indexOf(s2[j])==-1) out.push(s2[j]);
				}
			}
		}		
	}
	return out;
}
const test=function(){
	const c1=expandVariant("戶");
	const c2=expandVariant("户");
	const c3=expandVariant("戸");
	console.log(c1,c2,c3);
}
test();
module.exports={expandVariant:expandVariant}