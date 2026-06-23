import type { Role } from "../types";

type RoleChipsProps = {
  activeRole: Role;
  roles: Role[];
  onSelect: (role: Role) => void;
};

export function RoleChips({ activeRole, roles, onSelect }: RoleChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {roles.map((role) => {
        const isActive = role === activeRole;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onSelect(role)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-[#7bd0ff]/40 bg-[linear-gradient(135deg,rgba(82,157,255,0.22),rgba(69,212,255,0.16))] text-white shadow-[0_10px_30px_rgba(70,212,255,0.16)]"
                : "border-white/10 bg-white/5 text-[#9db0c1] hover:border-white/18 hover:bg-white/8 hover:text-white"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1014]`}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
}
