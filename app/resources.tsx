import { ResourceProps } from "@refinedev/core";
import { ChartPieIcon, DockIcon, LineChartIcon } from "lucide-react";

const resources: ResourceProps[] = [
  {
    name: "Дашбоард",
    list: "/dashboard",
    meta: {
      canDelete: true,
      label: "Дашбоард",
      icon: <LineChartIcon />,
      group: "system",
    },
  },
  // {
  //   name: "Систем холболт",
  //   list: "/connection",
  //   meta: {
  //     canDelete: true,
  //     label: "Систем холболт",
  //     icon: <PlugIcon />,
  //     group: 'system'
  //   },
  // },
  // {
  //   name: "Хүсэлтийн жагсаалт",
  //   list: "/messages",
  //   meta: {
  //     canDelete: true,
  //     label: "Хүсэлтийн жагсаалт",
  //     icon: <ListCheckIcon />,
  //     group: 'system'
  //   },
  // },
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
      group: "system",
    },
  },
  // {
  //   name: "Шимтгэл удирдлага",
  //   meta: {
  //     label: "Шимтгэл удирдлага",
  //     icon: <PercentIcon />,
  //     group: 'system'
  //   }
  // },
  // {
  //   name: "Шимтгэл тохиргоо",
  //   list: "/fee/settings",
  //   meta: {
  //     canDelete: true,
  //     label: "Шимтгэл тохиргоо",
  //     parent: "Шимтгэл удирдлага",
  //     group: 'system'
  //   },
  // },
  // {
  //   name: "Шимтгэл тооцоолол",
  //   list: "/fee/calculation",
  //   meta: {
  //     canDelete: true,
  //     label: "Шимтгэл тооцоолол",
  //     parent: "Шимтгэл удирдлага",
  //     group: 'system'
  //   },
  // },
  // {
  //   name: "Харилцагч удирдлага",
  //   meta: {
  //     label: "Харилцагч удирдлага",
  //     icon: <UserCircle2Icon />,
  //     group: 'system'
  //   }
  // },
  // {
  //   name: "Харилцагч",
  //   list: "/clients",
  //   create: "/clients/create",
  //   edit: "/clients/edit/:id",
  //   show: "/clients/show/:id",
  //   meta: {
  //     parent: "Харилцагч удирдлага",
  //     label: "Харилцагч",
  //     canDelete: true,
  //     group: 'system'
  //   },
  // },
  // {
  //   name: "Хэрэглэгч",
  //   list: "/clients",
  //   create: "/clients/create",
  //   edit: "/clients/edit/:id",
  //   show: "/clients/show/:id",
  //   meta: {
  //     parent: "Харилцагч удирдлага",
  //     label: "Хэрэглэгч",
  //     canDelete: true,
  //     group: 'system'
  //   },
  // },
  {
    name: "Тайлан",
    meta: {
      label: "Тайлан",
      icon: <ChartPieIcon />,
      group: "system",
    },
  },
  {
    name: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
    list: "/reports/monthly-bill",
    meta: {
      parent: "Тайлан",
      label: "Харилцагчийн шимтгэл тооцоо нэхэмжлэх тайлан",
      canDelete: true,
      group: "system",
    },
  },
  {
    name: "ePay-ийн баталгаажуулах тайлан",
    list: "/reports/reconcilation",
    meta: {
      parent: "Тайлан",
      label: "ePay-ийн баталгаажуулах тайлан",
      canDelete: true,
      group: "system",
    },
  },
  {
    name: "ePay нэгдсэн хаалтын тайлан",
    list: "/reports/net-settlement",
    meta: {
      parent: "Тайлан",
      label: "ePay нэгдсэн хаалтын тайлан",
      canDelete: true,
      group: "system",
    },
  },
  {
    name: "ePay-ийн нийлбэр амжилттай гүйлгээний тайлан",
    list: "/reports/successful-transactions",
    meta: {
      parent: "Тайлан",
      label: "ePay-ийн нийлбэр амжилттай гүйлгээний тайлан",
      canDelete: true,
      group: "system",
    },
  },
  {
    name: "ePay-ийн нийлбэр амжилтгүй гүйлгээний тайлан",
    list: "/reports/unsuccessful-transactions",
    meta: {
      parent: "Тайлан",
      label: "ePay-ийн нийлбэр амжилтгүй гүйлгээний тайлан",
      canDelete: true,
      group: "system",
    },
  },
  // {
  //   name: "system_users",
  //   list: "/categories",
  //   create: "/categories/create",
  //   edit: "/categories/edit/:id",
  //   show: "/categories/show/:id",
  //   meta: {
  //     label: "Систем хэрэглэгч",
  //     canDelete: true,
  //     icon: <User />,
  //     group: 'user'
  //   },
  // },
  // {
  //   name: "user_access",
  //   list: "/categories",
  //   create: "/categories/create",
  //   edit: "/categories/edit/:id",
  //   show: "/categories/show/:id",
  //   meta: {
  //     label: "Хандах эрх",
  //     canDelete: true,
  //     icon: <LockKeyholeOpen />,
  //     group: 'user'
  //   },
  // },
];

export default resources;
