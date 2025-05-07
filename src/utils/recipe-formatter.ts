export function formatRecipe(text: string): string {
  // Tenta extrair blocos de ingredientes e modo de preparo
  const ingredientesMatch = text.match(/\[Ingredientes\][^\[]*([\s\S]*?)(?=\n\n|\[|$)/i);
  const preparoMatch = text.match(/\[Modo de preparo\][^\[]*([\s\S]*)/i);
  let html = '';
  if (ingredientesMatch) {
    // Quebra por vírgula e faz lista
    const items = ingredientesMatch[1].replace(/\s{2,}/g, ' ').split(',').map(i => i.trim()).filter(Boolean);
    if (items.length > 0 && items[0] !== '') {
      html += `<h4 class='recipe-section-title'>Ingredientes</h4>`;
      html += '<ul class="recipe-list">' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
    }
  }
  if (preparoMatch) {
    // Quebra por ponto final seguido de espaço ou nova linha
    const steps = preparoMatch[1].split(/\.(\s|\n)/).map(s => s.trim()).filter(s => s.length > 2);
    if (steps.length > 0) {
      html += `<h4 class='recipe-section-title'>Modo de preparo</h4>`;
      html += '<ol class="recipe-list">' + steps.map(s => `<li>${s.replace(/\n/g, ' ').trim()}</li>`).join('') + '</ol>';
    }
  }
  if (!html) {
    // fallback para o antigo
    html = text.replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
  return html;
} 