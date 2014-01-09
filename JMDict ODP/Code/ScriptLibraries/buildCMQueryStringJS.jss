function buildCMQueryString(kChar,kMean){
	if(kChar==null && kMean==null){
		return null;
	}
	var vw:NotesView = database.getView('kanji');
	buildQueryArray=new Array();
	var buildQueryString="";
	if(kChar!=""){
		buildQueryArray.push("([literal] contains "+kChar+")");
	}
	if(kMean!=""){
		buildQueryArray.push("([meaning] contains "+kMean+")");
	}
	buildQueryString=buildQueryArray.join(" AND ");
	return buildQueryString;
}