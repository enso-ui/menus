<script>
import { layout } from '@enso-ui/ui/src/pinia/layout';
import { hasActiveChild } from '../../../plugins/utils';
import { menu } from '../../../pinia/menu';

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
                menu().activate({ menu: this.menu, active });

                if (active) {
                    this.$nextTick(() => menu().refresh());
                }
            },
            immediate: true,
        },
    },

    methods: {
        select() {
            if (this.menu.children) {
                menu().toggle(this.menu);

                return;
            }

            this.$router.push({ name: this.menu.route })
                .catch(this.routerErrorHandler);

            if (layout().isTouch) {
                layout().hideSidebar();
            }
        },
    },

    render() {
        return this.$slots.default({
            menu: this.menu,
            editable: menu().editable,
            expandedSidebar: layout().sidebar.isExpanded,
            hasActiveChild: this.menu.children && hasActiveChild(this.menu),
            menuEvents: {
                click: this.select,
            },
        });
    },
};
</script>
