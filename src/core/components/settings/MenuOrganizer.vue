<script>
import { menu } from '../../../pinia/menu';

export default {
    name: 'MenuOrganizer',

    render() {
        const store = menu();

        return this.$slots.default({
            bindings: {
                modelValue: store.editable,
            },
            events: {
                'update:modelValue': value => store.edit(value),
            },
        });
    },
};

</script>
