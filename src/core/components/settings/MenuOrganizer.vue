<script>
import { useStore } from '../../../utils/pinia';

export default {
    name: 'MenuOrganizer',

    methods: {
        edit(value) {
            useStore('menu').edit(value);
        },
    },

    render() {
        return this.$slots.default({
            bindings: {
                modelValue: useStore('menu').editable,
            },
            events: {
                'update:modelValue': this.edit,
            },
        });
    },
};

</script>
