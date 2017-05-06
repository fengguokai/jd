window.onload=function(){
//累计所有offsetTop
function alloffsetTop( elements ){ 
	var top = elements.offsetTop; 
	var parent = elements.offsetParent; 
	while( parent != null ){ 
		top += parent.offsetTop; 
		parent = parent.offsetParent; 
	}; 
	return top; 
}

//累计所有offsetLeft
function alloffsetLeft( elements ){ 
	var left = elements.offsetLeft; 
	var parent = elements.offsetParent; 
	while( parent != null ){ 
		left += parent.offsetLeft; 
		parent = parent.offsetParent; 
	}; 
	return left; 
}
//获取行内样式值
function getStyle(obj,styleName){

			var value=obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj,false)[styleName];
			return styleName=='opacity' ? value=Math.round(parseFloat(value)*100) : value=parseInt(value);
	}
function move01(elm,model,nostart,fn,speed){
				var p_speed={//预设速度
					"veryfast":300,
					"fast":500,
					"normal":800,
					"slow":1000,
					"veryslow":2000
				}
				if(speed){//判断是否传入speed
					if(typeof speed=="string"){//判断传入的speed是数字还是字符串
						speed=p_speed[speed];
					}
				}else{//没有传入速度，则按照默认
					speed=p_speed.normal;
				}

				var count=parseInt(speed/30);//要走多少步

				var start={};
				var dis={};
				for(var key in model){
					start[key]=getStyle(elm, key);
					dis[key]=model[key]-(nostart?start[key]:'');
				}
				var n=0;
				clearTimeout(elm.timer);
				elm.timer=setInterval(function(){
					n++;
					//动画缓冲
					var a=1-n/count;
					for(var key in model){
						var step_dis=start[key]+dis[key]*(1-a*a*a);//*a越多效果不同
						if(key=='opacity'){
							elm.style.filter='alpha(opacity:'+step_dis+')';//兼容iE8以下；
							elm.style.opacity=step_dis/100;

						}else{

							elm.style[key]=step_dis+'px';//**注意这里的写法style[model]
						}
					}

					if(n==count){
							clearInterval(elm.timer);
							//if(fn)fn();//回调函数，让动作一个个发生。
							fn&&fn();//高大上写法
					}
				},30);

			}
//send_province
	function send_province(){
		var oSend=document.getElementById('send_province');
		var oSend_province=document.getElementById('send_province_u');
		var oSend_province_span=oSend_province.getElementsByTagName('span');
		var oSend_span=oSend.getElementsByTagName('span')[0];

		oSend.onmouseover=function(){
			oSend_province.style.display='block';
			this.children[0].className="active";

		}
		oSend.onmouseout=function(){
			oSend_province.style.display='none';
			this.children[0].className=""

		}
		for(var i=0;i<oSend_province_span.length;i++){
			oSend_province_span[i].onclick=function(){
				for(var j=0;j<oSend_province_span.length;j++){
					oSend_province_span[j].style.background="";
					oSend_province_span[j].style.color="#000";
				}
					this.style.background="#c81623";
					this.style.color="#fff";
					oSend_span.innerHTML=this.innerHTML;
			}
		}
		var timer_show;
		oSend_span.onmouseover=function(){
				clearTimeout(timer_show);
				timer_show=setTimeout(function(){
				var newdiv=document.createElement('div');
				newdiv.className='tip_send_province';
				newdiv.innerHTML=oSend_span.innerHTML;
				oSend_span.appendChild(newdiv);
			},1000)
		}

		oSend_span.onmouseout=function(){
			clearTimeout(timer_show);
			if(oSend_span.children[0]){
				oSend_span.removeChild(oSend_span.children[0]);
			}
		}
	}
	send_province();
//my_jingdong
	function my_jingdong(){
		var oMy_jingdong=document.getElementById('my_jingdong_id');
		var oMy_jingdong_hide=oMy_jingdong.getElementsByClassName('my_jingdong_hide')[0];
		var oMy_jingdong_a=oMy_jingdong.getElementsByClassName('fir')[0];

		oMy_jingdong.onmouseover=function(){
			oMy_jingdong_hide.style.display="block";
			oMy_jingdong_a.className="fir active";
		}
		oMy_jingdong.onmouseout=function(){
			oMy_jingdong_hide.style.display="none";
			oMy_jingdong_a.className="fir";

		}
	}
	my_jingdong();
//zoom
	var oZoom=document.getElementById('zoom');
	var oZoom_bigpic=oZoom.getElementsByClassName('zoom_bigpic')[0];
	var oZoom_hidden_arear=oZoom_bigpic.getElementsByClassName('zoom_hidden_arear')[0];
	var oZoom_bigpic_ul=oZoom_bigpic.getElementsByTagName('ul')[0];
	var oZoom_bigpic_li=oZoom_bigpic_ul.children;//大图片
	var oPic_list=oZoom.getElementsByClassName('pic_list')[0];
	var oPic_list_ul=oPic_list.children[0];
	var oPic_list_li=oPic_list_ul.children;//小图片
	var oZoom_button=oZoom.getElementsByTagName('button');
	var oZoom_hiddenbigpic=oZoom.getElementsByClassName('zoom_hiddenbigpic')[0];//放大区域
	var oZoom_hiddenbigpic_ul=oZoom_hiddenbigpic.getElementsByTagName('ul')[0];
	var oZoom_hiddenbigpic_li=oZoom_hiddenbigpic_ul.children;//所有放大的图片
	var oZoom_button_bp=null;

	for (var i=0;i<oPic_list_li.length;i++){//选图
		oPic_list_li[i].index=i;
		oPic_list_li[i].onmouseover=function(){
			for(var j=0;j<oPic_list_li.length;j++){
				oPic_list_li[j].className="";
				oZoom_bigpic_li[j].style.display="none";
				oZoom_hiddenbigpic_li[j].style.display='none';
			}
			this.className="active";
			oZoom_bigpic_li[this.index].style.display="block";
			oZoom_hiddenbigpic_li[this.index].style.display='block';

		}
	}
	oZoom_button[0].onmouseover=function(){
		oZoom_button_bp=this.style.backgroundPosition;
		console.log(oZoom_button_bp);
		if(getStyle(oPic_list_ul,"left")==0){
		}else{
			this.style.backgroundPosition="-28px -361px";
		}
	}


	oZoom_button[1].onmouseover=function(){
		oZoom_button_bp=this.style.backgroundPosition;
		console.log(oZoom_button_bp);
		if(getStyle(oPic_list_ul,"left")==-60){
		}else{
			this.style.backgroundPosition="-43px -361px";
		}
	}
	oZoom_button[0].onmouseout=oZoom_button[1].onmouseout=function(){
			this.style.backgroundPosition=oZoom_button_bp;
	}

	oZoom_button[0].onclick=function(){
		if(getStyle(oPic_list_ul,"left")==0){
		}else{
			this.style.backgroundPosition="-57px -361px";
			oZoom_button[1].style.backgroundPosition="-14px -361px";
			oZoom_button_bp=oZoom_button[0].style.backgroundPosition;
			move01(oPic_list_ul,{'left':60},false,function(){
				if(oPic_list_ul.style.left>=0){oPic_list_ul.style.left=0+'px';}
			})
		}
	}
	oZoom_button[1].onclick=function(){
		if(getStyle(oPic_list_ul,"left")==-60){
		}else{
			this.style.backgroundPosition="-70px -361px";
			oZoom_button[0].style.backgroundPosition="0px -361px";
			oZoom_button_bp=oZoom_button[1].style.backgroundPosition;
			move01(oPic_list_ul,{'left':-60},false,function(){
				if(oPic_list_ul.style.left<=-60){oPic_list_ul.style.left=-60+'px';}
			})
		}
	}

	oZoom_bigpic.onmouseover=function(ev){
		var oEv=ev|| event;
		oEv.cancelBubble=true;

		oZoom_hidden_arear.style.display="block";
		oZoom_hiddenbigpic.style.display="block";
		oZoom_bigpic.onmousemove=function(ev){
			var oEv=ev|| event;
			var x=oEv.clientX;
			var y=oEv.clientY;
			var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
			//console.log(x,y)
			var t=(y+scrollT-alloffsetTop(oZoom_bigpic)-oZoom_hidden_arear.offsetHeight/2);
			var l=(x-alloffsetLeft(oZoom_bigpic)-oZoom_hidden_arear.offsetWidth/2);
			console.log(oZoom_bigpic.offsetLeft+oZoom.offsetLeft);
			if(t<=0){
				t=0;
			}else if(t>=oZoom_bigpic.offsetHeight-oZoom_hidden_arear.offsetHeight){
				t=oZoom_bigpic.offsetHeight-oZoom_hidden_arear.offsetHeight;
			}
			if(l<=0){
				l=0;
			}else if(l>=oZoom_bigpic.offsetWidth-oZoom_hidden_arear.offsetWidth){
				l=oZoom_bigpic.offsetWidth-oZoom_hidden_arear.offsetWidth;
			}
			oZoom_hidden_arear.style.left=l+'px';
			oZoom_hidden_arear.style.top=t+'px';
			oZoom_hiddenbigpic_ul.style.left=-l*2.2+'px';
			oZoom_hiddenbigpic_ul.style.top=-t*2.2+'px';

		}
	}

	oZoom_bigpic.onmouseout=function(ev){
		var oEv=ev|| event;
		var oEle=oEv.target||oEv.srcElement;
		oEv.cancelBubble=true;

		oZoom_hidden_arear.style.display="none";
		oZoom_hiddenbigpic.style.display="none";
	}
//选择颜色
	var oChoosecolor=document.getElementById('choosecolor');
	var aChoosecolor_li=oChoosecolor.getElementsByTagName('li');
	var aBg=oChoosecolor.getElementsByClassName('bg');
	var oChoosecolor_timer=null;//延时器
	var oChoosecolor_client=null;
	for(var i=0;i<aChoosecolor_li.length;i++){
		aChoosecolor_li[i].index=i;
		aChoosecolor_li[i].onmouseover=function(ev){
			var oEv=ev|| event;
			var x=0;
			var y=0;
			_this=this;
			this.className="show";	
			// clearTimeout(oChoosecolor_timer);//待修改
			// oChoosecolor_timer=setTimeout(function(){

			// 	clearInterval(oChoosecolor_client);
			// 	oChoosecolor_client=setInterval(function(){
			// 		 x=oEv.clientX;
			// 		 y=oEv.clientY;

			// 		if(x==oEv.clientX&&y==oEv.clientY&&document.getElementById('mousetail')==null){
			// 			var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
			// 			var oDiv=document.createElement('div');
			// 			oDiv.id="mousetail";
			// 			if(y+scrollT>alloffsetTop(_this)+_this.offseHeight/2){
			// 				y=alloffsetTop(_this)+_this.offseHeight/2;
			// 			}else{
			// 				y=alloffsetTop(_this)+_this.offsetHeight;
			// 			}
			// 			oDiv.style.left=x+'px';
			// 			oDiv.style.top=y+'px';
			// 			oDiv.innerHTML=_this.getElementsByTagName('span')[0].innerHTML;
			// 			document.body.appendChild(oDiv);
			// 		}else{
			// 			x=oEv.clientX;
			// 			y=oEv.clientY;
			// 			console.log(x,y)
			// 		}
			// 	},500)

			// },1500)
		}
		aChoosecolor_li[i].onmouseout=function(){
			this.className="";
			clearInterval(oChoosecolor_client);
			clearTimeout(oChoosecolor_timer);
			if(document.getElementById('mousetail')){
				document.body.removeChild(document.getElementById('mousetail'));
			}
		}
		aChoosecolor_li[i].onclick=function(){
			for (var j=0;j<aChoosecolor_li.length;j++){
				aBg[j].className="bg";
			}
			aBg[this.index].className="active bg";
		}

	}
		//购买数量
		var oShoppingnum=document.getElementById('shoppingnum');
		var oShoppingnum_num=oShoppingnum.getElementsByTagName('input')[0];
		var aShoppingnum_btn=oShoppingnum.getElementsByTagName('button');
		var oShoppingnum_num_value=oShoppingnum_num.value;

		aShoppingnum_btn[0].onclick=function(){
			oShoppingnum_num.value++;
			oShoppingnum_num_value=oShoppingnum_num.value;
			if(oShoppingnum_num.value>=199){
				oShoppingnum_num.value=199;
			}
		}
		aShoppingnum_btn[1].onclick=function(){
			oShoppingnum_num.value--;
			oShoppingnum_num_value=oShoppingnum_num.value;
			if(oShoppingnum_num.value<=0){
				oShoppingnum_num.value=0;
			}

		}
		oShoppingnum_num.onkeydown=function(){
			oShoppingnum_num_value=oShoppingnum_num.value;
		}
		oShoppingnum_num.onkeyup=function(){//确定这是一个数字么，是数字，false,是文本，true
				if(isNaN(this.value)){
					this.value=oShoppingnum_num_value;
				}
				if(oShoppingnum_num.value>199){
					oShoppingnum_num.value=oShoppingnum_num_value;
				}
				if(oShoppingnum_num.value<0){
					oShoppingnum_num.value=1;
				}
		}
		//选项卡
		var oPopularity_tab=document.getElementById('popularity_tab');//选项卡ul
		var aPopularity_tab_li=oPopularity_tab.getElementsByTagName('li');//选项卡选项
		var apopularity_pic=document.getElementsByClassName('popularity_tab_pic');//选项卡图片

		for(var i=0;i<aPopularity_tab_li.length;i++){
			aPopularity_tab_li[i].index=i;
			aPopularity_tab_li[i].onclick=function(){
				for(var j=0;j<aPopularity_tab_li.length;j++){
					aPopularity_tab_li[j].className="";
					apopularity_pic[j].style.display="none";
				}
				this.className="active";
				apopularity_pic[this.index].style.display="block";
			}
		}

}