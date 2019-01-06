1\修改广告投放时间
AD.StartTime    = new Array("2006/04/01 12:00");
AD.EndTime      = new Array("2007/04/01 12:00");

2\修改广告是图片格式还是flash格式
AD.src          = new Array("images/adflash.swf");
//AD.src          = new Array("images/adpic.jpg");
//AD.href         = new Array("http://www.makewing.com");

3\修改广告尺寸
OBJ.innerHTML=ADM_Media(o.src[FAi],778,350,o,"",o.href[FAi]);

4\修改全屏停留时间
isNaN(parseInt(o.timeout))?5000:parseInt(o.timeout));
5000即5秒