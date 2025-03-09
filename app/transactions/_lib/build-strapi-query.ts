import { GetTransactionsParams } from './validations';

export const buildStrapiQueryParams = (input: GetTransactionsParams) => {
    const queryParams = new URLSearchParams();

    // Basic pagination params
    queryParams.append('pagination[page]', input.page.toString());
    queryParams.append('pagination[pageSize]', input.perPage.toString());

    // Sorting
    // input.sort.forEach((sortItem) => {
    //     queryParams.append('sort', `${sortItem.desc ? '-' : ''}${sortItem.id}`);
    // });

    // Date range filters (always apply if provided)
    let filterIndex = 0;
    if (input.from) {
        queryParams.append(`filters[$and][${filterIndex}][transaction_date][$gte]`, input.from);
        filterIndex++;
    }

    if (input.to) {
        queryParams.append(`filters[$and][${filterIndex}][transaction_date][$lte]`, input.to);
        filterIndex++;
    }

    // Check if using advanced filtering
    const useAdvancedFilters = input.featureFlags?.includes('advancedTable');

    if (useAdvancedFilters && input.filters && input.filters.length > 0) {
        // Use the advanced filters array with the specified join operator
        const joinOp = input.joinOperator === 'or' ? '$or' : '$and';

        input.filters.forEach((filter) => {
            // Convert operator to Strapi format and handle various filter types
            if (filter.operator === 'isEmpty') {
                // Handle "is empty" case
                queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$null]`, 'true');
                filterIndex++;
            } else if (filter.operator === 'isNotEmpty') {
                // Handle "is not empty" case
                queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$notNull]`, 'true');
                filterIndex++;
            } else if (filter.operator === 'isBetween' && Array.isArray(filter.value) && filter.value.length === 2) {
                // Handle "is between" for date ranges
                queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$gte]`, filter.value[0]);
                queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$lte]`, filter.value[1]);
                filterIndex++;
            } else if (filter.operator === 'isRelativeToToday' && typeof filter.value === 'string') {
                // Handle relative dates with custom logic
                const today = new Date();
                let targetDate: Date;

                if (filter.value === 'today') {
                    targetDate = today;
                } else if (filter.value === 'yesterday') {
                    targetDate = new Date(today);
                    targetDate.setDate(today.getDate() - 1);
                } else if (filter.value === 'tomorrow') {
                    targetDate = new Date(today);
                    targetDate.setDate(today.getDate() + 1);
                } else if (filter.value.includes('days_ago')) {
                    const days = parseInt(filter.value.replace('days_ago_', ''), 10);
                    targetDate = new Date(today);
                    targetDate.setDate(today.getDate() - days);
                } else {
                    // Default to today if not recognized
                    targetDate = today;
                }

                const formattedDate = targetDate.toISOString().split('T')[0];
                queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$eq]`, formattedDate);
                filterIndex++;
            }
            // Handle arrays (multi-select case)
            else if (Array.isArray(filter.value) && filter.value.length > 0) {
                // FIXED: Apply each array value as a separate parameter with a numeric index
                filter.value.forEach((val: string, idx: number) => {
                    queryParams.append(`filters[${joinOp}][${filterIndex}][${filter.id}][$in][${idx}]`, String(val));
                });
                filterIndex++;
            } else if (
                (typeof filter.value === 'string' ||
                    typeof filter.value === 'number' ||
                    typeof filter.value === 'boolean') &&
                filter.value !== ''
            ) {
                // Handle all other operators for single values
                let strapiOperator: string;

                switch (filter.operator) {
                    case 'eq':
                        strapiOperator = '$eq';
                        break;
                    case 'ne':
                        strapiOperator = '$ne';
                        break;
                    case 'lt':
                        strapiOperator = '$lt';
                        break;
                    case 'lte':
                        strapiOperator = '$lte';
                        break;
                    case 'gt':
                        strapiOperator = '$gt';
                        break;
                    case 'gte':
                        strapiOperator = '$gte';
                        break;
                    case 'iLike':
                        strapiOperator = '$containsi'; // Case insensitive contains
                        break;
                    case 'notILike':
                        strapiOperator = '$notContainsi'; // Case insensitive does not contain
                        break;
                    default:
                        strapiOperator = '$eq'; // Default to equals
                }

                // Convert boolean strings to actual booleans if needed
                // let filterValue = filter.value
                // if (filter.type === 'boolean' && typeof filter.value === 'string') {
                //     filterValue = filter.value === 'true';
                // }

                queryParams.append(
                    `filters[${joinOp}][${filterIndex}][${filter.id}][${strapiOperator}]`,
                    String(filter.value)
                );
                filterIndex++;
            }
        });
    } else {
        // Use individual filters from the search params

        // Handle regular filters (non-advanced)
        if (input.debitor_code && input.debitor_code.length > 0) {
            // FIXED: Apply each array value as a separate parameter with a numeric index
            input.debitor_code.forEach((code, idx) => {
                queryParams.append(`filters[$and][${filterIndex}][debitor_code][$in][${idx}]`, code);
            });
            filterIndex++;
        }

        if (input.creditor_code && input.creditor_code.length > 0) {
            // FIXED: Apply each array value as a separate parameter with a numeric index
            input.creditor_code.forEach((code, idx) => {
                queryParams.append(`filters[$and][${filterIndex}][creditor_code][$in][${idx}]`, code);
            });
            filterIndex++;
        }

        if (input.title && input.title.trim() !== '') {
            queryParams.append(`filters[$and][${filterIndex}][description][$containsi]`, input.title);
            filterIndex++;
        }
    }

    return queryParams;
};
