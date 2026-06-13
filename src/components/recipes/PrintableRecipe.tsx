import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/constants";
import type { Recipe } from "@/types/recipe";

/**
 * Printable recipe card — hidden in normal view, appears only when printing.
 * Uses the .print-recipe-card CSS class defined in globals.css.
 */
export function PrintableRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <div className="print-recipe-card print-only hidden print:block">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold font-serif">{SITE_NAME}</h2>
        <p className="text-sm italic text-muted-foreground">{SITE_TAGLINE}</p>
      </div>

      {/* Recipe Info */}
      <h1 className="text-3xl font-bold font-serif">{recipe.title}</h1>
      <p className="text-sm mt-1">
        Prep: {recipe.prepTime} | Cook: {recipe.cookTime} | Total: {recipe.totalTime} | Serves: {recipe.servings}
      </p>

      {/* Ingredients */}
      <h3 className="text-lg font-bold mt-6 mb-2">Ingredients</h3>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount && <strong>{ing.amount}</strong>} {ing.name}
            {ing.notes && <span className="text-gray-500"> — {ing.notes}</span>}
          </li>
        ))}
      </ul>

      {/* Instructions (plain text from MDX body) */}
      <h3 className="text-lg font-bold mt-6 mb-2">Instructions</h3>
      <div className="text-sm leading-relaxed whitespace-pre-line">
        {recipe.content}
      </div>

      {/* Nutrition */}
      <h3 className="text-lg font-bold mt-6 mb-2">Nutrition Per Serving</h3>
      <table className="text-sm w-full max-w-xs">
        <tbody>
          <tr><td className="font-medium">Calories</td><td>{recipe.nutrition.calories}</td></tr>
          <tr><td className="font-medium">Protein</td><td>{recipe.nutrition.protein}</td></tr>
          <tr><td className="font-medium">Carbs</td><td>{recipe.nutrition.carbs}</td></tr>
          <tr><td className="font-medium">Fat</td><td>{recipe.nutrition.fat}</td></tr>
          {recipe.nutrition.fiber && <tr><td className="font-medium">Fiber</td><td>{recipe.nutrition.fiber}</td></tr>}
          {recipe.nutrition.sodium && <tr><td className="font-medium">Sodium</td><td>{recipe.nutrition.sodium}</td></tr>}
        </tbody>
      </table>

      {/* Footer */}
      <div className="print-url">{SITE_URL}</div>
    </div>
  );
}