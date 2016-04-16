'use strict';

import {baddsertInject} from './badd';
import {getStoredResults} from './badd-fs';

export let baddsert = baddsertInject(getStoredResults);
