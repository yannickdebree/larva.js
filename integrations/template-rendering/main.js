const app = snake("#snake-app", function () {
    return {
        count: 0,
        more() {
            this.count++;
        },
        less() {
            this.count--;
        }
    }
})
    .setTemplate(`<button s-on-click="more">+</button>{{count}}<button s-on-click="less">-</button>`)
    .render();