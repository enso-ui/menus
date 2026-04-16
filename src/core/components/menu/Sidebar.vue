<script>
import { menu as useMenu } from '../../../pinia/menu';

export default {
    name: 'Sidebar',

    render() {
        const menu = useMenu();

        return this.$slots.default({
            menus: menu.menus,
        });
    },
};
</script>
