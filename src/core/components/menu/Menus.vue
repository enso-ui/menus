<script>
import { menu } from '../../../pinia/menu';

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

    methods: {
        persist() {
            this.http.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        },
    },

    render() {
        const store = menu();

        return this.$slots.default({
            collapsed: this.collapsed,
            organizeBindings: {
                modelValue: this.menus,
                disabled: !store.editable,
                itemKey: 'name',
            },
            organizeEvents: {
                'update:modelValue': payload => store.organizeMenus(payload),
                end: this.persist,
            },
        });
    },
};
</script>
