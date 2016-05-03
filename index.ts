'use strict';

import * as badd from './badd';
import {getStoredResults} from './badd-fs';

export let baddsert = badd.baddsertInject(getStoredResults);
