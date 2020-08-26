
function init(){
  callMyAPI();
  userInputF();
  delFromList();
}

$(document).ready(init);


function callMyAPI() {
  $.ajax({
    url: 'http://157.230.17.132:3020/todos',
    method: 'GET',
    success: function(data){
      console.log('ecco il GET',data);
      printMyAPI(data);
    },
    error: function(err){
      console.log("Errore dalla chiamata GET", err);
    }
  })
}

function printMyAPI(data){
  var target = $('#todoList');
  target.text('');
  for (var i = 0; i < data.length; i++) {
    var singleData = data[i];
    target.append(`<li class="listSingle toolTip" data-id="${singleData.id}">${singleData.text}</li> <span class="toolTiptxt">Click to delete!</span>`);
  }
}

// In caso si usi il classico bottone
function userInputF(){
  var btn = $('#btn');
  btn.click(function(){
    var uInput = $("#uInput");
    var utxt = uInput.val();
    callAPI4POST(utxt);
  });
}


// Nel caso si usi l'invio
function enterkey(){
  if (event.keyCode === 13){//13 equivale a ENTER
    var uInput = $("#uInput");
    var utxt = uInput.val();
    callAPI4POST(utxt);
  }
}


// Generalizzo l'ajax(POST) per non riscriverla 2 volte
function callAPI4POST(arg4API){
  $.ajax({
    url: `http://157.230.17.132:3020/todos`,
    method: 'POST',
    data: {
      text: arg4API
    },
    success: function(data){
      callMyAPI();
    },
    error: function(err){
      console.log("Errore dalla chiamata POST", err);
    }
  })
}

// Per eliminare dal server API
function delFromList(){
  $(document).on("click", ".listSingle", function(){
    var element = $(this);
    var id = element.data("id");

    $.ajax({
      url: `http://157.230.17.132:3020/todos/${id}`,
      method: 'DELETE',
      success: function(data){
        callMyAPI();
      },
      error: function(err){
        console.log("Errore dalla chiamata DELETE", err);
      }
    })
  })
}
