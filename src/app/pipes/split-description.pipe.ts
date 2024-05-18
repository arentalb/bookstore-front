import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitDescription',
})
export class SplitDescriptionPipe implements PipeTransform {
  transform(value: string): string[] {
    if (!value) return [];

    const sections = value.split('. ').map((section) => section.trim());

    for (let i = 0; i < sections.length - 1; i++) {
      sections[i] += '.';
    }

    return sections;
  }
}
