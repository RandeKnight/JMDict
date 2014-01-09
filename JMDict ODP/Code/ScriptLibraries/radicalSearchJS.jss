function getRadicalBySkip(skipCode){
	if(skipCode==""){
		return null;
	}
	var vw:NotesView = database.getView("SkipRadical2");
	var vec:NotesViewEntryCollection = vw.getAllEntriesByKey(skipCode,true);
	var radicalArray = new Array();
	var ve:NotesViewEntry = vec.getFirstEntry();
	while(ve!=null){
		radicalArray.push(ve.getColumnValues()[2]+"|"+ve.getColumnValues()[1]);
		ve=vec.getNextEntry();
	}
	return @Unique(radicalArray);
}
function buildSRQueryString(skipCode,radical){
	print("skipcode="+skipCode);
	print("radical = "+radical);
	if(skipCode==null && radical==null){
		return null;
	}
	if(skipCode==""){
		return "([classical] contains "+radical+")"
	} else {
		return "([skip] contains "+skipCode+") AND ([classical] contains "+radical+")"
	}
	
}