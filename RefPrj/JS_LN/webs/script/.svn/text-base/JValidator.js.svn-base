/************************************************************************
* 版权所有 (C)2009, 中兴通讯股份有限公司。
* 
* 文件名称：  JValidator.js
* 文件标识：  见LMP详细设计说明书
* 内容摘要：  输入验证。提供常用输入数据验证。
* 其它说明：  无
* 当前版本：  1.0
* 作    者：  王震
* 完成日期：  2010年4月20日
* 
* 修改记录1： 
*    修改日期：2010年4月20日
*    版 本 号：1.0
*    修 改 人：王震
*    修改内容：创建
*
* 修改记录2： 
*    修改日期：2011年9月22日
*    版 本 号：1.0
*    修 改 人：袁朕
*    修改内容：添加Mac地址数据类型
*
* 修改记录3： 
*    修改日期：2011年10月10日
*    版 本 号：1.0
*    修 改 人：袁朕
*    修改内容：添加MyTime自定义时间类型HH:MM(不包含秒)
************************************************************************/
/**
 * 
 */
var JType = {
	Length : 0, 		//字符串长度比较类型
	String : 1, 		//字符类型
	Integer : 2, 		//整型
	Float : 3,			//浮点型
	Date : 4,			//日期类型
	Time : 5,			//时间类型
	DateTime : 6,		//日期时间类型
	Ip : 7,				//IP类型
	Mac : 8,			//MAC类型
	MyTime : 9,			//自定义时间类型HH:MM(不包含秒)
	Password:10
};

var JCondition = {
	Equal : 1,		//相等比较条件
	GreatEqual : 2,	//大于等于
	LessEqual : 3,	//小于等于
	Great : 4,		//大于
	Less : 5,	//小于
	NotEqual : 6,	//不等于
	Like : 7		//模糊查询(字符串)
};

var us_en_Language = {
		'required':'The field value is required.',
		'range' : 'The field range is ',
		'StrRange' : 'The field value length is ',
		'Length' : 'The field value length must greater than 0.',
		'String' : 'String field must start with character and only contain numbers and characters.',
		'Integer' : 'The filed value must be an integer number.',
		'Float' : 'The filed value must be a float number.',
		'Date' : 'Date filed value format is YYYY-MM-DD.',
		'Time' : 'Time filed value format is HH:MM:SS.',
		'MyTime' : 'Time filed value format is HH:MM.',
		'DateTime' : 'DateTime filed value format is YYYY-MM-DD HH:MM:SS.',
		'Ip' : 'IP is invalid.',
		'Mac' : 'MAC is invalid.',
		'Equal': 'The filed value need equals to one of [',
		'NotEqual': 'The filed value need not equals to all of [',
		'GreatEqual': 'The filed value need greater than or equals to all of [',
		'Great': 'The filed value need greater than all of [',
		'LessEqual': 'The filed value need less than or equals to all of [',
		'Less': 'The filed value need less than all of [',
		'Password':'Password must contain at least three kinds in upper case characters, lowe case characters, numbers and symbols.'
	};

    var zh_cn_Language = {
		'required':'值不能为空.',
		'range' : '取值范围是 ',
		'StrRange' : '有效长度是 ',
		'Length' : '值必须大于0.',
		'String' : '字符串必须以字母开始且只能包含字母和数字。',
		'Integer' : '值必须是整数。',
		'Float' : '值必须是浮点数。',
		'Date' : '日期类型格式必须是YYYY-MM-DD.',
		'Time' : '时间类型格式必须是HH:MM:SS.',
		'MyTime' : '时间类型格式必须是HH:MM.',
		'DateTime' : '日期时间类型格式必须是YYYY-MM-DD HH:MM:SS.',
		'Ip' : 'IP地址格式无效.',
		'Mac' : 'MAC地址格式无效.',
		'Equal': '取值集合为 [',
		'NotEqual': '取值集合不能为 [',
		'GreatEqual': '取值集合必须大于等于 [',
		'Great': '取值集合必须大于 [',
		'LessEqual': '取值集合必须小于等于 [',
		'Less': '取值集合必须小于 [',
		'Password':'密码必须同时包含大写字母、小写字母、数字、符号四项中的至少三项。'
	};
/**
 *	表单验证对象
 * elements格式：[
 * 	{id:'id1', type:JType, require:true, rangerange:[min,max], errorInfo:errorInfo},
 *  {id:'id2', type:JType, require:true, range:[min,max], errorInfo:errorInfo}
 * ]
 */
function Validator(configure){
	this.configure = {
		"container": "lblErrInfo",
		"elements": null
	};
	
	this.oLanguage = (comLanguage==oLanguage_us_en) ? us_en_Language : zh_cn_Language;
	
	if(('undefined'!=typeof(configure)) && (null!=configure)){
		for(var i in configure){
			this.configure[i] = configure[i];
		}
	}
	this._curErrorInfo = '';
	this._curValue = null;
	this._curValueStr = '';
	this._curElem = null;
	this._checkedData = new Array();
	this._id=0;
	this._elementInfos=[];
	this._errorContainer = document.getElementById(this.configure['container']);
	if(! this._errorContainer){
		window.alert('Warnning: Error infomation container is null. container id is: '+this.configure['container']);
	}
	this.add(this.configure['elements']);
}

/**
	添加需验证的数据
	@param elementInfo 验证元素的信息
	@comment 对于元素内容的检查应在元素是否检查之后
*/
Validator.prototype.add=function(elements){
	if(('undefined'!=typeof(elements)) && (null!=elements)){
		for(var i in elements){
			this._elementInfos[this._id++] = elements[i];
		}
	}
};

/**
 * 验证页面输入内容
 */
Validator.prototype.check = function(){
	var element;
	var result = true;
	for(var i in this._elementInfos){
		element = this._elementInfos[i];
		this._curElem = document.getElementById(element['id']);
		if(this._curElem.disabled == true){
			continue;
		}
		if (this._curElem) {
			//清除错误信息
			this.clearErrorInfo(this._curElem);
			
			this._curValueStr = this._curElem.value;
			//验证不为空
			result = this.checkRequire(element);
			if(result == false){
				this.setErrorInfo(this._curElem, this._curErrorInfo);
				break;
			}
			//验证数据类型				
			result = this.checkValueType(element);
			if(result == false){
				this.setErrorInfo(this._curElem, this._curErrorInfo);
				break;
			}
			//验证范围
			result = this.checkValueRange(element);
			if(result == false){
				this.setErrorInfo(this._curElem, this._curErrorInfo);
				break;
			}
			//验证条件
			result = this.checkCondition(element);
			if(result == false){
				this.setErrorInfo(this._curElem, this._curErrorInfo);
				break;
			}
		}
	}
	return result;
};

/**
 * 验证条件。
 * @param {Object} element
 */
Validator.prototype.checkCondition = function(element){
	var result = false;
	if (element['condition'] && element['values']) { /* 为空，直接提示错误并返回。 */
		var tempValue;
		var value, curValue;
        curValue = this._curValue;
		switch(element['condition']){
			case JCondition.Equal:{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}
					}
					else{
						value = tempValue;	
					}
					if(value == curValue){
						return true;
					}
				}
				if (element['errorInfo']) {
					this._curErrorInfo = element['errorInfo'];
				}
				else {
					this._curErrorInfo = this.oLanguage['Equal'] + element['values'].toString() + ']';
				}
				break;
			}
			case JCondition.GreatEqual :{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}						
					}
					else{
						value = tempValue;	
					}
					if(curValue < value){
						if (element['errorInfo']) {
							this._curErrorInfo = element['errorInfo'];
						}
						else {
							this._curErrorInfo = this.oLanguage['GreatEqual'] + element['values'].toString() + ']';
						}
						return false;
					}
				}
				return true;
			}
			case JCondition.LessEqual :{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}						
					}
					else{
						value = tempValue;	
					}
					if(curValue > value){
						if (element['errorInfo']) {
							this._curErrorInfo = element['errorInfo'];
						}
						else {
							this._curErrorInfo = this.oLanguage['LessEqual'] + element['values'].toString() + ']';
						}
						return false;
					}
				}
				return true;
			}
			case JCondition.Great :{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}
					}
					else{
						value = tempValue;	
					}
					if(curValue<value || curValue==value){
						if (element['errorInfo']) {
							this._curErrorInfo = element['errorInfo'];
						}
						else {
							this._curErrorInfo = this.oLanguage['Great'] + element['values'].toString() + ']';
						}
						return false;
					}
				}
				return true;
			}
			case JCondition.Less :{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}
					}
					else{
						value = tempValue;	
					}
					if(curValue>value || curValue==value){
						if (element['errorInfo']) {
							this._curErrorInfo = element['errorInfo'];
						}
						else {
							this._curErrorInfo = this.oLanguage['Less'] + element['values'].toString() + ']';
						}
						return false;
					}
				}
				return true;
			}
			case JCondition.NotEqual :{
				for(var i in element['values']){
					tempValue = element['values'][i];
					if(tempValue.charAt(0) == '#'){ // id
						value = this._checkedData[tempValue];
						if(typeof(value) == "undefined") {
							value = document.getElementById(tempValue.substr(1)).innerHTML;
						}
					}
					else{
						value = tempValue;	
					}
					if(curValue==value){
						if (element['errorInfo']) {
							this._curErrorInfo = element['errorInfo'];
						}
						else {
							this._curErrorInfo = this.oLanguage['NotEqual'] + element['values'].toString() + ']';
						}
						return false;
					}
				}

				return true;
			}
			default:
				break;
		}
		return result;
	}
	return true;
};
/**
 * 验证不为空。
 * @param {Object} element
 */
Validator.prototype.checkRequire = function(element){
	if (this._curValueStr === '') { /* 为空，直接提示错误并返回。 */
		if (element['errorInfo']) {
			this._curErrorInfo = element['errorInfo'];
		}
		else {
			this._curErrorInfo = this.oLanguage['required'];
		}
		return false;
	}
	return true;
};

/**
 * 验证数据类型，验证通过的数据保存在this._curValue中，用于验证数据范围。
 * @param {Object} element
 */
Validator.prototype.checkValueType = function(element){
	var result = true;
	switch(element['type']){		
		case JType.Length:{
			if (this._curValueStr.length !== 0){
				this._curValue = this._curValueStr.length;
			}
			else{
				this._curErrorInfo = this.oLanguage['Length'];
				result = false;
			}
			break;
		}
		case JType.String:{
			this._curValue = this.checkString(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['String'];
				result = false;
			}
			break;
		}
		case JType.Integer:{
			this._curValue = this.checkInteger(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Integer'];
				result = false;
			}
			break;
		}
		case JType.Float:{
			this._curValue = this.checkFloat(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Float'];
				result = false;
			}
			break;
		}
		case JType.Date:{
			this._curValue = this.checkDate(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Date'];
				result = false;
			}
			break;
		}
		case JType.Time:{
			this._curValue = this.checkTime(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Time'];
				result = false;
			}
			break;
		}
		case JType.MyTime:{
			this._curValue = this.checkMyTime(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['MyTime'];
				result = false;
			}
			break;
		}
		case JType.DateTime:{
			this._curValue = this.checkDatetime(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['DateTime'];
				result = false;
			}
			break;
		}
		case JType.Ip:{
			this._curValue = this.checkIP(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Ip'];
				result = false;
			}
			break;
		}
		case JType.Mac:{
			this._curValue = this.checkMAC(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Mac'];
				result = false;
			}
			break;
		}
		case JType.Password:{
			this._curValue = this.checkPassword(this._curValueStr);
			if (null == this._curValue) {
				this._curErrorInfo = this.oLanguage['Password'];
				result = false;
			}
			break;
		}
		default:
			break;
	}
	/* 保存验证通过的数据，后续条件验证时不再从页面中提取数据和转换。 */
	if (result) {
		this._checkedData['#'+element['id']] = this._curValue;
	}
	return result;
};

/**
 * 检验字符串。
 * 正确返回字符串，否则返回null.
 * @param {Object} str
 */
Validator.prototype.checkString = function(str){
    if ((/^[a-zA-z]([a-zA-Z0-9])*$/).test(str)) {
        return str;
    }
    return null;
};

/**
 * 检验整数。
 * 正确返回整数，否则返回null.
 * @param {Object} num
 */
Validator.prototype.checkInteger = function(num){
    if ((/^(0|-?[1-9]\d*)$/).test(num)) {
        return parseInt(num);
    }
    return null;
};

/**
 * 检验浮点数。
 * 正确返回浮点数，否则返回null.
 * @param {Object} num
 */
Validator.prototype.checkFloat = function(num){
	if ((/^(-?\d+)(\.\d+)?$/).test(num)) {
        return parseFloat(num);
    }
    return null;
};

/**
 * 检验IP。
 * 正确返回IP，否则返回null.
 * @param {Object} ip
 */
Validator.prototype.checkIP = function(ip){
	if ((/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).test(ip)){
		return ip;
	}
	return null;
};

/**
 * 检验MAC。
 * 正确返回MAC，否则返回null.
 * @param {Object} mac
 */
Validator.prototype.checkMAC = function(mac){
	if ((/^[A-F\a-f\d]{2}-[A-F\a-f\d]{2}-[A-F\a-f\d]{2}-[A-F\a-f\d]{2}-[A-F\a-f\d]{2}-[A-F\a-f\d]{2}$/).test(mac)){
		return mac;
	}
	return null;
};
/**
 * 检验Password。密码必须同时包含大写字母、小写字母、数字、特殊符号等四项中的至少三项
 * 正确返回Password，否则返回null.
 * @param {Object} Password
 */
Validator.prototype.checkPassword = function(Password){
	if ((/^(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![0-9\W]+$)(?![a-z\W]+$)(?![a-zA-Z]+$)(?![A-Z\W]+$)[a-zA-Z0-9\W_]+$/).test(Password)){
		return Password;
	}
	return null;
};
Validator.prototype.parseNumber = function(str){
	if(str === '08'){
		str = '8';
	}
	else if(str === '09'){
		str = '9';
	}
	
	return parseInt(str);
}
/**
 * 检查日期时间格式。
 * 验证通过返回Date对象，否则返回null
 * @param {Object} datetime
 */
Validator.prototype.checkDatetime = function(datetime){
	var matches;
	matches = datetime.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2})$/);
	if(matches){
		//暂时未判断闰年
		var month = this.parseNumber(matches[2]);
		if(month<1 || month>12){
			return null;
		}
		
		var day = this.parseNumber(matches[3]);
		if(day<1 || day>31){
			return null;
		}
		else if(month==2 && day>29){
			return null;
		}
		else if ((month==4 || month==6 || month==9 || month==11) && day>30){
			return null;
		}
		var temp = this.parseNumber(matches[4]);
		if(temp<0 || temp>23){
			return null;
		}
		temp = this.parseNumber(matches[5]);
		if(temp<0 || temp>59){
			return null;
		}
		temp = this.parseNumber(matches[6]);
		if(temp<0 || temp>59){
			return null;
		}
		return new Date(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]);
	}
	return null;
};

/**
 * 检查日期格式。
 * 验证通过返回Date对象，否则返回null
 * @param {Object} date
 */

Validator.prototype.checkDate = function(date){
	var matches;
	var dateArray;
	matches = this._curValueStr.match(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/);
	if(matches){
		dateArray = date.split('-');
		return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], 0, 0, 0);
	}
	return null;
};
 
/**
 * 检查时间格式。
 * 验证通过返回2000年1月1日Date对象，否则返回null
 * @param {Object} date
 */
Validator.prototype.checkTime = function(time){
	var matches;
	matches = this._curValueStr.match(/^(\d{2,2}):(\d{2,2}):(\d{2,2})$/);
	if(matches){		
		var temp = this.parseNumber(matches[1]);
		if(temp<0 || temp>23){
			return null;
		}
		temp = this.parseNumber(matches[2]);
		if(temp<0 || temp>59){
			return null;
		}
		temp = this.parseNumber(matches[3]);
		if(temp<0 || temp>59){
			return null;
		}
		return new Date(2000, 0, 1, matches[1], matches[2], matches[3]);
	}
	return null;
};

/**
 * 检查精确到分钟的时间格式“HH:MM”。
 * 验证通过返回2000年1月1日Date对象，否则返回null
 * @param {Object} date
 */
Validator.prototype.checkMyTime = function(mytime){
	var matches;
	matches = this._curValueStr.match(/^(\d{2,2}):(\d{2,2})$/);
	if(matches){		
		var temp = this.parseNumber(matches[1]);
		if(temp<0 || temp>23){
			return null;
		}
		temp = this.parseNumber(matches[2]);
		if(temp<0 || temp>59){
			return null;
		}
		return new Date(2000, 0, 1, matches[1], matches[2]);
	}
	return null;
};

/**
 * 验证数据范围。
 * @param {Object} element
 */
Validator.prototype.checkValueRange = function(element){
	var result = true;
	if ((this._curValue != null) && element['range']) {
		var min = null, max = null, range = null; //范围
		var minCondition = null, maxCondition = null, rangeCondition = null; //条件
		var matches;
		switch (element['type']) {
            case JType.Length:
            case JType.String:
			case JType.Integer:
			case JType.Float:{
				//整数和浮点数范围：[min, max] / (min, max) / [min, max) / (min, max],min和max可以整数值或浮点数值
				matches = element['range'].match(/^([\[,\(])((-?\d+)(\.\d+)?),((-?\d+)(\.\d+)?)([\],\)])$/);
				if (matches) {
					min = matches[2];
					max = matches[5];
					if (matches[1] == "[") {
						minCondition = JCondition.Equal;
					}
					else {
						minCondition = JCondition.Great;
					}
					if (matches[8] == "]") {
						maxCondition = JCondition.Equal;
					}
					else {
						maxCondition = JCondition.Less;
					}
				}
				break;
			}
			case JType.Date:{
				//日期验证
				matches = element['range'].match(/^([\[,\(])((\d{4,4})-(\d{2,2})-(\d{2,2})),((\d{4,4})-(\d{2,2})-(\d{2,2}))([\],\)])$/);
				if (matches) {
					min = matches[2]+" 00:00:00";
					max = matches[6]+" 00:00:00";
					if (matches[1] == "[") {
						minCondition = JCondition.Equal;
					}
					else {
						minCondition = JCondition.Great;
					}
					if (matches[10] == "]") {
						maxCondition = JCondition.Equal;
					}
					else {
						maxCondition = JCondition.Less;
					}
				}
				break;
			}
			case JType.DateTime:{
				//时间日期验证
				matches = element['range'].match(/^([\[,\(])((\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2})),((\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2}))([\],\)])$/);
				if (matches) {
					min = matches[2];
					max = matches[9];
					if (matches[1] == "[") {
						minCondition = JCondition.Equal;
					}
					else {
						minCondition = JCondition.Great;
					}
					if (matches[16] == "]") {
						maxCondition = JCondition.Equal;
					}
					else {
						maxCondition = JCondition.Less;
					}
				}
				break;
			}
			case JType.Time:{
				//时间验证
				matches = element['range'].match(/^([\[,\(])((\d{2,2}):(\d{2,2}):(\d{2,2})),((\d{2,2}):(\d{2,2}):(\d{2,2}))([\],\)])$/);
				if (matches) {
					min = "2000-01-01 " + matches[2];
					max = "2000-01-01 " + matches[6];
					if (matches[1] == "[") {
						minCondition = JCondition.Equal;
					}
					else {
						minCondition = JCondition.Great;
					}
					if (matches[10] == "]") {
						maxCondition = JCondition.Equal;
					}
					else {
						maxCondition = JCondition.Less;
					}
				}
				break;
			}
            default:
                break;
		}	
		
		/* 字符串已通过验证，此处转换为长度验证，不中断case */
		if (element['type'] == JType.String) {
			this._curValue = this._curValue.length;
		}
		/* 长度验证和整形验证相同 */
		else if (element['type'] == JType.Integer || element['type'] == JType.Length) {
			min = this.parseNumber(min);
			max = this.parseNumber(max);
		}
		/* 浮点数验证 */
		else if (element['type'] == JType.Float) {
			min = parseFloat(min);
			max = parseFloat(max);
		}
		/* 日期时间验证，转换为毫秒数 */
		else if ((element['type'] == JType.DateTime)
					|| (element['type'] == JType.Date)
					|| (element['type'] == JType.Time)) {
			min = this.checkDatetime(min).getTime();
			max = this.checkDatetime(max).getTime();
			this._curValue = this._curValue.getTime();
		}
		
		/* 判断过程 */
		if ((this._curValue > min) && (this._curValue < max)) {
			result = true;
		}
		else if (minCondition == JCondition.Equal && this._curValue == min) {
			result = true;
		}
		else if (maxCondition == JCondition.Equal && this._curValue == max) {
			result = true;
		}
		else {
			if (element['errorInfo']) {
				this._curErrorInfo = element['errorInfo'];
			}
			else {
				if((element['type'] == JType.String) || (element['type'] == JType.Length)){
					this._curErrorInfo = this.oLanguage['StrRange'] + element.range;
				}
				else{
					this._curErrorInfo = this.oLanguage['range'] + element.range;
				}
			}
			result = false;
		}
	}
	return result;
};

/*
	清除验证条件
*/
Validator.prototype.clear=function(){
	this.elementInfos.splice(0, this.elementInfos.length);
	this.elementInfos=[];
	this.id=0;
}

/*	设置错误信息
	@param errorInfo 错误信息
*/
Validator.prototype.setErrorInfo=function(elem, errorInfo){
    this._errorContainer.style.display="block";
	elem.style.borderColor = "#FF0000";
	elem.focus();
	this._errorContainer.innerHTML=errorInfo;
}

/*	清除错误信息
*/
Validator.prototype.clearErrorInfo=function(elem){
    this._errorContainer.style.display="none";
	elem.style.borderColor = "";
	this._errorContainer.innerHTML="";
}