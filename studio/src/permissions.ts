export const ADMIN_ONLY_TYPES = new Set(["locale"]);
export const READ_ONLY_TYPES = new Set(["locale"]);

type UserWithRoles = {
  roles: Array<{ name: string }>;
};

export function isAdministrator(
  currentUser: UserWithRoles | null | undefined,
) {
  return Boolean(
    currentUser?.roles.some((role) => role.name === "administrator"),
  );
}
