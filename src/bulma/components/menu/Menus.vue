<template>
    <core-menus>
        <template #default="{ collapsed, expandedSidebar, organizeBindings, organizeEvents }">
            <collapse :show="!collapsed"
                class="menu-collapse">
                <ul class="menu-list">
                <draggable v-bind="organizeBindings"
                    handle=".handle"
                    v-on="organizeEvents">
                    <template #item="{ element }">
                        <li v-tooltip="tooltip(expandedSidebar, element)">
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

    inject: ['i18n'],

    methods: {
        tooltip(expandedSidebar, menu) {
            return expandedSidebar ? null : {
                content: this.i18n(menu.name),
                placement: 'right',
                offset: [0, 10],
                delay: {
                    show: 80,
                    hide: 0,
                },
            };
        },
    },
};
</script>
