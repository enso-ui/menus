<template>
    <core-menu-item v-bind="$attrs">
        <template #default="{ menu, editable, expandedSidebar, hasActiveChild, menuEvents }">
            <div class="menu-item"
                v-scroll-into-view="{
                    scroll: menu.active && !menu.children,
                    block: 'nearest',
                    inline: 'nearest',
                    behavior: 'smooth',
                }">
                <a class="menu-item-link"
                    :class="{
                        'is-active': menu.active || hasActiveChild,
                        'is-collapsed': !expandedSidebar
                    }"
                    v-on="menuEvents">
                    <span class="icon menu-item-icon">
                        <fa class="handle"
                            fixed-width
                            :icon="faGripLines"
                            v-if="editable"/>
                        <fa fixed-width
                            :icon="menu.icon"
                            v-else/>
                    </span>
                    <span class="menu-item-label"
                        :class="{ 'is-collapsed': !expandedSidebar }">
                        {{ i18n(menu.name) }}
                    </span>
                    <span class="menu-arrow"
                        :class="{ 'is-collapsed': !expandedSidebar }"
                        v-if="menu.children">
                        <dropdown-indicator
                            class="is-compact"
                            :open="menu.expanded"/>
                    </span>
                </a>
            </div>
        </template>
    </core-menu-item>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import { scrollIntoView } from '@enso-ui/directives';
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

export default {
    name: 'MenuItem',

    inheritAttrs: false,

    components: {
        CoreMenuItem, DropdownIndicator, Fa,
    },

    directives: { scrollIntoView },

    inject: ['i18n'],

    data: () => ({
        faGripLines,
    }),
};
</script>
