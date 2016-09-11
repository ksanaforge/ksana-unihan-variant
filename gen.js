const fs=require("fs");
var lines=fs.readFileSync("./Unihan_Variants.txt","utf8").split(/\r?\n/);
const startline=19;
var variants={};//key: char, value:array of variants

var buildMap=function(){
	for (var i=startline;i<lines.length;i++){
		var fields=lines[i].split("\t");
		if (fields.length!==3)continue;
		if (fields[1]=="kSpecializedSemanticVariant")continue;
			//fields[1]=="kSimplifiedVariant")continue;
		var key=fields[0].substr(2);

		var v=fields[2].substr(2,5);
		if (v[4]=="<")v=v.substr(0,4);

		if (!variants[key]) {
			variants[key]=[];
		}
		if (variants[key].indexOf(v)==-1) variants[key].push(v);
	}
}
buildMap();
fs.writeFileSync("unihanvariants.js",'module.exports='+JSON.stringify(variants,""," "),"utf8");