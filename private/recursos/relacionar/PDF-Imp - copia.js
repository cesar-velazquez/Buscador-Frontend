$(function() {

    var veces=0;
    var calificadas=0;
    var mal=0;
    var TodasSi=1;
    var recurso;

    var RespuestasEscribir122 = [ "c", "d", "a", "b", "e"];
    var vecesEscribir2=0;
    var calificadasEscribir2=0;
    var malEscribir2=0;

    function verificarRespuestasEscritas(event) {

        var formularioCompleto = true;
        if (event) {
            $("." + recurso +" input").each(function(){                
                if($(this).val().length <= 0 ){
                    TodasSi=0;                    
                    formularioCompleto = false;     
                }                                                          
            });                              
            return formularioCompleto;
        }
        return false;
    }
    
    $(".escribir").keyup(function() {
        recurso = $(this).attr('name');
        TodasSi=1;          
        if (verificarRespuestasEscritas(event)) { 
            $("." + recurso + " .boton-check").removeAttr('disabled');                   
        }
    });

    var fila = 0;    

    function repetir4() {
        if (malEscribir2>0){
            if (calificadasEscribir2<=1){
                $("#try-e-12-2").removeAttr('disabled');
                $(".escribir-12-2 .retroalimentacion1").html("Please, try to answer the exercise again.");
            }
            else{
                
                //solo si va a mostrar las correctas
                $(".escribir-12-2 input").addClass("invisible");
                $(".escribir-12-2 .TexEsc").removeClass("ecorrecto");
                $(".escribir-12-2 .TexEsc").removeClass("eincorrecto");
                $(".escribir-12-2 .respmens").html("Correct!");
                $("#try-e-12-2").attr("disabled","disabled");
                $(".escribir-12-2 .TextEsc21-2-1").html("d");
                $(".escribir-12-2 .TextEsc21-2-2").html("f");
                $(".escribir-12-2 .TextEsc21-2-3").html("h");
                $(".escribir-12-2 .TextEsc21-2-4").html("j");
                $(".escribir-12-2 .TextEsc21-2-5").html("i");
               
                $(".escribir-12-2 .TexEsc").siblings('.result').removeClass("fa-xmark");       
                $(".escribir-12-2 .TexEsc").addClass("ecorrecto");
                $(".escribir-12-2 .TexEsc").siblings('.result').addClass("fa-check");
                if (isMobile()){
                    $(".escribir-12-2 .retroalimentacion1").html("Scroll up and check the correct answers.");
                }
                else{
                    $(".escribir-12-2 .retroalimentacion1").html("Please, check the correct answers.");
                }

            }
            
        }
        else{
            $(".escribir-12-2 .retroalimentacion1").removeClass("rojoretro");
            $(".escribir-12-2 .retroalimentacion1").addClass("verderetro");
            $(".escribir-12-2 .retroalimentacion1").html("Very good! You are ready to continue.");
        }            
    }


    $(document).on('click', '#check-e-12-2', function(e) {
        recurso = $(this).attr('name');
        var texto;
        var textojunto;
        $("." + recurso + " .contselopce").removeClass("invisible");
        for (var i = 1; i <= RespuestasEscribir122.length; i++) {
            $("." + recurso + " .TextEsc21-2-" + i).html($("." + recurso + ' #act-esc-12-2-' + i).val());
            texto = $("." + recurso + ' #act-esc-12-2-' + i).val().toLowerCase();
            textojunto = texto.replace(/ /g, "");
            string=RespuestasEscribir122[i-1];
            let sentencias = string.split("$");            
            var correcto=false;            
            for (var j = 0; j < sentencias.length; j++) {
                if($.trim(textojunto) == sentencias[j] ){ 
                    correcto=true;
                    break;
                }
            }
            if(correcto){
                $("." + recurso + ' .TextEsc21-2-' + i).addClass("ecorrecto");
                $("." + recurso + " .respmense-" + i).html("Correct!");
                $("." + recurso + ' .TextEsc21-2-' + i).siblings('.result-' + i).addClass("fa-check");
            }
            else{
                $("." + recurso + ' .TextEsc21-2-' + i).addClass("eincorrecto");
                $("." + recurso + " .respmense-" + i).html("Incorrect!");
                $("." + recurso + ' .TextEsc21-2-' + i).siblings('.result-' + i).addClass("fa-xmark");
                malEscribir2++;
            }               
        }
        $("." + recurso + ' input').addClass("invisible");
        $("#check-e-12-2").attr('disabled', true);
        repetir4();
    });

    $(document).on('click', '#try-e-12-2', function(e) {        
        calificadasEscribir2++;
        var idcontenedor;
        $(".escribir-12-2 .TexEsc").each(function(){
            if ( $(this).hasClass("eincorrecto") ){                
                idcontenedor = $(this).closest(".cont-grid-columnas4").attr("id");               

                $("#"+idcontenedor+" input").removeClass("invisible");
                $("#"+idcontenedor+" input").val("");
                $("#"+idcontenedor+" .TexEsc").removeClass("ecorrecto");
                $("#"+idcontenedor+" .TexEsc").removeClass("eincorrecto");
                $("#"+idcontenedor+" .TexEsc").html("");
                $("#"+idcontenedor+" .respmens").html("");
                $("#"+idcontenedor+" .TexEsc").siblings('.result').removeClass("fa-check");
                $("#"+idcontenedor+" .TexEsc").siblings('.result').removeClass("fa-xmark");
                $("#"+idcontenedor+" .contselopce").addClass("invisible");
            }                                                               
        });
        
        $("#try-e-12-2").attr("disabled","disabled");
        $(".escribir-12-2 .retroalimentacion1").html("");    
        malEscribir2=0; 
    });

})