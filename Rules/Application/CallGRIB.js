/**
* @param {IClientAPI} context
*/
import { Application, Utils } from "@nativescript/core";

function openUrl(location) {
    if (Application.ios) {
        const url = NSURL.URLWithString(location.trim());
        if (UIApplication.sharedApplication.canOpenURL(url)) {
            return UIApplication.sharedApplication.openURLOptionsCompletionHandler(url, null, null);
        } else {
            return false;
        }
    } else {
        return Utils.openUrl(location);
    }
}

export default function CallGRIB(context) {

    return context.executeAction('/deeplinktomdkapp/Actions/Confirmation.action').then((result) => {
        if (result.data) {
            // This will open the SAP Mobile APP
            const url = "mdkclient-giwo://com.bccd.im";
            return openUrl(url);
        } else {
            return Promise.reject('User Deferred');
        }
    });
}