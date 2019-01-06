//****************************************************************************
// 提供了Babu客户端框架的通用功能。
// 版本: 0.3
// 作者: 一风
// 电邮: effun@163.com
// 更新: 2010-3-7
// 博客: http://www.cnblogs.com/effun/
//****************************************************************************
// 大家都是写程序的，知道编程的辛苦，所以虽然可以免费使用本软件，
// 但请一定保留上面的信息，谢谢合作。  :)
//****************************************************************************
// Download by http://www.codefans.net
window.Babu = {}

Babu.ErrorHelper = {}

Babu.ErrorHelper.invalidArgument = function(argName) {
    var msg = "Invalid argument";

    if (argName) msg += ": " + argName;
    else msg += ".";

    throw new Error(msg);

    return true;
}

Babu.ErrorHelper.notImplemented = function() {

    throw new Error("Not implemented yet.");

    return true;
}

Babu.ErrorHelper.invalidOperation = function(message) {
    if (!message) message = "Invalid operation.";

    throw new Error(message);

    return true;
}

Babu.ArrayHelper = {}

Babu.ArrayHelper.isArray = function(obj) {
    return typeof obj === "object" && typeof obj.length === "number";
}

Babu.ArrayHelper.indexOf = function(array, item, start, length) {
/// <summary>从指定的数组中检索一个，返回第一个匹配的索引。</summary>
/// <param name="array" type="Array">要检索值的数组。</param>
/// <param name="item" type="Varient">要检索的值。</param>
/// <param name="start" type="Number" optional="true">从0开始的索引值</param>
/// <param name="length" type="Number" optional="true"></param>
    if (Babu.ArrayHelper.isArray(array)) {
        if (isNaN(start)) start = 0;
        else if (start < 0) Babu.ErrorHelper.invalidArgument("start");

        if (isNaN(length)) length = array.length - start;

        for (var i = start; i < length; i++) {
            if (array[i] === item)
                return i;
        }
    }
    else
        Babu.ErrorHelper.invalidArgument("array");

    return -1;
}

Babu.ArrayHelper.clone = function(array) {
/// <summary>复制一个数组的内容到一个新的数组。</summary>
    var clone;

    if (array.length === 1)
        clone = [array[0]];
    else
        clone = Array.apply(null, array);

    return clone;
}

Babu.ArrayHelper.forEach = function(array, func, state) {
    var rtv;

    for (var i = 0; i < array.length; i++) {
        rtv = func(array[i], i, state);
        if (rtv === false)
            break;
    }
}

Babu.ArrayHelper.where = function(array, func, state, max) {
    var result = [];

    if (typeof max === "undefined") max = 0;

    function test(obj) {
        if (func(obj, state)) {
            result.push(obj);
            if (max > 0 && result.length >= max)
                return false;
        }
    }

    Babu.ArrayHelper.forEach(array, test);

    return result;
}

Babu.ArrayHelper.first = function(array, func, state) {
    var r = Babu.ArrayHelper.where(array, func, state, 1);

    if (r.length === 0) return null;
    else return r[0];
}

Babu.ArrayHelper.binarySearch = function(array, params) {
    /// <remarks>Before calling this function, make sure the specified array is sorted proberly.</remarks>
    var found = null;
    var lb = 0, ub = array.length - 1, md, mdv, dir;
    var comparer;
    var key;
    var field;
    var state;

    comparer = params.func;
    key = params.key;
    field = params.field;
    state = params.state;

    if (typeof comparer !== "function") {
        comparer = function(obj, field, key) {
            var v;
            if (typeof field === "undefined")
                v = obj;
            else
                v = obj[field];

            return v - key;
        }
    }

    while (lb <= ub) {
        md = Math.floor((lb + ub) / 2);
        mdv = array[md];

        dir = comparer(mdv, field, key);

        if (dir > 0)
            ub = md - 1;
        else if (dir < 0)
            lb = md + 1;
        else {
            found = mdv;
            break;
        }
    }

    return { found: !(!found), index: md, item: found };
}


Babu.EventHelper = {}

Babu.EventHelper.raiseEvent = function(thisObj, evtName, args) {
    if (thisObj && evtName) {
        var func = thisObj[evtName];
        if (typeof func === "function") {
            func(thisObj, args);
            return true;
        }
    }

    return false;
}

Babu.EventHelper.addDomEventHandler = function(element, type, handler) {

    if (typeof $addHandler === "function") {
        $addHandler(element, type, handler);
    }
    else {
        if (element) {
            if (element.addEventListener)
                element.addEventListener(type, handler, false);
            else if (element.attachEvent)
                element.attachEvent("on" + type, handler);

        }
    }
}

Babu.EventHelper.removeDomEventHandler = function(element, type, handler) {
    if (typeof $removeHandler === "function") {
        $removeHandler(element, type, handler);
    }
    else {
        if (element) {
            if (element.removeEventListener)
                element.removeEventListener(type, handler, false);
            else if (element.detachEvent)
                element.detachEvent("on" + type, handler);
        }
    }
}

Babu.EventHelper.getDomEvent = function() {
    var evt = window.event;

    if (!evt) {
        var f = arguments.callee, a;
        while (f) {
            a = f.arguments[0];
            if (a) {
                var ctor = a.constructor;

                //if (ctor === Event || ctor === MouseEvent || ctor === KeyboardEvent) {
                if (a instanceof Event) {
                    evt = a;
                    break;
                }
            }

            f = f.caller;
        }
    }

    if (evt) {
        var type = evt.type;

        if ((type.substr(0, 5) === "mouse" || type === "click" || type === "contextmenu") && typeof evt.pageX === "undefined") {
            evt.pageX = document.documentElement.scrollLeft + evt.clientX;
            evt.pageY = document.documentElement.scrollTop + evt.clientY;
        }

        if (typeof evt.srcElement === "undefined" && evt.target) {
            evt.srcElement = evt.target;
        }

        if (!evt.preventDefault) {
            evt.preventDefault = function() { this.returnValue = false; };
        }

        if (!evt.stopPropagation) {
            evt.stopPropagation = function() { this.cancelBubble = true; };
        }

        evt.relatedElement = evt.relatedTarget || evt.fromElement || evt.toElement;
    }

    return evt;
}

Babu.EventHelper.getSrcElement = function() {
    var evt = Babu.EventHelper.getDomEvent();

    if (evt) return evt.srcElement;

}

Babu.BrowserHelper = {}

Babu.BrowserHelper.get_browserInfo = function() {
    var info = Babu.BrowserHelper._browserInfo;
    if (!info) {
        var agent = navigator.userAgent;
        info = {};
        if (agent.indexOf(" MSIE ") >= 0) {
            info.type = "ie";
            info.version = parseFloat(agent.match(/MSIE (\d+\.\d+)/)[1]);
            info.ie6 = info.version < 7;
        }
        else if (agent.indexOf(" Firefox ") >= 0) {
            info.type = "ff";
            info.version = parseFloat(agent.match(/ Firefox\/(\d+\.\d+)/)[1]);
        }
        else {
            info.type = "unknown";
        }
        Babu.BrowserHelper._browserInfo = info;
    }

    return info;
}

Babu.BrowserHelper.setCssClass = function(element, cls, action) {
    /// <summary>设置指定HTML元素的CSS类名称。</summary>
    /// <param name="element" type="HTMLElement">要设置的元素对象或其ID属性。</param>
    /// <param name="cls" type="String">CSS类的名称，大小写敏感。</param>
    /// <param name="action" type="String">如果为"add"，新设置的名称与元素现有的类名称合并；如果为"remove"，将会从现有的类中称除；否则将会覆盖。</param>
    if (typeof element === "string")
        element = document.getElementById(element);

    if (element) {
        if (typeof cls === "undefined" || cls === null) cls = "";
        if (typeof action === "boolean") action = action ? "add" : "remove";

        if (action === "add" || action === "remove") {
            var tmp = Babu.BrowserHelper.getCssClass(element);
            if (tmp) {
                var array = tmp.split(/\s+/);
                var array2 = cls.split(/\s+/);
                var str1, flag, p;
                tmp = "";
                for (var i = 0; i < array.length; i++) {
                    str1 = array[i];
                    flag = true;
                    if ((p = Babu.ArrayHelper.indexOf(array2, str1)) >= 0) {
                        if (action === "remove") {
                            //flag = false;
                            array.splice(i, 1);
                            i--;
                        }
                        else {
                            array2.splice(p, 1);
                            if (array2.length === 0)
                                return;
                        }
                    }
                    //if (flag)
                    //    tmp += str1 + " ";
                }

                tmp = array.join(" ");

                if (action === "add")
                    tmp += " " + array2.join(" ");

                cls = tmp;
            }
            else {
                if (action === "remove")
                    return;
            }
        }

        if (typeof element.className === "undefined")
            element.setAttribute("class", cls);
        else
            element.className = cls;
    }
}


Babu.BrowserHelper.getCssClass = function(element) {
    /// <summary>获取指定元素的CSS类名称。</summary>
    if (typeof element === "string")
        element = document.getElementById(element);

    if (element) {
        var name = element.className;

        if (typeof name === "undefined") name = element.getAttribute("class");

        return name;
    }
}

Babu.BrowserHelper.setPlainText = function(element, text) {
    /// <summary>设置指定元素的纯文件内容。</summary>
    if (text === null) text = "";
    if (typeof element.innerText !== "undefined")
        element.innerText = text;
    else
        element.textContent = text;
}

Babu.BrowserHelper._getParentElement = function(elt) {
    var p = elt.parentElement;

    if (typeof p === "undefined") {
        p = elt.parentNode;
        if (p && p.nodeType === 3)
           p = p.parentNode;
    }

    return p;
}

Babu.BrowserHelper.getParentElement = function(elt, tagName) {
    /// <summary>获取指定元素的父元素。</summary>

    var p = Babu.BrowserHelper._getParentElement(elt);

    if (typeof tagName === "string" && tagName.length) {
        while (p && p.tagName !== tagName)
            p = Babu.BrowserHelper._getParentElement(p);
    }

    return p;
}

Babu.BrowserHelper.isParentOf = function(child, parent) {
    var p = child;
    while (p = Babu.BrowserHelper._getParentElement(p)) {
        if (p === parent)
            return true;
    }

    return false;
}

Babu.BrowserHelper.setHtml = function(element, html) {
    /// <summary>设置指定元素的HTML内容。</summary>
    if (element && typeof html !== "undefined") {
        if (html === null) html = "";
        element.innerHTML = html;
    }
}

Babu.BrowserHelper.translationLocation = function(location, srcElement, targetElement) {

    if (!targetElement)
        Babu.ErrorHelper.invalidArgument("targetElement");

    if (typeof srcElement === "undefined")
        srcElement = document;

    if (srcElement === document || srcElement === window)
        srcElement = document.body;
        
    //var test = Babu.BrowserHelper.getLocation(
}

Babu.BrowserHelper.getLocation = function(element, relative) {
    if (element) {
        var loc;

        loc = { x: element.offsetLeft, y: element.offsetTop };

        if (relative) {

            var elt = element.offsetParent;

            while (elt) {
                loc.x += elt.offsetLeft;
                loc.y += elt.offsetTop;

                if (elt === relative)
                    break;

                elt = elt.offsetParent;
            }

            if (elt && relative !== elt)
                loc = null;
        }
        
        return loc;

    }
}

Babu.BrowserHelper.getBounds = function(element, relative) {
    if (element) {
        var bounds = {
            left: element.offsetLeft,
            top: element.offsetTop,
            width: element.offsetWidth,
            height: element.offsetHeight
        };

        if (relative) {
            var loc = Babu.BrowserHelper.getLocation(element, relative);
            bounds.left = loc.x;
            bounds.top = loc.y;
        }

        bounds.right = bounds.left + bounds.width - 1;
        bounds.bottom = bounds.top + bounds.height - 1;

        return bounds;
    }
}

Babu.BrowserHelper.getViewPortBounds = function() {
    var elt = document.documentElement;
    var bounds = {
        left: elt.scrollLeft,
        top: elt.scrollTop,
        width: elt.clientWidth,
        height: elt.clientHeight
    };

    bounds.right = bounds.left + bounds.width;
    bounds.bottom = bounds.top + bounds.height;

    return bounds;
}

Babu.BrowserHelper.setBounds = function(element, bounds) {
    if (element) {
        var left, top, width, height, right, bottom;
        var type = typeof bounds;

        if (type === "object") {
            left = bounds.left;
            top = bounds.top;
            width = bounds.width;
            height = bounds.height;
            right = bounds.right;
            bottom = bounds.bottom;
        }
        else {
            left = bounds;
            top = arguments[2];
            width = arguments[3];
            height = arguments[4];
            right = arguments[5];
            bottom = arguments[6];
        }

        if (typeof left === "number") {
            element.style.left = left + "px";
        }

        if (typeof top === "number") {
            element.style.top = top + "px";
        }

        if (typeof width === "number") {
            element.style.width = width + "px";
        }

        if (typeof height === "number") {
            element.style.height = height + "px";
        }

        if (typeof right === "number")
            element.style.right = right + "px";

        if (typeof bottom === "number")
            element.style.bottom = bottom + "px";
    }
}

Babu.BrowserHelper.getCurrentStyle = function(element, name) {
    if (element) {
        var style = element.currentStyle;

        if (typeof style !== "undefined") {
            if (style)
                style = style[name];
            else
                style = "";
        }
        else if (window.getComputedStyle) {
            style = window.getComputedStyle(element, null).getPropertyValue(name);
            if (typeof style === "undefined") {
                name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                style = window.getComputedStyle(element, null).getPropertyValue(name);
            }
        }
        else
            Babu.ErrorHelper.notImplemented();

        return style;
    }
}

Babu.BrowserHelper.canElementHaveChildren = function(element) {
    if (element) {
        var ok = element.canHaveChildren;
        if (typeof ok === "undefined") {
            var tmp = element.ownerDocument.createElement("SPAN");
            try { element.appendChild(tmp); }
            catch (e) { return false; }
            element.removeChild(tmp);
            ok = true;
        }

        return ok;
    }
}

Babu.Util = {}

Babu.Util.getNonClientSize = function(element) {
    var size = {}, w = element.style.width, h = element.style.height;

    element.style.width = "100px";
    element.style.height = "100px";
    size.width = element.offsetWidth - 100;
    size.height = element.offsetHeight - 100;
    element.style.width = w;
    element.style.height = h;

    return size;
}

Babu.Util.disableTextSelection = function(element) {
    if (element) {
        if (window.event) {
            // IE
            element.onselectstart = function() { window.event.returnValue = false; };
        }
        else if (typeof element.style.MozUserSelect !== "undefined") {
            // Mozilla
            element.style.MozUserSelect = "none";
        }
    }
}

Babu.Util.createHighlightingHtml = function(text, keyword, className) {
    if (!text) return "";
    if (!keyword) return text;

    var p = 0, i = -1, l = keyword.length;
    var html = "";

    while (true) {
        i = text.indexOf(keyword, p);
        if (i >= 0) {
            html += text.substring(p, i);
            html += "<span class='" + className + "'>" + keyword + "</span>";
            p = i + l;
        }
        else {
            html += text.substr(p, text.length - p);
            break;
        }
    }

    return html;
}

Babu.Util.createFunctionProxy = function(thisObj, func) {

    if (typeof func === "string")
        func = thisObj[func];

    return function() {
        func.apply(thisObj, arguments);
    }
}

Babu.Util.getProperty = function(obj, propName) {
    var name;

    name = "get_" + propName;
    if (typeof obj[name] === "function")
        return obj[name]();

    return obj[propName];
}

Babu.Util.setProperty = function(obj, propName, value) {
    var name;

    name = "set_" + propName;
    if (typeof obj[name] === "function") {
        obj[name](value);
    }
    else {
        obj[propName] = value;
    }
}

Babu.Util.parseTemplate = function(template, dataSoruce) {
    if (typeof template === "string" && dataSoruce) {
        var array = template.match(/\{([^\}]+)\}/g);

        if (array && array.length) {
            var result = template;
            var name, match, value;
            for (var i = 0; i < array.length; i++) {
                match = array[i];
                name = match.substr(1, match.length - 2);
                value = parseInt(name);
                if (!isNaN(value)) name = value;

                if (typeof dataSoruce === "object")
                    value = dataSoruce[name];
                else if (typeof dataSoruce === "function")
                    value = dataSoruce(name, match, template);

                if (typeof value !== "undefined") {
                    result = result.replace(match, value);
                }

            }
            return result;
        }
    }

    return template;
}

Babu.Util.containsReference = function(url, tagName, type, attrName, doc) {
    if (!doc) doc = document;
    var coll = doc.getElementsByTagName(tagName), v;
    url = url.toLowerCase();
    for (var i = 0; i < coll.length; i++) {
        v = coll[i].type;
        if (v === type) {
            v = coll[i][attrName];
            if (v.toLowerCase() === url)
                return true;
        }
    }

    return false;
}

Babu.Util.addExternalStyleSheet = function(href, position, doc) {
    if (!doc) doc = document;
    if (!Babu.Util.containsReference(href, "LINK", "text/css", "href", doc)) {
        if (document.createStyleSheet) {
            var index;
            if (position === "first") position = 0;
            document.createStyleSheet(href, index);
        }
        else {
            var coll = document.getElementsByTagName("HEAD");
            if (coll.length) {
                var link = document.createElement("LINK");
                link.href = href;
                link.rel = "stylesheet";
                link.type = "text/css";
                if (position === "first")
                    coll[0].insertBefore(link, coll[0].firstChild);
                else
                    coll[0].appendChild(link);
            }
        }
    }
}

Babu.Util.addExternalScript = function(src, doc) {
    if (!doc) doc = document;
    if (!Babu.Util.containsReference(src, "SCRIPT", "text/javascript", "src", doc)) {
        //var obj = document.createElement("SCRIPT");
        //obj.src = src;
        //obj.type = "text/javascript";
        //doc.body.appendChild(obj);
        
        // BUG: IE不支持上面的方式添加SCRIPT元素。
        doc.write("<script type='text/javascript' src='" + src + "'></script>");
    }
}

Babu.Util.createElement = function(parent, tagName, cssClass, inputType) {
    var elt = parent.ownerDocument.createElement(tagName);
    if (tagName.toUpperCase() === "INPUT") elt.type = inputType;
    parent.appendChild(elt);
    if (cssClass) Babu.BrowserHelper.setCssClass(elt, cssClass);
    return elt;
}

Babu.DateTimeHelper = {};

Babu.DateTimeHelper.weekDayEnum = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
Babu.DateTimeHelper.firstDayOfWeek = Babu.DateTimeHelper.weekDayEnum.Monday;
Babu.DateTimeHelper.shortWeekDayNames = ["日", "一", "二", "三", "四", "五", "六"];
Babu.DateTimeHelper.longWeekDayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
Babu.DateTimeHelper.shortMonthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
Babu.DateTimeHelper.longMonthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

Babu.DateTimeHelper.today = function() {
    var today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
}

Babu.DateTimeHelper.getWeekDayName = function(date, shortCase) {
    var day;

    if (typeof date === "object" && date.constructor === Date) {
        day = date.getDay();
    }
    else if (typeof date === "number") {
        day = date % 7;
    }

    if (typeof day === "number") {
        var array;

        array = shortCase ? Babu.DateTimeHelper.shortWeekDayNames : Babu.DateTimeHelper.longWeekDayNames;

        return array[day];
    }
    else
        Babu.ErrorHelper.invalidArgument("date");
}

Babu.DateTimeHelper.getMonthName = function(date, shortCase) {
    var month;

    if (typeof date === "object" && date.constructor === Date) {
        month = date.getMonth();
    }
    else if (typeof date === "number") {
        month = date % 12;
    }

    if (typeof month === "number") {
        var array;

        array = shortCase ? Babu.DateTimeHelper.shortMonthNames : Babu.DateTimeHelper.longMonthNames;

        return array[month];
    }
    else
        Babu.ErrorHelper.invalidArgument("date");
    
}

Babu.DateTimeHelper.getThisWeek = function(date) {
    if (arguments.length > 0 && date.constructor !== Date) {
        Babu.ErrorHelper.invalidArgument("date");
    }
    else if (arguments.length === 0)
        date = new Date();

    var year, month, day;

    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();

    day -= date.getDay() - Babu.DateTimeHelper.firstDayOfWeek;

    var start = new Date(year, month, day);
    var end = new Date(year, month, day + 6, 23, 59, 59, 999);

    return { start: start, end: end };
}

Babu.DateTimeHelper.getThisMonth = function(date) {
    if (arguments.length > 0 && date.constructor !== Date) {
        Babu.ErrorHelper.invalidArgument("date");
    }
    else if (arguments.length === 0)
        date = new Date();

    var year, month, day;

    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();

    var start = new Date(year, month, 1);
    var end = new Date(year, month, Babu.DateTimeHelper.getDaysOfMonth(year, month), 23, 59, 59, 999);

    return { start: start, end: end };
    
}

Babu.DateTimeHelper.isLeapYear = function(year) {
    if (isNaN(year) || Math.floor(year) !== year)
        Babu.ErrorHelper.invalidArgument("year");

    if ((year % 4) !== 0) return false;
    if ((year % 100) === 0) return (year % 400) === 0;
    return true;
}

Babu.DateTimeHelper.getDaysOfMonth = function(year, month) {
    if (isNaN(year) || Math.floor(year) !== year)
        Babu.ErrorHelper.invalidArgument("year");
    if (isNaN(month) || month < 0 || month > 11 || Math.floor(month) !== month)
        Babu.ErrorHelper.invalidArgument("month");

    if (month === 1)
        return Babu.DateTimeHelper.isLeapYear(year) ? 29 : 28;
    else if (month < 7)
        return 31 - (month % 2);
    else
        return 30 + (month % 2);
}

Babu.DateTimeHelper.parseDateTime = function(text) {
    if (typeof text !== "string" || text.length === 0)
        return NaN;

    var array;
    var year, month, day, hour, minute, second;

    array = text.match(/(\d{4})([01]\d)([0-3]\d)(?:\s*([012]\d)([0-5]\d)(?:([0-5]\d))?)?/);
    if (array && array[0] == text) {
        year = parseInt(array[1]);
        month = parseInt(array[2]);
        day = parseInt(array[3]);
        if (array[4]) {
            hour = parseInt(array[4]);
            minute = parseInt(array[5]);
            if (array[6])
                second = parseInt(array[6]);
        }
    }
    else {
        array = text.match(/(\d{4})([\-\.\/])([01]?\d)\2([0-3\d]?\d)(?:\s+([0-2]?\d)\:([0-5]?\d)(?:\:([0-5]?\d))?)?/);
        if (array && array[0] == text) {
            year = parseInt(array[1]);
            month = parseInt(array[3]);
            day = parseInt(array[4]);

            if (array[5]) {
                hour = parseInt(array[5]);
                minute = parseInt(array[6]);
                if (array[7])
                    second = parseInt(array[7]);
            }
        }
    }

    if (!isNaN(year)) {
        month--;
        if (year < 1 || year > 9999 || month < 0 || month > 11 || day < 1 || day > Babu.DateTimeHelper.getDaysOfMonth(year, month))
            return NaN;

        if (typeof hour !== "undefined" && (hour > 23 || minute > 59 || (typeof second !== "undefined" && second > 59)))
            return NaN;

        if (isNaN(hour)) hour = 0;
        if (isNaN(minute)) minute = 0;
        if (isNaN(second)) second = 0;

        return new Date(year, month, day, hour, minute, second);
    }
    else {
        return Date.parse(text);
    }
}


// Begin of Babu.MSAjaxHelper
Babu.MSAjaxHelper = { installed: typeof Sys !== "undefined" };

Babu.MSAjaxHelper.registerClass = function(name) {
    if (typeof name === "string" && name.length > 0 && Babu.MSAjaxHelper.installed) {
        var type;

        try { type = eval(name); }
        catch (e) { return; }

        if (typeof type === "function" && !Type.isClass(type))
            type.registerClass(name);
    }
}

// End of Babu.MSAjaxHelper

Babu.StringHelper = {};

Babu.StringHelper.padLeft = function(text, width, padChar) {
    if (typeof text === "undefined" || text === null) return "";

    text = text.toString();

    if (text.length < width) {
        if (!padChar) padChar = "0";

        while (text.length < width) {
            text = padChar + text;
        }
    }

    return text;
}

Babu.ImageCache = {
    add: function(url) {
        if (url) {
            if (url.src) url = url.src;
            url = url.toLowerCase();

            if (!this.isCached(url)) {
                var img = document.createElement("IMG");
                img.src = url;
                this.get_cache().appendChild(img);
            }
        }
    },

    get_cache: function() {
        if (!this._cache) {
            this._cache = document.createElement("DIV");
            this._cache.style.display = "none";
            document.body.appendChild(this._cache);
        }

        return this._cache;
    },

    isCached: function(url) {
        if (url) {
            if (url.src) url = url.src;
            url = url.toLowerCase();
            var cache = this.get_cache(), img;
            for (var i = 0; i < cache.childNodes.length; i++) {
                img = cache.childNodes[i];
                if (img.src.toLowerCase() === url)
                    return true;
            }
        }

        return false;
    }

};

Babu.Debugging = {};

Babu.Debugging.writeLine = function(format, arg1, arg2) {

    var console = Babu.Debugging._getConsole();

    if (console.get_visible()) {
        var msg = format;

        if (typeof msg !== "undefined" && msg !== null) {
            var index;
            if (typeof msg === "string") {
                var array = format.match(/\{(\d+)\}/g);
                if (array && array.length > 0) {
                    for (var i = 0; i < array.length; i++) {
                        index = array[i];
                        index = parseInt(index.substr(1, index.length - 2)) + 1;
                        msg = msg.replace(array[i], arguments[index]);
                    }
                }
            }
        }

        var span = document.createElement("SPAN");
        span.appendChild(document.createTextNode(msg));
        console._output.appendChild(span);
        console._output.appendChild(document.createElement("BR"));
        span.scrollIntoView();

        return span;
    }
}

Babu.Debugging._getConsole = function() {
    var console = Babu.Debugging._console;

    if (!console) {
        var div = document.createElement("DIV");
        div.style.position = "fixed";
        div.style.right = "3px";
        div.style.bottom = "3px";
        div.style.width = "350px";
        div.style.height = "180px";
        div.style.backgroundColor = "white";
        div.style.color = "black";
        div.style.border = "solid 2px #afafaf";
        div.style.fontSize = "12px";

        document.body.appendChild(div);

        Babu.Debugging._console = console = div;

        div = document.createElement("DIV");
        div.style.backgroundColor = "#e0e0e0";
        div.style.position = "absolute";
        div.style.left = "0px";
        div.style.right = "0px";
        div.style.top = "0px";
        div.style.height = "16px";
        div.style.padding = "2px 2px";
        div.style.margin = "0px";
        console.appendChild(div);
        console._toolbar = div;

        div = document.createElement("DIV");
        div.style.overflow = "auto";
        div.style.whiteSpace = "nowrap";
        div.style.position = "absolute";
        div.style.left = "0px";
        div.style.right = "0px";
        div.style.top = "20px";
        div.style.bottom = "0px";
        div.style.height = "auto";
        console.appendChild(div);
        console._output = div;

        var btn;

        btn = document.createElement("SPAN");
        btn.innerHTML = "收缩";
        btn.style.margin = "0px 3px";
        btn.style.cursor = "pointer";
        console._toolbar.appendChild(btn);
        btn.onclick = function() { if (console.get_collapsed()) console.expand(); else console.collapse(); }

        btn = document.createElement("SPAN");
        btn.innerHTML = "清除";
        btn.style.margin = "0px 3px";
        btn.style.cursor = "pointer";
        console._toolbar.appendChild(btn);
        btn.onclick = Babu.Debugging.clearConsole;

        btn = document.createElement("SPAN");
        btn.innerHTML = "关闭";
        btn.style.cursor = "pointer";
        btn.style.margin = "0px 3px";
        console._toolbar.appendChild(btn);
        btn.onclick = function() { Babu.Debugging.hideConsole(); }

        console.get_visible = function() { return this.style.display !== "none" };
        console.get_collapsed = function() { return !(!this._collapseState) };

        console.collapse = function() {
            if (!this.get_collapsed()) {
                this._output.style.display = "none";
                this._toolbar.childNodes[1].style.display = "none";
                this._toolbar.childNodes[2].style.display = "none";
                this._toolbar.childNodes[0].innerHTML = "展开";
                this._collapseState = { width: this.style.width, height: this.style.height }
                this.style.width = "30px";
                this.style.height = "16px";
            }
        }

        console.expand = function() {
            if (this.get_collapsed()) {
                this._output.style.display = "";
                this._toolbar.childNodes[1].style.display = "";
                this._toolbar.childNodes[2].style.display = "";
                this._toolbar.childNodes[0].innerHTML = "收缩";
                this.style.width = this._collapseState.width;
                this.style.height = this._collapseState.height;
                this._collapseState = null;

            }
        }
    }

    return console;
}

Babu.Debugging.showConsole = function() {
    Babu.Debugging._getConsole().style.display = "";
}

Babu.Debugging.hideConsole = function() {
    var console = Babu.Debugging._console;

    if (console) {
        console.style.display = "none";
    }
}

Babu.Debugging.clearConsole = function() {
    var console = Babu.Debugging._console;
    if (console) console._output.innerHTML = "";
}

$css = Babu.BrowserHelper.setCssClass;
$text = Babu.BrowserHelper.setPlainText;
$elt = Babu.Util.createElement;
$rect = Babu.BrowserHelper.getBounds;

Babu.ensureInitialized = function() {
    if (typeof Babu._designMode === "undefined") {
        var coll = document.getElementsByTagName("SCRIPT");

        if (typeof coll.length === "undefined") {
            Babu._designMode = true;
            return false;
        }

        var obj, src, p;
        for (var i = 0; i < coll.length; i++) {
            obj = coll[i];
            src = obj.src;
            if (src) {
                p = src.indexOf("babu.common.js");
                if (p < 0) p = src.indexOf("babu.js");
                if (p >= 0) {
                    Babu.scriptPath = Babu.resourcePath = src.substr(0, p);
                    break;
                }
            }
        }

        Babu._designMode = false;
    }

    return !Babu._designMode;
}

Babu.getResourcePath = function(filename) {
    if (Babu.ensureInitialized()) {
        var path = Babu.resourcePath;
        if (!path || typeof path !== "string") Babu.ErrorHelper.invalidOperation("Critical parameter is not defined.");

        if (path.substr(path.length - 1, 1) !== "/") path += "/";

        return path + filename;
    }
}

Babu._registerReference = function(filename, typeName) {
    if (Babu.ensureInitialized()) {
        if (typeof typeName === "string" && typeName) {
            var test = window[typeName];
            if (typeof test === "function")
                return;
        }
        var url = Babu.getResourcePath(filename);
        Babu.Util.addExternalScript(url);
    }
}

Babu._registerStyleSheet = function(filename) {
    if (Babu.ensureInitialized()) {
        var url = Babu.getResourcePath(filename);
        Babu.Util.addExternalStyleSheet(url, "first");
    }
}

Babu._createObject = function(typeName, eltid, args) {
    var elt, code;
    if (eltid) elt = document.getElementById(eltid);
    code = "new " + typeName + "(elt, args)";
    return eval(code);
}

Babu.KeyHelper = {};
Babu.KeyHelper.translateKeyCode = function(keyCode) {
    if (keyCode >= 65 && keyCode < 91 || keyCode >= 48 && keyCode < 58)
        return String.fromCharCode(keyCode);
    if (keyCode >= 112 && keyCode < 124)
        return "F" + (keyCode - 111);
    if (keyCode >= 96 && keyCode < 111) {
        if (keyCode < 106)
            return "NUMPAD " + (keyCode - 96);
    }

    switch (keyCode) {
        case 8:
            return "BACKSPACE";
        case 9:
            return "TAB";
        case 13:
            return "ENTER";
        case 16:
            return "SHIFT";
        case 17:
            return "CTRL";
        case 18:
            return "ALT";
        case 19:
            return "PAUSE";
        case 20:
            return "CAPSLOCK";
        case 27:
            return "ESCAPE";
        case 32:
            return "SPACE";
        case 33:
            return "PAGEUP";
        case 34:
            return "PAGEDOWN";
        case 35:
            return "END";
        case 36:
            return "HOME";
        case 37:
            return "ARROW LEFT";
        case 38:
            return "ARROW UP";
        case 39:
            return "ARROW RIGHT";
        case 40:
            return "ARROW DOWN";
        case 45:
            return "INSERT";
        case 46:
            return "DELETE";
        case 91:
            return "X WINKEY";
        case 93:
            return "X CONTEXTMENU";
        case 106:
            return "NUMPAD *";
        case 107:
            return "NUMPAD +";
        case 109:
            return "NUMPAD -";
        case 110:
            return "NUMPAD .";
        case 111:
            return "NUMPAD /";
        case 144:
            return "NUMLOCK";
        case 145:
            return "SCROLLLOCK";
        case 173:
            return "X MUTE";
        case 174:
            return "X VOLUME-";
        case 175:
            return "X VOLUME+";
        case 186:
            return ";";
        case 187:
            return "=";
        case 188:
            return ",";
        case 189:
            return "-";
        case 190:
            return ".";
        case 191:
            return "/";
        case 192:
            return "~";
        case 219:
            return "[";
        case 220:
            return "\\";
        case 221:
            return "]";
        case 222:
            return "'";
    }

    return "KEY #" + keyCode;
}
