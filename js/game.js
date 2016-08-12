function game(sence,start){
	this.sence=sence;
	this.start=start;
	this.num=4;
	this.speed=3;
	this.score=0;
	this.level=1;
	this.life=10;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.letterArr=[];
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.flag=true;
	this.play();
	this.key("play");
	// this.getLetter(this.num);
}
// 获取指定数量的字母
game.prototype.getLetter=function(num){
	var that=this;
	for(var i=0;i<num;i++){
		// if(num==0){
		// 	return;
		// }
		var let=that.letter[Math.floor(Math.random()*26)]//选出一个随机数取整
		var imgs=document.createElement("img");
		imgs.style.cssText="height:100px;position:absolute;top:"+(300*Math.random()-200)+"px;left:"+((that.cw-300)*Math.random()+50)+"px;";
		imgs.src="images/"+let+".jpg";
		imgs.className=imgs.src.slice(-5,-4);//slice截取返回一个新的数组，包含从 开始元素下标 到 结束元素下标 （不包括该元素）的 arrayObject 中的元素
		that.sence.appendChild(imgs);
		that.letterArr.push(let)
	}
}
// 落下字母 消除超出界面的字母 重新获取字母
game.prototype.play=function(){
	var that=this;
	var t=setInterval(function(){
		if(that.num>that.letterArr.length){
			that.getLetter(that.num-that.letterArr.length)
		}
		var allimg=document.getElementsByTagName('img');
		for(var i=0;i<allimg.length;i++){
			var imgTop=parseInt(allimg[i].style.top);//parseInt将得到的top值转化为数值
			var imgHeight=parseInt(allimg[i].style.height);
			allimg[i].style.top=imgTop+that.speed+"px";
			if(that.ch<(imgTop+imgHeight+30)){//top值加自身高度大屏幕时
				for(var j=0;j<that.letterArr.length;j++){
					if(allimg[i].className==that.letterArr[j]){
						that.letterArr.splice(j,1);
					}
				}
				that.sence.removeChild(allimg[i]);
				allimg[i]==null;
			}
		}
	},50);
	that.start.onclick=function(){
		if(that.flag){
			that.key('not');
			clearInterval(t)
			that.start.innerHTML='继续游戏';
			that.flag=false;
		}else if(!that.flag){
			that.key('play');
			that.play();
			that.start.innerHTML='暂停游戏';
			that.flag=true;
		}
	}
}
// 消除字字母
game.prototype.key=function(flag){
	var that=this;
		if(flag=='play'){
			document.onkeydown=function(e){
				var ev=e||window.event;
				var allimg=document.getElementsByTagName('img');
				for(var i=0;i<allimg.length;i++){
					var key=String.fromCharCode(ev.keyCode)
					if(key==allimg[i].className){
						for(var j=0;j<that.letterArr.length;j++){
							if(key==that.letterArr[j]){
								that.letterArr.splice(j,1);
							}
						}
						that.sence.removeChild(allimg[i]);
						allimg[i]==null;
					}
				}
			}
		}else if(flag=="not"){
			document.onkeydown=null;
		}
	}

