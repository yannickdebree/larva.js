snake("#snake-app-1", function () {
    return {
        count: 0,
        more: function () {
            this.count++;
        },
        less: function () {
            this.count--;
        }
    }
})
    .setTemplate(`
        <button s-on-click="more">+</button>
            {{count}}
        <button s-on-click="less">-</button>
    `)
    .render();



// snake("#snake-app-2", function () {
//     return {
//         term: '',
//         onKeyUp: function ($event) {
//             console.log($event.target.value);
//             this.term = $event.target.value;
//         }
//     }
// })
//     .setTemplate(`
//         <input type="text" s-on-keyup="onKeyUp"/>
//         {{term}}
//     `)
//     .render();