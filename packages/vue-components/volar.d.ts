declare module "vue" {
    export interface GlobalComponents {
        TButton: (typeof import("@ts-general-toolset-monorepo/vue-components"))["TButton"];
    }
}
export {};
