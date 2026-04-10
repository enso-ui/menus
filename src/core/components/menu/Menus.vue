<script>
import { useStore } from '../../../utils/pinia';

export default {
    name: 'Menus',

    inject: ['errorHandler', 'http', 'route'],

    inheritAttrs: false,

    props: {
        menus: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['shrink', 'extend'],

    data: () => ({
        ref: 'menu',
    }),

    computed: {
        editable() {
            return useStore('menu').editable;
        },
        disabled() {
            return !this.editable;
        },
        el() {
            return this.$parent.$refs[this.ref];
        },
    },

    watch: {
        collapsed: 'toggle',
    },

    mounted() {
        if (this.collapsed) {
            this.el.style.height = 0;
        }
    },

    methods: {
        organize(payload) {
            useStore('menu').organizeMenus(payload);
        },
        shrink(height) {
            this.el.style.height = `${parseInt(this.el.style.height, 10) - height}px`;
            this.$emit('shrink', height);
        },
        extend(height) {
            this.el.style.height = `${height + parseInt(this.el.style.height, 10)}px`;
            this.$emit('extend', height);
        },
        toggle() {
            if (this.collapsed) {
                const height = this.el.scrollHeight;

                if (!this.el.style.height) {
                    this.el.style.height = `${height}px`;
                }

                setTimeout(() => {
                    this.el.style.height = 0;
                    this.$emit('shrink', height);
                }, 1);

                return;
            }

            this.el.style.height = `${this.el.scrollHeight}px`;
            this.$emit('extend', this.el.scrollHeight);
        },
        persist() {
            this.http.put(this.route('system.menus.organize'), { menus: this.menus })
                .catch(this.errorHandler);
        },
    },

    render() {
        return this.$slots.default({
            parentMenuEvents: {
                shrink: this.shrink,
                extend: this.extend,
            },
            ref: this.ref,
            organizeBindings: {
                modelValue: this.menus,
                disabled: this.disabled,
                itemKey: 'name',
            },
            organizeEvents: {
                'update:modelValue': this.organize,
                end: this.persist,
            },
        });
    },
};
</script>
