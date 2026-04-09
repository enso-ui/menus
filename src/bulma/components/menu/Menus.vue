<template>
    <core-menus>
        <template #default="{ parentMenuEvents, organizeBindings, organizeEvents, ref }">
            <ul class="menu-list"
                :ref="ref">
                <draggable v-bind="organizeBindings"
                    handle=".handle"
                    v-on="organizeEvents">
                    <template #item="{ element }">
                        <li>
                            <menu-item :menu="element"/>
                            <menus :menus="element.children"
                                :collapsed="!element.expanded"
                                v-on="parentMenuEvents"
                                v-if="element.children"/>
                        </li>
                    </template>
                </draggable>
            </ul>
        </template>
    </core-menus>
</template>

<script>
import Draggable from 'vuedraggable';
import CoreMenus from '../../../core/components/menu/Menus.vue';
import MenuItem from './MenuItem.vue';

export default {
    name: 'Menus',

    components: { CoreMenus, MenuItem, Draggable },
};
</script>

<style lang="scss" scoped>
    .menu-list {
        transition: height .333s ease;
        display: block;
        overflow-y: hidden;
        overflow-x: visible;
        margin: 0;

        li > ul {
            [dir='ltr'] & {
                margin: 0 0 0 .75rem;
                padding-left: 0;
            }
            [dir='rtl'] & {
                margin: 0 .75rem 0 0;
                padding-right: 0;
            }
        }
    }
</style>
