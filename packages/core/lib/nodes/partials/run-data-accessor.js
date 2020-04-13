"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../../kernel");
var shared_1 = require("../../shared");
var injectables_1 = require("./injectables");
function runDataAccessor(node, _dataAccessor) {
    if (_dataAccessor) {
        var injectablesIds = shared_1.fnArgumentsNames(_dataAccessor);
        var computedData = _dataAccessor.apply(void 0, injectables_1.translateInjectables(node, injectablesIds));
        if (!computedData) {
            kernel_1.throwNewError('Node data setting must always return an object.');
        }
        return computedData;
    }
    else {
        return {};
    }
}
exports.runDataAccessor = runDataAccessor;
