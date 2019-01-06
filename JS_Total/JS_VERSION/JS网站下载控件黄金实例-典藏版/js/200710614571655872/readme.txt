Vcastr v1.0

主要功能:
1.可以读取xml设置播放列表
2,可以直接以给出flv地址进行播放
3,自定义尺寸，自动适应
4,mm播放器风格
5,循环播放
6,最大化播放

使用方法:

用以下方是嵌入网页中

使用方法:

1.js嵌入
方法一，直接copy下面代码，修改其中的 swf_width，swf_height，files，texts 参数

<script type="text/javascript">

var swf_width=240
var swf_height=233

var texts='幸福的脚丫预告片|变形金刚预告片|江南MV|魔兽世界-晚安部落'
var files='http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.transformersmovie.com/transformers_640.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv'

document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
document.write('<param name="movie" value="http://www.ruochi.com/product/vcastr/vcastr.swf"><param name="quality" value="high">');
document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
document.write('<param name="FlashVars" value="vcastr_file='+files+'&vcastr_title='+texts+'">');
document.write('<embed src="http://www.ruochi.com/product/vcastr/vcastr.swf" wmode="opaque" FlashVars="vcastr_file='+files+'&vcastr_title='+texts+'& menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object>'); 
</script>


2.xml调用
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="240" height="233">
<param name="movie" value="/product/vcastr/vcastr.swf?vcastr_xml_url=http://www.ruochi.com/product/vcastr/vcastr.xml">
<param name="quality" value="high">
<embed src="/product/vcastr/vcastr.swf?vcastr_xml_url=http://www.ruochi.com/product/vcastr/vcastr.xml" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="240" height="233"></embed>
</object>

其中
/product/vcastr/vcastr.swf?vcastr_xml_url=http://www.ruochi.com/product/vcastr/vcastr.xml
是播放列表的xml地址

也可以用
/product/vcastr/vcastr.swf?vcastr_flie=http://www.ruochi.com/product/vcastr/flv/happy_feet.flv|http://www.ruochi.com/product/vcastr/flv/江南.flv|http://www.ruochi.com/product/vcastr/flv/晚安部落.flv
直接给出flv文件地址，多个使用|分开



使用条款:
本软件完全免费,甚至可用作商业用途。
但不可对本软件进行反编译,修改和再次分发。
提供付费的个性化修改服务


有任何建议,可以发到:
http://www.ruochi.com/main/post/22.html
或者ruochi_com@163.com

Created By Ruochi.com
http://www.Ruochi.com
2006-6-6