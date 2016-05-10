
  
   function Calculate() {
      switch(parseInt(document.getElementById("natop_id").value,10)) {
         case 1 : typeop= common.TYPEOP.NEUF; break;
         case 2 : 
         case 3 : typeop= common.TYPEOP.ANCIEN; break;
      }
      switch(parseInt(document.getElementById("localisation_id").value,10)) {
         case 1 : localisation= common.LOCALISATION.METROPOLE; break;
         case 2 : localisation= common.LOCALISATION.REUNION; break;
         case 3 : localisation= common.LOCALISATION.GUADELOUPE; break;
         case 4 : localisation= common.LOCALISATION.GUYANNE; break;
      }
      if (document.getElementById("cout_id").value=="") {
         var comment="";
	    	document.getElementById("EmolumentsNotaire").value=comment;
	    	document.getElementById("DroitsEtTaxes").value=comment;
	    	document.getElementById("FormalitesDebours").value=comment;
	    	document.getElementById("Total").value=comment;
      }
      else {
         document.getElementById("Total").value=mtr.number_format(Math.round(common.calcul_frais_notaire(parseInt(document.getElementById("cout_id").value),typeop,localisation)/100.0)*100.0,0,","," ")+" €";
	    	document.getElementById("EmolumentsNotaire").value=mtr.number_format(common.emoluments_notaire,0,","," ")+" €";
	    	document.getElementById("DroitsEtTaxes").value=mtr.number_format(common.droits_et_taxes,0,","," ")+" €";
	    	document.getElementById("FormalitesDebours").value=mtr.number_format(common.emoluments_formalites,0,","," ")+" €";
      }
   }
   
   function window_onload(){
      document.getElementById("natop_id").value="1";
		document.getElementById("localisation_id").value="1";
		document.getElementById("cout_id").value="";      
      ControlKB('cout_addon',"");
      Calculate();
   }	


     //------------------------------------
   // common
   //------------------------------------
   var common = {
      dept : [["01","Ain"],["02","Aisne"],["03","Allier"],["04","Alpes Haute Provence"],["05","Hautes Alpes"],["06","Alpes Maritimes"],["07","Ard&egrave;che"],["08","Ardennes"],["09","Ari&egrave;ge"],["10","Aube"],
              ["11","Aude"],["12","Aveyron"],["13","Bouches du Rh&ocirc;ne"],["14","Calvados"],["15","Cantal"],["16","Charente"],["17","Charente Maritime"],["18","Cher"],["19","Corr&egrave;ze"],["2A","Corse du Sud"],["2B","Haute Corse"],
              ["21","C&ocirc;te d&acute;or"],["22","C&ocirc;te d&acute;armor"],["23","Creuse"],["24","Dordogne"],["25","Doubs"],["26","Dr&ocirc;me"],["27","Eure"],["28","Eure et Loir"],["29","Finist&egrave;re"],["30","Gard"],
              ["31","Haute Garonne"],["32","Gers"],["33","Gironde"],["34","H&eacute;rault"],["35","Ille et Vilaine"],["36","Indre"],["37","Indre et Loire"],["38","Is&egrave;re"],["39","Jura"],["40","Landes"],
              ["41","Loir et Cher"],["42","Loire"],["43","Haute Loire"],["44","Loire Atlantique"],["45","Loiret"],["46","Lot"],["47","Lot et Garonne"],["48","Loz&egrave;re"],["49","Maine et Loire"],["50","Manche"],
              ["51","Marne"],["52","Haute Marne"],["53","Mayenne"],["54","Meurthe et Moselle"],["55","Meuse"],["56","Morbihan"],["57","Moselle"],["58","Ni&egrave;vre"],["59","Nord"],["60","Oise"],
              ["61","Orne"],["62","Pas de Calais"],["63","Puy de d&ocirc;me"],["64","Pyr&eacute;n&eacute;es atlantique"],["65","Hautes Pyr&eacute;n&eacute;es"],["66","Pyr&eacute;n&eacute;es orientales"],["67","Bas-Rhin"],["68","Haut-Rhin"],["69","Rh&ocirc;ne"],["70","Haute Sa&ocirc;ne"],
              ["71","Sa&ocirc;ne et Loire"],["72","Sarthe"],["73","Savoie"],["74","Haute Savoie"],["75","Paris"],["76","Seine Maritime"],["77","Seine et Marne"],["78","Yvelines"],["79","Deux-S&egrave;vres"],["80","Somme"],
              ["81","Tarn"],["82","Tarn et Garonne"],["83","Var"],["84","Vaucluse"],["85","Vend&eacute;e"],["86","Vienne"], ["87","Haute Vienne"],["88","Vosges"],["89","Yonne"],["90","Territoire Belfort"],
              ["91","Essonne"],["92","Hauts de Seine"],["93","Seine-Saint-Denis"],["94","Val de Marne"],["95","Val d&acute;Oise"],
              ["971","Guadeloupe"],["972","Martinique"],["973","Guyane"],["974","La R&eacute;union"],["975","Saint-Pierre-et-Miquelon"],["976","Mayotte"]   
            ],
      is_dom : function(dept) { return dept=="971" || dept=="972" || dept=="973" || dept=="974" || dept=="975" || dept=="976"; },
      
      TYPEOP : { NSP:-1, NEUF:0, ANCIEN:1 },
      LOCALISATION : { NSP:-1, METROPOLE:0, GUADELOUPE:971, MARTINIQUE:972, GUYANNE:973, REUNION:974},
      TYPEFIN : { NSP:-1, PTZ_PC_PAS_EL:1, AUTRE:2 },  
      
     emoluments_notaire      : 0,
      taxe_publicite_fonciere : 0,
      salaire_conservateur    : 0,
      droits_et_taxes         : 0,
      emoluments_formalites   : 0,
      
      // mise à jour le 28/01/2014
      //---------------------------------------------------------
      calcul_frais_notaire : function(base, typeop, localisation) {
         var taux=[[6500.0, 0.04000],
                   [17000.0, 0.01650],
                   [60000.0, 0.01100],
                   [Number.POSITIVE_INFINITY, 0.00825]];
         common.emoluments_notaire=0;
         common.droits_et_taxes=0;
         common.emoluments_formalites=0;
         
         // émoluments du notaire (hors TVA)
         common.emoluments_notaire+=Math.min(base,taux[0][0])*taux[0][1];
         common.emoluments_notaire+=Math.max(Math.min(base,taux[1][0])-taux[0][0],0.0)*taux[1][1];
         common.emoluments_notaire+=Math.max(Math.min(base,taux[2][0])-taux[1][0],0.0)*taux[2][1];
         common.emoluments_notaire+=Math.max(base-taux[2][0],0.0)*taux[3][1];
         
       if (localisation==common.LOCALISATION.REUNION)
            common.emoluments_notaire*=1.4;
         else if (localisation==common.LOCALISATION.GUADELOUPE || localisation==common.LOCALISATION.MARTINIQUE || localisation==common.LOCALISATION.GUYANNE)
            common.emoluments_notaire*=1.25;
         
       // TVA sur émoluments (pas de TVA en Guyane)
         if (localisation==common.LOCALISATION.METROPOLE)
            common.emoluments_notaire*=1.2000;
         else if (localisation!=common.LOCALISATION.GUYANNE)
            common.emoluments_notaire*=1.0850;
            
         // droits
         common.droits_et_taxes+=(typeop==common.TYPEOP.NEUF)?base*0.00715:base*0.05790;
         // contribution de sécurité immobilière
         common.droits_et_taxes+=(base*0.001);
         
         // émoluments de formalités et débours
         if (localisation==common.LOCALISATION.REUNION)
            common.emoluments_formalites+=(1350.0*0.836*1.4*1.085);
         else if (localisation==common.LOCALISATION.GUADELOUPE || localisation==common.LOCALISATION.MARTINIQUE)
            common.emoluments_formalites+=(1350.0*0.836*1.25*1.085);
         else if (localisation==common.LOCALISATION.GUYANNE)
            common.emoluments_formalites+=(1350.0*0.836*1.25);
         else
            common.emoluments_formalites+=1350.0;
         
         return common.emoluments_notaire+common.droits_et_taxes+common.emoluments_formalites;
      },
      
      // mise à jour le 28/01/2014
      //-------------------------------------------------------------------
      calcul_cout_garantie : function(base, typefin, typeop, localisation) {
         var taux=[[6500.0, 0.01330],
                   [17000.0, 0.00550],
                   [30000.0, 0.00370],
                   [Number.POSITIVE_INFINITY, 0.00275]];
         common.emoluments_notaire=0;
         taxe_publicite_fonciere=0;
         common.salaire_conservateur=0;
         common.emoluments_formalites=0;
         
         common.emoluments_notaire+=Math.min(base,taux[0][0])*taux[0][1];
         common.emoluments_notaire+=Math.max(Math.min(base,taux[1][0])-taux[0][0],0.0)*taux[1][1];
         common.emoluments_notaire+=Math.max(Math.min(base,taux[2][0])-taux[1][0],0.0)*taux[2][1];
         common.emoluments_notaire+=Math.max(base-taux[2][0],0.0)*taux[3][1];
         
       if (localisation==common.LOCALISATION.REUNION)
            common.emoluments_notaire*=1.4;
         else if (localisation==common.LOCALISATION.GUADELOUPE || localisation==common.LOCALISATION.MARTINIQUE || localisation==common.LOCALISATION.GUYANNE)
            common.emoluments_notaire*=1.25;
                   
         if (localisation==common.LOCALISATION.METROPOLE)
            common.emoluments_notaire*=1.2000;
         else if (localisation!=common.LOCALISATION.GUYANNE)
            common.emoluments_notaire*=1.0850;
       
         // taxe publicité foncière
         common.taxe_publicite_fonciere=(typeop==common.TYPEOP.NEUF && typefin!=common.TYPEFIN.PTZ_PC_PAS_EL)?(base*1.2*0.00715):0.0;
         // contribution de sécurité immobilière
       common.salaire_conservateur=base*1.2*0.0005;
       
         // émoluments formalités et débours   
      if (localisation==common.LOCALISATION.REUNION)
        common.emoluments_formalites=(250.0*0.836*1.4*1.085);
      else if (localisation==common.LOCALISATION.GUADELOUPE || localisation==common.LOCALISATION.MARTINIQUE)
        common.emoluments_formalites=(250.0*0.836*1.25*1.085);
        else if (localisation==common.LOCALISATION.GUYANNE)
          common.emoluments_formalites=(250.0*0.836*1.25);
      else
        common.emoluments_formalites=250.0;
               
         return common.emoluments_notaire+common.taxe_publicite_fonciere+common.salaire_conservateur+common.emoluments_formalites;
      }
   };
   

