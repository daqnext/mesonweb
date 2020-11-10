export class ApiPath {
    //user
    static user_register_post = "/api/v1/user/register";
    static user_login_post = "/api/v1/user/login";
    static user_getVCode_post = "/api/v1/user/getvode";
    static user_userinfo_get = "/api/v1/user/userinfo";
    static user_getBalance_get = "/api/v1/user/getbalance";
    static user_getWalletAddress_get = "/api/v1/user/walletaddress";
    static user_walletQrcode_get ="/api/v1/user/walletqrcode"

    //admin
    static admin_queryuser_post = "/api/v1/admin/queryuser";
    static admin_walletjob_get = "/api/v1/admin/walletjob";
    static admin_getFileTransferInfo_post = "/api/v1/admin/getfiletransferinfo";

    //client
    static client_newDomain_post = "/api/v1/client/newdomain";
    static client_modifyDomainState_post = "/api/v1/client/modifydomainstate";
    static client_deleteDomain_post = "/api/v1/client/deletedomain";
    static client_getDomains_get = "/api/v1/client/getdomains";
    static client_getDepositRecord_post = "/api/v1/client/getdepositrecord";
    static client_traffic_post = "/api/v1/client/traffic";

    //terminal
    static terminal_getMachineInfo_post = "/api/v1/terminal/getmachineinfo";
    static termianl_profit_post = "/api/v1/profit"
    
    //common
    static common_regionPrice_get = "/api/v1/regionprice";
    static common_userType_get = "/api/v1/usertype";
}