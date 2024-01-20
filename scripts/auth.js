

// Imports
var HttpRequestHeader = Java.type("org.parosproxy.paros.network.HttpRequestHeader")
var HttpHeader = Java.type("org.parosproxy.paros.network.HttpHeader")
var URI = Java.type("org.apache.commons.httpclient.URI")
var ScriptVars = Java.type('org.zaproxy.zap.extension.script.ScriptVars');




function authenticate(helper, paramsValues, credentials) {

  print("---- authentication script has started ----\n");

  var loginUri = new URI(paramsValues.get("loginUrl"), false);

  // form 
  //var requestBody  = "username="   + encodeURIComponent(credentials.getParam("username"));
  //requestBody += "&password="  + encodeURIComponent(credentials.getParam("password"));

  var requestBodyJson = {
    "email": credentials.getParam("username"),
    "password": credentials.getParam("password")
  };

  // Perform a POST request to authenticate
  var post = helper.prepareMessage();
  post.setRequestHeader(new HttpRequestHeader(HttpRequestHeader.POST, loginUri, HttpHeader.HTTP10));
  post.setRequestBody(JSON.stringify(requestBodyJson));
  post.getRequestHeader().setContentLength(post.getRequestBody().length());
  // set header content type to application/json
  post.getRequestHeader().setHeader("Content-Type", "application/json");
  helper.sendAndReceive(post);

  // check if the response is a redirect
  var responseCode = post.getResponseHeader().getStatusCode();

  if (responseCode == 200) {
    print("Authentication succeeded\n");
    
    // get object from response body json
    var respJson = JSON.parse(post.getResponseBody().toString());
    var accessToken =   respJson['accessToken'];
    var refreshToken =  respJson['refreshToken'];

    print("Access Token: " + accessToken + "\n");
    print("Refresh Token: " + refreshToken + "\n");

    // save tokens to script variables


    
    ScriptVars.setGlobalVar("accessToken", accessToken);
    ScriptVars.setGlobalVar("refreshToken", refreshToken);


    print("---- authentication script has finished ----\n");

    return post;
  }


  print("---- authentication script has finished ----\n");
  return post;
}

function getRequiredParamsNames() {
  return ["loginUrl"];
}

function getOptionalParamsNames() {
  return [];
}

function getCredentialsParamsNames() {
  return ["username", "password"];
}