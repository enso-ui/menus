import { defineStore } from 'pinia';
import { hasActiveChild, organize } from '../plugins/utils';

export const menu = defineStore('menu', {
    state: () => ({
        menus: [],
        editable: false,
    }),

    actions: {
        set(menus) {
            this.menus = menus;
        },
        activate({ menu, active }) {
            menu.active = active;
        },
        toggle(menu) {
            menu.expanded = !menu.expanded;
        },
        expand(menu) {
            menu.expanded = true;
        },
        collapse(menu) {
            menu.expanded = false;
        },
        edit(status) {
            this.editable = status;
        },
        organizeMenus(organizedMenus) {
            this.children = this.menus;
            organize(this, organizedMenus);
            this.menus = this.children;
            delete this.children;
        },
        refresh(menus = null) {
            const items = menus ?? this.menus;

            items.filter(menu => menu.children)
                .forEach(menu => {
                    this.refresh(menu.children);

                    if (!menu.expanded && hasActiveChild(menu)) {
                        this.expand(menu);
                    }
                });
        },
    },
});
