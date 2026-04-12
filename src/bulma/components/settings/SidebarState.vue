<template>
    <core-sidebar-state>
        <template #default="{ bindings, events }">
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        {{ i18n('Expanded Menu') }}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <vue-switch v-bind="bindings"
                            v-on="events"/>
                    </div>
                </div>
            </div>
        </template>
    </core-sidebar-state>
</template>

<script>
import VueSwitch from '@enso-ui/switch/bulma';
import { SidebarState as CoreSidebarState } from '@enso-ui/ui/renderless/components/settings';

export default {
    name: 'SidebarState',

    components: { CoreSidebarState, VueSwitch },

    inject: ['i18n'],
};
</script>
