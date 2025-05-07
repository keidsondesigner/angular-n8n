import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';

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

  formatRecipe(text: string): string {
    return text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  generateRecipe() {
    if (!this.ingredients.trim()) {
      return;
    }
    this.isLoading = true;
    this.recipe = '';
    this.recipeService.generateRecipe(this.ingredients).subscribe({
      next: (response: any) => {
        this.recipe = response.recipe || response.message || JSON.stringify(response, null, 2);
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