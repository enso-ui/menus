<script>
import { layout as useLayout } from '@enso-ui/ui/src/pinia/layout';
import { menu as useMenu } from '../../../pinia/menu';

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
            return useMenu().editable;
        },
        isTouch() {
            return useLayout().isTouch;
        },
        isExpanded() {
            return useLayout().sidebar.isExpanded;
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
            return useMenu().hasActiveChild(menu);
        },
        hide() {
            useLayout().hideSidebar();
        },
        activate(payload) {
            useMenu().activate(payload);
        },
        toggle(menu) {
            useMenu().toggle(menu);
        },
        refresh() {
            useMenu().refresh();
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
