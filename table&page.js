var size=10;

	//在表格里显示出当前排序
	function  CreateSelect(sort)
	{
	  var optionstr='';
	   for(i=1;i<101;i++)
	   {
		   sorttem=(i==sort)?'selected':'';
		   optionstr=optionstr+'<option value='+i+' '+sorttem+'>'+i+'</option>';
	   }
	   var selectstr='<select onchange='+'changeSort(this)>'+optionstr+'</select>';
	   return selectstr;
	}
	
	//修改菜单
	function addOperate(){
		var operation='<a class='+'update'+' href='+'#'+' onClick='+'updateObject(this)'+' data-toggle='+'modal'+' data-target='+'#myModal'+'>修改</a>'
		+'&nbsp;&nbsp;&nbsp<a href='+'#'+' onClick='+'deleteObject(this)'+'>删除</a>'
		return operation;
	}
	//用户修改菜单
	function addOperateUser(){
		var operation='<a class='+'update'+' href='+'#'+' onClick='+'#'+' data-toggle='+'modal'+' data-target='+'#myModal'+'>修改密码</a>'
		+'&nbsp;&nbsp;&nbsp<a href='+'#'+' onClick='+'deleteObject(this)'+'>删除</a>'
		return operation;
	}
	//用户留言管理，用户信息管理
	function addOperateMessage(){
		var operation='<a class='+'update'+' href='+'#'+' onClick='+'updateObject(this)'+' data-toggle='+'modal'+' data-target='+'#myModal'+'>编辑</a>'
		+'&nbsp;&nbsp;&nbsp<a href='+'#'+' onClick='+'deleteObject(this)'+'>删除</a>'
		return operation;
	}


	//显示分页
	function setPagination(data){
			$(".pagination").empty();
			var page=parseInt(data/size);
			var extra=data%size;
			page=extra>0?(page+1):page;
			$("#pageId").data("pageCount",page);
			str0='<li><a class="pre">'+'<'+'</a></li>';
			$(".pagination").append(str0);
			//生成导航页，最多5条
			for(i=0;i<page&&i<5;i++){
				str='<li><a class="jump">'+(i+1)+'</a></li>';
				$(".pagination").append(str);
			}
			str1='<li><a class="next">'+'>'+'</a></li>'+'<li><a class="more">'+'>>'+'</a></li>';
			$(".pagination").append(str1);
			//显示共几条记录
			str2='<span>'+"共 "+data+" 条记录"+'</span>';
			$(".pagination").append(str2);
	$("#pageId").on("click",".jump",goPage);
	$("#pageId").on("click",".next", nextNumber);
	$("#pageId").on("click",".pre",preNumber);
	$("#pageId").on("click",".more",{count:page},goEnd);
	}

	//点击页面跳转
	function goPage(){
		var pageCurrent=$(this).html();
		$("#pageId").data("pageCurrent",pageCurrent);
		GetObjects();
		//渲染颜色
		drawing();
	}
	//下一页
	function nextNumber(){
		$(".pre").removeData();
		var pageCount=$("#pageId").data("pageCount");	
		$(".jump").each(function(){
			 var temp=parseInt($(this).html()); 
			 if(temp==pageCount||temp>pageCount){
				 $(".next").data("max",temp);
			 }	 
		});
		var max=$(".next").data("max");
		if(max==pageCount||max>pageCount){
			return false;
		}
		$(".jump").each(function(){
			 var temp=parseInt($(this).html()); 
			 if(temp==pageCount||temp>pageCount){
				 $(".next").data("max",temp);
				 return false;
			 }
			 $(this).html(temp+1);		 
		});
	}
	//上一页
	function preNumber(){
		$(".next").removeData();
		var min=$(".pre").data("min");
		if(min==1){
			return false;
		}
		$(".jump").each(function(){
			 var temp=parseInt($(this).html()); 
			 if(temp==1){
				 $(".pre").data("min",temp);
				 return false;
			 }
			 $(this).html(temp-1);
			
		});
	}
	//跳转到最后
	function goEnd(event){
		var page=event.data.count;
		console.log(page)
		if(page>6){
			var i=4;
			$(".jump").each(function(){
				 var temp=parseInt($(this).html()); 
				 $(this).html(page-i);
				i--;
			});
		}
	}
	//生成表头 
	function generateHead(columns){
		var th;
		$.each(columns,function(index,obj){
			if(obj.type=='select'){
				//可以进行排序
				th=th+'<th filed='+obj.field+' style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"'+'<a id='+'asort'+' href='+'#'+'>'+obj.title+'</a>'+'</th>';
			}else{
				//普通表格
				th=th+'<th filed='+obj.field+' style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+obj.title+'</th>';
			}
		});
		var tr='<tr>'+th+'</tr>';
		$('thead').append(tr);
	}
	
	//将从后台获取的数据在表格里显示出来
	function refreshList(data){	
		var tBody=$("#tbodyId");
		tBody.empty();
		//循环行
		$.each(data,function(index,item){
			var td;
			//循环列
			outer: for(var i=0;i<columns.length;i++){
				//回显json的数据
				if(columns[i].type=='text'){
						//循环将返回的json与表头做比较，如果一一对应，则放进td里面
			inner:		for(var key in item){
						if(columns[i].field==key){
							//回显小类
							if(key=='shopSub'){
								var name=writeSubName(item[key]);
								td=td+name;
								continue outer;
							}
							//回显留言
							if(key=='customerMessage'||key=='reply'){
								var message=writeMessage(item[key]);
								td=td+message;
								continue outer;
							}
							//认证资料如果为null的话，显示未认证
							if(key=='cname'){
								if(item[key]==null) item[key]="未认证";
							}
							//回显是否上门服务
							if(key=='homeDelivery'){
								var context="";
								if(item[key]==0){
									context='<td value=0>'+'不上门'+'</td>';
								}else{
									context='<td value=1>'+'上门'+'</td>';
								}
								td=td+context;
								continue outer;
							}
							//回显时间
							if(key=='deadline'||key=='createdTime'){
								var time=moment(item[key]).format('L');
								td=td+'<td>'+time+'</td>';
								continue outer;
							}else if(key=='postTime'||key=='replyTime'){
								var time=moment(item[key]).format('MMMM Do YYYY,h:mm:ss a');
								td=td+'<td>'+time+'</td>';
								continue outer;
							}
							title=item[key]; 
							td=td+'<td>'+title+'</td>';
							continue outer; 
						}
					}
					td=td+'<td></td>';
				}
				//判断是否为图片
				if(columns[i].type=='picture'){
					imgstr='<img src="'+item.picture+'" height="30" width="30"/>';
					td=td+'<td>'+imgstr+'</td>';
				}
				//判断是否为排序
				if(columns[i].type=='select'){
					var options=CreateSelect(item.sort);
					td=td+'<td>'+options+'</td>';
				}
				//判断是否为操作
				if(columns[i].type=='operate'){
					var operate=addOperate();
					td=td+'<td>'+operate+'</td>';
				}
				if(columns[i].type=='operateUser'){
					var operate=addOperateUser();
					td=td+'<td>'+operate+'</td>';
				}
				if(columns[i].type=='operateMessage'){
					var operate=addOperateMessage();
					td=td+'<td>'+operate+'</td>';
				}
				//判断是否为审核
				if(columns[i].type=='checked'){
					//获取商家审核
					var checked=item.checked;
					if(!checked){
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+'></td>';
					}else{	
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+' checked></td>';
					}
				}
				//判断是否为用户留言审核
				if(columns[i].type=='checkUser'){
					var checked=item.checkUser;
					if(!checked){	
						console.log(checked)
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+'></td>';
					}else{
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+' checked></td>';
					}
				}
				//判断是否为商家回复审核
				if(columns[i].type=='checkReply'){
					var checked=item.checkReply;
					if(!checked){
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+'></td>';
					}else{
						td=td+'<td><input onclick="changeCheck(this)" type="checkbox" value='+checked+' checked></td>';
					}
				}
				
				
			}
			var tr='<tr>'+td+'</tr>';
			tBody.append(tr);
		});	
	}
	//当表格内排序发生改变时
	function changeSort(this_t){
		if(confirm("你确定要改变排序吗?")){
			saveSort(this_t);
		}
	}
	//显示出多项服务小类
	function writeSubName(Array){
		var str='';
		$.each(Array,function(index,item){
			str=str+item.subName+",";
		})
		return '<td><div class="autocut" title="'+str+'">'+str+'</div></td>';
	}
	//回显留言信息
	function writeMessage(message){
		return '<td><div class="autocut" title="'+message+'">'+message+'</div></td>';
	}
	
	//将当前页的颜色对应的分页标签改变
	function drawing(){
		var pageCurrent=$("#pageId").data("pageCurrent");	
		$(".jump").each(function(){
			if($(this).html()==pageCurrent){
				$(this).css("color","red");
			}else{
				$(this).css("color","");
			}
		})
	}
	
	