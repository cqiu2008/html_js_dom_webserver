/**
 * @author WangZhen
 * @Create	2010-4-13
 * 表格生成控件，使用JQuery的表格插件dataTable,版本号1.62。
 * 需要包含库文件：
 * 		<script type="text/javascript" language="javascript" src="lib/jquery-1.4.2.min.js"></script>
		<script type="text/javascript" language="javascript" src="lib/jquery.dataTables.min.js"></script>
 *	需要包含CSS文件：
	<LINK href="css/JTable.css" title="default" type="text/css" rel="stylesheet" />
	<LINK href="css/jquery-ui-1.7.2.custom.css" title="default" type="text/css" rel="stylesheet" />
 * 
 * 调用方式：
 * var columns = [{"sTitle":"#", "sWidth":80, "sChart":false},
			{"sTitle":"Date & Time", "sChart":false, "sTime":true}];
			
	var jtable = new JTable({
		"detailMode": false,	
		"detailFunc": userdefineFunc,
		"rowSelected": true,
		"columns" : columns,
		"data":	null,
		"container": 'jtableContainer',
		"rowCallback": null,
		"tableId": "jtable"
		});
	jtable.show(data);
	
	显示行的详细信息：
	用户需要提供function userdefineFunc(data)函数实现，data为行数据数组，每个元素为行中的一个单元格值。
	

 *  刷新表格数据
	jtable.update(data);
 */
function JTable(configure){
	this._table = null;

	this.configure = {
		"detailMode": false,	
		"detailFunc": null,
		"rowSelected": true,	/*多行选择，默认可用  */
		"singleRowSelected":false,/*单行选择，默认不可用  */
		"columns" : null,
		"data":	null,
		"sort": true,
		"container": 'jtableContainer',
		/* 对行数据进行过滤处理，如将一列中的1替换成true等，传入三个参数nRow, aData, iDisplayIndex */
		/* 如：function convert(nRow, aData, iDisplayIndex){
				if (aData[4] == "A") {
					$('td:eq(4)', nRow).html('<b>A</b>');
				}
				return nRow;
			}
		*/
		"rowCallback": null,
		"detailDiv": null, /*20110808,cq add,将用户定义的div作为展开显示内容*/
		"detailValueFunc":null,
		"tableId": "jtable"	/* 在一个页面中创建多个JTable对象时需要设置不同的tableId */
	};
	
	if(('undefined'!==typeof(configure)) && (null!==configure)){
		for(var i in configure){
			this.configure[i] = configure[i];
		}
	}
}

/**
 * 内部方法。获取由this._columnsObj中数据生成的表头JSON对象
 */
JTable.prototype.getHeader = function(){
	if(null != this.configure['columns']){
		var header = new Array();
		for(var i=0; i<this.configure['columns'].length; i++){
			header.push(eval('({"sTitle": "'+this.configure['columns'][i][0]+'"})'));
		}
		return header;
	}
};

/**
 * 显示表格。
 */
JTable.prototype.show = function(data,flag){
	/* 存在则更新表格内容 */
	if(data!=null && this._table!=null){
		this.update(data);
		return;
	}
	/* 不存在创建并显示表格内容 */
	this.configure['data'] = data;
    if ((null != this.configure['columns']) && (this.configure['data'] != null)) {
        $('#' + this.configure['container']).html('<table cellpadding="0" cellspacing="0" border="0" class="display" id="'+this.configure['tableId']+'"></table>');
		var jtable = this;
		
        var oTable = $('#'+this.configure['tableId']).dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "aaData": this.configure['data'],
            "aoColumns": this.configure['columns'],
            "bSort": this.configure['sort'],
			"bFilter": false,/*--设置为FALSE时取消所有的search功能*/
		
			/*         "aaSorting": [[1, 'desc']], 按照时间排序 
           	"iDisplayLength": 100 */
            "bPaginate": false, /* 不带分页功能，速度很慢 */
			"fnRowCallback": this.configure['rowCallback']
        });
        this._table = oTable;
		/*如无排序功能，增加表格样式*/
		if(this.configure['sort'] === false){
			 $('#'+this.configure['tableId']+' thead th').addClass('ui-state-default');
		}		
		/* 功能1--鼠标所在行高亮 */
        $('#'+this.configure['tableId']+' tbody td').hover(function(){
            var nTrs = oTable.fnGetNodes();
            $('td.highlighted', nTrs).removeClass('highlighted');
        });
        
		/* 功能2--鼠标选中多行 */
		if ((this.configure['rowSelected'])&&(!this.configure['singleRowSelected'])) {
			$('#' + this.configure['tableId'] + ' tr').click(function(){
				if ($(this).hasClass('row_selected')) 
					$(this).removeClass('row_selected');
				else 
					$(this).addClass('row_selected');
			});
		}
		
		/* 功能4--鼠标选中单行 */
		if (this.configure['singleRowSelected']) {
			
			$('#' + this.configure['tableId'] + ' tr').click(function(){
				/*先清空当前行所有选中内容*/
				$(oTable.fnSettings().aoData).each(function (){
					$(this.nTr).removeClass('row_selected');
					
				});
				$(this).addClass('row_selected');
				/*触发类似点击图片的操作*/
				
			
			});
		}
			
        /* 功能3--折叠模式显示详细信息 */
        if (this.configure['detailMode']) {        
            $('#'+this.configure['tableId']+' tbody tr').each(function(){
				var firstTd = this.firstChild;
				firstTd.innerHTML = '<img src="images/details_open.png"/>'+firstTd.innerHTML;
            });
			
			$('#' + this.configure['tableId'] + ' tr').click(function(){
				/*触发类似点击图片的操作*/
				var aTrs = oTable.fnGetNodes();	
				for ( var i=0 ; i<aTrs.length ; i++ ){
					if ( aTrs[i] != this){
						aTrs[i].childNodes[0].childNodes[0].src = "images/details_open.png";
						oTable.fnClose(aTrs[i]);
					}
				}
			});
			
			
            $('td:eq(0) img', oTable.fnGetNodes()).each(function(){
                $(this).click(function(){
                    var nTr = this.parentNode.parentNode;
                    if (this.src.match('details_close')) {
                        this.src = "images/details_open.png";
                        oTable.fnClose(nTr);
                    }
                    else {
                        if(flag == 1)
						{
							var aTrs = oTable.fnGetNodes();	
							for ( var i=0 ; i<aTrs.length ; i++ ){
								if ( aTrs[i] != nTr){
									aTrs[i].childNodes[0].childNodes[0].src = "images/details_open.png";
									oTable.fnClose(aTrs[i]);
								}
							}
						}
                        this.src = "images/details_close.png";
						oTable.fnOpen(nTr, jtable.fnFormatDetails(oTable, nTr), 'details');
						if(jtable.configure['detailValueFunc'] != null){
							var data = oTable.fnGetData(nTr);
							var str = jtable.configure['detailValueFunc'](data);
							//document.getElementById(jtable.configure['detailDiv']).innerHTML = str;
							return;
						}
                    }
                });
            });
        }
    }
};

/**
 * 刷新表格数据
 * @param {Object} data 新的表格数据
 * @return	JTable对象，支持链式操作。
 */
JTable.prototype.update = function(data){
	if(data != null){
		this._table.fnClearTable(true);
		this.insertRows(data,1);
	}
	this.flushData();
	return this;
};

/**
 * 显示表格中行数据的详细信息。内部函数。返回值为显示字符串，如div的innerHTML.
 * @param {Object} oTable		表对象
 * @param {Object} nTr			行对象
 * @return 格式化显示的HTML串或空字符串。
 */
JTable.prototype.fnFormatDetails = function(oTable, nTr){
	var data = oTable.fnGetData(nTr);
	if(this.configure['detailDiv'] != null){
		//this.configure['detailFunc'](data);
		var str = document.getElementById(this.configure['detailDiv']).innerHTML;
		//document.getElementById(this.configure['detailDiv']).innerHTML="";
		return str;
	}else{
			if(this.configure['detailFunc'] != null){
			return this.configure['detailFunc'](data);
		}
	}	
	
	return " ";
};

/**
 * 批量添加。
 * @param {Object} data 添加行数据，添加的行数据需要和设定的表头数据长度一致。
 * 数据格式为[[column1,column2,...,columnN],
			 [column1,column2,...,columnN],
			 ...,
			 [column1,column2,...,columnN]]
 * @return JTable对象，支持链式操作。
 */
JTable.prototype.insertRows = function(data,flag){
	if (this._table != null) {
		var jtable = this;
		var oTable = jtable._table;
		var index = this._table.fnAddData(data); //添加行的索引位置
		for (var i = 0; i < index.length; i++) {
			//添加数据到缓冲数据_data中，保持数据一致。不刷新整个缓冲数据，提供效率。
			this.configure['data'].push(this._table.dataTableSettings[0].aoData[index[i]]._aData);
			
			/* 使用折叠模式显示详细信息 */
			if (this.configure['detailMode']) {
				var nTr = this._table.dataTableSettings[0].aoData[index[i]].nTr;
				var firstTd = nTr.firstChild;
				firstTd.innerHTML = '<img src="images/details_open.png"/>' + firstTd.innerHTML;
				
				$('#' + this.configure['tableId'] + ' tr').click(function(){
				/*触发类似点击图片的操作*/
				var aTrs = oTable.fnGetNodes();	
				for ( var i=0 ; i<aTrs.length ; i++ ){
					if ( aTrs[i] != this){
						aTrs[i].childNodes[0].childNodes[0].src = "images/details_open.png";
						oTable.fnClose(aTrs[i]);
					}
				}
				});
				
				/* 增加img监听事件 */
				$('td:eq(0) img', nTr).click(function(evt){
					var parentTr = this.parentNode.parentNode;
					if (this.src.match('details_close')) {
						this.src = "images/details_open.png";
						oTable.fnClose(parentTr);
					}
					else {
						if(flag == 1)
						{
							var aTrs = oTable.fnGetNodes();	
							for ( var i=0 ; i<aTrs.length ; i++ ){
								if ( aTrs[i] != parentTr){
									aTrs[i].childNodes[0].childNodes[0].src = "images/details_open.png";
									oTable.fnClose(aTrs[i]);
								}
							}
						}
						this.src = "images/details_close.png";
						oTable.fnOpen(parentTr, jtable.fnFormatDetails(oTable, parentTr), 'details');
					}
				});
			}
			
			/* 增加多行选择事件 */
			if ((this.configure['rowSelected'])&&(!this.configure['singleRowSelected'])) {
				var nTr = this._table.dataTableSettings[0].aoData[index[i]].nTr;
				$(nTr).click(function(){
					if ($(this).hasClass('row_selected')) 
						$(this).removeClass('row_selected');
					else 
						$(this).addClass('row_selected');
				});
			}
			
		
		/* 功能4--增加鼠标选中单行 */
		if (this.configure['singleRowSelected']) {
			var nTr = this._table.dataTableSettings[0].aoData[index[i]].nTr;
			$(nTr).click(function(){
			/*先清空当前行所有选中内容*/
				$(oTable.fnSettings().aoData).each(function (){
					$(this.nTr).removeClass('row_selected');
				});
			$(this).addClass('row_selected');
			});
		}
	
		}
	}
	return this;
};

/**
 * 批量删除。
 * 删除之前需要先选择需要删除的行。
 * @return JTable对象，支持链式操作。
 */

JTable.prototype.deleteRows = function( bNullRow )
{
	var selectedRows = this.getSelectedRows();
	var iAODataIndex = 0;
	var oSettings = this._table.dataTableSettings[0];
	
	for(var i in selectedRows){
		iAODataIndex =  (typeof selectedRows[i] == 'object') ? 
				this._table.oApi._fnNodeToDataIndex(oSettings, selectedRows[i]) : selectedRows[i];
		/* Delete from the display master */
		for ( i=0 ; i<oSettings.aiDisplayMaster.length ; i++ )
		{
			if ( oSettings.aiDisplayMaster[i] == iAODataIndex )
			{
				oSettings.aiDisplayMaster.splice( i, 1 );
				break;
			}
		}
		
		/* Delete from the current display index */
		for ( i=0 ; i<oSettings.aiDisplay.length ; i++ )
		{
			if ( oSettings.aiDisplay[i] == iAODataIndex )
			{
				oSettings.aiDisplay.splice( i, 1 );
				break;
			}
		}
			
		if ( typeof bNullRow != "undefined" && bNullRow === true )
		{
			oSettings.aoData[iAODataIndex] = null;
		}
	}
		/* Rebuild the search */
	this._table.oApi._fnBuildSearchArray( oSettings, 1 );
	
	/* If there is a user callback function - call it */
	if ( typeof fnCallBack == "function" )
	{
		fnCallBack.call( this._table );
	}
	
	/* Check for an 'overflow' they case for dislaying the table */
	if ( oSettings._iDisplayStart >= oSettings.aiDisplay.length )
	{
		oSettings._iDisplayStart -= oSettings._iDisplayLength;
		if ( oSettings._iDisplayStart < 0 )
		{
			oSettings._iDisplayStart = 0;
		}
	}
	
	this._table.oApi._fnCalculateEnd( oSettings );
	this._table.oApi._fnDraw( oSettings );
	
	this.flushData();
	return this;
};

/**
 * 删除一行。
 * @return JTable对象，支持链式操作。
 */
JTable.prototype.deleteRow = function(tr){
	this._table.fnDeleteRow( tr );
	this.flushData();
	return this;
};

/**
 * 刷新缓冲数据。
 * 在对表格进行添加，删除，更新操作后刷新缓冲数据，使缓冲数据和表格数据一致。
 * @return this._data 刷新后的缓冲数据。
 */
JTable.prototype.flushData = function(){
	if (null != this.configure['data']) {
		this.configure['data'].splice(0, this.configure['data'].length);
		var aoData = this._table.dataTableSettings[0].aoData;
		for(var i in aoData){
			if(aoData[i].nTr.rowIndex != -1){
				this.configure['data'].push(aoData[i]._aData);
			}
		}
	}
	return this.configure['data'];
};
/**
 * 选择所有行。
 * @return JTable对象，支持链式操作。
 */
JTable.prototype.selectAllRows = function(){
	var tr = null;
	$('#'+this.configure['tableId']+' tr').each(function(){
		$(this).addClass('row_selected');
	});
	return this;
};

/*导出一行或多行原始数据*/
JTable.prototype.outPriDataSeleckedRow = function(tableNum){
	var jtable = this;
	var aTrData = {'atr':null,'data':[],'text':[]};
	var aTr = this.getSelectedRows();
	var tableIndex = 0;
	
	if(typeof(tableNum) != "undefined") {
		tableIndex = tableNum - 1;
	}

	for(var i=0;i<aTr.length;i++){
		aTrData['atr'] = aTr[i];
		var curIndex = aTr[i].rowIndex;
		for(var j=0;j<jtable._table.dataTableSettings[tableIndex].aoData.length;j++) {
			if((aTr[i].childNodes[0].innerHTML)==(jtable._table.dataTableSettings[tableIndex].aoData[j]._aData[0])){
				aTrData['data'][i]=jtable._table.dataTableSettings[tableIndex].aoData[j]._aData;
			}
		}
	}
	return aTrData;
}

/*导出行数据*/
JTable.prototype.outDataSeleckedRow = function(tableNum){
	var jtable = this;
	var aTrData = {'atr':null,'data':[],'text':[]};
	var aTr = this.getSelectedRows();
	var tableIndex = 0;
	
	if(typeof(tableNum) != "undefined") {
		tableIndex = tableNum - 1;
	}

	//if(aTr.length >1 ){	
		//Message.alert(comLanguage['selectmore']);
		//return null;
	//}

	for(var i=0;i<aTr.length;i++){
	aTrData['atr'] = aTr[i];
	var curIndex = aTr[i].rowIndex;
	for(var j=0;j<jtable._table.dataTableSettings[tableIndex].aoData.length;j++) {
		var isRight = jtable._table.dataTableSettings[tableIndex].aoData[j].nTr.rowIndex;
		if(isRight == curIndex){
			aTrData['data']=jtable._table.dataTableSettings[tableIndex].aoData[j]._aData;
			break;
		}
	}
	return aTrData;
	}
}

/*导出行数据*/
JTable.prototype.outDataSeleckedRowNew = function(){
	var jtable = this;
	var aTrData = {'atr':null,'data':[],'text':[]};
	var aTr = this.getSelectedRows();

	if(aTr.length >1 ){	
		Message.alert(comLanguage['selectmoreDetail']);
		return null;
	}

	for(var i=0;i<aTr.length;i++){
	aTrData['atr'] = aTr[i];
	var curIndex = aTr[i].rowIndex;
	for(var j=0;j<jtable._table.dataTableSettings[0].aoData.length;j++) {
		var isRight = jtable._table.dataTableSettings[0].aoData[j].nTr.rowIndex;
		if(isRight == curIndex){
			aTrData['data']=jtable._table.dataTableSettings[0].aoData[j]._aData;
			break;
		}
	}
	return aTrData;
	}
}

/*修改选中行数据,dataArr格式：[[index,value,text],[index,value,text]]*/
JTable.prototype.changeSeleckedRow4 = function(aTrData){
//var oSettings = ;
		if(aTrData.length == 0)
			return;
		
		if(aTrData['atr'] == null)
			return;
			
		if(aTrData['data'].length == 0)
			return;	
			
			var trPosition;	
			
			trPosition = aTrData['atr'].rowIndex;
			for(var j=0;j<this._table.dataTableSettings[0].aoData.length;j++){
				var isRight = this._table.dataTableSettings[0].aoData[j].nTr.rowIndex;
				if(isRight == trPosition){
					this._table.dataTableSettings[0].aoData[j]._aData = null;
					this._table.dataTableSettings[0].aoData[j]._aData = aTrData['data'];		
					break;
				}
			}
			
		/* Rebuild the search */
	this._table.oApi._fnBuildSearchArray( this._table.dataTableSettings[0], 1 );
	
	/* If there is a user callback function - call it */
	if ( typeof fnCallBack == "function" )
	{
		fnCallBack.call( this._table );
	}
	
	
	
	this._table.oApi._fnCalculateEnd( this._table.dataTableSettings[0] );
	this._table.oApi._fnDraw( this._table.dataTableSettings[0] );
	//this._table.oApi._fnReDraw(oSettings);
	
	//this._table.fnDraw();
	this.flushData(); 
	return this;
			
}

/*修改选中行数据,aTrData格式{'aTr':object,'data':[rowData],'text':[rowTextData]}*/
JTable.prototype.changeSeleckedRow = function(aTrData){
//var oSettings = ;
		if(aTrData.length == 0)
			return;
		
		if(aTrData['atr'] == null)
			return;
			
		if(aTrData['data'].length == 0)
			return;	
			
		if(aTrData['text'].length == 0){
			//return;
		}
		var trPosition;	
			
			trPosition = aTrData['atr'].rowIndex;
			for(var j=0;j<this._table.dataTableSettings[0].aoData.length;j++){
				var isRight = this._table.dataTableSettings[0].aoData[j].nTr.rowIndex;
				if(isRight == trPosition){
				
				for( var k=0;k<aTrData['data'].length;k++){
						this._table.dataTableSettings[0].aoData[j]._aData[k] = aTrData['data'][k];
						 $('td:eq('+k+')',aTrData['atr']).html(aTrData['text'][k]);	
					
					}
					
					break;
				}
			}
			
}

/*修改选中行数据,dataArr格式：[[index,value,text],[index,value,text]]*/
JTable.prototype.changeSeleckedRowCell = function(aTr,dataArr){
		if(aTr == null)
			return;
		
		if(dataArr.length == 0)
			return;
			var trPosition;	

			//trPosition= jtable._table.fnGetPosition(selectedRows[i]);
			trPosition = aTr.rowIndex;
			for(var j=0;j<jtable._table.dataTableSettings[0].aoData.length;j++){
				var isRight = jtable._table.dataTableSettings[0].aoData[j].nTr.rowIndex;
				if(isRight == trPosition){
					for( var k=0;k<dataArr.length;k++){
						jtable._table.dataTableSettings[0].aoData[j]._aData[dataArr[k][0]]=dataArr[k][1];
						$('td:eq('+dataArr[k][0]+')',aTr).html(dataArr[k][2]);
						
					
					}
					break;
					
				}
			}		
}

/**
 * 取消所有行的选择。
 * @return JTable对象，支持链式操作。
 */
JTable.prototype.unSelectAllRows = function(){
	var tr = null;
	$('#'+this.configure['tableId']+' tr').each(function(){
		$(this).removeClass('row_selected');
	});
	return this;
};

/**
 * 选择一行。
 * @return JTable对象。
 */
JTable.prototype.selectRowByTr = function(tr){
	$(this._table.fnGetNodes()[tr]).addClass('row_selected');
	return this;
};

/**
 * 获取已选择的行。
 * @return 列对象数组。
 */
JTable.prototype.getSelectedRows = function(){
	var aReturn = new Array();
	var aTrs = this._table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ ){
		if ( ($(aTrs[i]).hasClass('row_selected')) && (aTrs[i].rowIndex != -1)){
			aReturn.push( aTrs[i] );
		}
	}
	
	if(aReturn.length == 0){
		Message.alert(comLanguage['noselect']);
	}
	
	return aReturn;
};


/**
 * 表格数据保存成excel或word
 * @param {Object} type 0-Excel, 1-Word
 * @param {Object} sort 排序 true/false
 * @param {Object} opType 操作类型 命名文件时用
 * @param {Object} tableNo 表格序号 未传该参数，则默认导出第一个表格数据-----by wanghuijun 2013.05.09
 */
JTable.prototype.saveFile = function(type, sort,opType,tableNo){
	if(type!=0 && type!=1){
		window.alert(comLanguage['fileSupport']);
		return;
	}
	
	if(this._table == null){
		window.alert(comLanguage['noData']);
		return;
	}
	
	var action = "saveFileByIE";
	/*var action = "saveFileByW3C";
	if(window.ActiveXObject){
		action = "saveFileByIE";
	}*/
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
		document.getElementById("fileType").value = type;
		document.getElementById("opType").value = opType;
		document.getElementById("SESSIONID").value = getCookie("SESSIONID");
		
		if(typeof(tableNo) == "undefined")
		{
			var columns = this._table.dataTableSettings[0].aoColumns;
			var rows = this._table.dataTableSettings[0].aoData;
		}
		else{
			var columns = this._table.dataTableSettings[tableNo-1].aoColumns;
			var rows = this._table.dataTableSettings[tableNo-1].aoData;
		}
		var rowData = new Array();
		var index = "";
		if(sort){	
			for (var i in rows) {
				index =new String(rows[i]._aData[0]);
				rowData[index] = rows[i].nTr.childNodes;
			}
		}
		var tableStr = '<table><thead><tr>';
		for(var i in columns){
			/*2012.6.11 bjt 修改 表格标题中有%时 导出文件中不显示*/
			var indexOfPct = columns[i].sTitle.indexOf("%");
			
			if(indexOfPct != -1){
			    var columnsTitle;
				columnsTitle = columns[i].sTitle.substring(0,indexOfPct) + "%%" + columns[i].sTitle.substring(indexOfPct+1);
				tableStr += '<td>'+ columnsTitle +'</td>';
			}
			/*2012.6.11 bjt end*/
			else {
				tableStr += '<td>'+ columns[i].sTitle +'</td>';
			}
		}
		tableStr += '</tr></thead><tbody>';
		if (sort) {
			for (var i=1; i<=rowData.length; i++) {
			   if(!rowData[i]){
					continue;
				}
				index =new String(i);
				tableStr += '<tr>';
				for (var j=0; j<rowData[index].length;j++) {
					var indexOfSRow = rowData[index][j].innerHTML.indexOf("%");
			
					if(indexOfSRow != -1){
						var columnsRow;
						columnsRow = rowData[index][j].innerHTML.substring(0,indexOfSRow) + "%%" + rowData[index][j].innerHTML.substring(indexOfSRow+1);
						tableStr += '<td>' + columnsRow + '</td>';
					}
					
					else {
						tableStr += '<td>' + rowData[index][j].innerHTML + '</td>';
					}
					
				}
				tableStr += '</tr>';
			}
		}
		else {
			for (var i in rows) {
			  if(!rowData[i]){
					continue;
				}
				tableStr += '<tr>'
				for (var j in rows[i]._aData) {
					var indexOfRow = rows[i]._aData[j].indexOf("%");
			
					if(indexOfRow != -1){
						var columnsRow;
						columnsRow = rows[i]._aData[j].substring(0,indexOfRow) + "%%" + rows[i]._aData[j].substring(indexOfRow+1);
						tableStr += '<td>' + columnsRow + '</td>';
					}
					
					else {
						tableStr += '<td>' + rows[i]._aData[j] + '</td>';
					}
					
				}
				tableStr += '</tr>';
			}
		}
		tableStr += '</tbody></table>';
		document.getElementById("excelStr").value = tableStr;
		//document.getElementById("SaveForm").submit();
		// 以form方式下载文件时，需要提交后，延时3秒对target对应的iframe读取错误码，处理
		// 入参 为要提交form的id			
		submitDownload("SaveForm");
	}
};

/**
 * 获取table中所有显示的数据行号，和getTableData()配合取表格数据。
 * @return Array，表格中显示行对应的数据索引数组。
 */
JTable.prototype.getDisplayRow = function(){
	return this._table.dataTableSettings[0].aiDisplay;
};

/**
 * 获取table中数据行号，getDisplayRow()配合取表格数据。
 */
JTable.prototype.getTableData = function(){
	return this._table.dataTableSettings[0].aoData;
};

/**
 * 获取table中行的数据
 * @param {Object} rowIndex 行号
 */
JTable.prototype.getRowData = function(rowIndex){
	return this._table.dataTableSettings[0].aoData[this._table.dataTableSettings[0].aiDisplay[rowIndex]];
};

/**
 * 获取table中行的数据
 * @param {Object} rowIndex 行号
 */
JTable.prototype.getRowDataByTr = function(nTr){
	var aoData = this._table.dataTableSettings[0].aoData;
	for(var i in aoData){
		if(nTr == aoData[i].nTr){
			return aoData[i]._aData;
		}
	}
};

/**
 * 隐藏或显示表格中某一列。
 * @param {Object} iCol 列号
 */
JTable.prototype.hiddenColumn  = function(iCol){
	if (this._table != null) {
		var bVis = this._table.fnSettings().aoColumns[iCol].bVisible;
		this._table.fnSetColumnVis(iCol, bVis ? false : true);
	}
};

/**
 * 隐藏表格中某一列。
 * @param {Object} iCol 列号
 */
JTable.prototype.hiddenColumnAlways  = function(iCol){
	if (this._table != null) {
		this._table.fnSetColumnVis(iCol,false);
	}
};

/**
 * 清除表格内容。
 */
JTable.prototype.clear = function(){
    if(this._table){
        this._table.fnClearTable(true);
    }
}

JTable.prototype.getSelectedRowIndex = function(){
	var aTrs = this._table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ ){
		if ( ($(aTrs[i]).hasClass('row_selected')) && (aTrs[i].rowIndex != -1)){
			return i;
		}
	}
	return 0;
};

JTable.prototype.getTableRowsNum = function(){
	var aTrs = this._table.fnGetNodes();
	return aTrs.length;
};

