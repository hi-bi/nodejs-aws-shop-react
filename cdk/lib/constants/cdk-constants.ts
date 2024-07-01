const appName = "ShopSite";
const taskNum = "511"

const DOMANE_NAME = "execute-api.eu-north-1.amazonaws.com"

const API_PATHS = {
    s3: `s3.${DOMANE_NAME}`,
    //product: "https://.execute-api.eu-west-1.amazonaws.com/dev",
    product: "https://3zrpqka4bc.execute-api.eu-north-1.amazonaws.com/prod/",
    order: "https://.execute-api.eu-west-1.amazonaws.com/dev",
    //import: "https://.execute-api.eu-west-1.amazonaws.com/dev",
    import: "https://rbj2isav50.execute-api.eu-north-1.amazonaws.com/prod/",
    bff: "https://.execute-api.eu-west-1.amazonaws.com/dev",
    cart: "https://.execute-api.eu-west-1.amazonaws.com/dev",
};
  
  

export {API_PATHS, appName, taskNum}