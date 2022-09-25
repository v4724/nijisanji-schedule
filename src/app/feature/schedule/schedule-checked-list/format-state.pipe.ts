import { Pipe, PipeTransform } from '@angular/core';
import { ScheduleCheckedState } from '@app/model/enum/ScheduleCheckedState'

@Pipe({
  name: 'formatState'
})
export class FormatStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let text = ''
    switch (value) {
      case ScheduleCheckedState.none:
        text = 'Unscheduled'
        break
      case ScheduleCheckedState.checked:
        text = 'Scheduled'
        break
      case ScheduleCheckedState.break:
        text = 'Take a break'
        break
      default:
        text = '-'
    }
    return text;
  }

}
