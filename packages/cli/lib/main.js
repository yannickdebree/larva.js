#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commands_1 = require("./commands");
var kernel_1 = require("./kernel");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var command, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    command = process.argv[2];
                    if (!commands_1.buildRgx().test(command)) return [3 /*break*/, 1];
                    commands_1.build();
                    return [3 /*break*/, 9];
                case 1:
                    if (!commands_1.createRgx().test(command)) return [3 /*break*/, 2];
                    commands_1.create();
                    return [3 /*break*/, 9];
                case 2:
                    if (!commands_1.helpRgx().test(command)) return [3 /*break*/, 4];
                    return [4 /*yield*/, commands_1.help()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 4:
                    if (!commands_1.serveRgx().test(command)) return [3 /*break*/, 5];
                    commands_1.serve();
                    return [3 /*break*/, 9];
                case 5:
                    if (!commands_1.versionRgx().test(command)) return [3 /*break*/, 7];
                    return [4 /*yield*/, commands_1.version()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7:
                    if (command) {
                        kernel_1.info("Unknow command : " + command);
                    }
                    return [4 /*yield*/, commands_1.help()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    err_1 = _a.sent();
                    kernel_1.warn(err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
main();
