<script>
import { useStore } from '../../utils/pinia';

export default {
    name: 'MenuItem',

    inject: ['routerErrorHandler'],

    props: {
        menu: {
            type: Object,
            required: true,
        },
    },

    computed: {
        editable() {
            return useStore('menu').editable;
        },
        isTouch() {
            return useStore('layout').isTouch;
        },
        isExpanded() {
            return useStore('layout').sidebar.isExpanded;
        },
        active() {
            return this.menu.route !== null
                && (this.matchesName || this.matchesPath);
        },
        matchesName() {
            return this.$route.matched
                .map(matchedRoute => matchedRoute.name)
                .includes(this.menu.route);
        },
        matchesPath() {
            return this.$route.matched
                .map(matchedRoute => matchedRoute.path)
                .includes(this.path);
        },
        path() {
            return `/${this.menu.route.split('.').slice(0, -1).join('/')}`;
        },
    },

    watch: {
        active: {
            handler(active) {
                this.activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(this.refresh);
                }
            },
            immediate: true,
        },
    },

    methods: {
        hasActiveChild(menu) {
            return useStore('menu').hasActiveChild(menu);
        },
        hide() {
            useStore('layout').hideSidebar();
        },
        activate(payload) {
            useStore('menu').activate(payload);
        },
        toggle(menu) {
            useStore('menu').toggle(menu);
        },
        refresh() {
            useStore('menu').refresh();
        },
        select() {
            if (this.menu.children) {
                this.toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })
                .catch(this.routerErrorHandler);

            if (this.isTouch) {
                this.hide();
            }
        },
    },

    render() {
        return this.$slots.default({
            menu: this.menu,
            editable: this.editable,
            expandedSidebar: this.isExpanded,
            hasActiveChild: this.menu.children && this.hasActiveChild(this.menu),
            menuEvents: {
                click: this.select,
            },
        });
    },
};
</script>
