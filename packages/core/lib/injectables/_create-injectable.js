"use strict";
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
                return injectablesIds.slice();
            }
        };
    });
}
exports.createInjectable = createInjectable;
