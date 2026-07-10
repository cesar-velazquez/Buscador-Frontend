$(function() {
    var carta1 = null;
    var meta = 0;
    var iniciar=0;
    var emparejadas=0;

    $("#reiniciarmemo").click(function(){reiniciar() })

    function revolver () {
        var cards = $("#interiorMemorama1 button");
        for(var i = 0; i < cards.length; i++){
            var target = Math.floor(Math.random() * cards.length -1) + 1;
            var target2 = Math.floor(Math.random() * cards.length -1) +1;
            cards.eq(target).before(cards.eq(target2));
        }
        meta=cards.length/2;
    }

    revolver();

    function reiniciar() {
        var todasCartas = $('.interiorMemorama button');
        $(todasCartas).removeClass('abierta');
        $(todasCartas).removeClass('matched').attr("aria-hidden", false);
        $(todasCartas).find('span').css('display','none');
        //$(todasCartas).remove("i");
        $(todasCartas).find("i.fa-solid").remove();
        $(todasCartas).addClass('color-1');
        $(todasCartas).find('img').css('display','block');
        emparejadas=0;
        carta1 = null;
        $("#reiniciarmemo").attr("disabled", true)
        $(".retroalimentacion").css("visibility","hidden");
        $(".retroalimentacion").attr("aria-hidden",true);

        $("#respuestas-correctas").attr("aria-hidden", true);
        $("#respuestas-correctas div").html("");
        $("#texto-apoyo").attr("aria-hidden",false);
        revolver();
    }

    $('.interiorMemorama button').click(function() {
        var contenidoCarta = this;
        totalcont=10;
        
        if (!$(contenidoCarta).hasClass('abierta')) {
            $(contenidoCarta).addClass('abierta');
            $(contenidoCarta).find('img').css('display','none');
            $(contenidoCarta).removeClass('color-1');
            $(contenidoCarta).find('span').css('display','block');
            if (carta1 == null) {
                carta1 = this;
            } else if ($(carta1).attr('data-name') == $(this).attr('data-name')) {
                $(carta1).addClass("matched").attr("aria-hidden", true).append("<i class='fa-solid fa-check' aria-hidden='true'></i>");
                $(this).addClass("matched").attr("aria-hidden", true).append("<i class='fa-solid fa-check' aria-hidden='true'></i>");
                var vconcar= $(".matched").length;
                emparejadas++;

                if (emparejadas==1) {
                    $("#respuestas-correctas").attr("aria-hidden", false);
                }
                
                $("#respuestas-correctas div").append("<p><i lang='en'>" + $(carta1).find("i").text() + "</i> es adjetivo opuesto de <i lang='en'>" + $(this).find("i").text() +"</i></p>");
                carta1 = null;

            } else {
                // not matched
                setTimeout(function() {
                    $(carta1).removeClass('abierta');
                    $(carta1).find('span').css('display','none');
                    $(carta1).addClass('color-1');
                    $(carta1).find('img').css('display','block');
                    $(contenidoCarta).removeClass('abierta');
                    $(contenidoCarta).find('span').css('display','none');
                    $(contenidoCarta).addClass('color-1');
                    $(contenidoCarta).find('img').css('display','block');
                    carta1 = null;
                }, 750);
            }
        }

        if (emparejadas == meta) {
            $(".retroalimentacion").css("visibility","visible");
            $(".retroalimentacion").attr("aria-hidden",false);
            $("#texto-apoyo").attr("aria-hidden",true);
            //texto-apoyo
            setTimeout(function(){
                 $("#reiniciarmemo").attr("disabled", false)
            },200);
           
        }
    });

});
