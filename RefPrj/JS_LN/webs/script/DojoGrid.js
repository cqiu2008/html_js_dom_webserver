/**
 * @author mk
 * @Create	2013-8-29
 * 表格生成控件，对DOJO的EnhancedGrid进行封装
 * 需要包含库文件：
 * 		在script/localdojo.js中已经加入
 *	需要包含CSS文件：
 *	<link type="text/css" rel="stylesheet" href="lib/dojox/grid/resources/Grid.css" />
 *	<link type="text/css" rel="stylesheet" href="lib/dojox/grid/resources/soriaGrid.css" /> 
		
 * 调用方式：
 * 
 var　fixlayout　=　{　
		noscroll:　true,　//锁定列
		cells:　[
			{'name': '#', 'field': 'index', 'width': '30px'}		
		]　
	};
	var　mainlayout　=　{
		cells:　[　
			{'name': '<% getLanguage("pmpWLEth.MaxU"); %>', 'field': 'MaxU', 'width': '100px'},	  
			{'name': '<% getLanguage("pmpWLEth.MinU"); %>', 'field': 'MinU', 'width': '100px'},	  
			{'name': '<% getLanguage("pmpWLEth.AvgU"); %>', 'field': 'AvgU', 'width': '100px'}
		]　
	};		　
	var aLayout = [fixlayout,　mainlayout];		
	var mapJ2S = [
		"index",
		
		"MaxU",
		"MinU",
		"AvgU"
	];
		
	function format(aData){
		if (aData[2] == NODATA){
			for(var i = 3; i<aData.length; i++){
				aData.splice(i,1,"--");
			}
		}else if(aData[2] == VALID){
			aData.splice(2,1,"YES");
		}else{
			aData.splice(2,1,"NO");
		}
		
		var maxt = aData[3]/100;
		aData.splice(3,1,maxt);
		
		return aData;
	}	
	dojoGrid = new DojoGrid({
		"aLayout" : aLayout,//布局
		"mapJ2S":	mapJ2S,//json 数据转 对象数组关系表
		"jsonData": null,
		"format": fnFormat,//数据转化函数
		"gridDiv": 'gridDiv',
		"height": '450px',
		"rowSelector": '10px',
		"gridId": "grid"	
	});	

 *  set表格数据  json
	dojoGrid.setData4Json(jsonData);
	
 *  set表格数据	对象数组
	dojoGrid.setData4Store(itemList);
	
 *  clear表格数据
	dojoGrid.setData4Json(null);
	dojoGrid.setData4Store(null);
	
 *  get选中表格数据 
	入参：id为作为唯一标识的字段，方便后面从原数据内取该记录，，eg. Index 或者 端口
	出参：结构体数组 {id:"id",items:[]}				
	dojoGrid.getSelectRows(id);
	
 */
dojo.require("dojox.grid.DataGrid");
dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojox.grid.enhanced.plugins.exporter.CSVWriter");
dojo.require("dojox.grid.enhanced.plugins.IndirectSelection");	
dojo.require("dojox.grid.enhanced.plugins.Pagination");
dojo.require("dojox.grid.enhanced.plugins.Filter");
 
dojo.require("dijit.search"); // 引用自定义过滤控件

/**
	封装dojo原生的DataGrid控件，生成dojogrid类
*/ 
function DojoGrid(configure){
	this._grid = null;
	this._jData = null;
	this._f_jData = null;
	this._sData = null;	
	this._o_sData = null;	
	this.configure = {
		"aLayout" : null,
		"mapJ2S":	null,
		"jsonData": null,
		"format": null,
		"sformat": null,
		"gridDiv": "gridDiv",
		"width": "900px",
		"height": "400px",
		"rowSelector": "0px",
		"MultiSelected": false,
		"gridId": "grid"
	};	
	if(('undefined'!==typeof(configure)) && (null!==configure)){
		for(var name in configure){
			this.configure[name] = configure[name];
		}
	}
	/*创建空表格*/ 
	if(this.configure['MultiSelected']){
		var _grid = new dojox.grid.EnhancedGrid({
			id: this.configure['gridId'],
			store: null,
			structure: this.configure['aLayout'],
			selectionMode: "multiple",
			height: this.configure['height'],
			rowSelector: this.configure['rowSelector'],
			plugins: {
				exporter: true,
				indirectSelection: { 
					headerSelector:true, 
					width:"10px", 
					styles:"text-align: center;"
				},
				pagination: {
					pageSizes: ["25", "50", "100", "All"],
					description: true,
					sizeSwitch: true,
					pageStepper: true,
					gotoButton: true,
					/*page step to be displayed*/
					maxPageStep: 4,
					/*position of the pagination bar*/
					position: "bottom"
				},
				filter: {
					// Show the closeFilterbarButton at the filter bar
					closeFilterbarButton: true,
					// Set the maximum rule count to 5
					ruleCount: 5
					// Set the name of the items
					//itemsName: "songs"
				}
			}
		});		
	}else{
		var _grid = new dojox.grid.EnhancedGrid({
			id: this.configure['gridId'],
			store: null,
			structure: this.configure['aLayout'],
			height: this.configure['height'],
			rowSelector: this.configure['rowSelector'],
			plugins: {
				exporter: true
			}
		});		
	}
	this._grid = _grid;	
	/*将新生成的表格放置到页面中*/ 
	_grid.placeAt(this.configure['gridDiv']);
	/* 调用startup()渲染表格*/
	_grid.startup();
	/*
	dojo.connect(_grid, "onCellClick", function(e) {  
	   if (e.rowIndex < 0) return;  
		_grid.selection.clickSelect(e.rowIndex);
	   //e.cellNode.style.backgroundColor = "red";		
	}); 
	*/
}
 /**
	生成dojogrid显示可用的 数据store，并显示
 */
DojoGrid.prototype.setData = function(items){	
	var _dataTemp = {};
	_dataTemp["items"] = items;
	var _store = new dojo.data.ItemFileReadStore({
		data: _dataTemp
	});		
	this._grid.setStore(_store);	
};
/**
	针对mo平台传入的源数据，根据自定义的format函数，转换
*/
DojoGrid.prototype.setData4Store = function(items){
	this._sData = null;		
	this._o_sData == null;
	this._sData = items;	
	var _sData = CloneOpr.cloneObj(items);
	var _sformat = this.configure["sformat"];
	if(typeof(_sformat) == "function"){
		dojo.forEach(_sData, function(sEntry, i){		
			_sformat(sEntry);
		});
	}
	this._o_sData = CloneOpr.cloneObj(_sData);
	this.setData(_sData);		
};

/**
	针对前台传入的json源数据，根据自定义的format函数，转换
*/
DojoGrid.prototype.setData4Json = function(jsonData){
	this._jData = null;
	this._f_jData = null;
	this._o_sData = null;		
	var _jData = [];
	var _dataTemp = [];
	if(jsonData != null){
		_jData = CloneOpr.cloneArr(jsonData);	
	}
	var _mapJ2S = this.configure["mapJ2S"];		
	var _format = this.configure["format"];
	if(typeof(_format) == "function"){
		dojo.forEach(_jData, function(jsonentry, i){		
			_format(_jData[i]);
		});
	}
	/*  */
	this._f_jData = _jData;	
	this._jData = jsonData;	
	/* 根据json和obj对应关系表，将json转换为obj */
	dojo.forEach(_jData, function(jsonentry, i){
		var _obj = {};
		dojo.forEach(jsonentry, function(entry, j){	
			_obj[_mapJ2S[j]] = entry;			
		});
		_dataTemp.push(_obj);
	});
	this._o_sData = CloneOpr.cloneObj(_dataTemp);	
	this.setData(_dataTemp);	
};	

/**
	取选中的行数据，
	入参：id（可省略），作为记录的关键字
	返回值：带有id关键字的对象数组
*/	
DojoGrid.prototype.getSelectRows = function(id){
	var _aListReturn = [];
	var _aReturn = [];
	var _grid = this._grid;
	var _items = _grid.selection.getSelected();	
	dojo.forEach(_items, function(selectedItem) {
		if(selectedItem !== null) {
			var aReturnTemp = {};
			aReturnTemp.cols = selectedItem;
			if("undefined" == typeof(id)){
				aReturnTemp.id = "";
			}else{
				dojo.forEach(_grid.store.getAttributes(selectedItem), function(attribute){
					if(attribute == id){
						aReturnTemp.id = (_grid.store.getValues(selectedItem, attribute))[0];
					} 
				}); 
			}	
			_aReturn.push(aReturnTemp);
		} 
	});	
	if(_aReturn.length == 0){
		Message.alert(comLanguage['noselect']);
	}	
	_aListReturn = CloneOpr.cloneArr(_aReturn);	
	return _aListReturn;	
};		

/**
	取以“CSV”格式数据，用于导出
*/	
DojoGrid.prototype.expotData = function(){
	var _grid = this._grid;
	var _returnStr;
	_grid.exportGrid("csv", function(csvStr){
		_returnStr = csvStr;
	});		
	return _returnStr;
};


/**
	导出数据，格式为excel或word
*/
DojoGrid.prototype.saveFile = function(fileType,opType){
	var _strCSV = this.expotData();	
	//return;
	var _aItms = _strCSV.split("\r\n");
	var _sThead = _aItms[0];
	var _aRows =	_aItms.slice(1,_aItms.length);

	// creat table 
	var _tableStr =  HtmlTable.creatTable(_sThead,_aRows);	
	var action = "saveFileByIE";
	if(!document.getElementById('saveFileDiv')){
		var saveDiv = document.createElement('div');
		saveDiv.id = 'saveFileDiv';
		saveDiv.style.display = 'none';
		saveDiv.innerHTML = '<form id="SaveForm" method="post" target="SaveFrame" action="../../../goform/Lmp_UpdateAll"> \
    							<input id="action" type="text" name="action" /> \
								<input id="fileType" type="text" name="fileType" /> \
								<input id="opType" type="text" name="opType" /> \
								<input id="SESSIONID" type="text" name="SESSIONID" /> \
							    <input type="text" id="excelStr" name="excelStr" value=""/> \
							 </form> \
							 <iframe name="SaveFrame" id="SaveFrame" src="" ></iframe>';
		document.body.appendChild(saveDiv);
	}
	
	if(document.getElementById('saveFileDiv')){
		document.getElementById("action").value = action;
		document.getElementById("fileType").value = fileType;
		document.getElementById("opType").value = opType;
		document.getElementById("SESSIONID").value = getCookie("SESSIONID");
		document.getElementById("excelStr").value = _tableStr;		
		// 以form方式下载文件时，需要提交后，延时3秒对target对应的iframe读取错误码，处理
		// 入参 为要提交form的id			
		submitDownload("SaveForm");
	}	
};	

/**
	数据过滤，支持模糊匹配 
*/
DojoGrid.prototype.getFilterData = function(regFlag){
	var _grid = this._grid;
	var _o_sData = this._o_sData;
	var _dataTemp = [];	
	dojo.forEach(_o_sData, function(sEntry, i){	
		if(sEntry !== null) {
			delete sEntry._0;
			delete sEntry._S;
			delete sEntry._RI;
			var _strFilterItems = "";
			for(var name in sEntry){ 
				if(name.indexOf("_0") == -1 && name.indexOf("_RI") == -1 && name.indexOf("_S") == -1 && typeof(name) != "undefined"){
					_strFilterItems += sEntry[name] + ",";
				}
			} 
			if(_strFilterItems.indexOf(regFlag) != -1){
				_dataTemp.push(sEntry);
			}
		} 	
	});		
	
	this.setData(_dataTemp);			
};


DojoGrid.prototype.getFilterData4Json = function(regFlag){
	var _jData = [];
	_jData = CloneOpr.cloneArr(this._f_jData);	
	var _mapJ2S = this.configure["mapJ2S"];		
	var _format = this.configure["format"];
	var _dataTemp = {};
	_dataTemp["items"] = [];	
	var _jsFilerData = [];
	dojo.forEach(_jData, function(entry, i){	
		var _strFilterItems = dojo.toJson(entry);
		if(_strFilterItems.indexOf(regFlag) != -1){
			_jsFilerData.push(CloneOpr.cloneArr(entry));
		}	
	});		
	/* 根据json和obj对应关系表，将json转换为obj */
	dojo.forEach(_jsFilerData, function(jsonEntry, i){	
		var _strObj = "{";
		dojo.forEach(jsonEntry, function(entry, j){	
			_strObj += _mapJ2S[j]+":\""+entry+"\"";
			if(j < jsonEntry.length-1){
				_strObj += ",";
			}
		});
		_strObj += "}"
		var _obj = eval("("+_strObj+")");
		_dataTemp["items"].push(_obj);
	});	
	var _store = new dojo.data.ItemFileReadStore({
		data: _dataTemp
	});		
	this._grid.setStore(_store);	
};	

/**
	生成导出用的网页表格
*/
var HtmlTable = {
    creatTable: function(sThead,aRows){
		/* creat thead of table */	
		var aThs = sThead.split(",");
		var tableStr = '<table><thead><tr>';
		for(var i=0,iLen=aThs.length;i<iLen;i++){
			tableStr += '<td>'+ this.replaceReg(aThs[i],"%","%%") +'</td>';
		}
		tableStr += '</tr></thead><tbody>';
		/* creat tbody of table */	
		
		for(var j=0,jLen=aRows.length;j<jLen;j++){		
			tableStr += '<tr>'
			var aCols = aRows[j].split(",");		
			for(var k=0,kLen=aCols.length;k<kLen;k++){		
				tableStr += '<td>'+ this.replaceReg(aCols[k],"%","%%") +'</td>';
			}
			tableStr += '</tr>';
		}
		tableStr += '</tbody></table>';
		return tableStr;
	},
    replaceReg: function (sInput,reg,regReplace){
		var indexOfPct = sInput.indexOf(reg);			
		if(indexOfPct != -1){
			return sInput.substring(0,indexOfPct) + regReplace + sInput.substring(indexOfPct+1);
		}else{
			return sInput;
		}
    }
};
