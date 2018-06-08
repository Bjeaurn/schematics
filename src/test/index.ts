import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function test(options: any): Rule {
  const test = options.name || "test";

  return (tree: Tree, _context: SchematicContext): Tree => {
    if (!tree.exists(test)) {
      tree.create(test, "hallo");
    }
    return tree;
  };
}