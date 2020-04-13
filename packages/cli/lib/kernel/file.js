"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var logger_1 = require("./logger");
function getPackageFile() {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.resolve(__dirname, '../../package.json'), 'utf8', function (err, file) {
            if (err) {
                reject(err.message);
            }
            var packageFile = JSON.parse(file);
            if (packageFile) {
                resolve(packageFile);
            }
            else {
                reject("package.json file doesn't exists !");
            }
        });
    })
        .then(function (packageFile) { return packageFile; })
        .catch(function (err) {
        logger_1.warn(err);
    });
}
exports.getPackageFile = getPackageFile;
