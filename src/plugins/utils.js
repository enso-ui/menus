const levelMatches = (menus, menuId) => menus.some(({ id }) => id === menuId);

const changeLevel = (menus, organizedMenus) => menus.filter(({ children }) => children)
    .find(menu => organize(menu, organizedMenus)) !== undefined;

const organize = (menu, organizedMenus) => {
    if (levelMatches(menu.children, organizedMenus[0].id)) {
        menu.children = organizedMenus;
        return true;
    }

    return changeLevel(menu.children, organizedMenus);
};

const hasActiveChild = ({ children }) => children
    .some(child => child.active || child.children && hasActiveChild(child));

const routeMatches = (menu, route) => {
    if (!menu.route || !route || route.matched.length === 0) {
        return false;
    }

    const names = route.matched.map(({ name }) => name);

    if (names.includes(menu.route)) {
        return true;
    }

    const path = `/${menu.route.split('.').slice(0, -1).join('/')}`;

    return route.matched.map(({ path }) => path).includes(path);
};

const sync = (store, route, menus) => {
    menus.filter(menu => menu.children)
        .forEach(menu => {
            sync(store, route, menu.children);

            store.activate({ menu, active: routeMatches(menu, route) });

            if (!menu.expanded && hasActiveChild(menu)) {
                store.expand(menu);
            }
        });

    menus.filter(menu => !menu.children).forEach(menu => store
        .activate({ menu, active: routeMatches(menu, route) }));
};

export { hasActiveChild, organize, routeMatches, sync };
