/**
* @param {IClientAPI} clientAPI
*/

export default async function getMobileServiceToken(clientAPI) {
    const url = "https://bccd-dev-01.authentication.us10.hana.ondemand.com/oauth/token"; // Replace with actual SAP MDK token URL
    const requestBody = new URLSearchParams({
        "grant_type": "password",  // or "client_credentials" based on your setup
        "client_id": "sb-com-bccd-im-dev!t281445",
        "client_secret": "c4b9c509-adb5-48b3-b855-c057e940c1cd$g-TBWvg65-FbaiiaZzksA7KcQ_CxVp56NOqtWO9893g=",
        "username": "jrojas@bccdistribution.com",
        "password": "Ui5.goals.2024."
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("SAP MDK Token:", data.access_token);
        return data.access_token;
    } catch (error) {
        console.error("Error fetching SAP MDK Token:", error);
        return null;
    }
    
}