
var ScriptVars = Java.type('org.zaproxy.zap.extension.script.ScriptVars');

function extractWebSession(sessionWrapper) {
	// parse the authentication response
	var json = JSON.parse(sessionWrapper.getHttpMessage().getResponseBody().toString());
	var token = json.accessToken;
    var refreshToken = json.refreshToken;
	// save the authentication token
	sessionWrapper.getSession().setValue("accessToken", token);
	ScriptVars.setGlobalVar("accessToken", token);
    ScriptVars.setGlobalVar("refreshToken", refreshToken);
}
    	
function clearWebSessionIdentifiers(sessionWrapper) {
	var headers = sessionWrapper.getHttpMessage().getRequestHeader();
	headers.setHeader("Authorization", null);
	ScriptVars.setGlobalVar("accessToken", null);
}
    	
function processMessageToMatchSession(sessionWrapper) {
	var token = sessionWrapper.getSession().getValue("accessToken");
	var msg = sessionWrapper.getHttpMessage();
	msg.getRequestHeader().setHeader("Authorization", "Bearer " + token);	
}

function getRequiredParamsNames() {
	return [];
}

function getOptionalParamsNames() {
	return [];
}