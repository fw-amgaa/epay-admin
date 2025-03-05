import { ResourceProps } from "@refinedev/core"
import {
  ChartPieIcon, DockIcon, ListCheckIcon, LockKeyholeOpen, PercentIcon, PlugIcon, User, UserCircle2Icon, Cat
} from "lucide-react";

const resources: ResourceProps[] = [
  {
    name: "blog_posts",
    list: "/blog-posts",
    create: "/blog-posts/create",
    edit: "/blog-posts/edit/:id",
    show: "/blog-posts/show/:id",
    meta: {
      canDelete: true,
      label: "Blog Posts",
      icon: <Cat />,
      group: 'system'
    },
  },
  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      canDelete: true,
      label: "Categories",
      icon: <Cat />,
      group: 'system'
    },
  },
  {
    name: "Систем холболт",
    list: "/connection",
    meta: {
      canDelete: true,
      label: "Систем холболт",
      icon: <PlugIcon />,
      group: 'system'
    },
  },
  {
    name: "Хүсэлтийн жагсаалт",
    list: "/messages",
    meta: {
      canDelete: true,
      label: "Хүсэлтийн жагсаалт",
      icon: <ListCheckIcon />,
      group: 'system'
    },
  },
  {
    name: "Гүйлгээний мэдээлэл",
    list: "/transactions",
    create: "/transactions/create",
    edit: "/transactions/edit/:id",
    show: "/transactions/show/:id",
    meta: {
      canDelete: true,
      label: "Гүйлгээний мэдээлэл",
      icon: <DockIcon />,
      group: 'system'
    },
  },
  {
    name: "Шимтгэл удирдлага",
    meta: {
      label: "Шимтгэл удирдлага",
      icon: <PercentIcon />,
      group: 'system'
    }
  },
  {
    name: "Шимтгэл тохиргоо",
    list: "/fee/settings",
    meta: {
      canDelete: true,
      label: "Шимтгэл тохиргоо",
      parent: "Шимтгэл удирдлага",
      group: 'system'
    },
  },
  {
    name: "Шимтгэл тооцоолол",
    list: "/fee/calculation",
    meta: {
      canDelete: true,
      label: "Шимтгэл тооцоолол",
      parent: "Шимтгэл удирдлага",
      group: 'system'
    },
  },
  {
    name: "Харилцагч удирдлага",
    meta: {
      label: "Харилцагч удирдлага",
      icon: <UserCircle2Icon />,
      group: 'system'
    }
  },
  {
    name: "Харилцагч",
    list: "/clients",
    create: "/clients/create",
    edit: "/clients/edit/:id",
    show: "/clients/show/:id",
    meta: {
      parent: "Харилцагч удирдлага",
      label: "Харилцагч",
      canDelete: true,
      group: 'system'
    },
  },
  {
    name: "Хэрэглэгч",
    list: "/clients",
    create: "/clients/create",
    edit: "/clients/edit/:id",
    show: "/clients/show/:id",
    meta: {
      parent: "Харилцагч удирдлага",
      label: "Хэрэглэгч",
      canDelete: true,
      group: 'system'
    },
  },
  {
    name: "Тайлан",
    meta: {
      label: "Тайлан",
      icon: <ChartPieIcon />,
      group: 'system'
    }
  },
  {
    name: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
    list: "/reports/monthly-bill",
    meta: {
      parent: "Тайлан",
      label: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
      canDelete: true,
      group: 'system'
    },
  },
  {
    name: "ePay-ийн баталгаажуулах тайлан",
    list: "/reports/reconcilation",
    meta: {
      parent: "Тайлан",
      label: "ePay-ийн баталгаажуулах тайлан",
      canDelete: true,
      group: 'system'
    },
  },
  {
    name: "ePay нэгдсэн хаалтын тайлан",
    list: "/reports/net-settlement",
    meta: {
      parent: "Тайлан",
      label: "ePay нэгдсэн хаалтын тайлан",
      canDelete: true,
      group: 'system'
    },
  },
  {
    name: "system_users",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      label: "Систем хэрэглэгч",
      canDelete: true,
      icon: <User />,
      group: 'user'
    },
  },
  {
    name: "user_access",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      label: "Хандах эрх",
      canDelete: true,
      icon: <LockKeyholeOpen />,
      group: 'user'
    },
  },
]

export default resources