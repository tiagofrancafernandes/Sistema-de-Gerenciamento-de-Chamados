import * as radash from 'radash';
import StringHelpers from '@/helpers/string-helpers'

globalThis.StringHelpers = StringHelpers();
globalThis._ = radash;
globalThis.radash = radash;
globalThis.lodash = 'Try "radash"';
