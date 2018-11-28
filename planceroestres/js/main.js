var ListaPlanes = null;

(function ($) {
    $(document).ready(function () {
        $('select').material_select();
    });
    
    $('select').on('contentChanged', function () {
        // re-initialize (update)
        $(this).material_select();
    });

    $("#aplicaciones").change(function () {
        LlenarListaResultado();
    });

    ObtenerPlanes();


    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function (obj) {
            ListaPlanes = obj;
            LlenarListaCiclo();
        });
    }

    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
        }
    }

    function LlenarListaCiclo() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Referencia) == false) {
                    arrItems[Contador] = ListaPlanes[i].Referencia;
                    Contador += 1;
                }
            }

            var $selectDropdown = $("#aplicaciones")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $('<option></option>')
                    .attr("value", "")
                    .text("Selecciona Smartphone")
            );

            for (var i = 0; i < arrItems.length; i++) {
                $selectDropdown.append(
                    $('<option></option>')
                        .attr("value", arrItems[i])
                        .text(arrItems[i])
                );
            }
            
            

            $selectDropdown.trigger('contentChanged');
        }
    }


    function LlenarListaResultado() {
        if (ListaPlanes != null) {
            var RefSeleccionado = $('#aplicaciones').val();

            $("#imagen_celular").empty().html('');
            $("#preciocel").empty().html('');
            $("#ptarjeta").empty().html('');
            $("#ctarjeta").empty().html('');
            $("#ctarjetaes").empty().html('');
            $("#ahorro").empty().html('');

            $("#preciocel18").empty().html('');
            $("#ptarjeta18").empty().html('');
            $("#ctarjeta18").empty().html('');
            $("#ctarjeta").empty().html('');
            $("#ctarjeta18es").empty().html('');
            $("#ahorro18").empty().html('');

            $("#preciocel24").empty().html('');
            $("#ptarjeta24").empty().html('');
            $("#ctarjeta24").empty().html('');
            $("#ctarjeta").empty().html('');
            $("#ctarjeta24es").empty().html('');
            $("#ahorro24").empty().html('');

            $("#contado1").empty().html('');
            $("#contado2").empty().html('');
            $("#contado3").empty().html('');
            $("#0es31").empty().html('');
            $("#0es32").empty().html('');
            $("#0es33").empty().html('');


            $("#creditoa121").empty().html('');
            $("#creditoa122").empty().html('');
            $("#creditoa123").empty().html('');
            $("#creditoa181").empty().html('');
            $("#creditoa182").empty().html('');
            $("#creditoa183").empty().html('');
            $("#creditoa241").empty().html('');
            $("#creditoa242").empty().html('');
            $("#creditoa243").empty().html('');

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ListaPlanes[i].Referencia == RefSeleccionado) {

                    preciotarjeta = formatNumber.new(parseInt(ListaPlanes[i].ValorCuotaOtratarjeta12 * 12 ));
                    ahorro = formatNumber.new(parseInt(ListaPlanes[i].Precio0es312 - (ListaPlanes[i].ValorCuotaOtratarjeta12 * 12 ) ));
                    valor0es3 = formatNumber.new(parseInt(ListaPlanes[i].Precio0es312 / 12 ));

                    preciotarjeta18 = formatNumber.new(parseInt(ListaPlanes[i].ValorCuotaOtratarjeta18 * 18 ));
                    ahorro18 = formatNumber.new(parseInt(ListaPlanes[i].Precio0es318 - (ListaPlanes[i].ValorCuotaOtratarjeta18 * 18 ) ));
                    valor0es318 = formatNumber.new(parseInt(ListaPlanes[i].Precio0es318 / 18 ));

                    preciotarjeta24 = formatNumber.new(parseInt(ListaPlanes[i].ValorCuotaOtratarjeta24 * 24 ));
                    ahorro24 = formatNumber.new(ListaPlanes[i].Precio0es324 - (ListaPlanes[i].ValorCuotaOtratarjeta24 * 24 ));
                    valor0es324 = formatNumber.new(parseInt(ListaPlanes[i].Precio0es324 / 24 ));

                    credito121 = formatNumber.new(parseInt(ListaPlanes[i].Pago0Es3 / 12));
                    credito181 = formatNumber.new(parseInt(ListaPlanes[i].Pago0Es3 / 18));
                    credito241 = formatNumber.new(parseInt(ListaPlanes[i].Pago0Es3 / 24));

                    credito122 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v2 / 12));
                    credito182 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v2 / 18));
                    credito242 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v2 / 24));

                    credito123 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v3 / 12));
                    credito183 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v3 / 18));
                    credito243 = formatNumber.new(parseInt(ListaPlanes[i].Pago0es3v3 / 24));

                    $("#imagen_celular").append('<img src="' + 'img/' + ListaPlanes[i].imagen + '.jpg' + '" width="80%">');

                    $("#preciocel").append('$ ' + formatNumber.new(ListaPlanes[i].Precio0es312));
                    $("#ptarjeta").append('$ ' + preciotarjeta);
                    $("#ctarjeta").append('$ ' + formatNumber.new(ListaPlanes[i].ValorCuotaOtratarjeta12));
                    $("#ctarjetaes").append('$ ' + valor0es3);
                    $("#ahorro").append('$ ' + ahorro);

                    $("#preciocel18").append('$ ' + formatNumber.new(ListaPlanes[i].Precio0es318));
                    $("#ptarjeta18").append('$ ' + preciotarjeta18);
                    $("#ctarjeta18").append('$ ' + formatNumber.new(ListaPlanes[i].ValorCuotaOtratarjeta18));

                    $("#ctarjeta18es").append('$ ' + valor0es318);
                    $("#ahorro18").append('$ ' + ahorro18);

                    $("#preciocel24").append('$ ' + formatNumber.new(ListaPlanes[i].Precio0es324));
                    $("#ptarjeta24").append('$ ' + preciotarjeta24);
                    $("#ctarjeta24").append('$ ' + formatNumber.new(ListaPlanes[i].ValorCuotaOtratarjeta24));
                    $("#ctarjeta24es").append('$ ' + valor0es324);
                    $("#ahorro24").append('$ ' + ahorro24);


                    $("#contado1").append('$ ' + formatNumber.new(ListaPlanes[i].PagosContado));
                    $("#contado2").append('$ ' + formatNumber.new(ListaPlanes[i].PagosContadov2));
                    $("#contado3").append('$ ' + formatNumber.new(ListaPlanes[i].PagosContadov3));
                    $("#0es31").append('$ ' + formatNumber.new(ListaPlanes[i].Pago0Es3));
                    $("#0es32").append('$ ' + formatNumber.new(ListaPlanes[i].Pago0es3v2));
                    $("#0es33").append('$ ' + formatNumber.new(ListaPlanes[i].Pago0es3v3));

                    $("#creditoa121").append('$ ' + credito121);
                    $("#creditoa122").append('$ ' + credito122);
                    $("#creditoa123").append('$ ' + credito123);
                    $("#creditoa181").append('$ ' + credito181);
                    $("#creditoa182").append('$ ' + credito182);
                    $("#creditoa183").append('$ ' + credito183);
                    $("#creditoa241").append('$ ' + credito241);
                    $("#creditoa242").append('$ ' + credito242);
                    $("#creditoa243").append('$ ' + credito243);


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
        var RutaObtenerArchivo = "smarts.json";
        return RutaObtenerArchivo;
    }
//************************************************************

})(jQuery);