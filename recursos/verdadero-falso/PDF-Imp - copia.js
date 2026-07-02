$(function() {
  correctas = [{
    "#truefalse1": {
      "respuestas": [0, 2, 0, 1, 0],
      "retro-c": "<p><b>Very good!</b> <br>You are ready to continue with the next exercise.</p>",
      "retro-in": "<p><b>Please</b>,<br> try to answer the exercise again.</p>"
    }
  }];

  $(document).on('click', '.try3', function(e) {

    $("#truefalse1 .respmal input[type=radio]").each(function() {
      $(this).prop('checked', false);
    });

    $(".truefalsed2 i.fa-xmark, .truefalsed3 i.fa-xmark, .truefalsed4 i.fa-xmark").remove();
    $("#truefalse1 .rojo").css("visibility", "hidden");
    $(dataActivity + " .rojo2").css("display", "none");
  });

  $(document).on('click', '.checks3', function(e) {
    var name = $(this).attr("id");
    var bandera = 0;

    dataActivity = "#truefalse1";

    $(dataActivity + " input[type=radio]").each(function(index, element) {
      //console.log(bandera);
      if ($(this).is(':checked')) {
        bandera++;
      } else {}
    });
    if (bandera == ($(dataActivity + " input[type=radio]").length / 3)) {
      $(dataActivity + " .rojo").css("visibility", "hidden");
      $(dataActivity + " .rojo2").css("display", "none");
      respuestas = new Array();
      evalua = new Array();
      evalua = correctas[0][dataActivity]["respuestas"];
      //opciones=new Array();
      contador = 0;
      var name = $(this).attr("id");
      var bandera = 0;
      k = 0;
      $(dataActivity + " input[type=radio]").each(function(index, element) {
        if ($(this).is(':checked')) {
          respuestas[k] = $(this).val();
          //console.log($(this).parent());
          //console.log( $(this).parent().parent().attr("class") );
          k++;

        }
        //console.log(respuestas);
      });

      for (var i = 0; i < respuestas.length; i++) {
        if (respuestas[i] == evalua[i]) {
          contador++;
       
          $('input[name=truefalse1-'+ parseInt(i + 1)+']').attr("disabled",true);

          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(i + 2) + ') input:radio:checked').parent().parent().append('<i class="result fa-solid fa-check">');
          //console.log( $(dataActivity + ' .truefalsed1-section:nth-child(' + parseInt(i + 2) + ') input:radio:checked').parent().html());
          console.log( $(dataActivity + ' .truefalsed1-section:nth-child(' + parseInt(i + 2) + ') input:radio:checked').parent().parent().attr("class") );

          //$('.opcion-truefalse1-'+ parseInt(i + 1)+']').append("<div class='sr-only'>"++"</div>");          
          
        } else {
          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(i + 2) + ') input:radio:checked').parent().parent().append('<i class="result fa-solid fa-xmark">');
          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(i + 2) + ') input:radio:checked').parent().parent().addClass('respmal');
        }
      };
      $("#test-Restro").removeClass("retromal");
      if (contador == respuestas.length) {

      } else {
        $(dataActivity + " .rojo2").css("display", "block");

      }

    } else {
      $(dataActivity + " .rojo").css("visibility", "visible");
    }
  });


});