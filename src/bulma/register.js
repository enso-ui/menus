import MenuOrganizer from './components/settings/MenuOrganizer.vue';

export default App => {
    App.registerSettingsItem('menu-organizer', MenuOrganizer, 400, 'system.menus.organize');
};
