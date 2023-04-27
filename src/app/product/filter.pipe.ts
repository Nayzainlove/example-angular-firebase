import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    // console.log(items, searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return (
        item._ID.toLowerCase().includes(searchText) ||
        item.type.toLowerCase().includes(searchText) ||
        item.Name.toLowerCase().includes(searchText)
      );
    });
  }
}
