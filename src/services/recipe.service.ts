import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // url do proxy.conf.json
  // private webhookUrl = '/api/webhook-test/f4bac492-fbf1-4d9e-a41b-0f28d2fcdfdc';

  // url de teste
  // private webhookUrl = 'https://keidsonroby.app.n8n.cloud/webhook-test/f4bac492-fbf1-4d9e-a41b-0f28d2fcdfdc';

  // url de produção
  private webhookUrl = 'https://keidsonroby.app.n8n.cloud/webhook/f4bac492-fbf1-4d9e-a41b-0f28d2fcdfdc';

  constructor(private http: HttpClient) {}

  generateRecipe(ingredients: string): Observable<any> {
    return this.http.post(this.webhookUrl, { ingredients });
  }
} 