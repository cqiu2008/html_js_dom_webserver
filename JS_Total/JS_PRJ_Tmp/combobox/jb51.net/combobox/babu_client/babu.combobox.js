//****************************************************************************
// 组合输入框控件，提供了与Windows标准ComboBox控件相似的行为。
// 版本: 1.1
// 作者: 一风
// 电邮: effun@163.com
// 更新: 2010-3-7
// 博客: http://www.cnblogs.com/effun/
//****************************************************************************
// 大家都是写程序的，知道编程的辛苦，所以虽然可以免费使用本软件，
// 但请一定保留上面的信息，谢谢合作。  :)
//****************************************************************************
// Download by http://www.codefans.net
/// <reference path="babu.common.js" />

function ComboBox(element, settings) {

    if (!settings) settings = {};
    this._provider = ComboBox._createProvider(settings.style);
    var tmp = this._provider.initialize(this, settings, element);
    this._initialize(element, settings);
    if (tmp.initialValue) {
        this._provider.set_value(tmp.initialValue);
    }
    this._updateValueElementState();
}

ComboBox.registerProvider = function(typeName, style) {
    if (typeof typeName !== "string" || !typeName || typeof window[typeName] !== "function")
        Babu.ErrorHelper.invalidArgument("typeName");
    if (!style) Babu.ErrorHelper.invalidArgument("style");
    if (typeof style === "string") style = [style];
    else if (!(style instanceof Array)) Babu.ErrorHelper.invalidArgument("style");

    var array = ComboBox._providers;
    if (!array) {
        ComboBox._providers = array = [];
    }

    Babu.ArrayHelper.forEach(style, function(s) { array[s] = typeName; });
}

ComboBox._createProvider = function(style) {

    if (typeof style !== "string" && style)
        Babu.ErrorHelper.invalidArgument("style");

    if (!style) return new _DefaultDropDownProvider();
    var prd = ComboBox._providers[style];
    if (!prd) Babu.ErrorHelper.invalidArgument("style");

    return eval("new " + prd + "()");

}

ComboBox.prototype._initialize = function(elt, args) {
    var tbl, tr, td, tmp;

    this._element = document.createElement("SPAN");
    p = Babu.BrowserHelper.getParentElement(elt);
    p.insertBefore(this._element, elt);

    tmp = Babu.BrowserHelper.getCurrentStyle(elt, "width");
    if (tmp && tmp !== "auto") this._element.style.width = tmp;

    tmp = { id: elt.id, name: elt.name };
    p.removeChild(elt);

    elt = $elt(this._element, "INPUT", null, "hidden");
    if (tmp.id) elt.id = tmp.id;
    if (tmp.name) elt.name = tmp.name;
    this._valueElement = elt;

    $css(this._element, "ComboBox", "add");

    tbl = $elt(this._element, "TABLE", "Layout");

    tr = tbl.insertRow(0);
    td = tr.insertCell(0);
    $css(td, "Layout InputCell");

    if (this._provider.editable) {
        var input = this._textBox;
        if (!input) input = document.createElement("INPUT");
        td.appendChild(input);
        input.autocomplete = "off";

        handler = Babu.Util.createFunctionProxy(this, this._onTextBoxChange);
        Babu.EventHelper.addDomEventHandler(input, "paste", handler);

        this._textBox = input;
        $css(input, "TextBox");
    }
    else {
        var label = document.createElement("A");
        label.href = "javascript:void 0";
        td.appendChild(label);

        this._label = label;
        $css(label, "Label");
    }

    this._textCell = td;

    if (this._provider.showButton) {
        td = tr.insertCell(1);
        $css(td, "Layout ButtonCell");
        var img = document.createElement("IMG");
        img.src = this._provider.buttonImage;
        td.appendChild(img);
        this._button = td;
    }

    if (args.checkbox) {
        td = tr.insertCell(0);
        $css(td, "Layout CheckBoxCell");
        tmp = $elt(td, "input", "CheckBox", "checkbox");
        tmp.tabIndex = -1;
        Babu.EventHelper.addDomEventHandler(tmp, "click", Babu.Util.createFunctionProxy(this, this._onCheckBoxClick));
        this._checkbox = tmp;
    }
    
    this._dropDown = this._createDropDownWindow();

    Babu.Util.disableTextSelection(this._dropDown);

    tmp = Babu.Util.createFunctionProxy(this, this._onKeyEvent);
    Babu.EventHelper.addDomEventHandler(this._element, "keyup", tmp);
    Babu.EventHelper.addDomEventHandler(this._element, "keydown", tmp);

    tmp = Babu.Util.createFunctionProxy(this, this._onMouseEvent);
    Babu.EventHelper.addDomEventHandler(this._element, "click", tmp);
    Babu.EventHelper.addDomEventHandler(this._element, "mouseover", tmp);
    Babu.EventHelper.addDomEventHandler(this._element, "mouseout", tmp);

    tmp = Babu.Util.createFunctionProxy(this, this._onScrollEvent);
    Babu.EventHelper.addDomEventHandler(window, "scroll", tmp);
    Babu.EventHelper.addDomEventHandler(window, "resize", tmp);

    this._dropDownWidth = args.width;
    if (isNaN(this._dropDownWidth)) this._dropDownWidth = 0;

    this._dropDownHeight = args.height;
    if (isNaN(this._dropDownHeight) || this._dropDownHeight < 30) this._dropDownHeight = 30;

    this.__lastText = "";
}

ComboBox.prototype._onCheckBoxClick = function() {
    this._updateValueElementState();
    this._raiseValueChangedEvent(true);
}

ComboBox.prototype._updateValueElementState = function() {
    if (this._valueElement && this._checkbox)
        this._valueElement.disabled = !this._checkbox.checked;
}

ComboBox.prototype.focusTextCell = function() {
    (this._label || this._textBox).focus();
}

ComboBox.prototype.get_dropDown = function() {
    return this._dropDown;
}

ComboBox.prototype.get_selectedItems = function() {
    return this._invokeProvider("get_selectedItems");
}

ComboBox.prototype._onScrollEvent = function() {
    if (this.isDropDownVisible()) {
        this._maintainDropDownPosition();
    }
}

ComboBox.prototype._onMouseEvent = function() {
    var evt = Babu.EventHelper.getDomEvent();
    var src = evt.srcElement;

    if (evt.type === "click") {
        var part;

        if (this._button && (src === this._button || Babu.BrowserHelper.isParentOf(src, this._button)))
            part = "Button";
        else if (src === this._textBox) {
            part = "TextBox";
        }
        else if (src === this._textCell || Babu.BrowserHelper.isParentOf(src, this._textCell)) {
            part = "TextCell";
        }

        if (part) {
            this._invokeProvider("on" + part + "Click");
        }
    }
    else if (evt.type === "mouseover") {
        if (src === this._button || Babu.BrowserHelper.isParentOf(src, this._button))
            $css(this._button, "ButtonCellHover", "add");
        $css(this._element, "ComboBoxHover", "add");
    }
    else if (evt.type === "mouseout") {
        if (!this.isDropDownVisible()) {
            $css(this._button, "ButtonCellHover", "remove");
        }
        $css(this._element, "ComboBoxHover", "remove");
    }
}

ComboBox.prototype._invokeProvider = function(method) {
    var func = this._provider[method];
    if (typeof func === "function") {
        var args = [];
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++)
                args[i - 1] = arguments[i];
        }
        return func.apply(this._provider, args);
    }
}

ComboBox.prototype.get_element = function() {
    return this._element;
}

ComboBox.prototype.get_checked = function() {
    return !this._checkbox || this._checkbox.checked;
}

ComboBox.prototype.get_value = function() {
    if (this.get_checked())
        return this._invokeProvider("get_value");
}

ComboBox.prototype.set_value = function(value) {
    this._invokeProvider("set_value", value);
}

ComboBox.prototype._raiseValueChangedEvent = function(noCheckBox) {
    var value;

    if (!noCheckBox && this._checkbox) {
        value = this._invokeProvider("get_value");
        this._checkbox.checked = typeof value !== "undefined" && value !== null && (value.length || !isNaN(value));
        this._updateValueElementState();
    }

    value = this.get_value();

    if (this._valueElement) this._valueElement.value = value;

    Babu.EventHelper.raiseEvent(this, "onValueChanged", { value: value});
}

ComboBox.prototype.toggleDropDown = function(setFocus) {
    if (this.isDropDownVisible()) {
        this.closeDropDown();
    }
    else
        this.openDropDown();

    if (setFocus) {
        this.focusTextCell();
    }
}

ComboBox.prototype._onKeyEvent = function() {
    var evt = Babu.EventHelper.getDomEvent();
    var src = evt.srcElement;
    var keyCode = evt.keyCode;
    var rtv;

    if (evt.type === "keyup") {
        if ((rtv = this._invokeProvider("onKeyUp", keyCode)) !== false) {
            if (src === this._textBox)
                this._onTextBoxChange();
        }
    }
    else
        rtv = this._invokeProvider("onKeyDown", keyCode);

    if (rtv === false) {
        if (evt.preventDefault)
            evt.preventDefault();
        else {
            evt.returnValue = false;
            evt.keyCode = 0;
        }

        return false;

    }

}

ComboBox.prototype._onTextBoxChange = function() {
    var provider = this._provider;
    var cb = this;
    window.setTimeout(function() {
        var t = cb.get_text();
        if (cb.__lastText !== t) {
            cb.__lastText = t;
            provider.onTextBoxChanged()
        }
    }, 0);
}

ComboBox.prototype.isDropDownVisible = function() {
    return this._dropDown && this._dropDown.style.display != "none";
}

ComboBox.prototype._createDropDownWindow = function() {
    var elt = $elt(document.body, "DIV", "DropDownWindow");
    elt.__babu_nc = Babu.Util.getNonClientSize(elt);
    elt.style.display = "none";

    return elt;
}

ComboBox.prototype._onDocumentEvent = function() {
    if (this.isDropDownVisible()) {
        var evt = Babu.EventHelper.getDomEvent();
        var src = evt.srcElement;
        var close = true;

        if (evt.type === "click") {
            if (Babu.BrowserHelper.isParentOf(src, this._dropDown))
                close = false;
        }

        if (close)
            this.closeDropDown();
    }
}

ComboBox.prototype.setItemSource = function(value) {
    this._invokeProvider("set_itemSource", value);
}

ComboBox.prototype._maintainDropDownPosition = function() {
    var rect = $rect(this._element, document);
    var pos = { left: rect.left, top: rect.bottom };
    var vp = Babu.BrowserHelper.getViewPortBounds();
    var dd = this._dropDown.__babu_size;
    if (!dd) dd = $rect(this._dropDown);
    if (rect.bottom + dd.height > vp.bottom) {
        pos.top = rect.top - dd.height;
        if (pos.top < vp.top && this._provider.sizing !== "fixed") {
            if (rect.top - vp.top < vp.bottom - rect.bottom) {
                pos.top = rect.bottom;
                pos.height = vp.bottom - rect.bottom;
            }
            else {
                pos.top = vp.top;
                pos.height = rect.top - vp.top;
            }
            pos.height -= this._dropDown.__babu_nc.height;
        }
    }
    if (rect.left + dd.width > vp.right && this._provider.sizeing !== "fixed") {
        pos.width = vp.right - rect.left - this._dropDown.__babu_nc.width;
    }

    Babu.BrowserHelper.setBounds(this._dropDown, pos);
}

ComboBox.prototype.updateDropDownPosition = function() {
    this._dropDown.__babu_size = $rect(this._dropDown);
    this._maintainDropDownPosition();
}

ComboBox.prototype.openDropDown = function(noFocus) {

    this._dropDown.style.display = "";
    var rect = $rect(this._element, document);
    this._provider.renderDropDown(this._dropDown, rect);
    this._dropDown.__babu_size = $rect(this._dropDown);
    this._maintainDropDownPosition();

    $css(this._button, "ButtonCellHover", "add");

    var handler = this._docEventHandler;

    if (!handler) {
        handler = Babu.Util.createFunctionProxy(this, this._onDocumentEvent);
        this._docEventHandler = handler;

        window.setTimeout(function() {
            Babu.EventHelper.addDomEventHandler(document, "click", handler);
            Babu.EventHelper.addDomEventHandler(window, "blur", handler);
        }, 0);

    }
}

ComboBox.prototype.closeDropDown = function() {
    this._dropDown.style.display = "none";
    $css(this._button, "ButtonCellHover", "remove");

    var handler = this._docEventHandler;
    if (handler) {
        this._docEventHandler = null;
        Babu.EventHelper.removeDomEventHandler(document, "click", handler);
        Babu.EventHelper.removeDomEventHandler(window, "blur", handler);
    }
}

ComboBox.prototype.get_text = function() {
    if (this._textBox)
        return this._textBox.value;

    var elt = this._label.firstChild;
    if (!elt) return "";
    else return elt.data;
}

ComboBox.prototype.set_text = function(value) {
    if (this._textBox)
        this._textBox.value = value;
    else {
        var elt = this._label.firstChild;
        if (elt) elt.data = value;
        else {
            elt = document.createTextNode(value);
            this._label.appendChild(elt);
        }
    }


    this.__lastText = value;
}

function _DefaultDropDownProvider() {
}

_DefaultDropDownProvider.prototype.set_itemSource = function(value) {
    if (!value || typeof value === "function" || value instanceof Array) {
        if (typeof value === "function" && this._autoComplete === "none") {
            Babu.ErrorHelper.invalidOperation("Dynamic item source should be used only in auto-complete mode.");
        }
        if (this._autoComplete === "remote" && value instanceof Array) {
            this._itemsCache = value;
            if (this._owner.isDropDownVisible())
                this.renderDropDown();
        }
        else
            this._itemSource = value;
    }
    else {
        Babu.ErrorHelper.invalidArgument("value");
    }
}

_DefaultDropDownProvider.prototype.get_itemsReady = function() {
    var ok = !!this._itemSource;
    if (ok && this._autoComplete === "remote")
        ok = !!this._itemsCache;
    return ok;
}

_DefaultDropDownProvider.prototype.initialize = function(owner, args, elt) {
    var obj = args.buttonImage, tag = elt.tagName;

    if ((tag !== "INPUT" || elt.type !== "text") && tag !== "SELECT")
        Babu.ErrorHelper.invalidArgument("element");

    this.buttonImage = Babu.getResourcePath("dda.gif");
    this.buttonDisabledImage = Babu.getResourcePath("dda.gif");
    this._owner = owner;

    obj = args.style;
    if (typeof obj !== "string" || !obj) {
        if (tag === "INPUT") obj = args.itemSource ? "edit" : "simple";
        else {
            if (elt.multiple) obj = "multiple";
            else obj = "dropdownlist";
        }
    }
    else obj = obj.toLowerCase();

    switch (obj) {
        case "simple":
            this.showButton = false;
            this.editable = true;
            this._submitting = "text";
            this._multiSelection = false;
            break;
        case "dropdown":
        case "edit":
            this.showButton = true;
            this.editable = true;
            this._multiSelection = false;
            this._submitting = obj === "edit" ? "text" : "item";
            break;
        case "multiple":
            this.showButton = true;
            this.editable = false;
            this._multiSelection = true;
            this._submitting = "item";
            break;
        default:
            this.showButton = true;
            this.editable = false;
            this._multiSelection = false;
            this._submitting = "item";
            break;
    }

    if (this.editable) {
        switch (args.autoComplete) {
            case "remote":
                if (typeof args.itemSource !== "function")
                    Babu.ErrorHelper.invalidOperation("The itemSource argument must set to a function for remote auto-complete mode.");
            case "local":
                this._autoComplete = args.autoComplete;
                break;
            default:
                this._autoComplete = "none";
                break;
        }
    }
    else
        this._autoComplete = "none";

    if (tag === "SELECT") {
        var tmp;
        obj = []
        Babu.ArrayHelper.forEach(elt.options, function(opt) {
            var o = { text: opt.text, value: opt.value };
            if (tmp = opt.attributes["image"]) o.image = tmp.value;
            obj.push(o);
        });
    }
    else
        obj = null;

    if (args.itemSource) {
        this.set_itemSource(args.itemSource);
        if (this._autoComplete === "remote" && obj)
            this.set_itemSource(obj);       // update item cache
    }
    else {
        if (this._autoComplete === "remote")
            Babu.ErrorHelper.invalidArgument("itemSource");
        if (obj) this.set_itemSource(obj);
    }

    return { initialValue: elt.value };
}

_DefaultDropDownProvider.prototype._getItemsToRender = function(noRemoteCall) {
    var items;

    if (this._itemSource) {
        var key = this._owner.get_text();
        var ac = this._autoComplete;
        if (this._itemSource instanceof Array) {
            items = this._itemSource;
            if (key && ac !== "none") {
                items = Babu.ArrayHelper.where(items, function(obj) { return obj.text && obj.text.indexOf(key) >= 0 });
            }
        }
        else {
            if (ac === "local")
                items = this._itemSource(key, this._owner);
            else {
                items = this._itemsCache;
                if (!items && !noRemoteCall) items = this._itemSource(key, this._owner);
            }
        }
    }
    else
        items = [];

    return items;
}

_DefaultDropDownProvider.prototype.renderDropDown = function(element, ownerRect) {
    var list = this._itemTable;

    if (!element) element = this._owner.get_dropDown();

    if (!list) {
        this._itemTable = list = $elt(element, "DIV", "ListContainer");

        list.__babu_loading = $elt(element, "IMG", "Loading");
        list.__babu_loading.src = Babu.getResourcePath("loading1.gif");
        list.__babu_loading.display = "none";

        var handler = Babu.Util.createFunctionProxy(this, this._mouseEventHandler);

        Babu.EventHelper.addDomEventHandler(list, "click", handler);
        Babu.EventHelper.addDomEventHandler(list, "mouseover", handler);
        Babu.EventHelper.addDomEventHandler(list, "mouseout", handler);

    }
    else {
        list.innerHTML = "";
    }

    var items = this._getItemsToRender(), rect;
    var height = 0, width = 0;

    if (items) {
        var li, elt, item, top = 0, lw, w2 = 0, w1 = 0, w3 = 0, hpd = 2;
        var text, key;

        if (this._autoComplete !== "none") key = this._owner.get_text();

        for (var i = 0; i < items.length; i++) {
            item = items[i];
            li = $elt(list, "DIV", "ListItem");
            if (this._multiSelection) {
                elt = $elt(li, "INPUT", "CheckBox", "checkbox");
                elt.__babu_toggle = function() { this.checked = !this.checked };
                elt.__babu_get_checked = function() { return this.checked; };
                if (this._isItemSelected(item)) elt.__babu_toggle();
                li.__babu_checkbox = elt;
                if (!w1) w1 = 16; //elt.offsetWidth; // TODO: IE 返回19, FF返回13。将来改成图片就没有问题了。

            }

            if (item.image) {
                elt = $elt(li, "IMG", "Icon");
                elt.src = item.image;
                if (!w2) w2 = elt.offsetWidth + 3;
                li.__babu_icon = elt;
            }

            elt = $elt(li, "SPAN", "Label");
            text = item.text;
            if (key)
                elt.innerHTML = Babu.Util.createHighlightingHtml(text, key, "Keyword");
            else
                elt.appendChild(document.createTextNode(text));
            li.__babu_label = elt;
            w3 = Math.max(elt.offsetWidth, w3);

            li.__babu_item = item;

            Babu.BrowserHelper.setBounds(li, undefined, top);
            top += li.offsetHeight;
        }

        height = top;
        lw = w1 + w2 + w3 + hpd * 2;

        for (var i = 0; i < list.childNodes.length; i++) {
            li = list.childNodes[i];
            li.__babu_label.style.left = (hpd + w2 + w1) + "px";
            if (elt = li.__babu_icon)
                elt.style.left = (hpd + w1) + "px";
            if (!width) {
                li.style.width = lw + "px";
                width = li.offsetWidth;
            }
            li.style.width = "100%";
        }

        Babu.BrowserHelper.setBounds(list, { width: width, height: height });


        list.__babu_loading.style.display = "none";
    }
    else if (this._autoComplete === "remote") {
        list.__babu_loading.style.display = "";
    }

    var updataPos;
    if (!ownerRect) {
        ownerRect = Babu.BrowserHelper.getBounds(this._owner.get_element());
        updataPos = true;
    }

    width = Math.max(ownerRect.width - element.__babu_nc.width, width, 80);
    if (height === 0 || list.__babu_loading.style.display !== "none")
        height = 150;
    else if (height > 150) {
        height = 150;
        width += 16;
    }

    Babu.BrowserHelper.setBounds(element, undefined, undefined, width, height);
    list.style.width = "100%";

    if (updataPos)
        this._owner.updateDropDownPosition();

    if (items)
        this._updateHoverItem(undefined, true);
}

_DefaultDropDownProvider.prototype._isItemSelected = function(item) {
    if (this._selectedItems) {
        return Babu.ArrayHelper.indexOf(this._selectedItems, item) >= 0;
    }

    return false;
}

_DefaultDropDownProvider.prototype._toggleChecked = function(tr, update) {
    if (this._multiSelection) {
        if (!tr) tr = this._hoverRow;
        if (tr) {
            tr.__babu_checkbox.__babu_toggle();
            if (update)
                this._setSelectedItems(this._getCheckedItems());
        }
    }
}

_DefaultDropDownProvider.prototype._mouseEventHandler = function() {
    var evt = Babu.EventHelper.getDomEvent();

    var tr = evt.srcElement;
    if (tr.tagName !== "DIV") tr = Babu.BrowserHelper.getParentElement(evt.srcElement, "DIV");

    if (tr.__babu_item) {
        switch (evt.type) {
            case "mouseover":
                this._updateHoverItem(tr.__babu_item);
                break;
            case "mouseout":
                //if (!Babu.BrowserHelper.isParentOf(tr, this._itemTable)) {
                //    this._updateHoverItem();
                //}
                break;
            case "click":
                if (this._multiSelection) {
                    if (evt.srcElement.tagName !== "INPUT") {
                        this._toggleChecked(tr, false);
                    }
                    this._setSelectedItems(this._getCheckedItems());
                }
                else {
                    var item = tr.__babu_item;
                    this._setSelectedItems([item]);
                    this._owner.closeDropDown();
                    this._owner.focusTextCell();
                }

                break;
        }
    }
}

_DefaultDropDownProvider.prototype._getCheckedItems = function() {
    if (!this._multiSelection)
        Babu.ErrorHelper.invalidOperation();

    if (this._itemTable) {
        var tr, items = [];
        for (var i = 0; i < this._itemTable.childNodes.length; i++) {
            tr = this._itemTable.childNodes[i];
            if (tr.__babu_checkbox.__babu_get_checked())
                items.push(tr.__babu_item);
        }

        return items;
    }

}

_DefaultDropDownProvider.prototype._updateHoverItem = function(item, scrollIntoView) {
    var tbl = this._itemTable, rtv;
    if (tbl) {

        if (!item) {
            this._ensureSelectedItems();
            if (!this._selectedItems || this._selectedItems.length !== 1) item = null;
            else item = this._selectedItems[0];
        }

        var tr, flag = false, action;
        for (var r = 0; r < tbl.childNodes.length; r++) {
            tr = tbl.childNodes[r];
            if (tr.__babu_item === item) {
                action = "add";
                rtv = tr;
            }
            else
                action = "remove";
            $css(tr, "ListItemHover", action);

        }

        if (scrollIntoView && rtv) {
            var dd = this._owner.get_dropDown();
            var rect1 = $rect(rtv), rect2 = $rect(dd);
            var st = dd.scrollTop;
            if (rect1.top - st < 0)
                dd.scrollTop = rect1.top;
            else if (rect1.bottom - st > rect2.height) {
                dd.scrollTop = rect1.bottom - rect2.height + rect1.height / 2;
            }
        }
    }

    this._hoverRow = rtv;

    return rtv;
}

_DefaultDropDownProvider.prototype._setSelectedItems = function(items) {

    var text = "";

    if (items) {
        var item;
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            if (i > 0) text += ", ";
            text += item.text;
        }
    }

    this._selectedItems = items;
    this._owner.set_text(text);

        this._owner._raiseValueChangedEvent();
}

_DefaultDropDownProvider.prototype._ensureSelectedItems = function() {
    if (!this._selectedItems) {
        var items, text = this._owner.get_text();

        items = this._matchItems(text);
        if (!this._multiSelection && items.length > 1) items.splice(0, items.length);

        this._selectedItems = items;
    }
    return this._selectedItems;
}

_DefaultDropDownProvider.prototype._matchItems = function(value) {
    var array = this._getItemsToRender(true);
    if (array) {
        var items;
        if (typeof value !== "undefined" && value !== null && value !== "") {
            if (!(value instanceof Array)) value = [value];

            var compare = function(v0, v1) {
                return v0 == v1;
            }

            var func = function(item) {
                var v = item.value;
                if (typeof v === "undefined") v = item.text;
                return Babu.ArrayHelper.where(value, compare, v, 1).length > 0;
            };
            items = Babu.ArrayHelper.where(array, func);
        }
        else items = [];

        return items;
    }
}

_DefaultDropDownProvider.prototype.get_selectedItems = function() {
    this._ensureSelectedItems();
    if (this._selectedItems) {
        return Babu.ArrayHelper.clone(this._selectedItems);
    }
    else
        return [];
}

_DefaultDropDownProvider.prototype._applyTextChange = function() {
    var ac = this._autoComplete;

    this._selectedItems = null;

    if (ac !== "none") {
        if (ac === "remote") this._itemsCache = null;
        if (this._owner.isDropDownVisible())
            this.renderDropDown();
     }

    if (ac !== "remote") {
        if (this._owner.isDropDownVisible())
            this._updateHoverItem(undefined, true);
    }

    if (this._submitting === "text")
        this._owner._raiseValueChangedEvent();
}

_DefaultDropDownProvider.prototype.onTextBoxChanged = function() {
    this._applyTextChange();
    if (this._autoComplete !== "none" && !this._owner.isDropDownVisible())
        this._owner.openDropDown();
}

_DefaultDropDownProvider.prototype._selectSibling = function(dir) {
    if (this._itemTable) {
        var tr = this._hoverRow;
        var index, length = this._itemTable.childNodes.length;

        if (!tr && length) {
            if (dir > 0) {
                index = dir - 1;
            }
            else if (dir < 0)
                index = length + dir;

        }
        else if (tr)
            index = Babu.ArrayHelper.indexOf(tr.parentNode.childNodes, tr) + dir;

        if (index >= 0 && index < length)
            tr = this._itemTable.childNodes[index];
        else
            tr = null;

        if (tr) {
            var item = tr.__babu_item;
            //this._setSelectedItems([item]);
            this._updateHoverItem(item, true);
        }
    }
}

_DefaultDropDownProvider.prototype.onKeyDown = function(keyCode) {
    //var name = Babu.KeyHelper.translateKeyCode(keyCode);
    //Babu.Debugging.writeLine(name);
    switch (keyCode) {
        case 9:     // TAB
        case 27:    // ESC
        case 13:    // Enter
            if (this._owner.isDropDownVisible()) {
                if (keyCode === 13 || keyCode == 9) {
                    if (this._hoverRow && !this._multiSelection)
                        this._setSelectedItems([this._hoverRow.__babu_item]);
                }
                this._owner.closeDropDown();

                if (keyCode !== 9)
                    return false;
            }
            break;
        case 32:
            if (!this.editable && this._owner.isDropDownVisible()) {
                if (this._multiSelection) {
                    this._toggleChecked(undefined, true);
                }
                return false;
            }
            break;
        case 40:
        case 38:
            if (this._owner.isDropDownVisible()) {
                this._selectSibling(keyCode - 39);
            }
            else
                this._owner.openDropDown();
            return false;
    }
}

_DefaultDropDownProvider.prototype.onKeyUp = function(keyCode) {

    if (keyCode === 40 || keyCode === 38) {       // down/up arrow
        return false;
    }
    else if (keyCode === 27 || keyCode === 13 || keyCode === 9) {      // ESC/Enter
        return false;
    }
}

_DefaultDropDownProvider.prototype.onButtonClick = function() {
    this._owner.toggleDropDown(true);
}

_DefaultDropDownProvider.prototype.onTextBoxClick = function() {
}

_DefaultDropDownProvider.prototype.onTextCellClick = function() {
    if (!this.editable) {
        this.onButtonClick();
    }
}

_DefaultDropDownProvider.prototype.onImageCellClick = function() {
}

_DefaultDropDownProvider.prototype.get_value = function() {
    if (this._submitting === "item") {
        var items = this.get_selectedItems();
        var array = [], ss = !this._multiSelection;

        function f(item) {
            var v = item.value;
            if (typeof v !== "undefined" && v !== null) {
                array.push(v);
                if (ss) return false;
            }
        }

        Babu.ArrayHelper.forEach(items, f);

        if (ss) {
            if (array.length) return array[0];
            else return null;
        }
        else
            return array;
    }
    else
        return this._owner.get_text();
}

_DefaultDropDownProvider.prototype.set_value = function(value) {
    if (this._submitting === "item") {
        var array;
        if (typeof value !== "object") {
            value = this._matchItems(value);
        }
        else if (value instanceof Array && value.length && typeof value[0] !== "object") {
            value = this._matchItems(value);
        }

        if (value) {
            if (value instanceof Array)
                array = value;
            else
                array = [value];
        }
        else
            array = [];
        this._setSelectedItems(array);
    }
    else {
        this._owner.set_text(value);
        this._applyTextChange();
    }
}

ComboBox.registerProvider("_DefaultDropDownProvider", ["simple", "dropdown", "edit", "dropdownlist", "multiple"]);

Babu._registerStyleSheet("combobox.default.css");
//Babu._registerReference("babu.combobox.datetime.js");

