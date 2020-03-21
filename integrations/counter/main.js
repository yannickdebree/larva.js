const header = Snake.createComponent('header').setTemplate('<header>This is a header</header>');

const button = Snake.createComponent('button', () => {
    return {
        count: 0,
        more() {
            this.count++;
        },
        less() {
            if (this.count) {
                this.count--;
            }
        }
    }
}).setTemplate('<button s-on-click="more">+</button>{{count}}<button s-on-click="less">-</button>');

const main = Snake.createComponent('main').registerChildComponents(button).setTemplate('<main><p>lorem ipsum</p><s-button></s-button></main>');

const app = snake("#snake-app")
    .registerChildComponents(header, main)
    .setTemplate(`
        <s-header></s-header>
        <s-main></s-main>
    `)
    .render();