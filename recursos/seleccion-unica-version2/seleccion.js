$(function() {
  contador = 0;
  buenas=0;
  correctas = [{
    "#truefalse1": {
      "respuestas": [0, 1, 0, 1, 0],
      "retro-c": "<p><b>Very good!</b> <br>You are ready to continue with the next exercise.</p>",
      "retro-in": "<p><b>Please</b>,<br> try to answer the exercise again.</p>"
    }
  }];
 
  $(document).on('click', '.try3', function(e) {
    contador=buenas;
    $(this).attr("disabled", true);
    $(dataActivity + " .rojo").css("display", "none");

    $("#truefalse1 .respmal input[type=radio]").each(function() {

      $(this).prop('checked', false);
      $('input[name=truefalse1-'+ $(this).data('valor') +']').attr("disabled",false);
      var inmovil=dataActivity + ' .opcion-truefalse1-' + $(this).data('valor');
        $(inmovil+ " .truefalsed1, " + inmovil + " .truefalsed2, " + inmovil + " .truefalsed3, " + inmovil + " .truefalsed4").attr( "aria-hidden","false");

      $(".tfmensaje-"+ $(this).data('valor')).html("");

    });

    $(".truefalsed2 i.fa-xmark, .truefalsed3 i.fa-xmark, .truefalsed4 i.fa-xmark").remove();
    $(".respmal").removeClass("respmal");

  //  $("#truefalse1 .rojo").css("visibility", "hidden");
   
  });

  $(document).on('click', '.truefalsed1-section input[type=radio]', function(e) {
    
    $('.opcion-truefalse1-'+ $(this).data('valor') +' .check-tf').attr("disabled",false);

  });

 
   $(document).on('click', '.check-tf', function(e) {
    var bandera = 0;
    dataActivity = "#truefalse1";
    var comparar=$(this).data('valor');
    var mensajes="";

    if ($('input[name=truefalse1-'+ comparar +']').is(':checked')) {
        $('input[name=truefalse1-'+ comparar +']').attr("disabled",true);
        $('.opcion-truefalse1-'+ comparar +' .check-tf').attr("disabled",true);
     
      evalua = new Array();
      evalua = correctas[0][dataActivity]["respuestas"];
      var bandera = 0;
      
      if ($('input[name=truefalse1-'+ comparar +']:checked').val() == evalua[comparar-1]) {
          buenas++;
          mensajes=" Es correcto";
          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(comparar + 1) + ') input:radio:checked').parent().parent().append('<i class="result fa-solid fa-check" style="top: 0;">');
      } 
      else {
          mensajes=" Es incorrecto";
          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(comparar + 1) + ') input:radio:checked').parent().parent().append('<i class="result fa-solid fa-xmark" style="top: 0;">');
          $(dataActivity + '  .truefalsed1-section:nth-child(' + parseInt(comparar + 1) + ') input:radio:checked').parent().parent().addClass('respmal');
      }

        var classtomarpr= $('input[name=truefalse1-' + comparar + ']:checked').parent().parent().attr("class");
        var classtomar= classtomarpr.split(' ')[0];
        
        console.log(classtomar);
        var mensajeescribir = $(dataActivity + ' .opcion-truefalse1-' + comparar + ' .truefalsed1 legend' ).html() + " " + $(dataActivity + ' .opcion-truefalse1-' + comparar + ' .'+ classtomar +' .sr-only' ).html() + mensajes;


        $(dataActivity + ' .opcion-truefalse1-' + comparar + ' .tfmensaje-' + comparar ).html(mensajeescribir);

        var inmovil=dataActivity + ' .opcion-truefalse1-' + comparar;
        $(inmovil+ " .truefalsed1, " + inmovil + " .truefalsed2, " + inmovil + " .truefalsed3, " + inmovil + " .truefalsed4").attr( "aria-hidden","true");

        contador++;
     
      $("#test-Restro").removeClass("retromal");
      console.log(contador +" = "+ evalua.length);
      //console.log( evalua.length);

      if (contador == evalua.length) {

        if (buenas==evalua.length) {
          $(dataActivity + " .verde").css("display", "block");
        }

        else{
          $(dataActivity + " .try3").attr("disabled", false);
          $(dataActivity + " .rojo").css("display", "block");
        }

      } 
    } 
  });

});