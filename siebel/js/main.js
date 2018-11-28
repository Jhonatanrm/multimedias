var ListaPlanes = null;
var resultado;
var resultadoplan;
var celulares = {};

(function($) {

    $(document).ready(function() {
        $('select').formSelect();
    });

    $(document).ready(function() {
        $('.modal').modal();
    });

    $('select').on('contentChanged', function() {
        // re-initialize (update)
        $('select').formSelect();
    });


    if (screen.width < 900) {
        $('select').addClass(' browser-default');
    }

    $('#autocomplete-input').change(function() {
        LlenarListaCobertura();
    });




    ObtenerPlanes();


    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function(obj) {
            ListaPlanes = obj;
            
            LlenarListaPlan();
            LlenarListaCelular();
        });
    }

    function LlenarListaPlan() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;


            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Brand) == false) {
                    arrItems[Contador] = ListaPlanes[i].Brand;


                    $("#pendiente").append('<tr>' + '<td>' + ListaPlanes[i].Brand + '</td>' + '<td style="text-align: center">' + '<a class="btn modal-trigger" href="#modal1"  id="' + i + '"><img src="img/tap.png" width="30px"></a>' + '</td>' +
                        '<td style="text-align: center">' + '<a class="btn modal-trigger" href="#modal2"  id="' + i + '"><img src="img/tap.png" width="30px"></a>' + '</td>' +
                        '</tr>');

                    Contador += 1;
                }

            }

            $(".btn").click(function() {
                i = this.id;
                $("#modal1").empty().html(' ');
                $("#modal2").empty().html(' ');
                console.log(i);

                $("#modal1").append('<h4>' + 'Descripcion' + '</h4><p>' + ListaPlanes[i].code1 + '</p>');
                $("#modal2").append('<h4>' + 'Gestión' + '</h4><p>' + ListaPlanes[i].code2 + '</p>');
            });
        }
    }

    function LlenarListaCelular() {
        if (ListaPlanes != null) {

            var arrItems = [];
            var Contador = 0;

            $('#autocomplete-input').empty().html(' ');


            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Brand) == false) {
                    arrItems[Contador] = ListaPlanes[i].Brand;
                    celulares[arrItems[Contador]] = null;
                    Contador += 1;

                }
            }

            var NodoSeleccionado = $('#autocomplete-input').empty().html(' ');

            console.log(celulares);

            $('input.autocomplete').autocomplete({
                data: celulares
            });

        }
    }

    function LlenarListaCobertura() {
        if (ListaPlanes != null) {
            var ReferenciaSeleccionado = $('#autocomplete-input').val();
            var arrItems = [];
            var Contador = 0;

            $("#pendiente").empty().html();


            console.log(celulares);


            for (var i = 0; i < ListaPlanes.length; i++) {

                if (ValidarItemArray(arrItems, ListaPlanes[i].Brand) == false && ReferenciaSeleccionado == ListaPlanes[i].Brand) {

                    $("#pendiente").append('<tr>' + '<td>' + ListaPlanes[i].Brand + '</td>' + '<td style="text-align: center">' + '<a class="waves-effect waves-light btn modal-trigger" href="#modal1"  id="' + i + '">Descripción</a>' + '</td>' +
                        '<td style="text-align: center">' + '<a class="waves-effect waves-light btn modal-trigger" href="#modal2"  id="' + i + '">Gestión</a>' + '</td>' +
                        '</tr>');

                    Contador += 1;

                }
            }

            $(".btn").click(function() {
                i = this.id;
                console.log(i);
                $("#modal1").empty().html(' ');
                $("#modal2").empty().html('  ');
                $("#modal1").append('<h4>' + 'Descripcion' + '</h4><p>' + ListaPlanes[i].code1 + '</p>' + '<a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>');
                $("#modal2").append('<h4>' + 'Pasos a seguir' + '</h4><p>' + ListaPlanes[i].code2 + '</p>' + '<div class="modal-footer"><a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a></div>');
            });
        }
    }

    //GENERICO
    //************************************************************
    function ValidarItemArray(arr, obj) {
        return (arr.indexOf(obj) != -1);
    }

    function ObtenerArchivo() {
        var RutaObtenerArchivo = "CODES.json";
        return RutaObtenerArchivo;
    }
    //************************************************************
})(jQuery);