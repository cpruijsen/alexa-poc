var lyftMethods = require('./lyftPrivateMethods');
var baseURL = 'https://api.lyft.com/v1/'; // on which path is added.

// TODO: database posts in each response -- with generic key naming.

var lyftPhoneAuth = function(phoneNumberString) {
  var url = baseURL + lyftMethods.phoneAuth.path;
  var headers = lyftMethods.phoneAuth.headers; // or headers() ?
  var body = lyftMethods.phoneAuth.body(phoneNumberString);

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then( function(res) {
    return res.json();
  }).then( function(data) {
    console.log('successful phoneNumber post LYFT', data);
    // response irrelevant unless we pass through session

    // the responseMethod function returns an object with the parameters we need for subsequent operations only, and in a key-name generalised manner.
    // var responseObject = lyftMethods.phoneAuth.responseMethod(data);
    // DB post.
  }).catch( function(err) {
    console.log('error post of phoneNumber LYFT', err);
  });
};

// NOTE: userLocation should come from the user client // Alexa.
var lyftPhoneCodeAuth = function(phoneNumber, fourDigitCode, session, userLocation) {

  userLocation = userLocation || null; // pass through userLocation if we have one, otherwise use randomly generated location.

  var url = baseURL + lyftMethods.phoneCodeAuth.path;
  var headers = lyftMethods.phoneCodeAuth.headers(session);
  var body = lyftMethods.phoneCodeAuth.body(phoneNumber, fourDigitCode, userLocation);

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then( function(res) {
    return res.json();
  }).then( function(data) {
    console.log('successful phoneCodeAuth post LYFT', data);

    // TODO: DB POST // responseObject.dbUserProps (email, name etc.)
    var responseObject = lyftMethods.phoneCodeAuth.responseMethod(data);

  }).catch( function(err) {
    console.log('error post of phoneCodeAuth LYFT', err);
  });
};
 // origin {startLat, startLng, startAddress}
 // destination {endLat, endLng, endAddress}
var getCost = function(token, session, origin, destination) {
  var url = baseURL + lyftMethods.getCost.path(origin, destination);
  var headers = lyftMethods.getCost.headers(token, session);
  // note: no body.

  fetch(url, {
    method: 'POST',
    headers: headers
  }).then( function(res) {
    return res.json();
  }).then( function(data) {
    console.log('successful getCost post LYFT', data);

    // TODO: DB POST
    var responseObject = lyftMethods.getCost.responseMethod(data);
    // do something with responseObject.tripDuration ?
    // return requestRide(token, session, responseObject.costToken, destination, origin, paymentInfo, partySize); // this is the next step
  }).catch( function(err) {
    console.log('error post of getCost LYFT', err);
  });

};

var requestRide = function(token, session, costToken, destination, origin, paymentInfo, partySize) {
  var url = baseURL + lyftMethods.requestRide.path;
  var headers = lyftMethods.requestRide.headers(token, session);
  var body = lyftMethods.requestRide.body(costToken, destination, origin, paymentInfo, partySize);

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }).then( function(res) {
    return res.json();
  }).then( function(data) {
    console.log('successful requestRide post LYFT', data);

    // TODO: DB POST
    var responseObject = lyftMethods.requestRide.responseMethod(data);
    // next step?
  }).catch( function(err) {
    console.log('error post of requestRide LYFT', err);
  });
};
