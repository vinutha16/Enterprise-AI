let writeFile = require('fs').writeFile;
require('dotenv').config();
let apiEndpointURL = process.env.APIENDPOINT_URL;


let targetPath;
targetPath = './src/appconfig.ts';


const envmtConfigFile = `export class AppSettings {
    public static API_ENDPOINT = '${apiEndpointURL}';
}`


writeFile(targetPath, envmtConfigFile, function (err) {
    if (err) {
        console.log('write file err', err);
    } else {
        console.log('dynamic env config variables', envmtConfigFile);
    }
});