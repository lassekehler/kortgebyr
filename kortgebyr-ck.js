function calc(){oms<2e4?PSP[0].variableTransactionFee=3.4:oms<=8e4?PSP[0].variableTransactionFee=2.9:oms<=4e5?PSP[0].variableTransactionFee=2.7:oms<=8e5?PSP[0].variableTransactionFee=2.4:PSP[0].variableTransactionFee=1.9;if(value<=50)acquirer[0].fixedTransactionFee=.7;else if(value<=100)acquirer[0].fixedTransactionFee=1.1;else if(value<=500)acquirer[0].fixedTransactionFee=1.45;else{acquirer[0].fixedTransactionFee=1.45;acquirer[0].variableTransactionFee=.001}for(var e=0;e<acquirer.length;e++){var t=1;dankort===!0&&visamc===!0&&(acquirer[e].name!=="nets"?t=(100-dankortfrekvens)/100:t=dankortfrekvens/100);acquirer[e].transactionCosts=t*(transactions*acquirer[e].fixedTransactionFee+oms*(acquirer[e].variableTransactionFee/100));acquirer[e].totalCosts=acquirer[e].transactionCosts+acquirer[e].monthlyFee;console.log(acquirer[e].name+": "+acquirer[e].totalCosts)}for(var e=0;e<PSP.length;e++){PSP[e].acquirer==undefined?PSP[e].transactionCosts=PSP[e].fixedTransactionFee*transactions+PSP[e].variableTransactionFee/100*oms:transactions>PSP[e].freeTransactions&&(PSP[e].transactionCosts=PSP[e].fixedTransactionFee*(transactions-PSP[e].freeTransactions));PSP[e].costs=PSP[e].monthlyFee+PSP[e].transactionCosts;PSP[e].totalCosts=PSP[e].costs;PSP[e].totalMonthlyFee=PSP[e].monthlyFee;PSP[e].totalSetupFee=PSP[e].setupFee;if(PSP[e].acquirer!==undefined){var n=Number.POSITIVE_INFINITY,r,i;PSP[e].availableAcquirers.forEach(function(e,t){console.log("n="+e+", x="+t);if(e>0&&jcb===!1){r=acquirer[e].totalCosts;if(r<n){n=r;i=e}}else jcb===!0&&(i=2)});PSP[e].acquirer=i;PSP[e].costs=PSP[e].monthlyFee+PSP[e].transactionCosts;if(dankort===!0&&PSP[e].acquirer!==undefined){PSP[e].totalSetupFee+=acquirer[0].setupFee;PSP[e].totalMonthlyFee+=acquirer[0].monthlyFee;PSP[e].totalCosts+=acquirer[0].totalCosts}if(PSP[e].acquirer!==0&&visamc===!0){PSP[e].totalSetupFee+=acquirer[PSP[e].acquirer].setupFee;PSP[e].totalMonthlyFee+=acquirer[PSP[e].acquirer].monthlyFee;PSP[e].totalCosts+=acquirer[PSP[e].acquirer].totalCosts}}}PSP.sort(function(e,t){return t.totalCosts-e.totalCosts});build()}function build(){var e=document.getElementById("data"),t;e.innerHTML="";for(var n=0;n<PSP.length;n++){if(visamc===!0&&PSP[n].availableAcquirers==0){console.log(PSP[n].acquirer);continue}t=e.insertRow(0);var r=t.insertCell(0),i=t.insertCell(1),s=t.insertCell(2),o=t.insertCell(3),u=t.insertCell(4),a=t.insertCell(5),f=t.insertCell(6),l="",c="";if(PSP[n].acquirer==undefined)PSP[n].cards.forEach(function(e,t){c+="<img src='cards/"+cards[e].logo+"' width='24' />"});else{if(dankort===!0&&PSP[n].acquirer!==undefined){l="<img src='logo/nets.png' width='55' /><br />";c+="<img src='cards/dankort.gif' width='24' />";PSP[n].cards.indexOf(1)>-1&&(c+="<img src='cards/edankort.png' width='24' />")}if(PSP[n].acquirer!==0&&visamc===!0){l+="<img src='logo/"+acquirer[PSP[n].acquirer].logo+"' width='55' />";acquirer[PSP[n].acquirer].cards.forEach(function(e,t){PSP[n].cards.indexOf(e)>-1&&(c+="<img src='cards/"+cards[e].logo+"' width='24' />")})}}r.innerHTML="<div class=first><a target='_blank' href='http://"+PSP[n].link+"'><img style='margin:3px 0 3px;' height='32' src='logo/"+PSP[n].logo+"' /><br />"+PSP[n].name+"</a></div>";i.innerHTML="<div class=kort>"+c+"</div>";s.innerHTML=l;o.innerHTML=Math.round(PSP[n].totalSetupFee)+" kr";u.innerHTML=Math.round(PSP[n].totalMonthlyFee)+" kr";var h="<a href='#' class='tooltip'>?<span>"+PSP[n].name+":"+PSP[n].costs;if(PSP[n].acquirer!==undefined){dankort===!0&&(h+="<br />Nets: "+acquirer[0].totalCosts);visamc===!0&&(h+="<br />"+acquirer[PSP[n].acquirer].name+": "+acquirer[PSP[n].acquirer].totalCosts)}h+="</span></a>";a.innerHTML=Math.round(PSP[n].totalCosts)+" kr"+h;f.innerHTML=(PSP[n].totalCosts/transactions).toFixed(2)+" kr"+h}};