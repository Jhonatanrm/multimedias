var ListaPlanes = null;

(function ($) {

    if (screen.width<900){
        $( 'select' ).addClass(' browser-default');
    }

    function ValidarItemArray(arr, obj) {
        return (arr.indexOf(obj) != -1);
    }

    function ObtenerArchivo() {
        var RutaObtenerArchivo = "data.json";
        return RutaObtenerArchivo;
    }

    $(document).ready(function () {
        $('select').formSelect();
    });

    $('select').on('contentChanged', function () {
        // re-initialize (update)
        $('select').formSelect();
    });

    $("#Empresa").change(function () {
        LlenarListaResultado();
    });

    ObtenerPlanes();

    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function (obj) {
            ListaPlanes = obj;
            LlenarListaEmpresa();
        });
    }


    function LlenarListaEmpresa() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;

            var Marcas = ['tigo', 'movistar', 'claro', 'avantel', 'ETB'];


            for (var i = 0; i < ListaPlanes.length; i++) {

                if (ValidarItemArray(arrItems, ListaPlanes[i].basico) == false && ListaPlanes[i].brand == "tigo") {

                    arrItems[Contador] = ListaPlanes[i].basico;
                    Contador += 1;

                }
            }

            var $selectDropdown = $("#Empresa")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Cargo")
            );

            for (var i = 0; i < arrItems.length; i++) {
                $selectDropdown.append(
                    $("<option></option>")
                    .attr("value", arrItems[i])
                    .text(arrItems[i])
                );
            }

            $selectDropdown.trigger('contentChanged');

        }
    }

    function LlenarListaResultado() {
        if (ListaPlanes != null) {
            var TipoSeleccionado = $('#Empresa').val();
            var Marcas = ['tigo', 'movistar', 'claro', 'avantel', 'ETB'];
            var planMarca = ['', '', '', ''];
            var cont = 0;
            var id;

            $("#popo").empty().html();
            $("#popo").css('height', 800 + 'px');

            for (index = 0; index < ListaPlanes.length; index++) {

                if (ListaPlanes[index].brand == "tigo" && ListaPlanes[index].basico == TipoSeleccionado) {
                    id = ListaPlanes[index].id
                }
            }



            for (var i = 0; i < ListaPlanes.length; i++) {

                if (ValidarItemArray(ListaPlanes, ListaPlanes[i].basico) == false) {

                    

                    for (let index = 0; index < Marcas.length; index++) {

                        if (ValidarItemArray(ListaPlanes, ListaPlanes[i].basico) == false && ListaPlanes[i].id == id && ListaPlanes[i].brand == Marcas[index]) {

                            cont++;
                            columna = "l";

                            if (screen.width<900){
                                clase = "carousel-item";
                            }else{
                                clase = "";
                            }

                            

                            $("#popo").append('<a id="contentpopo' + cont + '" class="' + clase + '"></a>');

                            $("#contentpopo").append('<div class="conten" id="slide' + cont + '"></div>');
                            

                            //$("#swipeone").append('<div class="conten" id="slide' + cont + '"></div>');

                            $("#contentpopo" + cont).append('<th><img src="img/' + Marcas[index] + '.png" height="50px"></th>');

                            $("#contentpopo" + cont).append('<tbody id="cuerpo' + cont + '"></tbody>');

                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].basico + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].datos + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].minutoson + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].beneficios + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].apps + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].minutostd + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].internacional + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].comunidad + '</td></tr>');
                            $('#cuerpo' + cont).append('<tr><td>' + ListaPlanes[i].promociones + '</td></tr>');



                        }
                    }
                }
            }

            

            var divis = $('.col .carousel > a');
            var porcent = "%";
            var tamano = 99 / cont;
            console.log(tamano);

            if (screen.width<900){
                divis.css('width', "100%");
            }else{
                divis.css({"width": tamano + porcent,"float":"left"});
            }

            $('.carousel.carousel-slider').carousel({
                fullWidth: true
              });

        }
    }

})(jQuery);
