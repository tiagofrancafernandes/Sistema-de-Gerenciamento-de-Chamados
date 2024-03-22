import { useToastify } from '@/libs/tiagof2/toastify';

/* Aliases START */
import * as radash from 'radash';
import * as StringHelpers from '@/helpers/string-helpers';
import * as localization from '@/helpers/localization';
import * as TypeHelpers from '@/helpers/type-helpers';
import * as DataValidationHelpers from '@/helpers/data-validation';
import * as VueCrudHelpers from '@tiagof2/vuejs-crud/js/helpers';
import * as AppInertiaHelpers from '@/helpers/app-inertia-helpers';
import * as ToastHelpers from '@/helpers/toast-helpers';
/* Aliases END */

globalThis.ToastHelpers = ToastHelpers;
globalThis.toaster = ToastHelpers?.toaster;
globalThis.ToastifyHelpers = useToastify({
    duration: 15000,
});
globalThis._ = radash;
globalThis.radash = radash;
globalThis.localization = localization;
globalThis.TypeHelpers = TypeHelpers;
globalThis.StringHelpers = StringHelpers;
globalThis.VueCrudHelpers = VueCrudHelpers;
globalThis.DataValidationHelpers = DataValidationHelpers;
globalThis.AppInertiaHelpers = AppInertiaHelpers;

globalThis.__lang = localization.lang;
