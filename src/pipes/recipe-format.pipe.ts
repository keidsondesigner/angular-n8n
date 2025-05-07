import { Pipe, PipeTransform } from '@angular/core';
import { formatRecipe } from '../utils/recipe-formatter';

@Pipe({ name: 'recipeFormat' })
export class RecipeFormatPipe implements PipeTransform {
  transform(value: string): string {
    return formatRecipe(value);
  }
}