"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../shared");
function createInjectable(id, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        var injectablesIds = new Array();
        if (dataAccessor) {
            injectablesIds.push.apply(injectablesIds, shared_1.fnArgumentsNames(dataAccessor));
        }
        return {
            id: function () {
                return id;
            },
            dataAccessor: function () {
                return dataAccessor;
            },
            injectablesIds: function () {
                return __spreadArrays(injectablesIds);
            }
        };
    });
}
exports.createInjectable = createInjectable;
