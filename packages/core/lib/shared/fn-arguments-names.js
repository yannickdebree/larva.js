"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_an_arrow_fn_1 = require("./is-an-arrow-fn");
function fnArgumentsNames(fn) {
    var params;
    if (is_an_arrow_fn_1.isAnArrowFn(fn)) {
        params = fn
            .toString()
            .replace(/\s*=>\s*\(*{.*/gs, '')
            .replace(/\(|\)/gm, '')
            .replace(/\s*/gm, '');
    }
    else {
        params = fn
            .toString()
            .replace(/[/][/].*$/gm, '')
            .replace(/\s+/g, '')
            .replace(/[/][*][^/*]*[*][/]/g, '')
            .split('){', 1)[0]
            .replace(/^[^(]*[(]/, '')
            .replace(/=[^,]+/g, '');
    }
    if (params !== '') {
        return params.split(',');
    }
    else {
        return [];
    }
}
exports.fnArgumentsNames = fnArgumentsNames;
