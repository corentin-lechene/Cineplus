import dayjs from 'dayjs';
import 'dayjs/locale/fr.js';

import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Utc from 'dayjs/plugin/utc';
import Timezone from 'dayjs/plugin/timezone';
import IsBetween from 'dayjs/plugin/isBetween';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(LocalizedFormat);
dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(CustomParseFormat);
dayjs.extend(IsBetween)

dayjs.locale('fr');
dayjs.tz.setDefault('Europe/Paris');


export default dayjs;