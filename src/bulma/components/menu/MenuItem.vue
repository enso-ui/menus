<template>
    <core-menu-item>
        <template #default="{ menu, editable, expandedSidebar, hasActiveChild, menuEvents }">
            <div class="menu-item">
                <a class="menu-item-link"
                    :class="{
                        'is-active': menu.active,
                        'is-collapsed': !expandedSidebar
                    }"
                    v-tooltip="collapsedTooltip(expandedSidebar, menu)"
                    v-on="menuEvents">
                    <span class="icon menu-item-icon"
                        :class="{ 'is-opaque': !menu.active && !hasActiveChild }">
                        <fa class="handle"
                            fixed-width
                            :icon="faGripLines"
                            v-if="editable"/>
                        <fa fixed-width
                            :icon="menu.icon"
                            v-else/>
                    </span>
                    <span class="menu-item-label"
                        :class="{ 'is-opaque': !menu.active && !hasActiveChild }"
                        v-if="expandedSidebar">
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
import CoreMenuItem from '../../../core/components/menu/MenuItem.vue';

export default {
    name: 'MenuItem',

    components: {
        CoreMenuItem, DropdownIndicator, Fa,
    },

    inject: ['i18n'],

    data: () => ({
        faGripLines,
    }),

    methods: {
        collapsedTooltip(expandedSidebar, menu) {
            if (expandedSidebar) {
                return null;
            }

            return {
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

<style lang="scss">
    .menu-list {
        .menu-item {
            position: relative;
            min-width: 0;

            .is-opaque {
                opacity: 0.7;

                &:hover {
                    font-weight: inherit;
                }
            }

            .menu-item-link {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                font-size: 0.95rem;
                line-height: 1.3;
                width: 100%;
                min-width: 0;
                padding-block: 0.35rem;
                padding-inline-start: 0.25rem;
                padding-inline-end: 0.6rem;
                color: var(--bulma-text);
                transition: background-color .2s ease, color .2s ease;
                text-decoration: none;

                &:hover {
                    background-color: var(--bulma-scheme-main-ter);
                    color: var(--bulma-text-strong);
                }

                &.is-active {
                    background-color: var(--bulma-scheme-main-ter);
                    color: var(--bulma-text-strong);
                }

                &::before {
                    content: '';
                    position: absolute;
                    top: 0.45rem;
                    bottom: 0.45rem;
                    left: -0.35rem;
                    width: 0.2rem;
                    border-radius: 9999px;
                    background-color: transparent;
                    transition: background-color .2s ease, opacity .2s ease;
                    opacity: 0;
                }

                &:hover::before {
                    background-color: var(--bulma-border-strong);
                    opacity: 0.45;
                }

                &.is-active::before {
                    background-color: var(--bulma-primary);
                    opacity: 1;
                }

                &.is-collapsed {
                    justify-content: flex-start;
                    gap: 0;
                    padding-inline-end: 0.72rem;
                    padding-inline-start: 0.45rem;
                }
            }

            .menu-item-label {
                flex: 1 1 auto;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 500;
            }

            .menu-item-icon {
                flex: 0 0 auto;
            }

            .menu-arrow {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-inline-start: auto;
                min-width: 0.5rem;

                &.is-collapsed {
                    margin-inline-start: 0.25rem;
                }
            }
        }
    }
</style>
