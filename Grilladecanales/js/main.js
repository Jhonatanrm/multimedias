var ListaPlanes = null;
var ListaCiudades = null;
var ListaPremium = null;
var grilla = null;
var resultado;
var resultadoplan;
var celulares = {};

$(document).ready(function(){
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('.tabs').tabs();  
    $('.tooltipped').tooltip();   
});

$('select').on('contentChanged', function() {
    // re-initialize (update)
    $('select').formSelect();
});

(function($) {
    

    $('#autocomplete-input').change(function() {
        grilla = [];
        $("#Tecnologia").empty().html('');
        $("#Plan").empty().html('');
        LlenarListaTecnologia();
    });

    

    function ObtenerPlanes() {
        $.getJSON(ObtenerArchivo(), function(obj) {
            ListaPlanes = obj;
        });
    }

    function ObtenerCiudad() {
        $.getJSON(ObtenerArchivoCiudades(), function(obj) {
            ListaCiudades = obj;
            LlenarListaCiudad();
        });
    }

    function ObtenerPremium() {
        $.getJSON(ObtenerArchivoPremium(), function(obj) {
            ListaPremium = obj;
        });
    }

    ObtenerPlanes();
    ObtenerCiudad();
    ObtenerPremium();

    function LlenarListaCiudad() {
        if (ListaCiudades != null) {

            var arrItems = [];
            var Contador = 0;

            $('#autocomplete-input').empty().html(' ');


            for (var i = 0; i < ListaCiudades.length; i++) {
                if (ValidarItemArray(arrItems, ListaCiudades[i].Ciudades) == false) {
                    arrItems[Contador] = ListaCiudades[i].Ciudades;
                    celulares[arrItems[Contador]] = null;
                    Contador += 1;

                }
            }

            var NodoSeleccionado = $('#autocomplete-input').empty().html(' ');

            $('input.autocomplete').autocomplete({
                data: celulares
            });

        }
    }

    function LlenarListaTecnologia() {
        if (ListaCiudades != null && ListaPlanes != null) {
            var CiudadSeleccionado = $('#autocomplete-input').val();
            var PlanSeleccionado = resultado;
            var arrItems = [];
            var Contador = 0;
            //var Planes = ['Ideal','Ideal Plus','ONE ELITE','ONE PLUS','ONE PLUS DVR','Tigo TV Satelital Básico','Tigo TV Satelital Avanzado','Basico HD','Premium HD'];
            var Tecnologias = ['HFC','GPON','IPTVRedCo','Satelital'];
            var erTdemp = $("#Tecnologia").empty().html('');
            
            $("#Plan").empty().html('');

            var contadorGrilla = 0;

            for (var i = 0; i < ListaCiudades.length; i++) {
                for (var j = 0; j < ListaPlanes.length; j++) {
                    if (CiudadSeleccionado == ListaCiudades[i].Ciudades && ListaPlanes[j].grilla == ListaCiudades[i].Grupo) {
                        if (grilla.indexOf(ListaCiudades[i].Grupo) == -1) {
                            grilla[contadorGrilla] = ListaCiudades[i].Grupo;
                            contadorGrilla += 1;
                        }
                        for (let index2 = 0; index2 < Tecnologias.length; index2++) {
                            if (ListaPlanes[j][Tecnologias[index2]] == 1 && arrItems.indexOf(Tecnologias[index2]) == -1) {
                                arrItems[Contador] = Tecnologias[index2];
                                Contador += 1;
                            }  
                        }
                    }      
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
                erInput.setAttribute("class", "Tecnologia");
                erInput.setAttribute("name", 'group2');
                erInput.setAttribute("value", arrItems[i]);

                erTdemp.append(erp);
                erlabel.appendChild(erInput);
                erp.appendChild(erlabel);
                erlabel.appendChild(erSapn);


            }

            $('input[name=group2]').click(function() {


                var porNombretecno = document.getElementsByName("group2");
                // Recorremos todos los valores del radio button para encontrar el
                // seleccionado
                for (var i = 0; i < porNombretecno.length; i++) {
                    if (porNombretecno[i].checked) {
                        resultadotecno = porNombretecno[i].value;
                        LlenarListaPlan();
                    }
                }
            });

        }
    }

    function LlenarListaPlan() {

        if (ListaCiudades != null && ListaPlanes != null) {
            var CiudadSeleccionado = $('#autocomplete-input').val();
            var TecnologiaSeleccionado = resultadotecno;
            var arrItems = [];
            var Contador = 0;
            var Planes = ['Esencial','EsencialPlus','Ideal','IdealPlus','ONEELITE','ONEPLUS','ONEPLUSDVR','TigoTVSatelitalBasico','TigoTVSatelitalAvanzado'];
            erTdemp = $("#Plan").empty().html('');



            for (var i = 0; i < ListaCiudades.length; i++) {
                for (var j = 0; j < ListaPlanes.length; j++) {
                    if (CiudadSeleccionado == ListaCiudades[i].Ciudades && ListaPlanes[j].grilla == ListaCiudades[i].Grupo && ListaPlanes[j][TecnologiaSeleccionado] == 1) {
                        for (let index = 0; index < Planes.length; index++) {
                            if (ListaPlanes[j][Planes[index]] == 1 && arrItems.indexOf(Planes[index]) == -1) {
                                arrItems[Contador] = Planes[index];
                                Contador += 1;
                            }
                        }
                    }      
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

                erTdemp.append(erp);
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
                        resultado = porNombre[i].value;
                        LlenarListaCanales();
                        LlenarListaCanalesPremium();
                    }
                }

            });

        }
    }

    function LlenarListaCanales() {
        if (ListaCiudades != null && ListaPlanes != null) {
            var CiudadSeleccionado = $('#autocomplete-input').val();
            var PlanSeleccionado = resultado;
            var TecnologiaSeleccionado = resultadotecno;
            var Canalesporgenero = []; // Suma los canales correspondientes al genero en la posicion del generom en arrItems[]
            var arrItems = [];
            var tipoHDXgenero = []; // Suma los canales HD correspondientes al genero en la posicion del genero en arrItems[]
            var tipoSDXgenero = []; // Suma los canales SD correspondientes al genero en la posicion del genero en arrItems[]
            var CategoriaCanalesHD = [];
            var CategoriaCanalesSD = [];
            var ImagenCanalHD = [];
            var ImagenCanalSD = [];
            var Contador = 0;
            var Planes = ['ONE','Esencial','EsencialPlus','Ideal','IdealPlus','ONEELITE','ONEPLUS','ONEPLUSDVR','TigoTVSatelitalBasico','TigoTVSatelitalAvanzado'];
            var Tecnologias = ['HFC','GPON','IPTVRedCo','Satelital'];
            var DivNunCanales;
            var DivCanales;

            $("#canales").empty().html('');
            $("#totalizado").empty().html('');

            for (let index = 0; index < ListaPlanes.length; index++) {
                    if (ListaPlanes[index][PlanSeleccionado] == 1 && ListaPlanes[index][TecnologiaSeleccionado] == 1 && grilla.indexOf(ListaPlanes[index].grilla) != -1) {

                        var iGenero = arrItems.indexOf(ListaPlanes[index].Genero);
                        
                        if (iGenero == -1) {

                            arrItems[Contador] = ListaPlanes[index].Genero;
                            Canalesporgenero[Contador] = 1;

                            if (ListaPlanes[index].Tipo == 'HD') {
                                tipoHDXgenero[Contador] = 1;
                                tipoSDXgenero[Contador] = 0;
                                CategoriaCanalesSD[Contador] = '';
                                CategoriaCanalesHD[Contador] = ListaPlanes[index].Canal + '<br>' + 'Frecuencia: ' + ListaPlanes[index].Frecuencia + '<br>' + 'Programador: ' + ListaPlanes[index].Programador + '<br>' + 'Tipo: ' + ListaPlanes[index].Tipo + ",";
                                if (ListaPlanes[index].Imagen == 'Series.png') {
                                    ImagenCanalHD[Contador] = '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + '<br>' + '<span>' + ListaPlanes[index].Canal + '</span>' + ",";
                                }else{
                                    ImagenCanalHD[Contador] = '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + ",";
                                }
                                ImagenCanalSD[Contador] ='';
                            } else {
                                tipoSDXgenero[Contador] = 1;
                                tipoHDXgenero[Contador] = 0;
                                CategoriaCanalesHD[Contador] = '';
                                CategoriaCanalesSD[Contador] = ListaPlanes[index].Canal + '<br>' + 'Frecuencia: ' + ListaPlanes[index].Frecuencia + '<br>' + 'Programador: ' + ListaPlanes[index].Programador + '<br>' + 'Tipo: ' + ListaPlanes[index].Tipo + ",";
                                if (ListaPlanes[index].Imagen == 'Series.png') {
                                    ImagenCanalSD[Contador] = '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + '<br>' + '<span>' + ListaPlanes[index].Canal + '</span>' + ",";
                                }else{
                                    ImagenCanalSD[Contador] = '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + ",";
                                }
                                
                                ImagenCanalHD[Contador] = '';
                            }
                            Contador += 1;
                        } else {
                            Canalesporgenero[iGenero] += 1;
                            if (ListaPlanes[index].Tipo == 'HD') {
                                tipoHDXgenero[iGenero] += 1;
                                if (ListaPlanes[index].Imagen == 'Series.png') {
                                    ImagenCanalHD[iGenero] = ImagenCanalHD[iGenero] + '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + '<br>' + '<span>' + ListaPlanes[index].Canal + '</span>' + ",";
                                }else{
                                    ImagenCanalHD[iGenero] = ImagenCanalHD[iGenero] + '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + ",";
                                }
                                
                                CategoriaCanalesHD[iGenero] = CategoriaCanalesHD[iGenero] + ListaPlanes[index].Canal + '<br>' + 'Frecuencia: ' + ListaPlanes[index].Frecuencia + '<br>' + 'Programador: ' + ListaPlanes[index].Programador + '<br>' + 'Tipo: ' + ListaPlanes[index].Tipo + ",";
                            } else {
                                tipoSDXgenero[iGenero] += 1;
                                CategoriaCanalesSD[iGenero] = CategoriaCanalesSD[iGenero] + ListaPlanes[index].Canal + '<br>' + 'Frecuencia: ' + ListaPlanes[index].Frecuencia + '<br>' + 'Programador: ' + ListaPlanes[index].Programador + '<br>' + 'Tipo: ' + ListaPlanes[index].Tipo + ",";
                                if (ListaPlanes[index].Imagen == 'Series.png') {
                                    ImagenCanalSD[iGenero] = ImagenCanalSD[iGenero] + '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + '<br>' + '<span>' + ListaPlanes[index].Canal + '</span>' + ",";
                                }else{
                                    ImagenCanalSD[iGenero] = ImagenCanalSD[iGenero] + '<img src="img/logos/' + ListaPlanes[index].Imagen + '">' + ",";
                                }
                                
                            }
                        }
                    }
                    

            }

            
            var totalCanalesHD = 0;
            var totalCanalesSD = 0;
            for (var i = 0; i < arrItems.length; i++) {
                var arrImgSD = ImagenCanalSD[i].split(",");
                var arrImgHD = ImagenCanalHD[i].split(",");
                var arrCanalSD = CategoriaCanalesSD[i].split(",");
                var arrCanalHD = CategoriaCanalesHD[i].split(",");

                $("#canales").append('<li>'+ 
                '<div class="collapsible-header">' + '<table><tbody>' + '<tr>' + '<td>' + '<img src="img/' + arrItems[i] + '.png" >' + '</td>' + '<td>' + '<i class="material-icons">touch_app</i> ' +arrItems[i] + '</td>' + '<td>' + tipoSDXgenero[i] + '</td>' + '<td>' + tipoHDXgenero[i] + '</td>' + '<td>' + Canalesporgenero[i] + '</td>' + '</tr>' + '</table></tbody>' + '</div>' + 
                '<div class="collapsible-body">' +
                    '<div class="row">' + 
                        '<div class="col s12 m6 l6">' + 
                            '<div class="row catSD" id="' + arrItems[i] + 'SD">' + '<h2>Canales SD</h2>' +
                            '</div>' + 
                        '</div>' + 
                        '<div class="col s12 m6 l6">' + 
                            '<div class="row catHD" id="' + arrItems[i] + 'HD">' + '<h2>Canales HD</h2>' +
                            '</div>' +
                        '</div>' + 
                    '</div>' +
                '</div>' + 
                '</li>');
                for (let index = 0; index < arrImgSD.length; index++) {
                    $("#" + arrItems[i] + "SD").append( '<div class="SD">' + ' <a class="tooltipped" data-position="bottom" data-tooltip="' + arrCanalSD[index] + '">' + '<p>' + arrImgSD[index] + '</p>' + '</a>' + '</div>');
                    
                }

                for (let index = 0; index < arrImgHD.length; index++) {
                    $("#" + arrItems[i] + "HD").append( '<div class="HD">' + ' <a class="tooltipped" data-position="bottom" data-tooltip="' + arrCanalHD[index] + '">' + '<p>' + arrImgHD[index] + '</p>' + '</a>' + '</div>');
                    
                }
                
                
                $('.tooltipped').tooltip();
                totalCanalesHD += tipoHDXgenero[i];
                totalCanalesSD += tipoSDXgenero[i];
            }

            $("#canales").append('<li>'+ 
                '<div class="collapsible-header">' + 
                    '<table><tbody>' + 
                        '<tr>' + 
                            '<td>' + ' ' + '</td>' + 
                            '<td><strong>TOTAL CANALES</strong></td>' + 
                            '<td><strong>' + totalCanalesSD + '</strong></td>' + 
                            '<td><strong>' + totalCanalesHD + '</strong></td>' + 
                            '<td><strong>' + (totalCanalesSD + totalCanalesHD) + '</strong></td>' + 
                        '</tr>' + 
                    '</table></tbody>' + 
                '</div>' + 
            '</li>');

            $("#totalizado").append('<th>'+ 
                            '<td> <strong>TOTAL CANALES</strong></td>' +
                            '<td><strong>' + totalCanalesSD + '</strong></td>' + 
                            '<td><strong>' + totalCanalesHD + '</strong></td>' + 
                            '<td><strong>' + (totalCanalesSD + totalCanalesHD) + '</strong></td>' + 

            '</th>');



        }
    }

    function LlenarListaCanalesPremium (){

        if (ListaCiudades != null && ListaPlanes != null && ListaPremium != null) {
            var PlanSeleccionado = resultado;
            var Paquetes = ['BasicoHD','PremiumHD','HDEdicionEspecial','PPV-VOD','LatinPack','MiniPack','FOXPremium','HBOMAX','HBOPack','HotPack','Venus','FSN','PPV'];
            var Planes = ['ONE','Esencial','EsencialPlus','Ideal','IdealPlus','ONEELITE','ONEPLUS','ONEPLUSDVR','TigoTVSatelitalBásico','TigoTVSatelitalAvanzado'];
            var arrItems = [];
            var Contador = 0;
            var PremiumPaquete = []; // Suma los canales correspondientes al genero en la posicion del generom en arrItems[]
            var PremiumHDXPaquete = []; // Suma los canales HD correspondientes al genero en la posicion del genero en arrItems[]
            var PremiumSDXPaquete = []; // Suma los canales SD correspondientes al genero en la posicion del genero en arrItems[]
            var PremiumPaqueteCanalesHD = [];
            var PremiumPaqueteCanalesSD = [];
            var PremiumImagenCanalHD = [];
            var PremiumImagenCanalSD = [];

            $("#premium").empty().html('');
            $("#totalizadopremium").empty().html('');


                    for (let k = 0; k < ListaPremium.length; k++) {
                        if (ListaPremium[k][PlanSeleccionado] == 1) {

                            for (let index = 0; index < Paquetes.length; index++) {
                                if(ListaPremium[k][Paquetes[index]] == 1){
                                    if (PremiumPaquete.indexOf(Paquetes[index]) == -1) {
                                        PremiumPaquete[Contador] = Paquetes[index];
                                        PremiumHDXPaquete[Contador] = 0;
                                        PremiumSDXPaquete[Contador] = 0;
                                        PremiumPaqueteCanalesSD[Contador] = '';
                                        PremiumPaqueteCanalesHD[Contador] = '';
                                        PremiumImagenCanalHD[Contador] = '';
                                        PremiumImagenCanalSD[Contador] ='';
                                        Contador++;   
                                    }
                                    var iPaquete = PremiumPaquete.indexOf(Paquetes[index]);

                                    console.log(ListaPremium[k].Tipo);
                                    if (ListaPremium[k].Tipo == 'Premium HD') {
                                        
                                        PremiumHDXPaquete[iPaquete] += 1;
                                        PremiumPaqueteCanalesHD[iPaquete] = PremiumPaqueteCanalesHD[iPaquete]  + ListaPremium[k].Canal + '<br>' + 'Frecuencia: ' + ListaPremium[k].Frecuencia + '<br>' + 'Programador: ' + ListaPremium[k].Programador + '<br>' + 'Tipo: ' + ListaPremium[k].Tipo + ",";
                                        PremiumImagenCanalHD[iPaquete] = PremiumImagenCanalHD[iPaquete] + '<img src="img/logos/' + ListaPremium[k].Imagen + '">' + ",";
                                        
                                    } else {
                                        PremiumSDXPaquete[iPaquete] += 1;
                                        PremiumPaqueteCanalesSD[iPaquete] = PremiumPaqueteCanalesSD[iPaquete] + ListaPremium[k].Canal + '<br>' + 'Frecuencia: ' + ListaPremium[k].Frecuencia + '<br>' + 'Programador: ' + ListaPremium[k].Programador + '<br>' + 'Tipo: ' + ListaPremium[k].Tipo + ",";
                                        PremiumImagenCanalSD[iPaquete] = PremiumImagenCanalSD[iPaquete] + '<img src="img/logos/' + ListaPremium[k].Imagen + '">' + "," ;
                                        
                                    }
                                }
                            }

                        }
                    }


                    var PremiumtotalCanalesHD = 0;
                    var PremiumtotalCanalesSD = 0;
                    for (var i = 0; i < PremiumPaquete.length; i++) {
                        var PremiumarrImgSD = PremiumImagenCanalSD[i].split(",");
                        var PremiumarrImgHD = PremiumImagenCanalHD[i].split(",");
                        var PremiumarrCanalSD = PremiumPaqueteCanalesSD[i].split(",");
                        var PremiumarrCanalHD = PremiumPaqueteCanalesHD[i].split(",");


        
                        
                        $("#premium").append('<li>'+ 
                        '<div class="collapsible-header">' + '<table><tbody>' + '<tr>' + '<td>' + '<img src="img/' + PremiumPaquete[i] + '.png" >' + '</td>' + '<td>' + '<i class="material-icons">touch_app</i> ' + PremiumPaquete[i] + '</td>' + '<td>' + PremiumSDXPaquete[i] + '</td>' + '<td>' + PremiumHDXPaquete[i] + '</td>' + '<td>' + (PremiumSDXPaquete[i] + PremiumHDXPaquete[i]) + '</td>' + '</tr>' + '</table></tbody>' + '</div>' + 
                        '<div class="collapsible-body">' +
                            '<div class="row">' + 
                                '<div class="col s12 m6 l6">' + 
                                    '<div class="row catSD" id="' + PremiumPaquete[i] + 'SD">' +
                                    '</div>' + 
                                '</div>' + 
                                '<div class="col s12 m6 l6">' + 
                                    '<div class="row catHD" id="' + PremiumPaquete[i] + 'HD">' +
                                    '</div>' +
                                '</div>' + 
                            '</div>' +
                        '</div>' + 
                        '</li>');
                        
                        for (let index = 0; index < PremiumarrCanalSD.length; index++) {
                            $("#" + PremiumPaquete[i] + "SD").append( '<div class="SD">' + ' <a class="tooltipped" data-position="bottom" data-tooltip="' + PremiumarrCanalSD[index] + '">' + PremiumarrImgSD[index] + '</a>' + '</div>');
                        }
        
                        for (let index = 0; index < PremiumarrCanalHD.length; index++) {
                            console.log(PremiumarrCanalHD[index]);
                            $("#" + PremiumPaquete[i] + "HD").append( '<div class="HD">' + ' <a class="tooltipped" data-position="bottom" data-tooltip="' + PremiumarrCanalHD[index] + '">' + PremiumarrImgHD[index] + '</a>' + '</div>');
                        }

                        
                        
                        
                        $('.tooltipped').tooltip();
                        PremiumtotalCanalesHD += PremiumHDXPaquete[i];
                        PremiumtotalCanalesSD += PremiumSDXPaquete[i];
                    }
        
                    $("#premium").append('<li>'+ 
                        '<div class="collapsible-header">' + 
                            '<table><tbody>' + 
                                '<tr>' + 
                                    '<td>' + ' ' + '</td>' + 
                                    '<td><strong>TOTAL CANALES</strong></td>' + 
                                    '<td><strong>' + PremiumtotalCanalesSD + '</strong></td>' + 
                                    '<td><strong>' + PremiumtotalCanalesHD + '</strong></td>' + 
                                    '<td><strong>' + (PremiumtotalCanalesSD + PremiumtotalCanalesHD) + '</strong></td>' + 
                                '</tr>' + 
                            '</table></tbody>' + 
                        '</div>' + 
                    '</li>');

                    $("#totalizadopremium").append('<th>'+ 
                    '<td> <strong>TOTAL CANALES</strong></td>' +
                    '<td><strong>' + PremiumtotalCanalesSD + '</strong></td>' + 
                    '<td><strong>' + PremiumtotalCanalesHD + '</strong></td>' + 
                    '<td><strong>' + (PremiumtotalCanalesSD + PremiumtotalCanalesHD) + '</strong></td>' + 

    '</th>');
                
            
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

    function ObtenerArchivoCiudades() {
        var RutaObtenerArchivo2 = "ciudades.json";
        return RutaObtenerArchivo2;
    }

    function ObtenerArchivoPremium() {
        var RutaObtenerArchivo3 = "premium.json";
        return RutaObtenerArchivo3;
    }
    //************************************************************
})(jQuery);