<template>
    <div class="level is-mobile"
        v-if="canAccess('system.menus.organize')">
        <div class="level-left">
            <div class="level-item">
                <span class="menu-item-label">
                    {{ i18n('Organize Menus') }}
                </span>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <core-menu-organizer>
                    <template #default="{ bindings, events }">
                        <vue-switch v-bind="bindings"
                            v-on="events"/>
                    </template>
                </core-menu-organizer>
            </div>
        </div>
    </div>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import CoreMenuOrganizer from '../../../core/components/settings/MenuOrganizer.vue';

export default {
    name: 'MenuOrganizer',

    components: { CoreMenuOrganizer, VueSwitch },

    inject: ['canAccess', 'i18n'],
};
</script>
