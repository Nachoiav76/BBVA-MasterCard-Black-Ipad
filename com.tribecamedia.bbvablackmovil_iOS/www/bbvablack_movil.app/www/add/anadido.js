

var reg=1;
var idsel=0;

var Lhomeid=new Array();
var Lhomearc=new Array();
var Lhomenombre=new Array();
var Lhomencategoria=new Array();
var Limgpr=new Array();
var nimgpr=0;
var nhome=0;
var chome=0;
var acthome=0;
var anthome=0;
var cpromo=0;
var actpromo=0;
var antpromo=0;
var idpromo;
var idhome;

// Listado
var s_cat=0;
var s_ven=0;
var s_are=0;
var s_fec=0;
var s_pal= "";
var Llnombre= new Array();
var Llcategoria= new Array();
var Llventaja= new Array();
var Llimg= new Array();
var Llid= new Array();
var nlista=0;




	
 $('div[data-role=page]').live('pagecreate',function(){	
	 	jQuery('.div').css({'padding':'0px'});
		jQuery('.div').css({'margin':'0px'});
		jQuery('.ui-select, .ui-selectmenu, .ui-select a').css({'width':'160px'});
	    jQuery('.ui-select, .ui-select a').css({'padding':'0px'});
	    jQuery('.ui-select, .ui-select a').css({'margin':'0px'});
		jQuery('.button, .button a').css({'padding':'0px'});
	    jQuery('.button, .button a').css({'margin':'0px'});
	   jQuery('.ui-select, .ui-select a').css({'font-size':'13px'});

	   HOME_inicia();
	   
	
 });


 
 
 
 
function HOME_inicia(){
 	  $.ajax({                                        
		  url: "http://www.bbvablack.com/xml/mob_portada.aspx",                                          
		  cache: false,                      
		  processData: false,                    
		  success: HOME_leido,
		  error: HOME_error                  
	  });
	
 }
 function HOME_error(data){
 	$("home_content").html("<div align='center'>No se pueden cargar datos<br>Asegúrese que está activado Internet para el dispositivo.</div>");
 }
 
function HOME_leido(data){
	   $(data).find('el').each(function(){
 			Lhomeid[nhome]=($(this).find('idpr').text());
			Lhomearc[nhome]=($(this).find('arc').text());
			Lhomenombre[nhome]=($(this).find('nombre').text());
			Lhomencategoria[nhome]=($(this).find('ncategoria').text());
			nhome++;
		});
		$("#home_bregistro").show();
		$("#home_blistado").show();
		HOME_verfotos();
}

function HOME_verfotos(){
	$("#slhome").html();
   for (var n=0; n<nhome; n++){
   		//$("#slhome").append("<div id=\"capsl" + Lhomeid[n] + "\" align=\"center\" style=\"position:absolute; left:" + ((n*960)) + "px; top:0px; width:960px; padding-top:0px;\" align=\"center\" ><img width=\"960\" height=\"500\" id=\"impor" + Lhomeid[n] + "\" border=\"0\" src=\"http://www.bbvablack.com/archivos/promociones/" + Lhomearc[n] + "\" ><div align=\"left\" style=\"padding-left:5px; font-size:14px;\"><strong>" + Lhomenombre[n] + "</strong><br>" + Lhomencategoria[n] +"</div></div>");
		
		var t = $("<div id='capsl" + Lhomeid[n] + "' style='position:absolute; left:" + ((n*960)) + "px; top:0px; width:960px; padding-top:0px;' align='center' ></div>");
		
		var turlc;
		var f= "<img id='impor" + Lhomeid[n] + "' width='960' height='400' border='0' src='http://www.bbvablack.com/archivos/promociones/" + Lhomearc[n] + "' >";
		var f2 ="<div id='capst" + Lhomeid[n] + "' align='left' style='padding-left:5px; font-size:14px;'><strong id='capss" + Lhomeid[n] + "'>" + Lhomenombre[n] + "</strong><br>" + Lhomencategoria[n] +"</div>";
		if (reg==0) {
			turlc=  $("<a href='\#registro' style='text-decoration:none;'>" + f + f2 +"</a>");
		}else{
			turlc=  $("<a href='\#promo' onclick='PROMO_inicia(" + Lhomeid[n] + ");' style='text-decoration:none;' >" + f +  f2 +"</a>");
		}
		
		t.append(turlc);
		$("#slhome").append(t);
		//var f = $("<img id='impor" + Lhomeid[n] + "' width='960' height='400' border='0' src='http://www.bbvablack.com/archivos/promociones/" + Lhomearc[n] + "' >");
		//var f2 = $("<div id='capst" + Lhomeid[n] + "' align='left' style='padding-left:5px; font-size:14px;'><a id='capsa" + Lhomeid[n] + "'><strong id='capss" + Lhomeid[n] + "'>" + Lhomenombre[n] + "</strong><br>" + Lhomencategoria[n] +"</a></div>");
		
		
		//turlc.append(f);
		//turlc.append(f2);
		
	
   }
   idhome= setInterval(HOME_mov,100);
}

function HOME_mov(){
	chome++;
	if (chome>100){
		
		acthome++;
		if (acthome>=nhome){
			acthome=0;
		}
		chome=0;
	}
	if (anthome!=acthome){
		
		$('#slhome').animate({
		left: -960*acthome,
		}, 2000, function() { });
		anthome=acthome;
	}
}

<!-- Registro -->
 $('#registro').live('pageshow',function(){
	 	$("#submit").click(function(){
			 var formData = $("#fregistro").serialize();
 
                $.ajax({
                    type: "POST",
                    url: "http://www.bbvablack.com/xml/mob_registro.aspx",
                    cache: false,
                    data: formData,
                    success: registroSuccess,
                    error: registroError
                });
 
                return false;
		});
		
 });
 
function onSuccess(data, status){
     data = $.trim(data);
     $("#notification").text(data);
}
 
function onError(data, status){
	
}   
 

<!-- PROMO-->
function PROMO_inicia(idp){
	actpromo=0;
	clearInterval(idpromo);
	idsel=idp;
	 //alert("http://www.bbvablack.com/xml/mob_promo.aspx?idp="+ idsel);
 	  $.ajax({                                        
		  url: "http://www.bbvablack.com/xml/mob_promo.aspx?idp="+ idsel,                                          
		  cache: false,                      
		  processData: false,                    
		  success: PROMO_leido,
		  error: PROMO_error                    
	  });
	
 }
 
 function PROMO_leido(pr_data){
	// alert("leido"  + pr_data);
	 var texto1, texto2, texto3, nombre, img_log, nventaja, ncategoria;
	  $(pr_data).find('el').each(function(){
 			texto1=($(this).find('texto1'));
			texto2=($(this).find('texto2'));
			texto3=($(this).find('texto3'));
			nombre=($(this).find('nombre').text());
			img_log=($(this).find('img_log').text());
			nventaja=($(this).find('nventaja').text());
			ncategoria=($(this).find('ncategoria').text());
		});
		//alert(texto1);
		$("#pr_tit").html("<h2>" + nombre + "</h2><h4>" + ncategoria + " | "  + nventaja + "</h4>" );
		$("#pr_cont1").html("<h3>Ventaja BBVA MasterCard Black</h3>");
		$("#pr_cont1").append(texto1);
		$("#pr_cont2").html("<h3>¿Cómo disfrutarla?</h3>");
		$("#pr_cont2").append(texto2);
		$("#pr_cont3").html(texto3);
		var tdir= "";
		if (img_log + ""==""){
		}else{
			tdir= "<img src='http://www.bbvablack.com/archivos/promociones/" + img_log + "'>";
		}
		$("#pr_log").append(tdir);
		$("#pr_dir").html(texto3);
		
		PROMO_fotos();
		
 }
 
 function PROMO_error(data){
	 var t = $("<div align='center'>No se han podido cargar los datos</div>");
	 $("#pr_cont1").html(t);
	 
 }
 
 
 function PROMO_fotos(){
	 //alert("http://www.bbvablack.com/xml/mob_promo.aspx?idp="+ idsel);
 	  $.ajax({                                        
		  url: "http://www.bbvablack.com/xml/mob_promo_fotos.aspx?idp="+ idsel,                                          
		  cache: false,                      
		  processData: false,                    
		  success: PROMO_fotos_leido,
		  error: PROMO_fotos_error                    
	  });
	
 }
 
 function PROMO_fotos_leido(pr_data2){
	 	Limgpr=[];
		nimgpr=0;
		 $(pr_data2).find('el').each(function(){
 			Limgpr[nimgpr]=($(this).find('arc').text());
			nimgpr++;
		});
		PROMO_verfotos();
 }
  function PROMO_fotos_error(){
	  //alert("error");
 }
 
function PROMO_verfotos(){
	
	$("#slpromo").html("");
   for (var n=0; n<nimgpr; n++){
	  var t = $("<div  style='position:absolute; left:" + ((n*960)) + "px; top:0px; width:386px; padding-top:0px;' align='center' ></div>"); 
	  var f= $("<img  width='960' height='386' border='0' src='http://www.bbvablack.com/archivos/promociones/" + Limgpr[n] + "' >"); 
	  t.append(f);
	  $("#slpromo").append(t);  
   }
   if (nimgpr>1){
   idpromo= setInterval(PROMO_mov,100);
   }
}
function PROMO_mov(){
	cpromo++;
	if (cpromo>150){
		
		actpromo++;
		if (actpromo>=nimgpr){
			actpromo=0;
		}
		cpromo=0;
	}
	if (antpromo!=actpromo){
		antpromo=actpromo;
		$('#slpromo').animate({	
		left: -960*actpromo,
		}, 2000, function() {
		
	  });
		
	}
}

 $("formlistar").live('submit', function(event){
	 listar();
 });
 

// LISTAR
function listar(){
	$("#listacont").html("");
	var tbus=$("<div align='center' style='padding-top:300px; padding-bottom:1000px;'><strong>Realizando búsqueda...</strong></div>");
	$("#listacont").append(tbus);
	s_cat= formlistar.categoria.value;
	s_pal= formlistar.pal.value;
	s_ven= formlistar.ventaja.value;
	s_are= formlistar.area.value;
	s_fec= formlistar.fecha.value;
	$.ajax({                                        
		  url: "http://www.bbvablack.com/xml/mob_listar.aspx?cat="+ s_cat + "&ven=" + s_ven + "&are=" + s_are + "&fec=" + s_fec + "&pal=" + s_pal,                                          
		  cache: false,                      
		  processData: false,                    
		  success: LISTAR_leido,
		  error: LISTAR_error                    
	  });
	
}



var Llnombre= new Array();
var Llcategoria= new Array();
var Llventaja= new Array();
var Llimg= new Array();
var LlId= new Array();

function LISTAR_leido(datlista){
		nlista=0;
	   $(datlista).find('el').each(function(){
 			Llid[nlista]=($(this).find('Id').text());
			Llnombre[nlista]=($(this).find('nombre').text());
			Llcategoria[nlista]=($(this).find('ncategoria').text());
			Llventaja[nlista]=($(this).find('nventaja').text());
			Llimg[nlista]=($(this).find('imagen').text());
			nlista++;
		});
		LISTAR_ver();
}

function LISTAR_error(){
	alert("Error al recuperar listado");
}

function LISTAR_ver(){
	$("#listacont").html("");
   if (nlista==0){
	   var tbus=$("<div align='center' style='padding-top:300px; padding-bottom:1000px;'><strong>No se han encontrado elementos que correspondan a la búsqueda seleccionada</strong></div>");
		$("#listacont").append(tbus);
   }else{
	   for (var n=0; n<nlista; n++){
		   if (n<30){
		   var sal="";
		   var enlace="<a href='#promo' onclick='PROMO_inicia(" + Llid[n]  + ");' style='text-decoration:none;' >";
		   var fenlace="</a>";
		   if (n<6){
			   if ((n+1) % 2==0){
		   		sal=$("<div style='width:480px; height:193px; float:left; position:relative;margin-top:10px; margin-right:0px;'>" + enlace + "<img src='http://www.bbvablack.com/archivos/promociones/" + Llimg[n] + "' width='480' height='193' >" + fenlace + "</div>");	
			   }else{
				   sal=$("<div style='width:480px; height:193px; float:left; position:relative;margin-top:10px; margin-right:30px;'>" + enlace + "<img src='http://www.bbvablack.com/archivos/promociones/" + Llimg[n] + "' width='480' height='193' >" + fenlace + "</div>");	
			   }
		   }else{
			    if ((n+1) % 2==0){
		   		sal=$("<div style='width:480px;  float:left; position:relative; margin-bottom:0px;'>" + enlace + "<h3>" + Llnombre[n] + "<span style='font-size:11px;'> " + Llcategoria[n] + " | " + Llventaja[n] + " </span></h3>" + fenlace + "</div>");	
				}else{
					sal=$("<div style='width:480px;  float:left; position:relative; margin-bottom:0px;margin-right:30px;'>" + enlace + "<h3>" + Llnombre[n] + "<span style='font-size:11px;'> " + Llcategoria[n] + " | " + Llventaja[n] + " </span></h3>" + fenlace + "</div>");	
				}
		   }
		   $("#listacont").append(sal);
		  if ((n+1) % 2==0){
			  sal=$("<div style='clear:both;'></div>");
		    $("#listacont").append(sal);
		  }
		   }else{
		   sal=$("<div align='center' style='padding:20px;'> Se han encontrado multitud de resultados. Refine la búsqueda.</div>");
		    $("#listacont").append(sal);
		   n=nlista;
		   }
		   
	   } 
	   
   }
}





 



	
