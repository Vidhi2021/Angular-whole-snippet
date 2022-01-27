import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var return_date:string=value;
    var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    if(null!=value && value!='' && isNaN(value) && !isNaN(Date.parse(value))){
     
     var date= new Date(value);
     return_date=date.getDate()+"-"+months[date.getMonth()]+"-"+date.getFullYear();
     if(args=='time'){
       var am_pm=(date.getHours()>=12)?'PM':'AM';
       var hours=( date.getHours()>12)? date.getHours()-12: date.getHours();
       return_date+=" "+hours+":"+date.getMinutes()+":"+date.getSeconds()+" "+am_pm;
     }
    }
    return return_date;
  }

}
