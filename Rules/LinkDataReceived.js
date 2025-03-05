/**
* Describe this function...
* @param {IClientAPI} context
*/

export default function LinkDataReceived(context) {
    context.getLogger().log(`Link Data Received Triggered`,'Info');
    let linkData = context.getAppEventData();
    let data;

    try {
        data = JSON.parse(linkData);
    } catch (error) {
        return null;
    }

    let splitURL = data.URL.split('/');
    let action = splitURL[3];
    let entity = splitURL.length > 4 ? splitURL[4] : '';

    switch (action) {
        case 'search':
            if (entity === 'Delivery') {
                
            }
            break;
        case 'Delivery':
            if (data.Parameters && data.Parameters.id) {
                return openDeliveryByID(context, data.Parameters.id);
            }
            break;
        default:
            context.getLogger().log(`Unrecognized Link Path ${data.URL}`,'Error');
            break;
    }
}

function openDeliveryByID(context, id) {
    context.getLogger().log(`ID: ${id}`,'Debug');
    return context.read('/deeplinktomdkapp/Services/com_bccd_ewm.service', `Delivery(${id})`, [], null).then(function (result) {
        if (result.length) {
            context.getPageProxy().setActionBinding(result.getItem(0));
            return context.getPageProxy().executeAction('/deeplinktomdkapp/Actions/com_bccd_ewm/Deliveries/NavToDelivery_Detail.action');
        }
    });
};