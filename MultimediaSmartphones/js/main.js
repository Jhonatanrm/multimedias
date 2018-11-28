var ListaPlanes = null;
var ListaServicios = null;
var resultado;
var resultadoplan;
var celulares = {};
var canal;
var division;

(function($) {

    $(document).ready(function() {
        $('select').formSelect();
        $('.modal').modal();
    });

    $('select').on('contentChanged', function() {
        // re-initialize (update)
        $('select').formSelect();
    });




    if (screen.width < 900) {
        $('select').addClass(' browser-default');
    }

    $("#plan").change(function() {
        LlenarListaCanal();
    });

    $("#canal").change(function() {
        LlenarListaMarca();
    });

    $("#marca").change(function() {
        canal = $("#canal").val()
        LlenarListaCelulares();
        LlenarListaCobertura(canal);

    });

    $('#autocomplete-input').change(function() {
        LlenarListaCelularFinal();
    });


    ObtenerPlanes();
    ObtenerServicio()


    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function(obj) {
            ListaPlanes = obj;
            LlenarListaPlan();
        });
    }

    function ObtenerServicio() {
        $.getJSON(ObtenerArchivoServicio(), function(obj) {
            ListaServicios = obj;
            LlenarListaServicio();
        });
    }



    function LlenarListaPlan() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];


            for (var i = 0; i < ListaPlanes.length; i++) {
                for (let index = 0; index < tipoplan.length; index++) {
                    if (ListaPlanes[i][tipoplan[index]] == 1 && arrItems.indexOf(tipoplan[index]) == -1) {
                        arrItems[Contador] = tipoplan[index];
                        Contador += 1;
                    }
                }
            }

            var $selectDropdown = $("#plan")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Plan")
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

    function LlenarListaCanal() {
        if (ListaPlanes != null) {
            var arrItems = [];
            var Contador = 0;
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];
            var canales = ['Tiendas', 'Distribuidores', 'Retail', 'FVD', 'Contact Center'];


            for (var i = 0; i < ListaPlanes.length; i++) {

                for (let popo = 0; popo < tipoplan.length; popo++) {
                    if (ListaPlanes[i][tipoplan[popo]] == 1) {
                        for (let index = 0; index < canales.length; index++) {
                            if (ListaPlanes[i][canales[index]] == 1 && arrItems.indexOf(canales[index]) == -1) {
                                arrItems[Contador] = canales[index];
                                Contador += 1;
                            }
                        }
                    }
                }
            }

            var $selectDropdown = $("#canal")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Canal")
            );

            arrItems.sort();

            for (var i = 0; i < arrItems.length; i++) {
                $selectDropdown.append(
                    $("<option></option>").attr("value", arrItems[i]).text(arrItems[i]));
            }

            $selectDropdown.trigger('contentChanged');
        }
    }

    function LlenarListaMarca() {
        if (ListaPlanes != null) {
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];
            var canales = ['Tiendas', 'Distribuidores', 'Retail', 'FVD', 'Contact Center'];
            $('#autocomplete-input').empty().html(' ');
            var arrItems = [];
            var Contador = 0;

            for (var i = 0; i < ListaPlanes.length; i++) {

                for (let popo = 0; popo < tipoplan.length; popo++) {
                    if (ListaPlanes[i][tipoplan[popo]] == 1) {
                        for (let index = 0; index < canales.length; index++) {
                            if (ListaPlanes[i][canales[index]] == 1 && ListaPlanes[i][tipoplan[popo]] == 1 && arrItems.indexOf(ListaPlanes[i].Marca) == -1) {

                                arrItems[Contador] = ListaPlanes[i].Marca;
                                Contador += 1;
                            }
                        }
                    }
                }
            }

            var $selectDropdown = $("#marca")
                .empty()
                .html(' ');

            $selectDropdown.append(
                $("<option></option>")
                .attr("value", "")
                .text("Selecciona Marca")
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
    /* Lista Destacados */

    function LlenarListaServicio() {
        if (ListaServicios != null) {
            var arrItems = [];
            var Contador = 0;

            $("#content-slider").lightSlider({
                loop: true,
                keyPress: true
            });
            $('#image-gallery').lightSlider({
                gallery: true,
                item: 5,
                thumbItem: 5,
                slideMargin: 0,
                speed: 500,
                auto: true,
                loop: true,
                onSliderLoad: function() {
                    $('#image-gallery').removeClass('cS-hiden');
                }
            });

            for (var i = 0; i < ListaServicios.length; i++) {
                if (ValidarItemArray(arrItems, ListaServicios[i].Referencia) == false) {
                    arrItems[Contador] = ListaServicios[i].Referencia;

                    itm_cel = "itm_cel" + Contador;
                    modal = "modal" + Contador;



                    $("#content-slider").append('<li id="' + itm_cel + '" class="item_cel" style="border: none">' + '<h3>' + ListaServicios[i].Marca + ' ' + arrItems[Contador] + '</h3>' + '</li>');
                    $("#" + itm_cel).append("<img src='img/celulares/" + ListaServicios[i].Imagen + "'>");
                    $("#" + itm_cel).append('<h4>' + '$ ' + ListaServicios[i].PrecioLibre + '</h4>');

                    if (ListaServicios[i].APLICAIVADEL19 == "SI") {
                        $("#" + itm_cel).append('<span>' + 'Aplica IVA 19%' + '</span>');
                    } else {
                        $("#" + itm_cel).append('<span>' + 'No tiene IVA' + '</span>');
                    }



                    Contador += 1;
                }
            }

        }
    }


    /* Lista celulares */

    function LlenarListaCobertura(canal) {
        if (ListaPlanes != null) {
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];
            var canales = ['Tiendas', 'Distribuidores', 'Retail', 'FVD', 'Contact Center'];
            var MarcaSeleccionada = $("#marca").val();
            var arrItems = [];
            var Contador = 0;
            var Pagina = 1;




            $("#celulares").empty().html(' ');
            $("#destacados").empty().html(' ');
            $("#contenedormodal").empty().html(' ');
            $(".pagination").empty().html(' ');

            $("#paginas").empty().html(' ');



            contentpagina = '<div id="pagtab' + Pagina + '"></div>';

            $("#paginas").append(contentpagina);
            $(".pagination").append('<li class="active page" id="tab' + Pagina + '"><a href="#!">1</a></li>');

            var tabactive = "tab1";



            for (var i = 0; i < ListaPlanes.length; i++) {

                for (let popo = 0; popo < tipoplan.length; popo++) {
                    if (ListaPlanes[i][tipoplan[popo]] == 1) {
                        for (let index = 0; index < canales.length; index++) {
                            if (MarcaSeleccionada == ListaPlanes[i].Marca && ListaPlanes[i][canales[index]] == 1 && arrItems.indexOf(ListaPlanes[i].Referencia) == -1) {

                                arrItems[Contador] = ListaPlanes[i].Referencia;

                                $('.modal').modal();

                                itm_cel = "itm_cel" + Contador;
                                modal = "cmodal" + Contador;

                                if ((Contador % 10) == 0 && Contador > 0) {

                                    $("#pagtab" + Pagina).hide();
                                    Pagina++;
                                    contentpagina = '<div id="pagtab' + Pagina + '"></div>';
                                    $("#paginas").append(contentpagina);
                                    $(".pagination").append('<li class="waves-effect page" id="tab' + Pagina + '"><a href="#!">' + Pagina + '</a></li>');
                                }

                                if (canal == 'Tiendas' || canal == 'Contact Center') {

                                    $("#pagtab" + Pagina).append('<li id="' + itm_cel + '" class="item_cel" style="height: 440px">' + '<h3>' + ListaPlanes[i].Marca + ' ' + arrItems[Contador] + '</h3>' + '</li>');
                                    $("#" + itm_cel).append("<img src='img/celulares/" + ListaPlanes[i].Imagen + "'>");
                                    $("#" + itm_cel).append('<h4>' + '$ ' + ListaPlanes[i].PrecioLibre + '</h4>');

                                    if (ListaPlanes[i].APLICAIVADEL19 == "SI") {
                                        $("#" + itm_cel).append('<span>' + 'Aplica IVA 19%' + '</span>');
                                    } else {
                                        $("#" + itm_cel).append('<span>' + 'No tiene IVA' + '</span>');
                                    }

                                    $("#" + itm_cel).append('<a class="waves-effect waves-light btn modal-trigger" href="#modal1" name="btn_modal" id="' + i + '">Ver más</a>');

                                } else {
                                    $(".pagination").empty().html(' ');
                                    if (ListaPlanes[i].tipo == 'Venta') {
                                        $("#pagtab" + Pagina).append('<li id="' + itm_cel + '" class="item_cel" style="height: 440px">' + '<h3>' + ListaPlanes[i].Marca + ' ' + arrItems[Contador] + '</h3>' + '</li>');
                                        $("#" + itm_cel).append("<img src='img/celulares/" + ListaPlanes[i].Imagen + "'>");
                                        $("#" + itm_cel).append('<h4>' + '$ ' + ListaPlanes[i].PrecioLibre + '</h4>');

                                        if (ListaPlanes[i].APLICAIVADEL19 == "SI") {
                                            $("#" + itm_cel).append('<span>' + 'Aplica IVA 19%' + '</span>');
                                        } else {
                                            $("#" + itm_cel).append('<span>' + 'No tiene IVA' + '</span>');
                                        }

                                        $("#" + itm_cel).append('<a class="waves-effect waves-light btn modal-trigger" href="#modal1"  id="' + i + '">Ver más</a>');
                                    }
                                }



                                division = '<div id="' + modal + '"></div>';
                                Contador += 1;



                            }
                        }
                    }
                }

            }

            $("#pagtab" + Pagina).hide();
            $("#pagtab1").show();

            $(".page").click(function() {

                $("#pag" + tabactive).hide();
                $("#" + this.id).removeClass("waves-effect").addClass("active");

                $("#" + tabactive).removeClass("active").addClass("waves-effect");

                tabactive = this.id;

                $("#pag" + tabactive).show();

            });

            $(".btn").click(function() {
                i = this.id;
                $("#modal1").empty().html(' ');
                console.log(i);
                $("#modal1").append('<div class="row" style="border-bottom: solid 1px #00377b; padding-bottom: 40px;">' +
                    '<div class="col m6" style="text-align: center; margin-top: 50px">' + '<img src="' + 'img/celulares/' + ListaPlanes[i].Imagen + '">' + '</div>' +
                    '<div class="col m6" style="margin-top: 50px">' +
                    '<h2>' + ListaPlanes[i].Marca + ' ' + ListaPlanes[i].Referencia + '</h2>' +
                    '<h4>' + 'Marca: ' + ListaPlanes[i].Marca + '</h4>' +
                    '<h4>' + 'PLU: ' + ListaPlanes[i].PLU + '</h4>' +
                    '<div class="line" style="margin-top: 10px;margin-bottom: -30px;"></div>' +
                    '<h3 style="margin-top: 49px;margin-bottom: 0px;font-size: 33px;">' + '$ ' + ListaPlanes[i].PrecioLibre + '</h3>' +
                    '<span>' + 'Aplica Iva del 19%' + '</span>' +
                    '<h3 class="title_int" style="margin-top:50px;font-size: 17px !important;">Descripción:</h3>' +
                    '<p>' + ListaPlanes[i].Descripcion + '</p>' +
                    '<div class="row" style="margin-bottom:0px">' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">sd_storage</i>Memoria Interna:</h3>' +
                    '<p>' + ListaPlanes[i].Capacidad + 'GB' + '</p>' +
                    '</div>' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">view_week</i>Colores:</h3>' +
                    '<p>' + ListaPlanes[i].Colores + '</p>' +
                    '</div>' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">memory</i>RAM:</h3>' +
                    '<p>' + ListaPlanes[i].RAM + 'GB' + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">add_to_home_screen</i>Pantalla:</h3>' +
                    '<p>' + ListaPlanes[i].pantalla + '</p>' +
                    '</div>' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">battery_alert</i>Bateria:</h3>' +
                    '<p>' + ListaPlanes[i].bateria + '</p>' +
                    '</div>' +
                    '<div class="col m4">' +
                    '<h3 class="title_int"><i class="material-icons">add_a_photo</i>Camara:</h3>' +
                    '<p>' + ListaPlanes[i].Camara + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="line"></div>' +
                    '<p class="precios">' + 'Precio Promoción: $ ' + ListaPlanes[i].PreciopromoTigo + '</p>' +
                    '<p class="precios">' + 'Precio Financiación: $ ' + ListaPlanes[i].PrecioFinanciacionTigo + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="border-bottom: solid 1px #00377b; padding-bottom: 40px;text-align: center">' +
                    '<h3 class="title_int" style="margin:30px auto; text-align: center">Precios</h3>' +
                    '<div class="col m4">' + 'Pospago: ' + ListaPlanes[i].PrecioPospago + '</div>' +
                    '<div class="col m4">' + 'Prepago: ' + ListaPlanes[i].PrecioPrepago + '</div>' +
                    '<div class="col m4">' + 'Libre: ' + ListaPlanes[i].PrecioLibre + '</div>');
            });
        }
    }



    function LlenarListaCelularFinal() {
        if (ListaPlanes != null) {
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];
            var canales = ['Tiendas', 'Distribuidores', 'Retail', 'FVD', 'Contact Center'];
            var MarcaSeleccionada = $("#marca").val();
            var ReferenciaSeleccionado = $('#autocomplete-input').val();
            var arrItems = [];
            var Contador = 0;




            $("#paginas").empty().html(' ');
            $("#destacados").empty().html(' ');
            $("#contenedormodal").empty().html(' ');
            $(".pagination").empty().html(' ');


            for (var i = 0; i < ListaPlanes.length; i++) {

                for (let popo = 0; popo < tipoplan.length; popo++) {
                    if (ListaPlanes[i][tipoplan[popo]] == 1) {
                        for (let index = 0; index < canales.length; index++) {
                            if (ReferenciaSeleccionado == ListaPlanes[i].Referencia && MarcaSeleccionada == ListaPlanes[i].Marca && ListaPlanes[i][canales[index]] == 1 && arrItems.indexOf(ListaPlanes[i].Referencia) == -1) {

                                arrItems[Contador] = ListaPlanes[i].Referencia;

                                $("#paginas").append('<div id="contenedormodal">' +
                                    '<div class="row" style="border-bottom: solid 1px #00377b; padding-bottom: 40px;">' +
                                    '<div class="col m6">' + '<img src="' + 'img/celulares/' + ListaPlanes[i].Imagen + '">' + '</div>' +
                                    '<div class="col m6">' +
                                    '<h2>' + ListaPlanes[i].Marca + ' ' + arrItems[Contador] + '</h2>' +
                                    '<h4 style="margin-top: 20px">' + 'Marca: ' + ListaPlanes[i].Marca + '</h4>' +
                                    '<h4 style="margin-top: 20px">' + 'PLU: ' + ListaPlanes[i].PLU + '</h4>' +
                                    '<div class="line" style="margin-top: 40px;margin-bottom: -30px;"></div>' +
                                    '<h3 style="margin-top: 60px">' + '$ ' + ListaPlanes[i].PrecioLibre + '</h3>' +
                                    '<span>' + 'Aplica Iva del 19%' + '</span>' +
                                    '<h3 class="title_int" style="margin-top:50px;font-size: 17px !important;">Descripción:</h3>' +
                                    '<p>' + ListaPlanes[i].Descripcion + '</p>' +
                                    '<div class="row" style="margin-bottom:0px">' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">sd_storage</i>Memoria Interna:</h3>' +
                                    '<p>' + ListaPlanes[i].Capacidad + 'GB' + '</p>' +
                                    '</div>' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">view_week</i>Colores:</h3>' +
                                    '<p>' + ListaPlanes[i].Colores + '</p>' +
                                    '</div>' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">memory</i>RAM:</h3>' +
                                    '<p>' + ListaPlanes[i].RAM + 'GB' + '</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="row">' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">add_to_home_screen</i>Pantalla:</h3>' +
                                    '<p>' + ListaPlanes[i].pantalla + '</p>' +
                                    '</div>' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">battery_alert</i>Bateria:</h3>' +
                                    '<p>' + ListaPlanes[i].bateria + '</p>' +
                                    '</div>' +
                                    '<div class="col m4">' +
                                    '<h3 class="title_int"><i class="material-icons">add_a_photo</i>Camara:</h3>' +
                                    '<p>' + ListaPlanes[i].Camara + '</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="line"></div>' +
                                    '<p class="precios">' + 'Precio Promoción: $ ' + ListaPlanes[i].PreciopromoTigo + '</p>' +
                                    '<p class="precios">' + 'Precio Financiación: $ ' + ListaPlanes[i].PrecioFinanciacionTigo + '</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="row" style="border-bottom: solid 1px #00377b; padding-bottom: 40px;text-align: center">' +
                                    '<h3 class="title_int" style="margin:30px auto; text-align: center">Precios</h3>' +
                                    '<div class="col m4">' + 'Pospago: ' + ListaPlanes[i].PrecioPospago + '</div>' +
                                    '<div class="col m4">' + 'Prepago: ' + ListaPlanes[i].PrecioPrepago + '</div>' +
                                    '<div class="col m4">' + 'Libre: ' + ListaPlanes[i].PrecioLibre + '</div>' +
                                    '</div>');


                                Contador += 1;

                            }
                        }
                    }
                }
            }
        }
    }

    function LlenarListaCelulares() {
        if (ListaPlanes != null) {
            var tipoplan = ['Libre', 'Pospago', 'Prepago'];
            var canales = ['Tiendas', 'Distribuidores', 'Retail', 'FVD', 'Contact Center'];
            var MarcaSeleccionada = $("#marca").val();
            var arrItems = [];
            var Contador = 200;

            $('#autocomplete-input').empty().html(' ');




            $("#celulares").empty().html(' ');
            $("#destacados").empty().html(' ');

            $('#autocomplete-input').empty().html(' ');


            for (var i = 0; i < ListaPlanes.length; i++) {
                for (let popo = 0; popo < tipoplan.length; popo++) {
                    if (ListaPlanes[i][tipoplan[popo]] == 1) {
                        for (let index = 0; index < canales.length; index++) {
                            if (MarcaSeleccionada == ListaPlanes[i].Marca && ListaPlanes[i][canales[index]] == 1 && arrItems.indexOf(ListaPlanes[i].Referencia) == -1) {
                                arrItems[Contador] = ListaPlanes[i].Referencia;
                                celulares[arrItems[Contador]] = null;
                                Contador += 1;
                            }
                        }
                    }

                }
            }

            var NodoSeleccionado = $('#autocomplete-input').empty().html(' ');

            console.log(celulares);

            for (var i = 0; i < arrItems.length; i++) {

                $('input.autocomplete').autocomplete({
                    data: celulares
                });

            }
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
        var RutaObtenerArchivo2 = "destacados.json";
        return RutaObtenerArchivo2;
    }
    //************************************************************
})(jQuery);