const app = Vue.createApp({
    data: () => ({
        title: 'Gradient',
        firstColor: '#0400d6',
        secondColor: '#fafafa',
        orientation: 1,
    }),

    computed: {
        setColor() {
            const orientation = ['to right', 'to left', 'to top', 'to bottom'];
            return `background: linear-gradient(${orientation[this.orientation -1]}, ${this.firstColor}, ${this.secondColor});`;
        },
    }
});