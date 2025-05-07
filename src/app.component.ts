import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { formatRecipe } from './utils/recipe-formatter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ingredients: string = '';
  isLoading: boolean = false;
  recipe: string = '';

  constructor(private recipeService: RecipeService) {}

  formatRecipe = formatRecipe;

  generateRecipe() {
    if (!this.ingredients.trim()) {
      return;
    }
    this.isLoading = true;
    this.recipe = '';
    this.recipeService.generateRecipe(this.ingredients).subscribe({
      next: (response: any) => {
        // Suporte para resposta em { output: ... }
        const recipeText = response.recipe || response.output || response.message || JSON.stringify(response, null, 2);
        this.recipe = recipeText;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error generating recipe:', error);
        this.recipe = 'Erro ao gerar a receita. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }
}