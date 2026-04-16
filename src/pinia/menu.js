import App from '@enso-ui/ui/src/core/app';
import { defineStore } from 'pinia';
import { hasActiveChild, organize, sync } from '../plugins/utils';

export const menu = defineStore('menu', {
    state: () => ({
        menus: [],
        editable: false,
    }),

    actions: {
        set(menus) {
            this.menus = menus;
            sync(this, App.router.currentRoute.value, this.menus);
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
        refresh(menus = this.menus) {
            menus.filter(menu => menu.children)
                .forEach(menu => {
                    this.refresh(menu.children);

                    if (!menu.expanded && hasActiveChild(menu)) {
                        this.expand(menu);
                    }
                });
        },
        hasActiveChild(menu) {
            return hasActiveChild(menu);
        },
    },
});
