var ListaPlanes = null;
var resultado;
var resultadoplan;

(function ($) {

    $(document).ready(function(){
        $('select').formSelect();
    });

    $('select').on('contentChanged', function () {
        // re-initialize (update)
        $('select').formSelect();
    });

    if (screen.width<900){
        $( 'select' ).addClass(' browser-default');
    }


    $("#Region").change(function () {
        LlenarListaCategoria();
    });

    $("#Plan").change(function () {
        LlenarListaResultado2();
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

            erInput.setAttribute("type","radio");
            erInput.setAttribute("class","Empresa");
            erInput.setAttribute("name", 'group1');
            erInput.setAttribute("value", arrItems[i]);

            erTdemp.appendChild(erp);
            erlabel.appendChild(erInput);
            erp.appendChild(erlabel);
            erlabel.appendChild(erSapn);
            
            
        }

        
        $('input[name=group1]').click(function() {
            
            $("#Region").empty().html(' ');
            $("#Region").trigger('contentChanged');
            
            $("#Plan").empty().html(' ');
            $("#Plan").trigger('contentChanged');
            
            $("#Categoria").empty().html(' ');
            $("#Categoria").trigger('contentChanged');
            
            $("#Tipo").empty().html(' ');
            $("#Tipo").trigger('contentChanged');
            
            var porNombre=document.getElementsByName("group1");
            // Recorremos todos los valores del radio button para encontrar el
            // seleccionado
            for(var i=0;i < porNombre.length; i++)
            {
                if(porNombre[i].checked){
                    resultado = porNombre[i].value;
                    LlenarListaTecnologia();
                }
            }
            
                
        });
        
        /*var $selectDropdown = $("#Empresa")
       .empty()
       .html(' ');
    
       

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Empresa")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }

        jQuery.uniqueSort(ListaPlanes);


        $selectDropdown.change();*/
    }
}

function LlenarListaTecnologia() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var arrItems = [];
        var Contador = 0;
        var erTdemp = $("#Tecnologia").empty().html('');

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].Tecnologia) == false && ListaPlanes[i].Empresa == EmpresaSeleccionado) {
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

            erInput.setAttribute("type","radio");
            erInput.setAttribute("class","Tecnologia");
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
            for(var i=0;i < porNombretecno.length; i++)
            {
                if(porNombretecno[i].checked){
                    resultadotecno = porNombretecno[i].value;
                    LlenarListaRegion();
                }
            }
        });

        /*var $selectDropdown = $("#Tecnologia")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Tecnologia")
            );

        for (var i = 0; i < arrItems.length; i++) {
            $selectDropdown.append(
                $("<option></option>")
                .attr("value", arrItems[i])
                .text(arrItems[i])
                );
        }*/

        

    }
}

function LlenarListaRegion() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = resultadotecno;
        var arrItems = [];
        var Contador = 0;
        var Regiones = ['Noroccidente','Oriente','Centro','Sur','EjeCafetero','Costa', 'Gpon', 'Redco'];
        

        for (var i = 0; i < ListaPlanes.length; i++) {

            if (ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado) {

                for (let index = 0; index < Regiones.length; index++) {
                    if (ListaPlanes[i][Regiones[index]] == 1 && arrItems.indexOf(Regiones[index]) == -1) {
                        arrItems[Contador] = Regiones[index];
                        Contador += 1;
                    }   
                }
            }
        }

        var $selectDropdown = $("#Region")
       .empty()
       .html(' ');

        $selectDropdown.append(
            $("<option></option>")
            .attr("value", "")
            .text("Selecciona Región")
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

function LlenarListaCategoria() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = resultadotecno;
        var arrItems = [];
        var Contador = 0;
        var Regiones = ['Noroccidente','Oriente','Centro','Sur','EjeCafetero','Costa', 'Gpon', 'Redco'];
        var erTdemp = $("#Categoria").empty().html('');
        

        for (var i = 0; i < ListaPlanes.length; i++) {

            if (ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado) {

                for (let index = 0; index < Regiones.length; index++) {
                    if (ValidarItemArray(arrItems, ListaPlanes[i].Categoria) == false) {
                        arrItems[Contador] = ListaPlanes[i].Categoria;
                        Contador += 1;
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

            erInput.setAttribute("type","radio");
            erInput.setAttribute("class","category");
            erInput.setAttribute("name", 'group4');
            erInput.setAttribute("value", arrItems[i]);

            erTdemp.append(erp);
            erlabel.appendChild(erInput);
            erp.appendChild(erlabel);
            erlabel.appendChild(erSapn);
            
            
        }

        $('input[name=group4]').click(function() {
            
 
            var porNombreCat = document.getElementsByName("group4");
            // Recorremos todos los valores del radio button para encontrar el
            // seleccionado
            for(var i=0;i < porNombreCat.length; i++)
            {
                if(porNombreCat[i].checked){
                    resultadoCat = porNombreCat[i].value;
                    LlenarListaTipo();
                }
            }
        });
    }
}

function LlenarListaTipo() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = resultadotecno;
        var CategoriaSeleccionado = resultadoCat;
        var RegionSeleccionado = $('#Region').val();
        var arrItems = [];
        var Contador = 0;
        var Regiones = ['Noroccidente','Oriente','Centro','Sur','EjeCafetero','Costa', 'Gpon', 'Redco'];
        var erTdemp = $("#Tipo").empty().html('');

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].Tipo) == false && ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado && ListaPlanes[i][RegionSeleccionado] == 1 && ListaPlanes[i].Categoria == CategoriaSeleccionado) {
                arrItems[Contador] = ListaPlanes[i].Tipo;
                Contador += 1;
            }
        }

        

        for (var i = 0; i < arrItems.length; i++) {
            
            erInput = document.createElement('input');
            erlabel = document.createElement('label');
            erp = document.createElement('p');
            erSapn = document.createElement('span');
            erSapn.setAttribute("class", arrItems[i])

            erSapn.innerHTML = arrItems[i];

            erInput.setAttribute("type","radio");
            erInput.setAttribute("name", 'group3');
            erInput.setAttribute("value", arrItems[i]);

            erTdemp.append(erp);
            erlabel.appendChild(erInput);
            erp.appendChild(erlabel);
            erlabel.appendChild(erSapn);
            
            
        }

        $('input[name=group3]').click(function() {
            
 
            var porNombreTipo = document.getElementsByName("group3");
            // Recorremos todos los valores del radio button para encontrar el
            // seleccionado
            for(var i=0;i < porNombreTipo.length; i++)
            {
                if(porNombreTipo[i].checked){
                    resultadoTipo = porNombreTipo[i].value;
                    LlenarListaPlan();
                }
            }
        });

        

    }
}

function LlenarListaPlan() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = resultadotecno;
        var RegionSeleccionado = $('#Region').val();
        var CategoriaSeleccionado = resultadoCat;
        var TipoSeleccionado = resultadoTipo;
        var arrItems = [];
        var Contador = 0;
        

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ValidarItemArray(arrItems, ListaPlanes[i].Plan) == false && ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado && ListaPlanes[i][RegionSeleccionado] == 1 && ListaPlanes[i].Categoria == CategoriaSeleccionado && ListaPlanes[i].Tipo == TipoSeleccionado) {
                arrItems[Contador] = ListaPlanes[i].Plan;
                Contador += 1;
            }
        }

        var $selectDropdown = $("#Plan")
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

function LlenarListaResultado() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = $('#Tecnologia').val();

        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado) {
                $("#tabla_plan").html(ListaPlanes[i].Plan);
            }
        }
    }
}

function limpiar() {
    document.getElementById("filtros").reset();
}

function LlenarListaResultado2() {
    if (ListaPlanes != null) {
        var EmpresaSeleccionado = resultado;
        var TecnologiaSeleccionado = resultadotecno;
        var RegionSeleccionado = $('#Region').val();
        var CategoriaSeleccionado = resultadoCat;
        var TipoSeleccionado = resultadoTipo;
        var PlanSeleccionado = $('#Plan').val();
        var Grupos = {
            G1:'Noroccidente,Costa',
            G2:'Centro,EjeCafetero',
            G3:'Sur',
            G4:'Oriente',
            G5:'Gpon',
            G6:'Redco'
        };
        var grupo;

        $.each(Grupos,function(key, value){
            if (value.search(RegionSeleccionado) != -1) {
                grupo = key;
            }
        });


        for (var i = 0; i < ListaPlanes.length; i++) {
            if (ListaPlanes[i].Empresa == EmpresaSeleccionado && ListaPlanes[i].Tecnologia == TecnologiaSeleccionado && ListaPlanes[i][RegionSeleccionado] == 1 && ListaPlanes[i].Categoria == CategoriaSeleccionado && ListaPlanes[i].Tipo == TipoSeleccionado && ListaPlanes[i].Plan == PlanSeleccionado) {
                $("#tabla_plan").html(ListaPlanes[i].Plan);

                $("#tabla_hd").html(ListaPlanes[i][grupo + '-HD']);
                $("#tabla_sd").html(ListaPlanes[i][grupo + '-SD']);
                $("#tabla_audio").html(ListaPlanes[i][grupo + '-Audio']);

                $("#tabla_velicodad").html(ListaPlanes[i].VelocidadBA);

                $("#tabla_est12").html(ListaPlanes[i].Estrato12);
                $("#tabla_est34").html(ListaPlanes[i].Estrato34);
                $("#tabla_est56").html(ListaPlanes[i].Estrato56);

                if(TipoSeleccionado == "One" || TipoSeleccionado == "One Plus DVR" || TipoSeleccionado == "One Elite" || TipoSeleccionado == "One Plus"){
                    $("#tabla_apps").html('<img src="img/uneplay.png" height="40px" style="margin-right: 10px"><img src="img/unetv.png" height="40px" style="margin-right: 10px"><img src="img/stingray.png" height="40px" style="margin-right: 10px"><img src="img/hbo.png" height="40px" style="margin-right: 10px"><img src="img/fox.png" height="40px" style="margin-right: 10px"><img src="img/crackle.png" height="40px" style="margin-right: 10px"><img src="img/youtube.png" height="40px" style="margin-right: 10px">');
                }else{
                    $("#tabla_apps").html('<img src="img/uneplay.png" height="40px" style="margin-right: 10px"><img src="img/unetv.png" height="40px" style="margin-right: 10px"><img src="img/stingray.png" height="40px" style="margin-right: 10px">');
                }

                $("#tabla_tele").html(ListaPlanes[i].MinutosTelefonia);
                $("#tabla_obser").html(ListaPlanes[i].Observaciones);

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
    var RutaObtenerArchivo = "data.json";
    return RutaObtenerArchivo;
}
//************************************************************
})(jQuery);