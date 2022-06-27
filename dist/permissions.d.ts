import { PermissionFlagsBits } from "discord-api-types/v10";
declare type ValueOf<T> = T[keyof T];
export declare class Permissions {
    private types;
    constructor(types: ValueOf<typeof PermissionFlagsBits>[]);
    compute(): string;
}
export {};
//# sourceMappingURL=permissions.d.ts.map