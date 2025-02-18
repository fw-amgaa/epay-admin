"use client";

import { useBreadcrumb } from "@refinedev/core";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "../../../ui/breadcrumb";

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <div className="flex gap-2 items-center" key={`breadcrumb-${breadcrumb.label}`}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.length > index + 1 && <BreadcrumbSeparator className="hidden md:block" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
