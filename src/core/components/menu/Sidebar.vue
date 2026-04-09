<script>
import { useStore } from '../../utils/pinia';

export default {
    name: 'Sidebar',

    render() {
        return this.$slots.default({
            menus: useStore('menu').menus,
        });
    },
};
</script>
