<script>
import { menu as useMenu } from '../../../pinia/menu';

export default {
    name: 'Menus',

    inject: ['errorHandler', 'http', 'route'],

    inheritAttrs: false,

    props: {
        menus: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        editable() {
            return useMenu().editable;
        },
        disabled() {
            return !this.editable;
        },
    },

    methods: {
        organize(payload) {
            useMenu().organizeMenus(payload);
        },
        persist() {
            this.http.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        },
    },

    render() {
        return this.$slots.default({
            collapsed: this.collapsed,
            organizeBindings: {
                modelValue: this.menus,
                disabled: this.disabled,
                itemKey: 'name',
            },
            organizeEvents: {
                'update:modelValue': this.organize,
                end: this.persist,
            },
        });
    },
};
</script>
