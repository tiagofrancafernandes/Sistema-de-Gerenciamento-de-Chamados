// import { get } from 'radash';
import { __get } from '@/helpers/data-helpers';
import { randomString, validStringOr } from '@/helpers/string-helpers';

export const getColumnLabel = (headerInfo, defaultValue = '') => {
    if (!headerInfo || !TypeHelpers.isObject(headerInfo)) {
        return validStringOr(defaultValue);
    }

    let label = validStringOr(__get(headerInfo, 'label'));
    let translateLabel = Boolean(__get(headerInfo, 'translateLabel'));

    if (!translateLabel) {
        return label;
    }

    let defaultNotTranslatableLabel = validStringOr(__get(headerInfo, 'defaultNotTranslatableLabel'));

    return localization.lang({
        key: label,
        defaultValue: nullSafe(defaultNotTranslatableLabel),
    });
}

export const defaultColumnContentHandler = (headerInfo, data) => {
    let key = validStringOr(__get(headerInfo, 'key'), __get(headerInfo, 'attribute'));

    if (!key) {
        return null;
    }

    let value = data[key] ?? null;

    if (
        TypeHelpers.isString(value)
        || TypeHelpers.isString(value)
        || TypeHelpers.isNumeric(value)
        || TypeHelpers.typeofIs(value, 'boolean')
        || value === null
    ) {
        return value;
    }

    return JSON.stringify(value);
}

export const getColumnData = (headerInfo, data) => {
    headerInfo = valueIfFilled(headerInfo);
    data = valueIfFilled(data);

    if (!headerInfo || !data) {
        return null;
    }

    if (!TypeHelpers.isObject(headerInfo) || !TypeHelpers.isObject(data)) {
        return null;
    }

    let columnContent = headerInfo['columnContent'] ?? null;

    if (TypeHelpers.isString(columnContent)) {
        return columnContent;
    }

    let columnContentHandler = valueIfFilled(headerInfo['columnContentHandler']);

    if (columnContentHandler && TypeHelpers.isFunction(columnContentHandler)) {
        return columnContentHandler(headerInfo, data);
    }

    return defaultColumnContentHandler(headerInfo, data);
}

export const generateTablePageInfo = (
    route, // Parte of route name
    fullRoute = false, // If is a full route or partial. Default is `false` (partial)
    recordAttributes = [], // Attributes to get from record. Ex ['id']
    routeStaticParams = [], // Static initial value (used on mount page);
) => {
    if (!route || notFilled(validStringOr(route))) {
        throw `'route' must be a valid route string.`
    }

    recordAttributes = valueIfFilled(recordAttributes);
    routeStaticParams = valueIfFilled(routeStaticParams);

    recordAttributes = isObject(recordAttributes) || isArray(recordAttributes) ? recordAttributes : null;
    routeStaticParams = isObject(routeStaticParams) || isArray(routeStaticParams) ? routeStaticParams : null;

    return {
        route: route,
        fullRoute: Boolean(fullRoute),
        recordAttributes: recordAttributes,
        routeStaticParams: routeStaticParams,
    };
}

export const generateTableInfo = (tableID, params = {}) => {
    params = isObject(params) ? params : {};

    if (isObject(tableID)) {
        params = {
            ...params,
            ...tableID,
        };

        tableID = null
    }

    const uid = randomString(20);
    const recordKeyAttribute = valueIfFilled(validStringOr(params.recordKeyAttribute), 'id');
    const routePrefix = valueIfFilled(validStringOr(params.routePrefix), '');
    let pages = __get(params, 'pages');

    // generateTablePageInfo

    pages = (pages || pages === false) || isObject(pages) ? pages : false;

    return {
        id: 'table_id_' + nullSafe(tableID, params.id, uid),
        uid: 'table_uid_' + uid,
        routePrefix: routePrefix,
        recordKeyAttribute: recordKeyAttribute,
        pages: (!pages || pages === false) ? false : pages,
        getPageInfo(pageName) {
            pageName = validStringOr(pageName);

            if (!pageName) {
                return null;
            }

            let pages = this.pages && isObject(this.pages) && itemIsFilled(this.pages) ? this.pages : null;

            if (!pageName || !pages || !Object.keys(pages).includes(pageName)) {
                return null;
            }

            let pageInfo = __get(pages, pageName);

            if (!isObject(pageInfo) || !__get(pageInfo, 'route')) {
                return null;
            }

            let route = valueIfFilled(validStringOr(__get(pageInfo, 'route')));
            let fullRoute = valueIfFilled(__get(pageInfo, 'fullRoute'));
            let routePrefix = valueIfFilled(this.routePrefix);

            if (fullRoute) {
                return route ? route : null;
            }

            route = valueIfFilled(
                [
                    routePrefix,
                    route,
                ]
                .filter(item => itemIsFilled(item))
                .join('.')
            );

            pageInfo['resolved_route'] = route ? route : null;

            return  valueIfFilled(pageInfo);
        },
        getUrl(pageName, extraData = {}, routeParams = null) {
            let pageInfo = valueIfFilled(this.getPageInfo(pageName));

            if (!pageInfo || !isObject(pageInfo)) {
                return null;
            }

            let resolvedRoute = __get(pageInfo, 'resolved_route');

            if (!resolvedRoute) {
                return null;
            }

            let recordAttributes = valueIfFilled(__get(pageInfo, 'recordAttributes'));
            let routeStaticParams = valueIfFilled(__get(pageInfo, 'routeStaticParams'));

            let fakeData = {
                user: {
                    address: {
                        city: {
                            name: 'Montanhas',
                            places: [
                                'praça 1',
                                'praça 2',
                            ]
                        }
                    }
                }
            };

            return {
                city: __get(fakeData, ['user', 'address', 'city']),
                city2: __get(fakeData, ['user', 'address', 'city', 'places', 0]),
                city3: __get(fakeData, {
                    user: true,
                    address: 1,
                    city: true,
                    name: true,
                }),
                recordAttributes,
                routeStaticParams,
            };//TODO: remover

            extraData = isObject(extraData) ? extraData : {};

            routeParams = nullSafe(routeParams, __get(extraData, 'routeParams'));
            routeParams = isObject(routeParams) || isArray(routeParams) ? routeParams : null;

            const RECORD = __get(extraData, 'record');

            // recordKeyAttribute

            return '';//TODO: remover
        },
    };
}

export const generateHeader = (tableInfo, params = {}) => {
    params = TypeHelpers.isObject(params) ? params : {};

    let sort = Boolean(nullSafe(params.sort));
    let key = valueIfFilled(validStringOr(params['key'] ?? null));
    let sortKey = valueIfFilled(validStringOr(params['sortKey'] ?? null), key);
    let show = Boolean(valueIfFilled(params['show'] ?? !valueIfFilled(params['hidden'] ?? false)));
    let hidden = !show;
    let columnSearchable = Boolean(valueIfFilled(params['columnSearchable'] ?? false));
    const uid = randomString(20);

    let onClickHeader = valueIfFilled(params['onClickHeader'] ?? null);
    onClickHeader = TypeHelpers.isFunction(onClickHeader) ? onClickHeader : null;

    let onClickColumn = valueIfFilled(params['onClickColumn'] ?? null);
    onClickColumn = TypeHelpers.isFunction(onClickColumn) ? onClickColumn : null;

    let routeOnClick = onClickColumn ? null : valueIfFilled(validStringOr(params['routeOnClick'] ?? null));
    let routeOnClickParams = routeOnClick ? valueIfFilled(params['routeOnClick'] ?? null) : null;
    let urlOnClick = !routeOnClick ? valueIfFilled(validStringOr(params['urlOnClick'] ?? null)) : null;

    let columnContentHandler = valueIfFilled(params['columnContentHandler']);
    columnContentHandler = TypeHelpers.isFunction(columnContentHandler) ? columnContentHandler : null;
    let columnContent = !columnContentHandler ? nullSafe(params['columnContent'] ?? null) : null;

    let headerInfo = {
        ...params,
        tableInfo: tableInfo,
        uid: 'uid_' + uid,
        id: 'id_' + nullSafe(params.id, uid),
        key: nullSafe(key),
        label: nullSafe(params.label, StringHelpers.toTitle(key)),
        translateLabel: nullSafe(params.translateLabel, DataValidationHelpers.isObject(params.label)),
        defaultNotTranslatableLabel: nullSafe(params.defaultNotTranslatableLabel),
        sort: sort,
        show: show,
        hidden: hidden,
        sortKey: valueIfFilled(sortKey),
        columnSearchable: columnSearchable,
        routeOnClick: routeOnClick,
        routeOnClickParams: routeOnClickParams,
        urlOnClick: urlOnClick,
        columnContentHandler: columnContentHandler,
        columnContent: columnContent,
        onClickColumn: onClickColumn,
    };

    headerInfo[`onClickHeader`] = onClickHeader ? onClickHeader : (event, data = {}) => {
        const customEvent = new CustomEvent('table:header:click', {
            detail: {
                tableInfo: tableInfo,
                headerInfo: headerInfo,
                data: data,
            }
        })

        window.dispatchEvent(customEvent);
    };

    return headerInfo;
}
