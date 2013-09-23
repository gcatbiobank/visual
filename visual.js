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
var VisualJS={version:"0.2.5",symbol:{text:"",position:"end"},dec:0,filter:.05,fixed:null,width:500,bwidth:500,height:500,hwmin:500,normal:500,scripts:[],container:{},func:{},draw:function(){VisualJS.tooltip(),VisualJS.chart(),window.onresize=function(){VisualJS.canvas()}},tooltip:function(){var a=document;if(!a.getElementById(VisualJS.setup.tooltipid)){var b=a.createElement("div");b.id=VisualJS.setup.tooltipid,b.style.display="none",a.body.appendChild(b)}},getsize:function(a){var b=window,c=document,d=c.documentElement,e=c.getElementsByTagName("body")[0],f=c.getElementById(a),g=f.getElementsByTagName("h1")[0],h=f.getElementsByTagName("h2")[0],i=g.clientHeight,j=h.clientHeight,k=b.innerHeight||d.clientHeight||e.clientHeight;"undefined"!=typeof k&&"undefined"!=typeof i&&"undefined"!=typeof j&&(null===VisualJS.fixed?(VisualJS.bwidth=b.innerWidth||d.clientWidth||e.clientWidth,VisualJS.width=VisualJS.bwidth-VisualJS.setup.padding.w,VisualJS.height=k-VisualJS.setup.padding.h-i-j):(VisualJS.bwidth=d.clientWidth||e.clientWidth,VisualJS.width=VisualJS.fixed[0]-VisualJS.setup.padding.w,VisualJS.height=VisualJS.fixed[1]-VisualJS.setup.padding.h-i-j)),VisualJS.hwmin=Math.min(VisualJS.width,VisualJS.height),VisualJS.visualsize=VisualJS.width<VisualJS.normal?VisualJS.setup.mini:VisualJS.setup.normal},atext:function(a){return String(a).replace(/&amp;/g,"&")},getTitle:function(a){var b=[],c=function(a){"string"==typeof a&&b.push('<span class="'+VisualJS.setup.nowrapclass+'">'+a+"</span>")},d=null!==a.time&&"object"==typeof a.time?a.time[0]+"&ndash;"+a.time[a.time.length-1]:a.time||"";return c(a.title),c(a.geo),null!==a.time&&c(d),VisualJS.atext(b.join(". "))},addJS:function(a,b){return b&&a.exists.call()?!1:(VisualJS.scripts.push(a.js),!0)},showTooltip:function(a,b,c){var d=document.getElementById(VisualJS.setup.tooltipid),e=VisualJS.bwidth-VisualJS.setup.margin,f={};d.innerHTML=a,d.style.display="block";var g=d.clientWidth/2;f.x=b-g,f.y=c-d.clientHeight-5,b+g>e?f.x-=b+g-e:f.x<VisualJS.setup.margin&&(f.x+=VisualJS.setup.margin-f.x),f.y<VisualJS.setup.margin&&(f.y+=1.75*d.clientHeight),d.style.left=f.x+"px",d.style.top=f.y+"px"},format:function(a){if("undefined"==typeof a||null===a)return VisualJS.setup.i18n.text.na[VisualJS.lang];a+="";for(var b=/(\d+)(\d{3})/,c=a.split("."),d=c[0],e=c.length>1?VisualJS.setup.i18n.text.dec[VisualJS.lang]+c[1]:"";b.test(d);)d=d.replace(b,"$1"+VisualJS.setup.i18n.text.k[VisualJS.lang]+"$2");return d+e},tooltipText:function(a,b,c){var d=c?VisualJS.container[a].symbol.text:"",e=b?VisualJS.format(c):c,f="end"===VisualJS.container[a].symbol.position?e+" "+d:d+" "+e;return b?"<strong>"+f+"</strong> "+b:f},load:function(a){function b(a){return"[object Array]"===Object.prototype.toString.call(a)}if("undefined"==typeof VisualJS.setup&&window.alert("Visual: Setup not found (visual.setup.js)!"),b(a))for(var c=0,d=a.length;d>c;c++)VisualJS.get(a[c]);else VisualJS.get(a)},get:function(a){VisualJS.id="undefined"!=typeof a.id?a.id:VisualJS.setup.id,"undefined"!=typeof a.fixed&&(VisualJS.fixed=a.fixed),VisualJS.container[VisualJS.id]="undefined"!=typeof a.symbol?{symbol:{text:"undefined"!=typeof a.symbol.text?a.symbol.text:VisualJS.symbol.text,position:"undefined"!=typeof a.symbol.position?a.symbol.position:VisualJS.symbol.position}}:{symbol:VisualJS.symbol},VisualJS.lang=a.lang||VisualJS.setup.i18n.lang;var b="#"+VisualJS.id,c=b+" .vis",d=VisualJS.setup.func.old("ie9");if("cmap"===a.type)if(d)document.getElementById(VisualJS.id).innerHTML="<p>"+VisualJS.setup.i18n.text.oldbrowser[VisualJS.lang]+"</p>";else{if("string"!=typeof a.by)return;VisualJS.addJS(VisualJS.setup.lib.maps,!0),VisualJS.addJS(VisualJS.setup.lib.d3,!0),VisualJS.addJS(VisualJS.setup.map[a.by],!0),VisualJS.chart=function(){var c="undefined"!=typeof a.filter?a.filter:VisualJS.filter,d=1-c,e="object"==typeof a.grouped&&a.grouped.length>0&&a.data[0].hasOwnProperty("group"),f=!e&&a.data[0].hasOwnProperty("val"),g=e?a.grouped.length:f?VisualJS.setup.colors.map.max:1,h=VisualJS.func.colors(VisualJS.setup.colors.map.base,g,"fill","q"),i=d3.select(b),j=d3.geo.mercator().center(VisualJS.map.center).scale(VisualJS.map.scale).translate([250,250]),k=d3.geo.path().projection(j),l=d3.select("#"+VisualJS.setup.tooltipid);"undefined"!=typeof a.dec&&(VisualJS.dec=a.dec),VisualJS.canvas=function(){i.html("<h1></h1><h2></h2>"),d3.select(b+" h1").html(VisualJS.getTitle(a)),d3.select(b+" h2").html(VisualJS.atext(a.source||"")),VisualJS.getsize(VisualJS.id);var o,r,s,t,u,j=Math.round((VisualJS.width-VisualJS.hwmin)/2),m=d3.map(),n=[],p=function(){},q=function(){},v=i.insert("svg:svg","h2").attr("width",VisualJS.hwmin).attr("height",VisualJS.hwmin);e?(o=d3.map(),p=function(a,b){a.set(b.id,b.group)},r=function(a,b,c){return"q"+(a.get(c[VisualJS.map.id])-1)},s=function(b,c){var d=a.grouped[b.get(c[VisualJS.map.id])-1],e=c[VisualJS.map.label];return"undefined"!=typeof d&&(e+=" <em>"+d+"</em>"),e}):(f?(r=function(a,b,c,d,e){var f=d3.scale.quantize().domain([d,e]).range(d3.range(g).map(function(a){return"q"+a}));return f(b.get(c[VisualJS.map.id]))},q=VisualJS.func.legend):r=function(a,b,c){return""!==b.get(c[VisualJS.map.id])?"":"q"+(g-1)},s=function(a,b){return b[VisualJS.map.label]});for(var w=0,x=a.data,y=x.length;y>w;w++){var z=x[w];z.hasOwnProperty("val")?m.set(z.id,z.val):m.set(z.id,""),n.push(z.val),p(o,z)}n.sort(function(a,b){return a-b});var t=d3.quantile(n,c).toFixed(VisualJS.dec),u=d3.quantile(n,d).toFixed(VisualJS.dec);v.style("margin-left",j+"px"),v.append("svg:g").attr("class","area").attr("transform","scale("+VisualJS.hwmin/500+")").selectAll("path").data(VisualJS.map.features).enter().append("svg:path").attr("class",function(a){return r(o,m,a.properties,t,u)}).attr("d",k).on("mousemove",function(a){(f||"undefined"!=typeof m.get(a.properties[VisualJS.map.id]))&&VisualJS.showTooltip(VisualJS.tooltipText(VisualJS.id,s(o,a.properties),m.get(a.properties[VisualJS.map.id])),d3.event.pageX,d3.event.pageY)}).on("mouseout",function(){return l.style("display","none")}),q(VisualJS.id,VisualJS.format(u),VisualJS.format(t),h[h.length-1],h[0],v,l,VisualJS.hwmin)},VisualJS.canvas()}}else{if(VisualJS.addJS(VisualJS.setup.lib.jquery,!0)){var e=!1;VisualJS.addJS(VisualJS.setup.lib.jquery.flot,!1)}else if(VisualJS.addJS(VisualJS.setup.lib.jquery.flot,!0))var e=!1;else var e=!0;d&&VisualJS.addJS(VisualJS.setup.lib.excanvas,!0);var f=function(){},g=[],h=[],i=[],j=a.stacked||!1,k=function(){var b=function(){};if(j)VisualJS.addJS(VisualJS.setup.lib.jquery.flot.stack,e);else if("tsbar"===a.type){VisualJS.addJS(VisualJS.setup.lib.jquery.flot.orderbars,e);var b=function(a){return a.bars}}return f=function(c,d){for(var f=0,k=d.length;k>f;f++)h.push([f,d[f]]);for(var f=0,k=c.length;k>f;f++){for(var m=[],n=c[f].val,o=n.length,p=0;o>p;p++)m.push([p,n[p]]);"tsbar"!==a.type||j||1===k?g.push({label:c[f].label,data:m}):g.push({label:c[f].label,data:m,bars:{show:!0,barWidth:.2,order:f+1,lineWidth:2}})}for(var f=0,q=g.length;q>f;f++)i.push({data:g[f].data,label:g[f].label,bars:b(g[f]),shadowSize:4});l=q>1},VisualJS.getTitle(a)};switch(a.type){case"pyram":VisualJS.addJS(VisualJS.setup.lib.jquery.flot.pyramid,e),Array.max=function(a){return Math.max.apply(Math,a)};var f=function(a,b,c){max=Math.max(Array.max(a[0].val),Array.max(a[1].val)),g[0]={label:a[0].label,data:[],pyramid:{direction:"L"}},g[1]={label:a[1].label,data:[]};for(var d=0,e=c.length;e>d;d++)g[0].data[d]=[c[d],a[0].val[d]],g[1].data[d]=[c[d],a[1].val[d]]},l=!0,m=!1,n=!1,o=!1,p=!1,q=VisualJS.getTitle(a);break;case"rank":var r=[],f=function(a){for(var d=0,e=a.length;e>d;d++)h[d]=[d,a[e-d-1][0]],r[d]=[a[e-d-1][1],d];g={data:r}},l=!1,m=!1,n=!1,o=!1,p=!0,q=VisualJS.getTitle(a);break;case"bar":VisualJS.addJS(VisualJS.setup.lib.jquery.flot.categories,e);var f=function(a){g=a,l=g.length>1},m=!0,n=!1,o=!1,p=!0,q=VisualJS.getTitle(a);break;case"tsline":var q=k(),m=null,n=!0,o=!0,p=!1;break;case"tsbar":var q=k(),m=!0,n=!1,o=!1,p=!0}VisualJS.chart=function(){f(a.data,a.time,a.by),$.fn.UseTooltip=function(b){var c=[];$(this).bind("plothover",function(d,e,f){if(f){if(c!=[f.seriesIndex,f.dataIndex]){c=[f.seriesIndex,f.dataIndex];var i=f.datapoint[0],k=f.datapoint[1],l="bar"!==a.type?f.series.label:g[i][0],m="rank"!==a.type?l:h[k][1],n="rank"!==a.type&&"bar"!==a.type?j||1===g.length?h[i][1]:"pyram"===a.type?f.series.yaxis.ticks[f.dataIndex].label:h[f.dataIndex][1]:!1,o="pyram"===a.type?Math.abs(i):"rank"!==a.type?"tsbar"!==a.type?k:j||1===g.length?g[f.seriesIndex].data[i][1]:k:i;VisualJS.showTooltip(VisualJS.tooltipText(b,n?m+" ("+n+")":m,o),e.pageX,e.pageY)}}else $("#"+VisualJS.setup.tooltipid).hide(),c=[]})};var d={colors:VisualJS.setup.colors.series,series:{stack:m,bars:{show:p,barWidth:.7,align:"center",fill:.9},lines:{show:n},points:{show:o,radius:2}},legend:{show:l},grid:{borderWidth:1,hoverable:!0,clickable:!1,mouseActiveRadius:10},xaxis:{},yaxis:{}};VisualJS.canvas=function(){switch($(b).html("<h1></h1><h2></h2>"),$(b+" h1").html(q),$(b+" h2").html(VisualJS.atext(a.source||"")),VisualJS.getsize(VisualJS.id),$(b+" h1").after('<div class="vis '+VisualJS.visualsize+'" style="width: '+VisualJS.width+"px; height: "+VisualJS.height+'px;"></div>'),a.type){case"pyram":d.series.pyramid={show:!0,barWidth:1},d.xaxis.max=1.02*max,$.plot(c,g,d);break;case"rank":d.series.bars.horizontal=!0,d.yaxis.ticks=VisualJS.height/h.length>11?h:0,d.xaxis.max=1.02*a.data[0][1],d.yaxis.autoscaleMargin=0,d.series.bars.barWidth=.5,$.plot(c,[g],d);break;case"bar":d.xaxis.mode="categories",d.xaxis.tickLength=0,$.plot(c,[g],d);break;default:d.xaxis.ticks=h,$.plot(c,i,d)}$(c).UseTooltip(VisualJS.id)},VisualJS.canvas()}}VisualJS.scripts.length&&"object"==typeof LazyLoad?LazyLoad.js(VisualJS.scripts,VisualJS.draw):VisualJS.draw()}};if("function"!=typeof visual)var visual=VisualJS.load;