import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Recipe } from "@/types/recipe";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        {/* Image placeholder — swap with next/image once real images exist */}
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <ChefHat className="h-12 w-12 text-muted-foreground/40" />
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{recipe.prepTime} prep</span>
          </div>
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{recipe.excerpt}</p>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex flex-wrap gap-2">
          <Badge variant="secondary">{recipe.difficulty}</Badge>
          {recipe.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}