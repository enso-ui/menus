<script>
import { menu } from '../../../pinia/menu';

export default {
    name: 'Sidebar',

    render() {
        const store = menu();

        return this.$slots.default({
            menus: store.menus,
        });
    },
};
</script>
