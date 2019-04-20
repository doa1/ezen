/**
 * Class to handle data filtering, by creating a custome filter
 * Must be added to the app.module to make it usable by other components
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
 /**return a subset of an array of items if any item contains the searchText string. */
  transform(items: any [], searchText: string): any[] {
    if (!items) {return []; }
    if (!searchText) {return items; }

    searchText = searchText.toLowerCase();
    console.log('items ', items);
    items.filter(prop => {
        console.log(' property', [prop].includes(searchText)); // .toLowerCase());
    });
    return items.filter(word => {
      console.log('the word:', word);
      return word.includes(searchText);
    });
  }
}
