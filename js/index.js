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
	//动画 对象的id,动画类型，写json类型，动画时间，回调函数，是否减去初始值
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
//my_jingdong
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

//sidebar侧边栏
	var oSidebar=document.getElementById('sidebar');
	var aSidebar_li=oSidebar.getElementsByTagName('li');
	var oLong_list_all=document.getElementById('long_list_all');//big
	var aLong_list_all_box=oLong_list_all.getElementsByClassName('box');//box盒子

	for(var i=0;i<aSidebar_li.length;i++){
		aSidebar_li[i].index=i;
		var _this=this;
		aSidebar_li[i].onmouseover=function(){
			for(var j=0;j<aSidebar_li.length;j++){
				aSidebar_li[j].className="";
			}
			this.className="active";
			aLong_list_all_box[this.index].style.display="block";
			for(var x=0;x<aLong_list_all_box.length;x++){
				aLong_list_all_box[x].index=x;
				aLong_list_all_box[x].onmouseover=function(){
					this.style.display='block';
					aSidebar_li[this.index].className="active";
				}
				aLong_list_all_box[x].onmouseout=function(){
					this.style.display='none';
					aSidebar_li[this.index].className="";
				}
			}
		}
		aSidebar_li[i].onmouseout=function(){
			this.className="";
			aLong_list_all_box[this.index].style.display="none";

		}

	}
//ad，点击消失广告
	var oAd_div=document.getElementById('ad');
	var oAd_a=oAd_div.getElementsByTagName('a')[0];

	oAd_a.onclick=function(){
		move02("ad",{'opacity':20},1000,function(){
			oAd_div.style.display="none";
		})
	}
//banner区域
	var oBanner=document.getElementById('banner');
	var oBanner_ul=document.getElementById('banner_pic');
	var aBanner_li=oBanner_ul.getElementsByTagName('li');
	var oBanner_div=oBanner.getElementsByTagName('div')[0];
	var aBanner_a=oBanner_div.getElementsByTagName('a');
	var aBanner_button=oBanner.getElementsByTagName('button');
	var oBanner_show_n=0;
	var oBanner_timer=null;
	var movejudge=true;
	function oBanner_show(){
		for(var i=0;i<aBanner_li.length-2;i++){
			aBanner_a[i].className="";
		}
		move01(oBanner_ul,{'left':-730},false,function(){
			if(parseInt(oBanner_ul.style.left)<=-5110){
				oBanner_ul.style.left=-730+'px';
			}
		});
		if(oBanner_show_n==5){
			oBanner_show_n=-1;
		}
		oBanner_show_n++;
		aBanner_a[oBanner_show_n].className="active";
	}

	function banner_run(){
		clearInterval(oBanner_timer);
		oBanner_timer=setInterval(function(){
			oBanner_show();
			if(oBanner_show_n==6){
				oBanner_show_n=0;
			}
		},2000);
	}
	banner_run();
		oBanner.onmouseover=function(){
			clearInterval(oBanner_timer);
			aBanner_button[0].style.display="block";
			aBanner_button[1].style.display="block";
		}
		oBanner.onmouseout=function(){
			banner_run();
			aBanner_button[0].style.display="none";
			aBanner_button[1].style.display="none";

		}
		//鼠标划到对应的数字，显示对应的图片
		for(var i=0;i<aBanner_a.length;i++){
			aBanner_a[i].index=i;
			aBanner_a[i].onmouseover=function(){
				for(var j=0;j<aBanner_a.length;j++){
					aBanner_a[j].className="";
				}
				this.className="active";
				move01(oBanner_ul,{'left':-730*(this.index+1)},true);//动画效果
				//oBanner_ul.style.left=-730*(this.index+1)+'px';
				oBanner_show_n=this.index;
			}
		}
		aBanner_button[0].onclick=function(){
			if(movejudge==true){	
				movejudge=false;
				if(oBanner_show_n==0){
					oBanner_show_n=6;
				};
				oBanner_show_n--;
				for(var i=0;i<aBanner_li.length-2;i++){
					aBanner_a[i].className="";
				}
				move01(oBanner_ul,{'left':730},false,function(){
					if(parseInt(oBanner_ul.style.left)>=0){
						oBanner_ul.style.left=-4380+'px';
					}
					movejudge=true;
				});
				aBanner_a[oBanner_show_n].className="active";
			}
		}
		aBanner_button[1].onclick=function(){
			console.log(movejudge);
			if(movejudge){
				movejudge=false;
							console.log(movejudge);

				if(oBanner_show_n==5){
					oBanner_show_n=-1;
				}
				oBanner_show_n++
				for(var i=0;i<aBanner_li.length-2;i++){
					aBanner_a[i].className="";
				}
				move01(oBanner_ul,{'left':-730},false,function(){
					if(parseInt(oBanner_ul.style.left)<=-5110){
						oBanner_ul.style.left=-730+'px';
					}
					movejudge=true;
				});
				aBanner_a[oBanner_show_n].className="active";
			}

		}
//recommend区域
	var oRecommend=document.getElementsByClassName('recommend_ul')[0];
	var oRecommend_ul_a=oRecommend.getElementsByClassName('recommend_ul_all')[0];
	var aRecommend_ul=oRecommend.getElementsByTagName('ul');
	var aRecommend_button=oRecommend.getElementsByTagName('button');
	var oRecommend_ul_a_l=-1000;
	var oRecommend_ul_a_g=true;
	var oRecommend_autotimer=null;
	oRecommend.onmouseover=function(){
		aRecommend_button[0].style.display="block";
		aRecommend_button[1].style.display="block";
		clearInterval(oRecommend_autotimer);

	}
	oRecommend.onmouseout=function(){
		aRecommend_button[0].style.display="none";
		aRecommend_button[1].style.display="none";
		oRecommend_auto_roll_fn();
	}

	function oRecommend_auto_roll(){//自动滚播
			var i=0;
			oRecommend_ul_a_g=false;
			var timer;
			if(oRecommend_ul_a_l<=-4000){
				oRecommend_ul_a_l=-1000;
			}
			timer=setInterval(function(){
				oRecommend_ul_a_l-=10;
				i-=10;
				oRecommend_ul_a.style.left=oRecommend_ul_a_l+'px';
				if(i<=-1000){
					i=0;
					oRecommend_ul_a_g=true;
					clearInterval(timer);
				}
			},5);
	}

	clearInterval(oRecommend_autotimer);
	function oRecommend_auto_roll_fn(){//自动滚播
		oRecommend_autotimer=setInterval(function(){
			oRecommend_auto_roll();
		},5000);
	};
	oRecommend_auto_roll_fn();

	aRecommend_button[1].onclick=function(){
		if(oRecommend_ul_a_g){//判断是不是在滚动
			var i=0;
			oRecommend_ul_a_g=false;
			var timer;
			if(oRecommend_ul_a_l<=-4000){
				oRecommend_ul_a_l=-1000;
			}
			timer=setInterval(function(){
				oRecommend_ul_a_l-=10;
				i-=10;
				oRecommend_ul_a.style.left=oRecommend_ul_a_l+'px';
				if(i<=-1000){
					i=0;
					oRecommend_ul_a_g=true;
					clearInterval(timer);
				}
			},5);
		}
	}
	aRecommend_button[0].onclick=function(){
		var i=0;
		if(oRecommend_ul_a_g){
			oRecommend_ul_a_g=false;
			var timer;
			if(oRecommend_ul_a_l>=0){
				oRecommend_ul_a_l=-3000;
			}
			timer=setInterval(function(){
				oRecommend_ul_a_l+=10;
				i+=10;
				oRecommend_ul_a.style.left=oRecommend_ul_a_l+'px';
				if(i>=1000){
					i=0;
					oRecommend_ul_a_g=true;
					clearInterval(timer);
				}
			},1);
		}
	}

//选项卡
	var oBox_nav=document.getElementsByClassName('box_nav')[0];
	var oBox_nav_list=oBox_nav.getElementsByClassName('box_nav_list')[0];//大标题
	var oBox_nav_list_li=oBox_nav_list.children;
	var oBox_tab=document.getElementsByClassName('box_tab')[0];
	var oBox_tab_right=oBox_tab.getElementsByClassName('right');
	for(var i=0;i<oBox_nav_list_li.length;i++){
		oBox_nav_list_li[i].index=i;
		oBox_nav_list_li[i].onmouseover=function(){
			for(var j=0;j<oBox_nav_list_li.length;j++){
				oBox_nav_list_li[j].className="";
				oBox_tab_right[j].className="right";
			}
			this.className="active";
			oBox_tab_right[this.index].className="right active";
		}
	}

	//锚点
		var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
		var screenH=window.document.documentElement.clientHeight;
		var screenW=window.document.documentElement.clientWidth;

		var oLink= document.getElementById('link');
		var aLink_li= oLink.getElementsByTagName('li');
		var aPage=document.getElementsByClassName('page_floor');//全部楼层
		var aPagew=document.getElementsByClassName('nav_1');
		//每个栏的高度
		if((scrollT+screenH)<alloffsetTop(aPagew[0])){
			oLink.style.display='none';
		}else{
			oLink.style.display='block';
			oLink.style.top=scrollT+screenH/2+'px';
			oLink.style.left=alloffsetLeft(aPagew[0])-oLink.offsetWidth-10+'px';
		}

		for(var i=0;i<aPage.length;i++){
			aPagew[i].index=i;
				for(var j=0;j<aLink_li.length;j++){
					aLink_li[j].className="";
				}
				if(alloffsetTop(aPagew[0])<(scrollT+screenH/2)){
					if(alloffsetTop(aPagew[i])-scrollT>=0){
						aLink_li[i].className="active";
						break;
					}
				}
		}
	
	document.onscroll=function(){
	//mao
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
		var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
		var screenH=window.document.documentElement.clientHeight;
		var screenW=window.document.documentElement.clientWidth;

		var oLink= document.getElementById('link');
		var aLink_li= oLink.getElementsByTagName('li');
		var aPage=document.getElementsByClassName('page_floor');//全部楼层
		var aPagew=document.getElementsByClassName('nav_1');
		//每个栏的高度
		if((scrollT+screenH)<alloffsetTop(aPagew[0])){
			oLink.style.display='none';
		}else{
			oLink.style.display='block';
			oLink.style.top=scrollT+screenH/2+'px';
			oLink.style.left=alloffsetLeft(aPagew[0])-oLink.offsetWidth-10+'px';
		}

				for(var i=0;i<aPage.length;i++){
			aPagew[i].index=i;
				for(var j=0;j<aLink_li.length;j++){
					aLink_li[j].className="";
				}
				if(alloffsetTop(aPagew[0])<(scrollT+screenH/2)){
					if(alloffsetTop(aPagew[i])-scrollT>=0 && alloffsetTop(aPagew[i])-scrollT+screenH/2>0 ){
						aLink_li[i].className="active";
						break;
					}
				}
		}

	}
}
