var ListaPlanes = null;

(function ($) {
    $(document).ready(function () {
        $('select').material_select();
    });
    $('select').on('contentChanged', function () {
        // re-initialize (update)
        $(this).material_select();
    });
    $("#Ano").change(function () {
        LlenarListaMes();
    });
    $("#Mes").change(function () {
        LlenarListaCanal();
    });
    $("#Canal").change(function () {
        LlenarListaVigencia();
    });
    $("#Vigencia").change(function () {
        LlenarListaResultado();
    });
    ObtenerPlanes();


function ObtenerPlanes() {
    $.getJSON(ObtenerArchivo(), function (obj) {
        ListaPlanes = obj;
        LlenarListaAno();
        
    });
}
function LlenarListaAno() {
    if (ListaPlanes != null) {
        var arrItems = [];
        var Contador = 0;

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].ANO) == false) {
                arrItems[Contador] = ListaPlanes[i].ANO;
                Contador += 1;
            }
        }

        var $selectDropdown = $("#Ano")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Año")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }

        $selectDropdown.trigger('contentChanged');

        $selectDropdown = $("#Ciudad")
            .empty()
            .html(' ');
        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Ciudad")
            );
        $selectDropdown.trigger('contentChanged');

        $("#Tabla_Ciudad").empty().html(' ');
    }
}

function LlenarListaMes() {
    if (ListaPlanes != null) {
        var AnoSeleccionado = $('#Ano').val();
        var arrItems = [];
        var Contador = 0;

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].MES) == false && ListaPlanes[i].ANO == AnoSeleccionado) {
                arrItems[Contador] = ListaPlanes[i].MES;
                Contador += 1;
            }
        }

        var $selectDropdown = $("#Mes")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Mes")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }
        
        jQuery.uniqueSort(ListaPlanes)
        

        $selectDropdown.trigger('contentChanged');
    }
}

function LlenarListaCanal() {
    if (ListaPlanes != null) {
        var AnoSeleccionado = $('#Ano').val();
        var MesSeleccionado = $('#Mes').val();
        var arrItems = [];
        var Contador = 0;

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].CANALES) == false && ListaPlanes[i].ANO == AnoSeleccionado && ListaPlanes[i].MES == MesSeleccionado) {
                arrItems[Contador] = ListaPlanes[i].CANALES;
                Contador += 1;
            }
        }

        var $selectDropdown = $("#Canal")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Canal")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }
        
        jQuery.uniqueSort(ListaPlanes)
        

        $selectDropdown.trigger('contentChanged');
    }
}

function LlenarListaVigencia() {
    if (ListaPlanes != null) {
        var AnoSeleccionado = $('#Ano').val();
        var MesSeleccionado = $('#Mes').val();
        var CanalSeleccionado = $('#Canal').val();
        var arrItems = [];
        var Contador = 0;

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].VIGENCIA) == false && ListaPlanes[i].ANO == AnoSeleccionado && ListaPlanes[i].MES == MesSeleccionado && ListaPlanes[i].CANALES == CanalSeleccionado) {
                arrItems[Contador] = ListaPlanes[i].VIGENCIA;
                Contador += 1;
            }
        }

        var $selectDropdown = $("#Vigencia")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Vigencia")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }
        
        jQuery.uniqueSort(ListaPlanes)
        

        $selectDropdown.trigger('contentChanged');
    }
}


function LlenarListaResultado() {
    if (ListaPlanes != null) {
        var AnoSeleccionado = $('#Ano').val();
        var MesSeleccionado = $('#Mes').val();
        var CanalSeleccionado = $('#Canal').val();
        var VigenciaSeleccionado = $('#Vigencia').val();
        var iframe = document.getElementById("frame1");

        $("#TablaResultado").empty().html('');


        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ListaPlanes[i].ANO == AnoSeleccionado && ListaPlanes[i].MES == MesSeleccionado && ListaPlanes[i].CANALES == CanalSeleccionado && ListaPlanes[i].VIGENCIA == VigenciaSeleccionado) {

                $("#TablaResultado").append(
                    '<td><i class="material-icons">new_releases</i> <strong>Promoción:</strong> <br> ' + ListaPlanes[i].PROMOCIÓN +'</td>' +
                    '<td><i class="material-icons">compare_arrows</i> <strong>Transacción:</strong> <br>' + ListaPlanes[i].TRANSACCION + '</td>' +
                    '<td><i class="material-icons">error_outline</i> <strong>Descripción:</strong> <br>' + ListaPlanes[i].DESCRIPCION + '</td>' +
                    '<td><i class="material-icons">attach_money</i> <strong>Cargos Básicos:</strong> <br>' + ListaPlanes[i].CARGOS + '</td>' +
                    '<td><i class="material-icons">add_circle_outline</i> <strong>Acumulable:</strong> <br>' + ListaPlanes[i].ACUMULABLE + '</td>'
                );

                iframe.setAttribute("src", 'https://www.tigounetrainers.com/wp-content/uploads/2018/08/Historico_promos/pdf/' + ListaPlanes[i].ADJUNTO + '#toolbar=0');
            }
        }
    }
}
//GENERICO
//************************************************************
function ValidarItemArray(arr, obj) {
    return (arr.indexOf(obj) != -1);
}
function ObtenerArchivo() {
    var RutaObtenerArchivo = "materialize/js/data.json";
    return RutaObtenerArchivo;
}
//************************************************************
})(jQuery);