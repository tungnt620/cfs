import 'dayjs/locale/vi' // load on demand
import dayjs from 'dayjs'
dayjs.locale('vi') // use Vi locale globally

export default dayjs

export function humanFormatFromTimestamp (timestamp) {
  return dayjs.unix(timestamp).format('D MMMM YYYY')
}
