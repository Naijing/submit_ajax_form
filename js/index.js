$(function () {

	$('#search_button').button({
		icons:{
			primary: 'ui-icon-search',
		},
	});
	$('#loading').dialog({
		autoOpen:false,
		modal:true,
		closeOnEscape:false,
		resizable: false,
		draggable: false,
		width:180,
		height:50,

	}).parent().parent().find('.ui-widget-header').hide();
	$('#reg_a').click(function(){
		$('#reg').dialog('open');
	});

	$('#reg').dialog({
		autoOpen:false,
		modal:true,
		resizable:false,
		width:320,
		height:380,
		buttons: {
			'提交':function(){
				$(this).submit();
			}
		}
	});

	$('#reg').buttonset();

	$('#reg').validate({

		submitHandler: function(form){
			$('form').ajaxSubmit({
				url:'http://localhost/zhiwen/add.php',
				type:'post',
				beforeSubmit: function(formData, jqForm, options){
					$('#loading').dialog('open');
					$('#reg').dialog('widget').find('button').eq(1).button('disable');

				},
				success: function(responseText, statusText){
					if(responseText){
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#reg').dialog('close');
							$('#reg').resetForm();
							$('#reg span.star').html('*').removeClass('succ');
							$('#loading').css('background','url(img/loading.gif) no-repeat 20px center').html('数据交互中...');

						}, 1000);
					}
				}
			});

		},

		showErrors: function(errorMap, errorList){
			var errors=this.numberOfInvalids();
			if(errors>0){
				$('#reg').dialog('option','height',errors*20+380);
			}else{
				$('#reg').dialog('option', 'height', 380);
			}
			this.defaultShowErrors();
		},
		highlight: function(element, errorClass){
			$(element).css('border','1px solid maroon');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		unhighlight: function(element, errorClass){
			$(element).css('border','1px solid #ccc');

			//找到$(element)即input节点的父元素，再去父元素中找子元素为span的元素， 并且将其内容改为ok
			//$(element).parent().find('span').html('ok');

			//这里要给span的元素加内容，html('&nbsp') 加了空格，不加的话，给他加背景图片是没效果的
			$(element).parent().find('span').html('&nbsp').addClass('succ');
		},

		errorLabelContainer:'ol.reg_error',
		wrapper:'li',

		rules:{
			user:{
				required: true,
				minlength:2,
			},
			pass:{
				required: true,
				minlength:6,
			},
			email:{
				required: true,
				email:true,
			},
			date:{
				date:true,
			},

		},
		messages:{
			user:{
				required: '账号不得为空',
				minlength: jQuery.format('账号不得小于{0}位'),
			},
			pass: {
				required: '密码不得为空',
				minlength: jQuery.format('密码不得小于{0}位'),
			},
			email: {
				required: '邮箱不得为空',
				email:'请输入正确的邮箱地址',
			},
		},
	});

	$('#date').datepicker({
		showOn: 'button',
		//showOn: 'both',
		//buttonText: 'D',
		buttonImage:'img/calendar.gif',
		buttonImageOnly:true,
	});


	
});


























