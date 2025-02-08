import UserDropdown from "./UserDropdown";
import Logout from "./UserDropdownLogout";

export default async function UserDropdownWrapper() {
  const logoutElement = await Logout({});

  return <UserDropdown logout={logoutElement} />;
}
