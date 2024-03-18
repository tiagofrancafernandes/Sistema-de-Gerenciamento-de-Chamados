import * as radash from 'radash';
import * as StringHelpers from '@/helpers/string-helpers';
import * as localization from '@/helpers/localization';
import * as TypeHelpers from '@/helpers/type-helpers';
import * as DataValidationHelpers from '@/helpers/data-validation'
import * as VueCrudHelpers from '@tiagof2/vuejs-crud/js/helpers'

globalThis._ = radash;
globalThis.radash = radash;
globalThis.localization = localization;
globalThis.TypeHelpers = TypeHelpers;
globalThis.StringHelpers = StringHelpers;
globalThis.VueCrudHelpers = VueCrudHelpers;
globalThis.DataValidationHelpers = DataValidationHelpers;

globalThis.__lang = localization.lang;
