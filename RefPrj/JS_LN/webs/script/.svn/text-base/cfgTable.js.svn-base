/*
 * @author LiuNa
 * @Create	2010-4-13
*/
$(document).ready(function(){  
    
     $("table#task tbody>tr:even").addClass("odd"); 
}); 


$(document).ready(function () {
    //鼠标移动到行变色,单独建立css类hover
    //tr:gt(0):表示获取大于 tr index 为0 的所有tr，即不包括表头
    $("#task tr:gt(0)").hover(
    function () { $(this).addClass("hover") },
    function () { $(this).removeClass("hover") })
});


function cfgTable(configure){
	this._table = null;

	this.configure = {
		"detailMode": false,	
		"detailFunc": null,
		"rowSelected": false,	/*多行选择，默认可用  */
		"singleRowSelected":true,/*单行选择，默认不可用  */
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
cfgTable.prototype.getHeader = function(){
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
cfgTable.prototype.getSelectedRowIndex = function(){
	var aTrs = this._table.fnGetNodes();
	
	for ( var i=0 ; i<aTrs.length ; i++ ){
		if ( ($(aTrs[i]).hasClass('row_selected')) && (aTrs[i].rowIndex != -1)){
			return i;
		}
	}
	return 0;
};

cfgTable.prototype.show = function(data,flag){
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
cfgTable.prototype.update = function(data){
	if(data != null){
		this._table.fnClearTable(true);
		this.insertRows(data,1);
	}
	this.flushData();
	return this;
};
cfgTable.prototype.insertRows = function(data,flag){
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
