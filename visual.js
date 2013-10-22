/*
Visual
Copyright (c) 2013 Institut d'Estadistica de Catalunya (Idescat)
http://www.idescat.cat (https://github.com/idescat/visual)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var VisualJS={version:"0.5.6",show:!0,old:!1,fixed:null,width:500,bwidth:500,height:500,normal:500,scripts:[],ticks:[],map:{},container:{},func:{},callback:null,draw:function(){var a=!1;"function"==typeof VisualJS.chart&&(VisualJS.tooltip(),VisualJS.show&&VisualJS.chart(),window.onresize=function(){VisualJS.canvas()},a=!0),null!==VisualJS.callback&&VisualJS.callback.call({id:VisualJS.id,chart:a})},tooltip:function(){var a=document;if(!a.getElementById(VisualJS.setup.tooltipid)){var b=a.createElement("div");b.id=VisualJS.setup.tooltipid,b.style.display="none",a.body.appendChild(b)}},getsize:function(a){var b=VisualJS.setup,c=b.html,d=c.heading,e=c.footer,f=window,g=document,h=g.documentElement,i=g.getElementsByTagName("body")[0],j=g.getElementById(a),k=j.getElementsByTagName(d)[0].clientHeight,l=j.getElementsByTagName(e)[0].clientHeight,m=f.innerHeight||h.clientHeight||i.clientHeight;"undefined"!=typeof m&&"undefined"!=typeof k&&"undefined"!=typeof l&&(null===VisualJS.fixed?(VisualJS.bwidth=f.innerWidth||h.clientWidth||i.clientWidth,VisualJS.width=VisualJS.bwidth-b.padding.w,VisualJS.height=m-b.padding.h-k-l):(VisualJS.bwidth=h.clientWidth||i.clientWidth,VisualJS.width=VisualJS.fixed[0]-b.padding.w,VisualJS.height=VisualJS.fixed[1]-b.padding.h-k-l)),VisualJS.visualsize=VisualJS.width<VisualJS.normal?b.mini:b.normal},atext:function(a){return String(a).replace(/&amp;/g,"&")},getHeading:function(a){if(VisualJS.autoheading===!1)return a.title;var b=[],c=function(a,c){"string"==typeof a&&(c===!0&&(a='<span class="'+VisualJS.setup.nowrapclass+'">'+a+"</span>"),b.push(a))};if(null!==a.time&&"object"==typeof a.time)var d=VisualJS.tformat(a.time[0]),e=VisualJS.tformat(a.time[a.time.length-1]),f=d+"&ndash;"+e;else var f=VisualJS.tformat(a.time);return c(a.title,!1),c(a.geo,!0),null!==f&&c(f,!0),VisualJS.atext(b.join(". "))},addJS:function(a,b){return b&&a.exists.call()?!1:(VisualJS.scripts.push(a.js),!0)},showTooltip:function(a,b,c){var d=document.getElementById(VisualJS.setup.tooltipid),e=VisualJS.bwidth-VisualJS.setup.margin,f={};d.innerHTML=a,d.style.display="block";var g=d.clientWidth/2;f.x=b-g,f.y=c-d.clientHeight-5,b+g>e?f.x-=b+g-e:f.x<VisualJS.setup.margin&&(f.x+=VisualJS.setup.margin-f.x),f.y<VisualJS.setup.margin&&(f.y+=1.75*d.clientHeight),d.style.left=f.x+"px",d.style.top=f.y+"px"},format:function(a){if("undefined"==typeof a||null===a)return VisualJS.setup.i18n.text.na[VisualJS.lang];if("number"==typeof a){for(var b=a.toFixed(VisualJS.container[VisualJS.id].dec),c=/(\d+)(\d{3})/,d=b.split("."),e=d[0],f=d.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+d[1]:"";c.test(e);)e=e.replace(c,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2");return e+f}return""},tformat:function(a){if(!a)return null;if(isNaN(a))return a;switch(a.length){case 5:var b="quarter";break;case 6:var b="month";break;default:return a}var c=VisualJS.setup.i18n.text[b];if("undefined"==typeof c)return a;var d=c[VisualJS.lang];return"undefined"==typeof d?a:d[a.slice(4)-1]+" <span>"+a.slice(0,4)+"</span>"},tooltipText:function(a,b,c){var e=(VisualJS.container[a].dec," "+VisualJS.container[a].unit.label),f="number"==typeof c?VisualJS.container[a].unit.symbol:"",g=VisualJS.format(c),h=g!==VisualJS.setup.i18n.text.na[VisualJS.lang]?"end"===VisualJS.container[a].unit.position?g+e+" "+f:f+g+e:g;return b?"<strong>"+h+"</strong> "+b:h},iframe:function(a,b){var c=VisualJS.setup,d="string"==typeof a.clas?a.clas:c.clas,e="<html><head>",f=c.func.old("ie9"),g=function(){var b=document,c=b.createElement("iframe"),d=b.getElementById(a.id);return c.frameBorder="0",c.scrolling="no",d.parentNode.insertBefore(c,d.nextSibling),c},h=function(a,b){if("undefined"!=typeof a){var c;a.contentDocument?c=a.contentDocument:a.contentWindow?c=a.contentWindow.document:window.frames[a.name]&&(c=window.frames[a.name].document),c&&(c.open(),c.write(b),c.close())}};"string"==typeof b&&(e+=-1===b.indexOf("{")?'<link href="'+b+'" rel="stylesheet" type="text/css"/>':'<style type="text/css">'+b+"</style>"),e+='<script type="text/javascript" src="'+VisualJS.setup.main.visual+'"></script>',e+='<script type="text/javascript" src="'+VisualJS.setup.main.setup+'"></script>',e+='<script type="text/javascript" src="'+VisualJS.setup.main.lazy+'"></script>',e+='</head><body><div id="'+a.id+'" class="'+d+'"></div><script>window.setTimeout(function(){VisualJS.old='+f+"; visual("+JSON.stringify(a)+");},1);</script></body></html>",h(g(),e)},load:function(a){if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),"[object Array]"!==Object.prototype.toString.call(a))VisualJS.get(a);else for(var b=0,c=a.length;c>b;b++)VisualJS.get(a[b])},get:function(a){var b=VisualJS.setup,c=b.html,d=b.canvas,e=c.heading,f=c.footer,g=VisualJS.old||b.func.old("ie9");VisualJS.id="string"==typeof a.id?a.id:b.id,"object"==typeof a.fixed&&(VisualJS.fixed=a.fixed),VisualJS.container[VisualJS.id]="object"==typeof a.unit?{unit:{label:"string"==typeof a.unit.label?a.unit.label:d.unit.label,symbol:"string"==typeof a.unit.symbol?a.unit.symbol:d.unit.symbol,position:"string"==typeof a.unit.position?a.unit.position:d.unit.position}}:{unit:d.unit},VisualJS.container[VisualJS.id].dec="number"==typeof a.dec?a.dec:d.dec,VisualJS.show="boolean"==typeof a.show?a.show:VisualJS.show,VisualJS.autoheading="boolean"==typeof a.autoheading?a.autoheading:d.autoheading,VisualJS.legend="boolean"==typeof a.legend?a.legend:d.legend,VisualJS.lang=a.lang||b.i18n.lang,VisualJS.callback="function"==typeof a.callback?a.callback:VisualJS.callback,VisualJS.grid="object"==typeof a.grid?{width:"number"==typeof a.grid.width?a.grid.width:d.grid.width}:d.grid,VisualJS.axis="object"==typeof a.axis?{x:"boolean"==typeof a.axis.x?a.axis.x:d.axis.x,y:"boolean"==typeof a.axis.y?a.axis.y:d.axis.y}:d.axis;var h="#"+VisualJS.id,i=h+" ."+b.canvasclass;if("cmap"===a.type)if(g)document.getElementById(VisualJS.id).innerHTML="<p>"+b.i18n.text.oldbrowser[VisualJS.lang]+"</p>";else{if("string"!=typeof a.by)return;VisualJS.addJS(b.lib.maps,!0),VisualJS.addJS(b.lib.d3,!0),VisualJS.addJS(b.map[a.by],!0),VisualJS.chart=function(){var c=VisualJS.map[a.by],g=c.area[0],i=c.area[1],j="object"==typeof a.grouped&&a.grouped.length>0&&a.data[0].hasOwnProperty("group"),k=!j&&a.data[0].hasOwnProperty("val"),l=j?a.grouped.length:k?b.colors.map.max:1,m=VisualJS.func.colors(b.colors.map.base,l,"fill","q"),n=d3.select(h),o=d3.geo[c.projection](),p="object"==typeof c.center&&"function"==typeof o.center?o.center(c.center):o,q=p.scale(c.scale).translate([g/2,i/2]),r=d3.geo.path().projection(q),s=d3.select("#"+b.tooltipid);VisualJS.canvas=function(){n.html("<"+e+"></"+e+"><"+f+"></"+f+">"),d3.select(h+" "+e).html(VisualJS.getHeading(a)),d3.select(h+" "+f).html(VisualJS.atext(a.footer||"")),VisualJS.getsize(VisualJS.id);var t,w,x,A,B,o=VisualJS.id,p=d3.map(),q=[],u=function(){},v=function(){},y="number"==typeof a.filter?a.filter:d.filter,z=1-y,C=VisualJS.height/i,D=VisualJS.width/g,E=Math.min(Math.round(g*C),VisualJS.width),F=Math.min(Math.round(i*D),VisualJS.height),G=Math.floor((VisualJS.width-E)/2),H=Math.floor((VisualJS.height-F)/2),I=D>C?C:D,J=n.insert("svg:svg",f).attr("width",E).attr("height",F);j?(t=d3.map(),u=function(a,b){a.set(b.id,b.group)},w=function(a,b,d){return"q"+(a.get(d[c.id])-1)},x=function(b,d){var e=a.grouped[b.get(d[c.id])-1],f=d[c.label];return"undefined"!=typeof e&&(f+=" <em>"+e+"</em>"),f}):(k?(w=function(a,b,d,e,f){var g=d3.scale.quantize().domain([e,f]).range(d3.range(l).map(function(a){return"q"+a}));return g(b.get(d[c.id]))},v=VisualJS.func.legend):w=function(a,b,d){return""!==b.get(d[c.id])?"":"q"+(l-1)},x=function(a,b){return b[c.label]});for(var K=0,L=a.data,M=L.length;M>K;K++){var N=L[K];N.hasOwnProperty("val")?p.set(N.id,N.val):p.set(N.id,""),q.push(N.val),u(t,N)}q.sort(function(a,b){return a-b}),"[object Array]"===Object.prototype.toString.call(a.filter)&&2===a.filter.length&&"number"==typeof a.filter[0]&&"number"==typeof a.filter[1]&&a.filter[0]<a.filter[1]?(A=a.filter[0],B=a.filter[1]):(A=d3.quantile(q,y),B=d3.quantile(q,z)),J.style("margin-left",G+"px"),J.style("margin-top",H+"px"),J.style("margin-bottom",H+"px"),J.append("svg:g").attr("class",b.areaclass).attr("transform","scale("+I+")").selectAll("path").data(c.features).enter().append("svg:path").attr("class",function(a){return w(t,p,a.properties,A,B)}).attr("d",r).on("mousemove",function(a){(k||"undefined"!=typeof p.get(a.properties[c.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(o,x(t,a.properties),p.get(a.properties[c.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return s.style("display","none")}),VisualJS.legend&&"object"==typeof c.legend&&v(o,VisualJS.tooltipText(o,null,B),VisualJS.tooltipText(o,null,A),m[m.length-1],m[0],J,s,c.area,c.legend)},VisualJS.canvas()}}else{if(VisualJS.addJS(b.lib.jquery,!0)){var j=!1;VisualJS.addJS(b.lib.jquery.flot,!1)}else if(VisualJS.addJS(b.lib.jquery.flot,!0))var j=!1;else var j=!0;g&&VisualJS.addJS(b.lib.excanvas,!0);var k=function(){},l=[],m=[],n=[],o=a.stacked||!1,p=function(){var c=function(){};if(o)VisualJS.addJS(b.lib.jquery.flot.stack,j);else if("tsbar"===a.type){VisualJS.addJS(b.lib.jquery.flot.orderbars,j);var c=function(a){return a.bars}}return k=function(b,d){for(var f=0,g=d.length;g>f;f++)m.push([f,d[f]]),VisualJS.ticks.push([f,d[f]]);for(var f=0,g=b.length;g>f;f++){for(var h=[],i=b[f].val,j=i.length,k=0;j>k;k++)h.push([k,i[k]]);"tsbar"!==a.type||o||1===g?l.push({label:b[f].label,data:h}):l.push({label:b[f].label,data:h,bars:{show:!0,barWidth:.2,order:f+1,lineWidth:2}})}for(var f=0,p=l.length;p>f;f++)n.push({data:l[f].data,label:l[f].label,bars:c(l[f]),shadowSize:4});q=p>1},VisualJS.getHeading(a)};switch(a.type){case"pyram":VisualJS.addJS(b.lib.jquery.flot.pyramid,j),Array.max=function(a){return Math.max.apply(Math,a)};var k=function(a,b,c){max=Math.max(Array.max(a[0].val),Array.max(a[1].val)),l[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},l[1]={label:a[1].label,data:[]};for(var d=0,e=c.length;e>d;d++)l[0].data[d]=[c[d],a[0].val[d]],l[1].data[d]=[c[d],a[1].val[d]]},q=!0,r=!1,s=!1,t=!1,u=!1,v=VisualJS.getHeading(a);break;case"rank":var w=[],k=function(a){for(var d=0,e=a.length;e>d;d++)m[d]=[d,a[e-d-1][0]],w[d]=[a[e-d-1][1],d];l={data:w}},q=!1,r=!1,s=!1,t=!1,u=!0,v=VisualJS.getHeading(a);break;case"bar":VisualJS.addJS(b.lib.jquery.flot.categories,j);var k=function(a){l=a,q=l.length>1},r=!0,s=!1,t=!1,u=!0,v=VisualJS.getHeading(a);break;case"tsline":var v=p(),r=null,s=!0,t=!0,u=!1;break;case"tsbar":var v=p(),r=!0,s=!1,t=!1,u=!0}VisualJS.chart=function(){k(a.data,a.time,a.by),$.fn.UseTooltip=function(c){var d=[];$(this).bind("plothover",function(e,f,g){if(g){if(d!=[g.seriesIndex,g.dataIndex]){d=[g.seriesIndex,g.dataIndex];var h=g.datapoint[0],i=g.datapoint[1],j="bar"!==a.type?g.series.label:l[h][0],k="rank"!==a.type?j:m[i][1],n="rank"!==a.type&&"bar"!==a.type?o||1===l.length?m[h][1]:"pyram"===a.type?l[f.x<0?0:1].data[g.dataIndex][0]:m[g.dataIndex][1]:!1,p="pyram"===a.type?Math.abs(h):"rank"!==a.type?"tsbar"!==a.type?i:o||1===l.length?l[g.seriesIndex].data[h][1]:i:h;VisualJS.showTooltip(VisualJS.tooltipText(c,n?k+" ("+n+")":k,p),f.pageX,f.pageY)}}else $("#"+b.tooltipid).hide(),d=[]})},q=VisualJS.legend&&q;var c={colors:b.colors.series,series:{stack:r,bars:{show:u,barWidth:.7,align:"center",fill:.9},lines:{show:s},points:{show:t,radius:1}},legend:{show:q},grid:{borderWidth:VisualJS.grid.width,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{show:VisualJS.axis.x},yaxis:{show:VisualJS.axis.y}};VisualJS.canvas=function(){$(h).html("<"+e+"></"+e+"><"+f+"></"+f+">"),$(h+" "+e).html(v),$(h+" "+f).html(VisualJS.atext(a.footer||"")),VisualJS.getsize(VisualJS.id),$(h+" "+e).after('<div class="'+b.canvasclass+" "+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>');var d=m.length;switch(a.type){case"pyram":c.series.pyramid={show:!0,barWidth:1},c.xaxis.max=1.02*max,c.xaxis.tickFormatter=function(a){return VisualJS.format(a)},$.plot(i,l,c);break;case"rank":c.series.bars.horizontal=!0,c.yaxis.ticks=VisualJS.height/d>11?m.slice(0):0,c.xaxis.max=1.02*a.data[0][1],c.xaxis.tickFormatter=function(a){return VisualJS.format(a)},c.yaxis.autoscaleMargin=0,c.series.bars.barWidth=.5,$.plot(i,[l],c);break;case"bar":c.xaxis.mode="categories",c.xaxis.tickLength=0,c.yaxis.tickFormatter=function(a){return VisualJS.format(a)},$.plot(i,[l],c);break;case"tsline":case"tsbar":c.yaxis.tickFormatter=function(a){return VisualJS.format(a)};var g=VisualJS.width/d,j=[],k="01";switch(VisualJS.ticks[0][1].length){case 4:if(25>g){for(var o=0;d>o;o++)j[o]=o%2?[m[o][0],""]:[m[o][0],m[o][1]];c.xaxis.ticks=j}else c.xaxis.ticks=m;break;case 5:k="1";case 6:if(35>g){for(var o=0;d>o;o++)j[o]=VisualJS.ticks[o][1].slice(4)!==k?[VisualJS.ticks[o][0],""]:[VisualJS.ticks[o][0],VisualJS.ticks[o][1].slice(0,4)],m[o][1]=VisualJS.tformat(VisualJS.ticks[o][1]);c.xaxis.ticks=j}else{for(var o=0;d>o;o++)m[o][1]=VisualJS.tformat(VisualJS.ticks[o][1]);c.xaxis.ticks=m}break;default:c.xaxis.ticks=m}$.plot(i,n,c)}$(i).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}};if("function"!=typeof visual)var visual=VisualJS.load;