<script>
import { menu as useMenu } from '../../../pinia/menu';

export default {
    name: 'MenuOrganizer',

    methods: {
        edit(value) {
            useMenu().edit(value);
        },
    },

    render() {
        const menu = useMenu();

        return this.$slots.default({
            bindings: {
                modelValue: menu.editable,
            },
            events: {
                'update:modelValue': this.edit,
            },
        });
    },
};

</script>
