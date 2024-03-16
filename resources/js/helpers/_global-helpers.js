import * as radash from 'radash';
import StringHelpers from '@/helpers/string-helpers';
import * as localization from '@/helpers/localization';

globalThis.StringHelpers = StringHelpers();
globalThis._ = radash;
globalThis.radash = radash;
globalThis.localization = localization;
globalThis.lodash = 'Try "radash"';

globalThis.__lang = localization.lang;
