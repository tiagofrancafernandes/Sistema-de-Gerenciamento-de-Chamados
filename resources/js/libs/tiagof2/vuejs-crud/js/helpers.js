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
    routeName, // Parte of route name
    fullRoute = false, // If is a full route or partial. Default is `false` (partial)
    recordAttributes = [], // Attributes to get from record. Ex ['id']
    routeStaticParams = [], // Static initial value (used on mount page);
) => {
    if (!routeName || notFilled(validStringOr(routeName))) {
        throw `'routeName' must be a valid route string.`
    }

    recordAttributes = valueIfFilled(recordAttributes);
    routeStaticParams = valueIfFilled(routeStaticParams);

    recordAttributes = isObject(recordAttributes) || isArray(recordAttributes) ? recordAttributes : null;
    routeStaticParams = isObject(routeStaticParams) || isArray(routeStaticParams) ? routeStaticParams : null;

    return {
        routeName: routeName,
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

    let tablecolumns = __get(params, 'tablecolumns', []);
    let tableExtraData = valueIfFilled(__get(params, 'tableExtraData', {}));

    tablecolumns = isArray(tablecolumns) ? tablecolumns : [];

    pages = (pages || pages === false) || isObject(pages) ? pages : false;

    return {
        id: 'table_id_' + nullSafe(tableID, params.id, uid),
        uid: 'table_uid_' + uid,
        routePrefix: routePrefix,
        recordKeyAttribute: recordKeyAttribute,
        pages: (!pages || pages === false) ? false : pages,
        tablecolumns: tablecolumns,
        tableExtraData: isObject(tableExtraData) ? tableExtraData : {},
        title: nullSafe(params.title),
        tanslateTitle: nullSafe(params.tanslateTitle, false),
        label: nullSafe(params.label),
        tanslateTabel: nullSafe(params.tanslateTabel, false),
        pluralLabel: nullSafe(params.pluralLabel),
        tanslateTluralLabel: nullSafe(params.tanslateTluralLabel, false),
        call(method, ...params) {
            method = validStringOr(method);

            if (!method || !(method in this)) {
                return null;
            }

            return this[method](...params);
        },
        get(notation, defaultValue = null) {
            return __get(this, notation, defaultValue);
        },
        getIf(notation, validators, defaultValue = null) {
            const NO_VALIDATOR = '::NO_VALIDATOR::';

            validators = valueIfFilled(validators, NO_VALIDATOR);

            if (validators === NO_VALIDATOR) {
                return __get(this, notation, defaultValue);
            }

            validators = TypeHelpers.filterTrueKeys(isArray(validators) ? validators : [validators]);

            if (!validators.length) {
                return defaultValue;
            }

            let result = __get(this, notation, defaultValue);

            for (let index = 0; index < validators.length; index++) {
                let validator = validators[index];

                if (isString(validator)) {
                    validator = globalThis[validStringOr(validator)] ?? null;
                }

                if (!validator || !typeofIs(validator, 'Function')) {
                    throw `The 'validator' param must be a valid callable`;
                }

                if (!validator(result)) {
                    return defaultValue;
                }
            }

            return result;
        },
        getColumns(...args) {
            let tablecolumns = valueIfFilled(this.tablecolumns);

            if (!tablecolumns) {
                return [];
            }

            return tablecolumns.map(item => generateHeader(this, item));
        },
        getTableExtraData(...args) {
            let tableExtraData = valueIfFilled(this.tableExtraData);

            if (!tableExtraData || !isObject(tableExtraData)) {
                return {};
            };

            return tableExtraData;
        },
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

            if (!isObject(pageInfo) || !__get(pageInfo, 'routeName')) {
                return null;
            }

            let routeName = valueIfFilled(validStringOr(__get(pageInfo, 'routeName')));
            let fullRoute = valueIfFilled(__get(pageInfo, 'fullRoute'));
            let routePrefix = valueIfFilled(this.routePrefix);

            if (fullRoute) {
                return routeName ? routeName : null;
            }

            routeName = valueIfFilled(
                [
                    routePrefix,
                    routeName,
                ]
                .filter(item => itemIsFilled(item))
                .join('.')
            );

            pageInfo['resolved_route'] = routeName ? routeName : null;

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

            if (!recordAttributes || !routeStaticParams) {
                return;
            }

            extraData = isObject(extraData) ? extraData : {};

            routeParams = nullSafe(routeParams, __get(extraData, 'routeParams'));
            routeParams = isObject(routeParams) || isArray(routeParams) ? routeParams : null;

            const RECORD = __get(extraData, 'record');

            // recordKeyAttribute

            return '';//TODO: remover
        },
        getTitle() {
            let title = validStringOr(this.getIf('title'));
            return title && this.tanslateTitle ? lang({key: title}) : title;
        },
        getLabel() {
            let label = validStringOr(this.getIf('label'));
            return label && this.tanslateLabel ? lang({key: label}) : label;
        },
        getPluralLabel() {
            let pluralLabel = validStringOr(this.getIf('pluralLabel'));
            return pluralLabel && this.tanslatePluralLabel ? lang({key: pluralLabel}) : pluralLabel;
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
