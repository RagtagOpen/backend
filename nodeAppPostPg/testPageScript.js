var remoteUrl = "http://localhost:8000";

var testZipCode = 60001;
var testAreaCode = 246;
var testDriverAreaCode = 346;
var needWheelchair = true;

function sendDriverForm() {
  var formData  = new FormData();
  var url = remoteUrl + '/driver';

  formData.append("IPAddress", "0.0.0.1");
  formData.append("DriverCollectionZIP", 60004); 
  formData.append("DriverCollectionRadius", 21); 
  formData.append("AvailableDriveTimesJSON", "after 11 am"); 

  formData.append("DriverCanLoadRiderWithWheelchair", false); 
  formData.append("SeatCount", 3);
  //formData.append("DriverHasInsurance", true); 
  //formData.append("DriverInsuranceProviderName", "ill. ins"); 
  //formData.append("DriverInsurancePolicyNumber", 1234);

  //formData.append("DriverLicenseState", 'MO');
  // formData.append("DriverLicenseState", 'MOii');
  formData.append("DriverLicenseNumber", '5678');
  formData.append("DriverFirstName", 'jim');
  formData.append("DriverLastName", 'nilsen');
  //formData.append("PermissionCanRunBackgroundCheck", true);

  formData.append("DriverEmail", 'jn@t.com');
  formData.append("DriverPhone", 
    // '246'
    (testDriverAreaCode++).toString()
    );
  //formData.append("DriverAreaCode", 123);
  //formData.append("DriverEmailValidated", false);              
  //formData.append("DriverPhoneValidated", true);

  formData.append("DrivingOnBehalfOfOrganization", false); 
  formData.append("DrivingOBOOrganizationName", 'none');
  formData.append("RidersCanSeeDriverDetails", false);
  formData.append("DriverWillNotTalkPolitics", true);
  formData.append("ReadyToMatch", false);

  formData.append("PleaseStayInTouch", true);

  var request = new XMLHttpRequest();

  request.open("POST", url);
  request.send(formData);
}

function sendRiderForm() {
  var formData  = new FormData();
  var url = remoteUrl + '/rider';

  formData.append("IPAddress", "0.0.0.3");
  formData.append("RiderFirstName", 'jim');
  formData.append("RiderLastName", 'nilsen');
  formData.append("RiderEmail", 'jn@t.com');

  formData.append("RiderPhone", 
    // '246'
    (testAreaCode++).toString()
    );
  formData.append("RiderAreaCode", 123);
  formData.append("RiderEmailValidated", false);
  formData.append("RiderPhoneValidated", true);
  //formData.append("RiderVotingState", 'MO');

  formData.append("RiderCollectionZIP", testZipCode++); // 60004 
  formData.append("RiderDropOffZIP", 60004); 
  formData.append("AvailableRideTimesJSON", "after 11 am");
  // formData.append("WheelchairCount", 2);
  // formData.append("NonWheelchairCount", 1);

  formData.append("TotalPartySize", 4);
  formData.append("TwoWayTripNeeded", false);
  formData.append("RiderPreferredContact", 1);
  formData.append("RiderIsVulnerable", false);
  formData.append("DriverCanContactRider", true);

  formData.append("RiderWillNotTalkPolitics", true);
  formData.append("ReadyToMatch", false);
  formData.append("PleaseStayInTouch", true);
  formData.append("NeedWheelchair", needWheelchair);
  if (needWheelchair == true) {
    needWheelchair = false;
  }
  else {
    needWheelchair = true;
  }

  var request = new XMLHttpRequest();

  request.open("POST", url);
  request.send(formData);
}

function sendHelperForm() {
  var formData  = new FormData();
  var url = remoteUrl + '/helper';

  formData.append("helpername", "jim");
  formData.append("helperemail", 'jn@t.com');
  formData.append("helpercapability", '{"able", "good sight"}');

  var request = new XMLHttpRequest();

  request.open("POST", url);
  request.send(formData);
}

function getUnmatchedDriversTest () {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:8000/unmatched-drivers", true);

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {

      if (xhr.status === 200) {
        var codes = JSON.parse(xhr.responseText);       
        console.log(xhr.responseText);

        codes.forEach(function (val) {
          var code = val;

          console.log(code);
        });
      } else {
        console.error(xhr.statusText);
      }
    }
  };

  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };

  xhr.send(null);
}

function cancelRideRequestTest() {
  var formData  = new FormData();
  // var url = remoteUrl + '/cancel-ride-request';
  var url = remoteUrl + '/cancel-ride-request?UUID=1e6e274d-ad33-4127-9f02-f35b48a07897&RiderPhone=123';
  var request = new XMLHttpRequest();

  // formData.append("UUID", "1e6e274d-ad33-4127-9f02-f35b48a07897");
  // formData.append("RiderPhone", '1');

  // request.open("POST", url);
  request.open("GET", url);
  request.send(formData);
}

function cancelRiderMatchTest() {
  var formData  = new FormData();
  var url = 
    remoteUrl + '/cancel-rider-match?' + 
    'UUID_driver=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&UUID_rider=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&Score=123' +
    '&RiderPhone=123';
  var request = new XMLHttpRequest();

  // formData.append("UUID", "1e6e274d-ad33-4127-9f02-f35b48a07897");
  // formData.append("RiderPhone", '1');

  // request.open("POST", url);
  request.open("GET", url);
  request.send(formData);
}

function cancelDriveOfferTest() {
  var formData  = new FormData();
  var url = 
    remoteUrl + '/cancel-drive-offer?' + 
    'UUID=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&DriverPhone=123';
  var request = new XMLHttpRequest();

  // formData.append("UUID", "1e6e274d-ad33-4127-9f02-f35b48a07897");
  // formData.append("DriverPhone", '1');

  // request.open("POST", url);
  request.open("GET", url);
  request.send(formData);
}

function cancelDriverMatchTest() {
  var formData  = new FormData();
  var url = 
    remoteUrl + '/cancel-driver-match?' + 
    'UUID_driver=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&UUID_rider=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&Score=123' +
    '&DriverPhone=123';
  var request = new XMLHttpRequest();

  // formData.append("UUID", "1e6e274d-ad33-4127-9f02-f35b48a07897");
  // formData.append("DriverPhone", '1');

  // request.open("POST", url);
  request.open("GET", url);
  request.send(formData);
}

function acceptDriverMatchTest() {
  var formData  = new FormData();
  var url = 
    remoteUrl + '/accept-driver-match?' + 
    'UUID_driver=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&UUID_rider=1e6e274d-ad33-4127-9f02-f35b48a07897' +
    '&Score=123' +
    '&DriverPhone=123';
  var request = new XMLHttpRequest();

  // formData.append("UUID", "1e6e274d-ad33-4127-9f02-f35b48a07897");
  // formData.append("DriverPhone", '1');

  // request.open("POST", url);
  request.open("GET", url);
  request.send(formData);
}
