
//For Demo Purpose Only, HardCoded Users Derek & Louis
function login(){
    /*
     *  https://jwt.io/    Basic Sample Payload
        {
          "email": "dmak@99bridges.com",
          "name": "Derek Mak",
          "role": "operator",
          "iat": 1516239022
        }
     * 
     */
    if($('#loginEmail').val() === 'dmak@99bridges.com' && $('#loginPassword').val() === '99Bridg3s' ){
        localStorage['jwtToken'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRtYWtAOTlicmlkZ2VzLmNvbSIsIm5hbWUiOiJEZXJlayBNYWsiLCJyb2xlIjoib3BlcmF0b3IiLCJpYXQiOjE1MTYyMzkwMjJ9.wKEMAZtNyIL0zjJR5sdOgqGH-kaTNoJYBwcBMil4-v4";
        $(location).attr('href','index.html');
    }else if($('#loginEmail').val() === 'lchang@99bridges.com' && $('#loginPassword').val() === '99Bridg3s' ){
        localStorage['jwtToken'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxjaGFuZ0A5OWJyaWRnZXMuY29tIiwibmFtZSI6IkxvdWlzIENoYW5nIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.GiSXzok2hvogstBEjMUm7AG5yyui8Ogfpil2lvRPzRM";
        $(location).attr('href','index.html');
    } 
    
    
}
function logout(){
    $(location).attr('href','login.html');
    localStorage['jwtToken'] = "";
}
function parseJWT (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function menuRBAC(role){
    console.log("RBAC ROLE : "+role);
    if(role === 'operator'){
        $("#linkSalesDashboard").css({"display": "block"});
        $("#linkOnboarding").css({"display": "block"});
    }else if(role === 'user'){
        $("#linkSalesDashboard").css({"display": "none"});
        $("#linkOnboarding").css({"display": "none"});
    }
}

function dashboardMainOnLoad(){
    var userJwtJson = "";

    try{
    userJwtJson = parseJWT(localStorage['jwtToken']);
    $("#profileUserNameLeftPanel").html( userJwtJson.name +'<b class="caret"></b>');  
    
    // Demo Only
    if(userJwtJson.email == 'dmak@99bridges.com'){
        $('#imgAvathar').attr('src','assets/img/faces/DerekMak.jpg');
    }else if(userJwtJson.email == 'lchang@99bridges.com'){
        $('#imgAvathar').attr('src','assets/img/faces/LouisChang.jpg');
    }
    }catch(err){console.log(err);}
    menuRBAC(userJwtJson.role);
}

function loadPage(pageName){
    
    switch(pageName){
        case 'community':
            $.get("pages/community.html", function(data, status){
                $("#mainContainerDiv").html( data );  
                activeSideBarSelection(0);
                $("#mainContainerDiv").css({"margin-top":"70px", "padding":"0px"});
                dashboardMainOnLoad();
                $('#minibarBtn').click();
                loadCommunityCharts();
            });       
        break;
         case 'people':
            $.get("widgets/people-landing.html", function(data, status){
                $("#mainContainerDiv").html( data );  
                activeSideBarSelection(1);
                $("#mainContainerDiv").css({"margin-top":"70px", "padding":"10px"});
            });       
        break;
        case 'dashboard':
            $.get("widgets/dashboard.html", function(data, status){
                $("#mainContainerDiv").html( data );  
                activeSideBarSelection(0);
                $("#mainContainerDiv").css({"margin-top":"70px", "padding":"10px"});
                /*loadMyDashboardRounds(100,"rgb(255,165,0)","#87D4F9","500 tons","myScoreRingChart1");
                loadMyDashboardRounds(100,"rgb(30,144,255)","#87D4F9","50,000 pmts","myScoreRingChart2");
                loadMyDashboardRounds(100,"rgb(107,142,35)","#87D4F9","$456","myScoreRingChart3");
                loadMyDashboardRounds(100,"#22e6b9","#7525b9","35000","myScoreRingChart4");
                loadMyDashboardRounds(100,"#8450ac","#87D4F9","135,000","myScoreRingChart5");
                loadMyDashboardRounds(100,"#f670cl","#32defd","5,000","myScoreRingChart6");*/
                
                
                

                loadChartRound(500,"rgb(255,165,0)","#87D4F9","500","tons","myScoreRingChart1");
                loadChartRound(50000,"rgb(30,144,255)","#87D4F9","50,000","pmts","myScoreRingChart2");
                loadChartRound(456,"rgb(107,142,35)","#87D4F9","456","$","myScoreRingChart3");
                loadChartRound(35000,"#22e6b9","#7525b9","35,000","","myScoreRingChart4");
                loadChartRound(135000,"#8450ac","#87D4F9","13,5000","","myScoreRingChart5");
                loadChartRound(5000,"#f670cl","#32defd","5,000","","myScoreRingChart6");

                //plotMyActivityRing();
           //     loadCommunityCharts();
           //     loadMyStatPolarChart();
                //$('#minibarBtn').click();
            });       
        break;
        case 'places':
            $.get("widgets/place-landing.html", function(data, status){
                $("#mainContainerDiv").html( data );  
                activeSideBarSelection(3);
                $("#mainContainerDiv").css({"margin-top":"70px", "padding":"10px"})
                
            });
        break;
         case 'things':
            $.get("widgets/things-landing.html", function(data, status){
                $("#mainContainerDiv").html( data );  
                activeSideBarSelection(2);
                $("#mainContainerDiv").css({"margin-top":"70px", "padding":"10px"})
                
            });
        break;
    }
    
 }
 
 function activeSideBarSelection(index){
     $('#ulNavSideBar li').each(function(i){
        $(this).removeClass("active"); 
     });
     $( "#ulNavSideBar li" ).eq( index ).addClass("active");
 }
 
 
 function updateSignUpHeaderTitle(role){
     var title = role + " Sign Up";
     $('#signUpCardTitle').html(title);
 }
 
 function updateOnboardingHeaderTitle(role){
     var title = role + " Onboarding";
     $('#signUpCardTitle').html(title);
 }
 
 function refillPlusMinus(elem,action){
            var nElem = $(elem).parent().get( 0 );
            var currentValue = $(nElem).prev().html();
            currentValue = parseInt(currentValue); 
            
            if(action == 'add'){
                currentValue++;
            }else{
                if( currentValue >0){
                   currentValue--;
                 }
            }
            
            $(nElem).prev().html(currentValue);
           
        };
        
 function showNotifications(type, message){
     $.notify({
      icon: "add_alert",
      message: message

    }, {
      type: type,
      timer: 3000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
 }       
 
 function getNextThreeDays(){
    let days = [];
    let daysRequired = 3

    for (let i = 1; i <= daysRequired; i++) {
      days.push( moment().add(i, 'days').format('ddd, Do') )
    }

    return days;
 }
 
 function getNextThreeDaysDropDown(){
     var ddTemplate = '<select class="selectpicker" onChange="getOrderDateDDValue(this);" data-style="select-with-transition" id="next4DaysDD" title="Choose Date" data-size="7">'+
                       '<option>Today</option>';
     var days = getNextThreeDays();
     for( var i=0;i<days.length;i++){
         ddTemplate += "<option>"+days[i]+"</option>";
     }
     ddTemplate+="</select>";
     var ddTimeTemplate = '<select class="selectpicker" onChange="getOrderScheduleDDValue(this);" data-style="select-with-transition" id="timeWindo" title="Choose Pickup Window" data-size="7">'+
             '<option>08:00am - 10:00pm</option>'+
             '<option>10:00am - 12:00pm</option>'+
             '<option>12:00pm - 02:00pm</option>'+
             '<option>02:00pm - 04:00pm</option>'+
             '<option>04:00pm - 06:00pm</option>'+
             '<option>06:00pm - 08:00pm</option>'+
             '<option>08:00pm - 10:00pm</option>'+
             '</select>';
     return ddTemplate+ddTimeTemplate;
 }
 /*function getNextThreeDaysTable(){
     var tableTemplate = '<table class="table"><tr id="datesRow"></tr></table>';
     var days = getNextThreeDays();
     for( var i=0;i<days.length;i++){
         var 
     }
     
 }*/
 function getOrderDateDDValue(sel) {
  console.log(sel.options[sel.selectedIndex].text);
  $('#scheduleDate').html(sel.options[sel.selectedIndex].text)
}
 function getOrderScheduleDDValue(sel) {
  console.log(sel.options[sel.selectedIndex].text);
  $('#scheduleLabel').html(sel.options[sel.selectedIndex].text)
}
 function getPaymentValue(sel) {
  console.log(sel.value);
  if(sel.value === 'applePay'){
      var row='<img style="width: 36px;height: 36px" src="assets/img/apple-pay.png" alt=""/> Apple Pay';
      $('#selectedPayment').html(row);        
  }else{
     var row='<img style="width: 36px;height: 36px" src="assets/img/visa.png" alt=""/> **** 3241';
      $('#selectedPayment').html(row); 
  }
  
}

function loadCommunityCharts(){
    try{
        new Chartist.Bar("#impactChart", {
          labels: ['REFILL', 'REUSE', 'RECYCLE'],
          series: [20, 60, 50]
        }, {
          distributeSeries: true,
           horizontalBars: true,
        });
    }catch(err){
        
    }
    
    try{
        new Chartist.Line('#monthlyStatChart', {
          labels: ['Nov 19', 'Dec 19', 'Jan 20', 'Feb 20', 'Mar 20'],
          series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
          ]
        }, {
          fullWidth: true,
          chartPadding: {
            right: 40
          }
        });
    }catch(err){}
}

function showAdvertisementPanel(){
    //md.showNotification('bottom','center')
    //type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    //color = Math.floor((Math.random() * 6) + 1);

    $.notify({

      //icon: "announcement",
      //message: '<img src="assets/img/dasani.png"> <b>50% off</b> 24 pack water'
      message: '<img src="assets/img/ad/shorty-ad.png" style="width:320px;height:58px;">'

    }, {
      type: '',
      timer: 60000,
      placement: {
        from: 'bottom',
        align: 'center'
      }
    });
}

function plotMyActivityRing(){
    var data = [
			{primaryColor: "rgb(107,142,35)", secondaryColor: "rgb(107,142,35,0.2)", progress: "90", labelText: "Reuse"},
			{primaryColor: "rgb(30,144,255)", secondaryColor: "rgb(30,144,255,0.2)", progress: "80", labelText: "Recycle"},
			{primaryColor: "rgb(255,165,0)", secondaryColor: "rgb(255,165,0,0.2)", progress: "95", labelText: "Refill"},
		];

		$("#myActivityRingChart").radialBar({
			data: data,
			width: "350",
			height: "350",
			strokeWidth: 12,
		});
}
function plotHeatMap(){
    $(function(){
  $.getJSON('json/recycle-us-map.json', function(data){
    var val = 2020;
        statesValues = jvm.values.apply({}, jvm.values(data.states)),
        metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
        metroRecycleValues = Array.prototype.concat.apply([], jvm.values(data.metro.recycle));

    $('#world-map-gdp').vectorMap({
      map: 'us_aea',
      markers: data.metro.coords,
      series: {
        markers: [{
          attribute: 'fill',
          scale: ['#FEE5D9', '#A50F15'],
          values: data.metro.recycle[val],
          min: jvm.min(metroRecycleValues),
          max: jvm.max(metroRecycleValues)
        },{
          attribute: 'r',
          scale: [5, 20],
          values: data.metro.population[val],
          min: jvm.min(metroPopValues),
          max: jvm.max(metroPopValues)
        }],
        regions: [{
          scale: ['#DEEBF7', '#08519C'],
          attribute: 'fill',
          values: data.states[val],
          min: jvm.min(statesValues),
          max: jvm.max(statesValues)
        }]
      },
      onMarkerTipShow: function(event, label, index){
        label.html(
          '<b>'+data.metro.names[index]+'</b><br/>'+
          '<b>Population: </b>'+data.metro.population[val][index]+'</br>'+
          '<b>Sustainability rate: </b>'+data.metro.recycle[val][index]+'%'
        );
      },
      onRegionTipShow: function(event, label, code){
        label.html(
          '<b>'+label.html()+'</b></br>'+
          '<b>Recycle rate: </b>'+data.states[val][code]+'%'
        );
      }
    });

    var mapObject = $('#world-map-gdp').vectorMap('get', 'mapObject');

    $("#slider").slider({
      value: val,
      min: 2020,
      max: 2024,
      step: 1,
      slide: function( event, ui ) {
        val = ui.value;
        mapObject.series.regions[0].setValues(data.states[ui.value]);
        mapObject.series.markers[0].setValues(data.metro.recycle[ui.value]);
        mapObject.series.markers[1].setValues(data.metro.population[ui.value]);
      }
    });
  });
});
}
function loadColoredRoundLineChart(){
     dataColouredRoundedLineChart = {
        labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
        series: [
          [287, 480, 290, 554, 690, 690, 500, 752, 650, 900, 944]
        ]
      };

      optionsColouredRoundedLineChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
        }),
        axisY: {
          showGrid: true,
          offset: 40
        },
        axisX: {
          showGrid: false,
        },
        low: 0,
        high: 1000,
        showPoint: true,
        height: '300px'
      };


      var colouredRoundedLineChart = new Chartist.Line('#colouredRoundedLineChart', dataColouredRoundedLineChart, optionsColouredRoundedLineChart);

      md.startAnimationForLineChart(colouredRoundedLineChart);
}
function loadMultipleBarsChart(){
    var dataMultipleBarsChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
        ]
      };

      var optionsMultipleBarsChart = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '300px'
      };

      var responsiveOptionsMultipleBarsChart = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }]
      ];

      var multipleBarsChart = Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

      //start animation for the Emails Subscription Chart
      md.startAnimationForBarChart(multipleBarsChart);
    }
    function loadPieChart(){
        var dataPreferences = {
        labels: ['62%', '32%', '6%'],
        series: [62, 32, 6]
      };

      var optionsPreferences = {
        height: '230px'
      };

      Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
    }
function loadRoundedBarChart(){
    dataColouredBarsChart = {
        labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
        series: [
          [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
          [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647],
          [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509]
        ]
      };

      optionsColouredBarsChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
        }),
        axisY: {
          showGrid: true,
          offset: 40
        },
        axisX: {
          showGrid: false,
        },
        low: 0,
        high: 1000,
        showPoint: true,
        height: '300px'
      };


      var colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart, optionsColouredBarsChart);

      md.startAnimationForLineChart(colouredBarsChart);

}
  
  
