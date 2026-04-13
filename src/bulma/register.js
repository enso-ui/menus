import MenuOrganizer from './components/settings/MenuOrganizer.vue';
import SidebarState from './components/settings/SidebarState.vue';

export default App => {
    App.registerSettingsItem('sidebar-state', SidebarState, 400);
    App.registerSettingsItem('menu-organizer', MenuOrganizer, 600, 'system.menus.organize');
};
