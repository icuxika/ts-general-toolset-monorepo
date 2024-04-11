import { App, Component } from "vue";

export interface VCreateOption {
    components?: Component[];
    componentPrefix?: string;
}

export interface VInstance {
    install: (app: App) => void;
}

const create = ({
    components = [],
    componentPrefix = "",
}: VCreateOption): VInstance => {
    const registerComponent = (
        app: App,
        name: string,
        component: Component
    ) => {
        const registered = app.component(componentPrefix + name);
        if (!registered) {
            app.component(componentPrefix + name, component);
        }
    };

    const install = (app: App) => {
        components.forEach((component) => {
            registerComponent(app, component.name ?? "", component);
        });
    };

    return {
        install,
    };
};

export default create;
