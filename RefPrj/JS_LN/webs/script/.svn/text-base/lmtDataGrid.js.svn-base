
dojo.require("dojox.grid.DataGrid");

var _o_sData;
	
// 构造页面所需要的表格
function fnGenerateGrid(aLayout,selectMode) {
	var data = {items: []};
	var store = new dojo.data.ItemFileReadStore({
		  data: data
	});
	
    if(typeof(selectMode) == "undefined")
    {
        selectMode = "multiple";
    }
    
	// 创建一个新的表格
	grid = new dojox.grid.DataGrid({
		id: 'grid',
		store: null,
		structure: aLayout,
		rowsPerPage: "400",
		selectionMode: selectMode,
		//keepRows: "200",
		height: '400px',
		rowSelector: '20px'});

	// 将新生成的表格放置到页面中
	grid.placeAt("gridDiv");

	// 调用startup()渲染表格
	grid.startup();
}

//页面表格加载数据
function generateStoreData(itemList) {
	//将源数据保存在全局数组内，用于针对列的数据过滤
	_o_sData = CloneOpr.cloneObj(itemList);
	fnSetStore(itemList);
}
/**
	重新组织数据,封装为Grid可用格式	
*/
function fnSetStore(itemList){
	var dataTemp = {};
	dataTemp["items"] = itemList;
	var store = new dojo.data.ItemFileReadStore({
		data: dataTemp
	});
		
	grid.setStore(store);
}
/**
	针对列的数据过滤
	入参：要匹配的字符串 要查询的列（feild名）数组
*/
function fnFilterData(regFlag,cols){
	var _dataTemp = [];	
	dojo.forEach(_o_sData, function(sEntry, i){	
		if(sEntry !== null && cols != null) {
			var _strFilterItems = "";
			dojo.forEach(cols, function(col, i){
				_strFilterItems += sEntry[col] + ",";
			});
			if(_strFilterItems.indexOf(regFlag) != -1){
				_dataTemp.push(sEntry);
			}
		} 	
	});		
	
	fnSetStore(_dataTemp);			
}

//显示多行，返回选中数组
function SelectDataView(){
	 var items = grid.selection.getSelected();

	 var aItemSelect = [];
	 if((items[0] != null) && (items.length != 0)){
		dojo.forEach(items, function(selectedItem){
			 if(selectedItem !== null) {
				 /*
				 dojo.forEach(grid.store.getAttributes(selectedItem), function(attribute){
					 var value = grid.store.getValues(selectedItem, attribute);
					 //alert('attribute: ' + attribute + ', value: ' + value);
				 }); */
				 aItemSelect.push(selectedItem);
			 } 
		 }); 
		 return aItemSelect;
	 } else {
		Message.alert(comLanguage['noselect']);
		return -1;
	 }	
}

//显示选中行中列的值
 function SelectSingleDataView(){
	 var aSelData = SelectDataView();

	 if(aSelData == -1) {
		return null;
	 }else if(aSelData.length > 1) {
		Message.alert(comLanguage['selmore']);
		return null;
	 }else {
		return aSelData[0];
	 } 
}

function SelectAllGrid(){
	grid.selection.selectRange(0,grid.rowCount);
	return grid;
}

function UnSelectAllGrid(){
	grid.selection.deselectAll();
	return grid;
}
