export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _com_bccd_ewm = context.executeAction('/deeplinktomdkapp/Actions/com_bccd_ewm/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_com_bccd_ewm]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/deeplinktomdkapp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}