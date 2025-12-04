import {NavDataType} from "@/types";
import {IconDashboard} from "@tabler/icons-react";
import {PackageSearch, ShoppingBasket, User} from "lucide-react";

export const navData: NavDataType[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Carts",
    url: "/carts",
    icon: ShoppingBasket,
  },
  {
    title: "Products",
    url: "/products",
    icon: PackageSearch,
  },
];
