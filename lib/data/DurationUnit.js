'use babel';

import { Enum } from 'enumify';

export default class DurationUnit extends Enum {}
DurationUnit.init([
  'SECOND', 'MILLISECOND'
]);
