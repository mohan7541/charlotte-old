var baseURL="http://ec2-13-58-105-249.us-east-2.compute.amazonaws.com:8092";

function addUser(){
   
    var profileData ={};
  
    profileData['firstName']= $('#firstName').val();
    profileData['lastName']= $('#lastName').val();
    profileData['email']= $('#email').val();
    profileData['password']= $('#password').val();
    profileData['location']= $('#location').val();
    profileData['enabled']= $('#enabled').val();
    profileData['profilePhoto']= null;
    profileData['roles']= [];
    
    $.ajax({
    url: baseURL+'/user/create',
    type: 'post',
    contentType: "application/json",
    data: JSON.stringify(profileData),
    headers: {
        
    },
    success: function (data){
        Swal.fire('User Created')
    },
    error: function (data){
        Swal.fire('User Creation Failed', data.responseJSON.message, 'error')
    }});
    
}
function addLocation(){
   
    var locationData ={};
    var geoPointData ={};
  
    locationData['locationId']= $('#locationId').val();
    locationData['address1']= $('#address1').val();
    locationData['address2']= $('#address2').val();
    locationData['pincode']= parseInt( $('#pincode').val());
    geoPointData['pointX'] =parseInt($('#latitude').val());
    geoPointData['pointY'] =parseInt($('#longitude').val());
    locationData['geoPoint']=geoPointData;
    
    
    
    $.ajax({
    url: baseURL+'/location/create',
    type: 'post',
    contentType: "application/json",
    data: JSON.stringify(locationData),
    headers: {
        
    },
    success: function (data){
        Swal.fire('Location Created')
    },
    error: function (data){
        Swal.fire('Location Creation Failed', data.responseJSON.message, 'error')
    }});
    
}