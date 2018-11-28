var ListaPlanes = null;
var ListaServicios = null;
var ListaAcumulada = null;
var ListaAcumuladaSer = null;
var sumaindividual = 0;
var sumaempaquetado = 0;
var resultado;
var resultadotecno;
var resultadoempresa;
var individual;
var empaquetado;
var decos;


(function($) {
    $(document).ready(function() {
        $('select').formSelect();
        var ValorAcumulado = localStorage.getItem('VALORACUMULADO');
    });

    $(document).ready(function() {
        $('select').formSelect();
    });

    $('select').on('contentChanged', function() {
        // re-initialize (update)
        $('select').formSelect();
    });

    if (screen.width < 900) {
        $('select').addClass(' browser-default');
    }

    $("#Linea").change(function() {
        LlenarListaTipo();
    });

    $("#Oferta").change(function() {
        LlenarListaEstrato();
    });



    $("#TipoServicio").change(function() {
        LlenarServicio();
    });

    ObtenerPlanes();
    ObtenerServicio()
    sumatorias();


    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function(obj) {
            ListaPlanes = obj;
            LlenarListaEmpresa();
        });
    }

    function ObtenerServicio() {
        $.getJSON(ObtenerArchivoServicio(), function(obj) {
            ListaServicios = obj;
            LlenarListaServicio();
        });
    }



    function LlenarListaServicio() {

        if (ListaServicios != null) {
            var arrItems = [];
            var Contador = 0;

            for (var i = 0; i < ListaServicios.length; i++) {
                if (ValidarItemArray(arrItems, ListaServicios[i].tiposervicio) == false) {
                    arrItems[Contador] = ListaServicios[i].tiposervicio;
                    Contador += 1;
                }
            }

            var $selectDropdown = $("#TipoServicio")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Tipo de servicio")
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

    function LlenarServicio() {

        if (ListaServicios != null) {
            var arrItems = [];
            var Contador = 0;
            var tiposervicioSeleccionado = $('#TipoServicio').val();


            for (var i = 0; i < ListaServicios.length; i++) {
                if (ValidarItemArray(arrItems, ListaServicios[i].servicio) == false && tiposervicioSeleccionado == ListaServicios[i].tiposervicio) {
                    arrItems[Contador] = ListaServicios[i].servicio;
                    Contador += 1;
                }
            }

            var $selectDropdown = $("#Servicio")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona servicio")
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

    function LlenarListaEmpresa() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;
            erTdemp = document.getElementById('Empresa');

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Empresa) == false) {
                    arrItems[Contador] = ListaPlanes[i].Empresa;
                    Contador += 1;
                }
            }

            for (var i = 0; i < arrItems.length; i++) {

                erInput = document.createElement('input');
                erlabel = document.createElement('label');
                erp = document.createElement('p');
                erSapn = document.createElement('span');

                erSapn.innerHTML = arrItems[i];

                erSapn.setAttribute("class", arrItems[i]);
                erInput.setAttribute("type", "radio");
                erInput.setAttribute("class", "Plan");
                erInput.setAttribute("name", 'group1');
                erInput.setAttribute("value", arrItems[i]);

                erTdemp.appendChild(erp);
                erlabel.appendChild(erInput);
                erp.appendChild(erlabel);
                erlabel.appendChild(erSapn);


            }


            $('input[name=group1]').click(function() {


                var porNombre = document.getElementsByName("group1");
                // Recorremos todos los valores del radio button para encontrar el
                // seleccionado
                for (var i = 0; i < porNombre.length; i++) {
                    if (porNombre[i].checked) {
                        resultadoempresa = porNombre[i].value;
                        LlenarListaPlan();
                        conexion();
                    }
                }

            });
        }
    }

    function LlenarListaPlan() {
        if (ListaPlanes != null) {
            var EmpresaSeleccionada = resultadoempresa;
            var arrItems = [];
            var Contador = 0;
            erTdemp = $("#Plan").empty().html('');

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Plan) == false && ListaPlanes[i].Empresa == EmpresaSeleccionada) {
                    arrItems[Contador] = ListaPlanes[i].Plan;
                    Contador += 1;
                }
            }

            for (var i = 0; i < arrItems.length; i++) {

                erInput = document.createElement('input');
                erlabel = document.createElement('label');
                erp = document.createElement('p');
                erSapn = document.createElement('span');

                erSapn.innerHTML = arrItems[i];

                erSapn.setAttribute("class", arrItems[i]);
                erInput.setAttribute("type", "radio");
                erInput.setAttribute("class", "Plan");
                erInput.setAttribute("name", 'group2');
                erInput.setAttribute("value", arrItems[i]);

                erTdemp.append(erp);
                erlabel.appendChild(erInput);
                erp.appendChild(erlabel);
                erlabel.appendChild(erSapn);


            }


            $('input[name=group2]').click(function() {


                var porNombre = document.getElementsByName("group2");
                // Recorremos todos los valores del radio button para encontrar el
                // seleccionado
                for (var i = 0; i < porNombre.length; i++) {
                    if (porNombre[i].checked) {
                        resultado = porNombre[i].value;
                        LlenarListaTecnologia();
                        conexion();
                    }
                }

            });
        }
    }



    function LlenarListaTecnologia() {
        if (ListaPlanes != null) {
            var EmpresaSeleccionada = resultadoempresa;
            var PlanSeleccionado = resultado;
            var arrItems = [];
            var Contador = 0;
            var erTdemp = $("#Tecnologia").empty().html('');

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Tecnologia) == false && ListaPlanes[i].Empresa == EmpresaSeleccionada && ListaPlanes[i].Plan == PlanSeleccionado) {
                    arrItems[Contador] = ListaPlanes[i].Tecnologia;
                    Contador += 1;
                }
            }



            for (var i = 0; i < arrItems.length; i++) {

                erInput = document.createElement('input');
                erlabel = document.createElement('label');
                erp = document.createElement('p');
                erSapn = document.createElement('span');

                erSapn.innerHTML = arrItems[i];

                erInput.setAttribute("type", "radio");
                erInput.setAttribute("class", "Tecnologia");
                erInput.setAttribute("name", 'group3');
                erInput.setAttribute("value", arrItems[i]);

                erTdemp.append(erp);
                erlabel.appendChild(erInput);
                erp.appendChild(erlabel);
                erlabel.appendChild(erSapn);


            }

            $('input[name=group3]').click(function() {


                var porNombretecno = document.getElementsByName("group3");
                // Recorremos todos los valores del radio button para encontrar el
                // seleccionado
                for (var i = 0; i < porNombretecno.length; i++) {
                    if (porNombretecno[i].checked) {
                        resultadotecno = porNombretecno[i].value;
                        LlenarListaLinea();
                    }
                }
            });

        }
    }

    function LlenarListaLinea() {
        if (ListaPlanes != null) {
            var EmpresaSeleccionada = resultadoempresa;
            var PlanSeleccionado = resultado;
            var TecnologiaSeleccionado = resultadotecno;
            var arrItems = [];
            var Contador = 0;

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Linea) == false && ListaPlanes[i].Empresa == EmpresaSeleccionada && ListaPlanes[i].Plan == PlanSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado) {
                    arrItems[Contador] = ListaPlanes[i].Linea;
                    Contador += 1;
                }
            }

            var $selectDropdown = $("#Linea")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Linea")
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

    function LlenarListaTipo() {
        if (ListaPlanes != null) {
            var EmpresaSeleccionada = resultadoempresa;
            var PlanSeleccionado = resultado;
            var TecnologiaSeleccionado = resultadotecno;
            var LineaSeleccionado = $('#Linea').val();
            var arrItems = [];
            var Contador = 0;

            for (var i = 0; i < ListaPlanes.length; i++) {
                if (ValidarItemArray(arrItems, ListaPlanes[i].Oferta) == false && ListaPlanes[i].Empresa == EmpresaSeleccionada && ListaPlanes[i].Plan == PlanSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado && ListaPlanes[i].Linea == LineaSeleccionado) {
                    arrItems[Contador] = ListaPlanes[i].Oferta;
                    Contador += 1;
                }
            }

            var $selectDropdown = $("#Oferta")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Oferta")
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

    function LlenarListaEstrato() {
        if (ListaPlanes != null) {
            var EmpresaSeleccionada = resultadoempresa;
            var PlanSeleccionado = resultado;
            var TecnologiaSeleccionado = resultadotecno;
            var LineaSeleccionado = $('#Linea').val();
            var OfertaSeleccionado = $('#Oferta').val();
            var arrItems = [];
            var Contador = 0;
            var Estratos = ['Estrato1y2', 'Estrato3y4', 'Estrato5y6'];

            for (var i = 0; i < ListaPlanes.length; i++) {

                if (ListaPlanes[i].Empresa == EmpresaSeleccionada && ListaPlanes[i].Plan == PlanSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado &&
                    ListaPlanes[i].Linea == LineaSeleccionado && ListaPlanes[i].Oferta == OfertaSeleccionado) {

                    for (let index = 0; index < Estratos.length; index++) {
                        if (ListaPlanes[i][Estratos[index]] != null) {
                            arrItems[Contador] = Estratos[index];
                            Contador += 1;
                        }
                    }
                }
            }

            var $selectDropdown = $("#Estrato")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Estrato")
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

    function sumatorias() {

    }

    function conexion() {
        if (ListaPlanes != null) {

            $("#TablaInstalacion").empty();


            // no es 0

            var PlanSeleccionado = resultado;

            var $selectDropdown = $('#Permanencia');

            $selectDropdown.trigger('contentChanged');



            $('#Permanencia').change(function() {
                var Permanencia = $('#Permanencia').val();

                if (Permanencia == 1) {
                    $("#TablaConexion").empty();
                    $("#TablaConexion").append('<tr>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td>' + 'Valor x Retiro Anticipado:' + '</td>' + '<td>' + '$ 235948' + '</td>' + '<td></td>' + '</tr>');
                } else {
                    $("#TablaConexion").empty();
                    $("#TablaConexion").append('<tr>' + '<td></td>' + '<td></td>' + '<td></td>' + '<td>' + 'Valor por conexión:' + '</td>' + '<td>' + '$ 235948' + '</td>' + '<td></td>' + '</tr>');
                }
            });


            if (resultado == "Trio") {
                $("#TablaInstalacion").append('<tr>' + '<td><strong>Costos Adicionales</strong></td>' + '<td></td>' + '<td></td>' + '<td>' + 'Cargo Anticipado:' + '</td>' + '<td>' + '$ 0' + '</td>' + '<td></td>' + '</tr>');
            } else {
                $("#TablaInstalacion").append('<tr>' + '<td><strong>Costos Adicionales</strong></td>' + '<td></td>' + '<td></td>' + '<td>' + 'Cargo Anticipado:' + '</td>' + '<td>' + '$ 50000' + '</td>' + '<td></td>' + '</tr>');
            }

            /* hasta aqui esta bien popo*/



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

    function ObtenerArchivoServicio() {
        var RutaObtenerArchivo2 = "dataservicios.json";
        return RutaObtenerArchivo2;
    }
    //************************************************************

    $('#limpiar').click(function() {

        ListaAcumulada = null;
        ListaAcumuladaSer = null;

        $("#TablaResultado2").empty().html();
        $("#TablaResultado").empty().html();
        $("#TablaServicio").empty().html();
        $("#TablaResultadoServicio").empty().html();
        $("#Tablatotal").empty().html();


        $("#Plan").empty().html('');
        $("#Tecnologia").empty().html('');
        $("#Linea").empty().html('');
        $("#Tecnologia").empty().html('');
        $("#Oferta").empty().html('');
        $("#Estrato").empty().html('');

        $("#Linea").trigger('contentChanged');
        $("#Oferta").trigger('contentChanged');
        $("#Estrato").trigger('contentChanged');

        $('#mercado option').prop('selected', function() {
            return this.defaultSelected;
        });
        $("#mercado").trigger('contentChanged');

    });

})(jQuery);

function acumulado() {

    var EmpresaSeleccionada = resultadoempresa;
    var PlanSeleccionado = resultado;
    var TecnologiaSeleccionado = resultadotecno;
    var TipoSeleccionado = $('#Oferta').val();
    var LineaSeleccionado = $('#Linea').val();
    var EstratoSeleccionado = $('#Estrato').val();
    var DescuentoSeleccionado = $('#mercado').val();
    var Estrato = ['Estrato1y2', 'Estrato3y4', 'Estrato5y6']
    var DescuentoRetador = ['DR12', 'DR34', 'DR56'];
    var DescuentoIncumbente = ['DI12', 'DI34', 'DI56'];

    for (var i = 0; i < ListaPlanes.length; i++) {



        if (ListaPlanes[i].Empresa == EmpresaSeleccionada && ListaPlanes[i].Plan == PlanSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado && ListaPlanes[i].Oferta == TipoSeleccionado &&
            ListaPlanes[i].Linea == LineaSeleccionado && ListaPlanes[i][EstratoSeleccionado] != null) {

            if (DescuentoSeleccionado == "retador") {
                empaquetado = ListaPlanes[i][DescuentoRetador[Estrato.indexOf(EstratoSeleccionado)]];

            } else {
                empaquetado = ListaPlanes[i][DescuentoIncumbente[Estrato.indexOf(EstratoSeleccionado)]];
            }

            individual = ListaPlanes[i][EstratoSeleccionado];

            decos = ListaPlanes[i].Decos;

        }


    }


    if (ListaAcumulada == null) {
        ListaAcumulada = [{
            individual: individual,
            empaquetado: empaquetado,
            decos: decos,
        }];
    } else {
        var ExiteEnLista = false;
        for (var i = 0; i < ListaAcumulada.length; i++) {
            if (ListaAcumulada[i][EstratoSeleccionado] == individual && ListaAcumulada[i][DescuentoSeleccionado] == empaquetado && ListaAcumulada[i].Decos == decos) {
                ExiteEnLista = true;
            }
        }
        if (ExiteEnLista == false) {
            ListaAcumulada.push({
                individual: individual,
                empaquetado: empaquetado,
                decos: decos,
            });
        }
    }



    $("#TablaResultado").empty();
    $("#TablaResultado2").empty();

    sumaindividual = 0;
    sumaempaquetado = 0;

    for (var i = 0; i < ListaAcumulada.length; i++) {

        numerodescuento = parseInt((100 - (ListaAcumulada[i].empaquetado * 100 / ListaAcumulada[i].individual)));

        if (ListaAcumulada[i].empaquetado == "" || ListaAcumulada[i].empaquetado == null) { numerodescuento = 0; }

        $("#TablaResultado").append('<tr id="fila' + (i + 1) + '">' +
            '<td></td><td></td>' +
            '<td>' + ListaAcumulada[i].decos + '</td>' +
            '<td>' + '$ ' + ListaAcumulada[i].individual + '</td>' +
            '<td>' + '$ ' + ListaAcumulada[i].empaquetado + '</td>' +
            '<td>' + numerodescuento + '%' + '</td>' +
            '<td>' +
            '<label>' +
            '<input class="borrar" type="radio" value="' + (i + 1) + '" id="' + (i + 1) + '"/>' +
            '<span>X</span>' +
            '</label>' +
            '</td>' +
            '</tr>');

        sumaindividual += ListaAcumulada[i].individual;
        sumaempaquetado += ListaAcumulada[i].empaquetado;


        $("#TablaResultado2").empty();

        $("#TablaResultado2").append('<tr>' +
            '<td></td><td></td><td></td>' +
            '<td>' + 'Total Plan:' + '</td>' +
            '<td>' + "$" + " " + sumaindividual + '</td>' +
            '<td>' + "$" + " " + sumaempaquetado + '</td>' +
            '<td></td>' +
            '</tr>');

    }
}

$(function() {
    $(document).on('click', '.borrar', function(event) {
        event.preventDefault();

        var i = $(this).attr("id") - 1;

        sumaindividual -= ListaAcumulada[i].individual;
        sumaempaquetado -= ListaAcumulada[i].empaquetado;

        ListaAcumulada.splice(i, 1);

        $(this).closest('tr').remove();

        $("#TablaResultado2").empty();
        $("#Tablatotal").empty();


        $("#TablaResultado2").append('<tr>' +
            '<td></td><td></td><td></td><td></td>' +
            '<td>' + "$" + " " + sumaindividual + '</td>' +
            '<td>' + "$" + " " + sumaempaquetado + '</td>' +
            '<td></td>' +
            '</tr>');
    });
});


function acumuladoServicio() {
    var tiposervicioSeleccionado = $('#TipoServicio').val();
    var servicioSeleccionado = $('#Servicio').val();

    var valormensual;
    var dctomensual;

    for (var i = 0; i < ListaServicios.length; i++) {

        if (ListaServicios[i].tiposervicio == tiposervicioSeleccionado && ListaServicios[i].servicio == servicioSeleccionado) {

            valormensual = ListaServicios[i].mensualidad;
            dctomensual = ListaServicios[i].Descuento;

        }
    }


    if (ListaAcumuladaSer == null) {
        ListaAcumuladaSer = [{
            valormensual: valormensual,
            dctomensual: dctomensual,
            servicio: servicioSeleccionado
        }];
    } else {
        var ExiteEnLista = false;
        for (var i = 0; i < ListaAcumuladaSer.length; i++) {
            if (ListaAcumuladaSer[i].valormensual == valormensual && ListaServicios[i].Descuento == dctomensual && ListaServicios[i].servicio == servicioSeleccionado) {
                ExiteEnLista = true;
            }
        }
        if (ExiteEnLista == false) {
            ListaAcumuladaSer.push({
                valormensual: valormensual,
                dctomensual: dctomensual,
                servicio: servicioSeleccionado

            });
        }
    }



    $("#TablaServicio").empty();
    $("#TablaResultadoServicio").empty();

    sumaservicio = 0;
    sumadcto = 0;



    for (var i = 0; i < ListaAcumuladaSer.length; i++) {

        numerodescuento = parseInt((100 - (ListaAcumuladaSer[i].dctomensual * 100 / ListaAcumuladaSer[i].valormensual)));

        $("#TablaServicio").append('<tr id="filaservicio' + (i + 1) + '">' +
            '<td></td>' + '<td></td>' + '<td></td>' +
            '<td>' + ListaAcumuladaSer[i].servicio + '</td>' +
            '<td>' + '$ ' + ListaAcumuladaSer[i].valormensual + '</td>' +
            '<td>' + '$ ' + ListaAcumuladaSer[i].dctomensual + '</td>' +
            '<td>' + numerodescuento + '%' + '</td>' +
            '<td>' +
            '<label>' +
            '<input name="borrar2" type="radio" value="' + (i + 1) + '" id="' + (i + 1) + '"/>' +
            '<span>X</span>' +
            '</label>' +
            '</td>' +
            '</tr>');

        sumaservicio += ListaAcumuladaSer[i].valormensual;
        sumadcto += ListaAcumuladaSer[i].dctomensual;

        total = sumaservicio + sumaindividual;
        totaldescuento = sumadcto + sumaempaquetado;


        console.log(sumaservicio);
        console.log(sumadcto);
        console.log(total);
        console.log(totaldescuento);


        $("#TablaResultadoServicio").empty();
        $("#Tablatotal").empty();

        $("#TablaResultadoServicio").append('<tr>' +
            '<td></td>' + '<td></td>' + '<td></td>' +
            '<td>' + 'Total Servicios:' + '</td>' +
            '<td>' + '$ ' + sumaservicio + '</td>' +
            '<td>' + '$ ' + sumadcto + '</td>' +
            '<td></td>' +
            '</tr>');

    }

    $('input[name=borrar2]').click(function() {

        var porNombre = document.getElementsByName("borrar2");
        // Recorremos todos los valores del radio button para encontrar el
        // seleccionado
        for (var i = 0; i < porNombre.length; i++) {
            if (porNombre[i].checked) {

                sumaservicio -= ListaAcumuladaSer[i].valormensual;
                sumadcto -= ListaAcumuladaSer[i].Descuento;

                ListaAcumuladaSer.splice(i, 1);

                $("#filaservicio" + (i + 1)).remove();

                $("#TablaResultadoServicio").empty().html();


                $("#TablaResultadoServicio").append('<tr>' +
                    '<td></td>' + '<td></td>' + '<td></td>' +
                    '<td>' + '<strong>' + 'Total Servicios:' + '</strong>' + '</td>' +
                    '<td>' + '$ ' + sumaservicio + '</td>' +
                    '<td>' + '$ ' + sumadcto + '</td>' +
                    '<td></td>' +
                    '</tr>');

            }
        }
    });
}