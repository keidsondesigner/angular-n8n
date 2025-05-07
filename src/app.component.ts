import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  ingredients: string = '';
  isLoading: boolean = false;
  recipe: string = '';
  private destroy$ = new Subject<void>();

  constructor(private recipeService: RecipeService) {}

  generateRecipe() {
    if (!this.ingredients.trim()) {
      return;
    }
    this.isLoading = true;
    this.recipe = '';
    this.recipeService.generateRecipe(this.ingredients)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}