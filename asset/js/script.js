$(document).ready(function(){
	
	var element = $('.floating-chat');
	var myStorage = localStorage;

	if (!myStorage.getItem('chatID')) {
		myStorage.setItem('chatID', createUUID());
	}

	setTimeout(function () {
		element.addClass('enter');
	}, 1000);

	element.click(openElement);

	function openElement() {
		var messages = element.find('.messages');
		var textInput = element.find('.text-box');
		element.find('>i').hide();
		element.addClass('expand');
		element.find('.chat').addClass('enter');
		var strLength = textInput.val().length * 2;
		textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
		element.off('click', openElement);
		element.find('.header button').click(closeElement);
	}

	function closeElement() {
		element.find('.chat').removeClass('enter').hide();
		element.find('>i').show();
		element.removeClass('expand');
		element.find('.header button').off('click', closeElement);
		element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();
		setTimeout(function () {
			element.find('.chat').removeClass('enter').show()
			element.click(openElement);
		}, 500);
	}

	function createUUID() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4";
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	}


	function onMetaAndEnter(event) {
		if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
			//sendNewMessage();
		}
	}

	
	
	//demo confiquare of ajax submit for laravel
	$("#guestContact_form").on("submit", function(e){
        e.preventDefault();
        var form = $(this);
        var url = form.attr('action');
        var type = form.attr('method');

        var form_data = form.serialize();
        //alert(form_data);

        $.ajax({
            url: url,
            data: form_data,
            method: type,
            dataType: 'JSON',
            success: function(response){
                if (response.success === true) {
                    $('#guestContact_form')[0].reset();
                    alert('SUCCESS!\n\nThanks for contact.')
                }else{
                    alert('SORRY!\n\nSomething Wrong.')
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                  if (jqXHR.status == 422) {
                      alert('SORRY!\n\n'+jqXHR.responseText)
                  }else {
                      alert('SORRY!\n\nUndexpected ERROR.')
                  }
            }
        });
    })

})