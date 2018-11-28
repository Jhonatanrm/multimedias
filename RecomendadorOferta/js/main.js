$(document).ready(function(){
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('.tabs').tabs();  
    $('.tooltipped').tooltip();   
});

/*$('select').on('contentChanged', function() {
    // re-initialize (update)
    $('select').formSelect();
});*/

(function($) {

    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function(obj) {
            ListaPlanes = obj;
        });
    }

    ObtenerPlanes();

    $("#llamadas").change(function () {
        LlenarListaPlan();
    });


    function LlenarListaPlan() {
        if (ListaPlanes != null) {
            var EstratoSeleccionado = parseInt($('#estrato').val());
            var PersonasSeleccionado = parseInt($('#personas').val());
            var DispositivosSeleccionado = parseInt($('#dispositivos').val());
            var TvSeleccionado = parseInt($('#tv').val());
            var LlamadasSeleccionado = parseInt($('#llamadas').val());
            var Estratos = ['Estrato_1', 'Estrato_2', 'Estrato_3', 'Estrato_4', 'Estrato_5', 'Estrato_6'];
            var Ponderado = EstratoSeleccionado + PersonasSeleccionado + DispositivosSeleccionado + TvSeleccionado + LlamadasSeleccionado;
            var arrItems = [];
            var Contador = 0;
            var estratoSeleccionadoText = $('select[name="Est"] option:selected').text();

            console.log(EstratoSeleccionado + PersonasSeleccionado + DispositivosSeleccionado + TvSeleccionado + LlamadasSeleccionado);

            console.log($('select[name="Est"] option:selected').text());



            

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ListaPlanes[i].Min <= Ponderado && ListaPlanes[i].Max >= Ponderado && ListaPlanes[i][estratoSeleccionadoText].length != 0) {
                    console.log('popo1');
                    /*for (let index2 = 0; index2 < Estratos.length; index2++) {
                        console.log('popo2');
                        if (ListaPlanes[i][Estratos[index2]].length != 0) {*/
                            console.log(ListaPlanes[i]['Estrato_1']);
                            console.log(ListaPlanes[i]['Estrato_1'].length);
                            arrItems[Contador] = ListaPlanes[i].Ofertas;
                            Contador += 1;
                            $("#Planes").append('<tr>'+
                                    '<td>' + ListaPlanes[i].Ofertas+ '</td>' + 
                                    '<td>' + ListaPlanes[i].CanalesSD+ '</td>' + 
                                    '<td>' + ListaPlanes[i].CanalesHD + '</td>' + 
                                    '<td>' + ListaPlanes[i].CanalesAudio + '</td>' + 
                                    '<td>' + ListaPlanes[i].Internet + '</td>' + 
                                    '<td>' + ListaPlanes[i].Telefonia + '</td>' + 
                                    '<td>' + ListaPlanes[i][estratoSeleccionadoText] + '</td>' + 
                                '</tr>' 
                            )
                        /*}
                    }*/
                }
            }


            /*for (var i = 0; i < arrItems.length; i++) {
                $("#Planes").append('<li>'+
                    '<div class="collapsible-header">' + '<table><tbody>' + '<tr>' + '<td>' + arrItems[i] + '</td>' + '<td>' + arrItems[i] + '</td>' + '</tr>' + '</table></tbody></div>' +
                    '<div class="collapsible-body">' + '<table><tbody>' + '<tr>' + '<td>' + arrItems[i] + '</td>' + '<td>' + arrItems[i] + '</td>' + '</tr>' + '</table></tbody></div>'
                )
            }*/

        }
    }





    //GENERICO
    //************************************************************
    function ValidarItemArray(arr, obj) {
        return (arr.indexOf(obj) != -1);
    }

    function ObtenerArchivo() {
        var RutaObtenerArchivo = "data.json";
        return RutaObtenerArchivo;
    }
})(jQuery);