import { GetTransactionsParams } from "./validations";

export const buildStrapiQueryParams = (input: GetTransactionsParams) => {
  const queryParams = new URLSearchParams();

  // Basic pagination params
  queryParams.append("pagination[page]", input.page.toString());
  queryParams.append("pagination[pageSize]", input.perPage.toString());

  // Sorting: Convert to Strapi v5 format (sort=createdAt:desc)
  if (input.sort.length > 0) {
    const strapiSort = input.sort
      .map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`)
      .join(",");
    queryParams.append("sort", strapiSort);
  }

  const fromDate = input.from ? new Date(input.from + "T00:00:00") : null; // Set time to 00:00:00
  let toDate = input.to ? new Date(input.to + "T23:59:59") : null; // Set time to 23:59:59

  if (fromDate && toDate) {
    // If both from and to are present, add 1 day to toDate
    toDate.setDate(toDate.getDate() + 1);
  } else if (fromDate && !toDate) {
    // If only from is present, set toDate as fromDate + 1 day
    toDate = new Date(fromDate);
    toDate.setDate(toDate.getDate() + 1);
    toDate.setHours(23, 59, 59); // Set to 23:59:59
  }

  let filterIndex = 0;
  if (fromDate) {
    queryParams.append(
      `filters[$and][${filterIndex}][transaction_date][$gte]`,
      fromDate.toISOString().split("T")[0]
    );
    filterIndex++;
  }

  if (toDate) {
    queryParams.append(
      `filters[$and][${filterIndex}][transaction_date][$lte]`,
      toDate.toISOString().split("T")[0]
    );
    filterIndex++;
  }

  // Check if using advanced filtering
  const useAdvancedFilters = true;

  if (useAdvancedFilters && input.filters && input.filters.length > 0) {
    const joinOp = input.joinOperator === "or" ? "$or" : "$and";

    input.filters.forEach((filter) => {
      if (filter.operator === "isEmpty") {
        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][$null]`,
          "true"
        );
        filterIndex++;
      } else if (filter.operator === "isNotEmpty") {
        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][$notNull]`,
          "true"
        );
        filterIndex++;
      } else if (
        filter.operator === "isBetween" &&
        Array.isArray(filter.value) &&
        filter.value.length === 2
      ) {
        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][$gte]`,
          filter.value[0]
        );
        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][$lte]`,
          filter.value[1]
        );
        filterIndex++;
      } else if (
        filter.operator === "isRelativeToToday" &&
        typeof filter.value === "string"
      ) {
        const today = new Date();
        let targetDate: Date;

        if (filter.value === "today") {
          targetDate = today;
        } else if (filter.value === "yesterday") {
          targetDate = new Date(today);
          targetDate.setDate(today.getDate() - 1);
        } else if (filter.value === "tomorrow") {
          targetDate = new Date(today);
          targetDate.setDate(today.getDate() + 1);
        } else if (filter.value.includes("days_ago")) {
          const days = parseInt(filter.value.replace("days_ago_", ""), 10);
          targetDate = new Date(today);
          targetDate.setDate(today.getDate() - days);
        } else {
          targetDate = today;
        }

        const formattedDate = targetDate.toISOString().split("T")[0];
        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][$eq]`,
          formattedDate
        );
        filterIndex++;
      } else if (Array.isArray(filter.value) && filter.value.length > 0) {
        filter.value.forEach((val: string, idx: number) => {
          queryParams.append(
            `filters[${joinOp}][${filterIndex}][${filter.id}][$in][${idx}]`,
            String(val)
          );
        });
        filterIndex++;
      } else if (
        (typeof filter.value === "string" ||
          typeof filter.value === "number" ||
          typeof filter.value === "boolean") &&
        filter.value !== ""
      ) {
        let strapiOperator: string;

        switch (filter.operator) {
          case "eq":
            strapiOperator = "$eq";
            break;
          case "ne":
            strapiOperator = "$ne";
            break;
          case "lt":
            strapiOperator = "$lt";
            break;
          case "lte":
            strapiOperator = "$lte";
            break;
          case "gt":
            strapiOperator = "$gt";
            break;
          case "gte":
            strapiOperator = "$gte";
            break;
          case "iLike":
            strapiOperator = "$containsi";
            break;
          case "notILike":
            strapiOperator = "$notContainsi";
            break;
          default:
            strapiOperator = "$eq";
        }

        queryParams.append(
          `filters[${joinOp}][${filterIndex}][${filter.id}][${strapiOperator}]`,
          String(filter.value)
        );
        filterIndex++;
      }
    });
  } else {
    if (input.debitor_code && input.debitor_code.length > 0) {
      input.debitor_code.forEach((code, idx) => {
        queryParams.append(
          `filters[$and][${filterIndex}][debitor_code][$in][${idx}]`,
          code
        );
      });
      filterIndex++;
    }

    if (input.creditor_code && input.creditor_code.length > 0) {
      input.creditor_code.forEach((code, idx) => {
        queryParams.append(
          `filters[$and][${filterIndex}][creditor_code][$in][${idx}]`,
          code
        );
      });
      filterIndex++;
    }

    if (input.title && input.title.trim() !== "") {
      queryParams.append(
        `filters[$and][${filterIndex}][description][$containsi]`,
        input.title
      );
      filterIndex++;
    }
  }

  return queryParams;
};
