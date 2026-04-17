import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { layout } from '../../ui/src/pinia/layout';
import { menu } from '../src/pinia/menu';
import Sidebar from '../src/core/components/menu/Sidebar.vue';
import Menus from '../src/core/components/menu/Menus.vue';
import MenuItem from '../src/core/components/menu/MenuItem.vue';
import MenuOrganizer from '../src/core/components/settings/MenuOrganizer.vue';

describe('menus core components', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        layout().$patch({
            isTouch: false,
            sidebar: { isExpanded: true },
        });
        menu().$patch({
            menus: [],
            editable: false,
        });
    });

    it('sidebar exposes menus from the store', () => {
        const slot = vi.fn(() => null);
        menu().set([{ name: 'Dashboard' }]);

        Sidebar.render.call({
            $slots: { default: slot },
        });

        expect(slot).toHaveBeenCalledWith({
            menus: [{ name: 'Dashboard' }],
        });
    });

    it('menu organizer updates editable state directly in the store', () => {
        const slot = vi.fn(() => null);

        MenuOrganizer.render.call({
            $slots: { default: slot },
        });

        const { bindings, events } = slot.mock.calls[0][0];

        expect(bindings.modelValue).toBe(false);

        events['update:modelValue'](true);

        expect(menu().editable).toBe(true);
    });

    it('menus uses store editability when exposing organize bindings', () => {
        const slot = vi.fn(() => null);
        const http = { put: vi.fn(() => Promise.resolve()) };
        const organizeMenus = vi.spyOn(menu(), 'organizeMenus');
        menu().edit(true);

        Menus.render.call({
            menus: [{ name: 'Dashboard' }],
            collapsed: false,
            http,
            route: vi.fn(() => 'system.menus.organize'),
            errorHandler: vi.fn(),
            $slots: { default: slot },
        });

        const { organizeBindings, organizeEvents } = slot.mock.calls[0][0];

        expect(organizeBindings.disabled).toBe(false);

        organizeEvents['update:modelValue']([{ name: 'Invoices' }]);

        expect(organizeMenus).toHaveBeenCalledWith([{ name: 'Invoices' }]);
    });

    it('menu item exposes layout and menu state without adapter methods', () => {
        const slot = vi.fn(() => null);
        menu().edit(true);

        MenuItem.render.call({
            menu: { route: 'dashboard.index' },
            $slots: { default: slot },
            select: vi.fn(),
        });

        expect(slot).toHaveBeenCalledWith({
            menu: { route: 'dashboard.index' },
            editable: true,
            expandedSidebar: true,
            hasActiveChild: undefined,
            menuEvents: { click: expect.any(Function) },
        });
    });
});
