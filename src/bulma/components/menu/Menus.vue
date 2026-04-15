<template>
    <core-menus>
        <template #default="{ collapsed, organizeBindings, organizeEvents }">
            <collapse :show="!collapsed"
                class="menu-collapse">
                <ul class="menu-list">
                <draggable v-bind="organizeBindings"
                    handle=".handle"
                    v-on="organizeEvents">
                    <template #item="{ element }">
                        <li>
                            <menu-item :menu="element"/>
                            <menus :menus="element.children"
                                :collapsed="!element.expanded"
                                v-if="element.children"/>
                        </li>
                    </template>
                </draggable>
                </ul>
            </collapse>
        </template>
    </core-menus>
</template>

<script>
import Draggable from 'vuedraggable';
import { Collapse } from '@enso-ui/transitions';
import CoreMenus from '../../../core/components/menu/Menus.vue';
import MenuItem from './MenuItem.vue';

export default {
    name: 'Menus',

    components: { Collapse, CoreMenus, MenuItem, Draggable },
};
</script>

<style lang="scss" scoped>
    .menu-list {
        display: block;
        overflow: visible;
    }
</style>
