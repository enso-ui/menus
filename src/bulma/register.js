import MenuOrganizer from './components/settings/MenuOrganizer.vue';
import SidebarState from './components/settings/SidebarState.vue';

export default App => {
    App.registerSettingsItem('menu-organizer', MenuOrganizer, 400, 'system.menus.organize');
    App.registerSettingsItem('sidebar-state', SidebarState, 500);
};
