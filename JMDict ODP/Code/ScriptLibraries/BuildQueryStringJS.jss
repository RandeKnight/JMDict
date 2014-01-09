function filterBegins(kanji,kana,begins){
	var patb = new RegExp('^'+begins);
	if(charType(begins)=="kana"){
		for (var b in kana){
			if (patb.test(b)){
				return false; //if any match, then it's good.
			}
		}
		return true;
	}
	if(charType(begins)=="kanji"){
		for (var b in kanji){
			if (patb.test(b)){
				return false; //if any match, then it's good.
			}
		}
		return true;
	}
	return false;
}
function filterEnds(kanji,kana,ends){
	var pate = new RegExp(ends+"$");
	if(charType(ends)=="kana"){
		for (var b in kana){
			if (pate.test(b)){
				return false; //if any match, then it's good.
			}
		}
		return true;
	}
	if(charType(ends)=="kanji"){
		for (var b in kanji){
			if (pate.test(b)){
				return false; //if any match, then it's good.
			}
		}
		return true;
	}
	return false;
}

function filter(kanji,kana,romaji,begins,ends){
	if(charType(begins)==false && charType(ends)==false){
		return false; //no filtering necessary
	}
	if(charType(begins)=="romaji" || charType(ends)=="romaji"){
		return false; //FTsearch works for plain chars.
	}
	if((!filterBegins(kanji,kana,begins)) && (!filterEnds(kanji,kana,ends))){
		return false; //both filters fail, then allow through.
	} else {
		return true;
	}
}


function charType(s){
	if (s==null){
		return false;
	}
	if (s==false){
		return false;
	}
	if (s.charCodeAt(0)<=122){ //z
		return "romaji";
	}
	if (s.charCodeAt(0)<=19968){ //Hex = 3041
		return "kana";
	}
	return "kanji";
}
function buildQueryString(begins,middle,ends,mean){
	var kanaQuery=new Array();
	var kanjiQuery=new Array();
	var romajiQuery=new Array();
	var buildQueryArray= new Array();
	var buildQueryString="";
	if(charType(begins)!=false){
		if(charType(begins)=="romaji"){
			romajiQuery.push(begins+"*");
		} else {
			if(charType(begins)=="kana"){
				kanaQuery.push(begins);
			} else {
				kanjiQuery.push(begins);
			}
		}
	}
	if(charType(middle)!=false){
		if(charType(middle)=="romaji"){
			romajiQuery.push("*"+middle+"*");
		} else {
			if(charType(middle)=="kana"){
				kanaQuery.push(middle);
			} else {
				kanjiQuery.push(middle);
			}
		}
	}
	if(charType(ends)!=false){
		if(charType(ends)=="romaji"){
			romajiQuery.push("*"+ends);
		} else {
			if(charType(ends)=="kana"){
				kanaQuery.push(ends);
			} else {
				kanjiQuery.push(ends);
			}
		}
	}
	if (romajiQuery.length>0){
		buildQueryArray.push('([rebRomaji] contains ('+romajiQuery.join(' AND ')+'))');
	}
	if (kanaQuery.length>0){
		buildQueryArray.push('([reb] contains ('+kanaQuery.join(' AND ')+'))');
	}
	if (kanjiQuery.length>0){
		buildQueryArray.push('([keb] contains ('+kanjiQuery.join(' AND ')+'))');
	}
	if (charType(mean)!=false){
		buildQueryArray.push("([gloss] contains ("+mean+"))");
	}
	buildQueryString=buildQueryArray.join(" AND ");
	print("buildQuerystring = "+buildQueryString);
	writeHistory(@Trim(romajiQuery+" "+kanaQuery+" "+kanjiQuery+" "+mean),buildQueryString,"WordSearch");
	return buildQueryString;
}
function buildNameQueryString(begins,middle,ends,type){
	
	var kanaQuery=new Array();
	var kanjiQuery=new Array();
	var romajiQuery=new Array();
	var buildQueryArray= new Array();
	var buildQueryString="";
	print(begins);
	if(charType(begins)!=false){
		if(charType(begins)=="romaji"){
			romajiQuery.push(begins+"*");
		} else {
			if(charType(begins)=="kana"){
				kanaQuery.push(begins);
			} else {
				kanjiQuery.push(begins);
			}
		}
	}

	if(charType(middle)!=false){
		if(charType(middle)=="romaji"){
			romajiQuery.push("*"+middle+"*");
		} else {
			if(charType(middle)=="kana"){
				kanaQuery.push(middle);
			} else {
				kanjiQuery.push(middle);
			}
		}
	}
	if(charType(ends)!=false){
		if(charType(ends)=="romaji"){
			romajiQuery.push("*"+ends);
		} else {
			if(charType(ends)=="kana"){
				kanaQuery.push(ends);
			} else {
				kanjiQuery.push(ends);
			}
		}
	}
	if (romajiQuery.length>0){
		buildQueryArray.push('([trans_det] contains ('+romajiQuery.join(' AND ')+'))');
	}
	if (kanaQuery.length>0){
		buildQueryArray.push('([reb] contains ('+kanaQuery.join(' AND ')+'))');
	}
	if (kanjiQuery.length>0){
		buildQueryArray.push('([keb] contains ('+kanjiQuery.join(' AND ')+'))');
	}
	if (charType(type)!=false){
		buildQueryArray.push("([name_type] contains ("+type+"))");
	}
	buildQueryString=buildQueryArray.join(" AND ");
	//print("buildQuerystring = "+buildQueryString);
	writeHistory(@Trim(romajiQuery+" "+kanaQuery+" "+kanjiQuery),buildQueryString,"NameSearch");
	return buildQueryString;
}

function buildScrabble(sentence){
	var wordView:NotesView = database.getView("WordsByAll");
	var vec:NotesViewEntryCollection = null;
	var letterPosition=0;
	var nav:NotesViewNavigator=null;
	var wordLength=0;
	for(letterPosition=0;leterPosition++;letterPosition>5){
		var entry:NotesViewEntry = wordView.getEntryByKey(sentence.charAt(letterPosition),false);
		nav=wordView.createViewNavFrom(entry);
		//walk through entries until we find the longest one that still matches
		while(entry!=null){
			wordLength=1;
			if(entry.getColumnValues().elementAt(0).substr(0,wordLength)==sentence.substr(letterPosition,wordLength)){
				wordLength=wordLength+1;
			} else {
				
			}
		}
	}
}
function writeHistory(displayString,queryString,type){
	var searchHistoryView:NotesView = database.getView("SearchHistory");
	var currentTime = new Date();
	//determine if the entry is already in the list
	//if so, then only touch the document
	var histDoc:NotesDocument = searchHistoryView.getFirstDocument();
	while (histDoc!=null){
		if (histDoc.getFirstItem("QueryString").getText()==queryString){
			histDoc.replaceItemValue("LastModified",currentTime.toString());
			histDoc.save();
			return; //Don't need to do the rest.
		}
		histDoc = searchHistoryView.getNextDocument(histDoc);
	}
	//tidy up the list if it's too long.
	var vec:NotesViewEntryCollection = searchHistoryView.getAllEntries();
	if (vec.getCount()>10){ //remove the oldest.
		histDoc = searchHistoryView.getFirstDocument();
		histDoc.remove(false);
	}
	//It's a new entry, add to list.
	histDoc = database.createDocument();
	histDoc.replaceItemValue("Form","SearchHistory");
	histDoc.replaceItemValue("DisplayString",displayString);
	histDoc.replaceItemValue("QueryString",queryString);
	histDoc.replaceItemValue("Type",type);
	histDoc.replaceItemValue("Created",currentTime.toString());
	histDoc.replaceItemValue("CreatedBy",session.getUserName());
	histDoc.replaceItemValue("$PublicAccess","1");
	histDoc.save();
	searchHistoryView.refresh();
}