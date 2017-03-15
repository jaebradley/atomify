'use babel';

import { Enum } from 'enumify';

export default class DurationUnit extends Enum {}
DurationUnit.initEnum([
  'SECOND', 'MILLISECOND'
]);
