import { PermissionFlagsBits } from "discord-api-types/v10";

type ValueOf<T> = T[keyof T];

export class Permissions {
  constructor(private types: ValueOf<typeof PermissionFlagsBits>[]) {}

  compute() {
    let permission = 0n;
    this.types.forEach((type) => (permission += type));
    return String(permission);
  }
}
