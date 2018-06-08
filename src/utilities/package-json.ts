import {
  Tree,
  SchematicsException
} from "@angular-devkit/schematics";

export interface PackageJson {
  scripts?: { [key: string]: string };
}

export const packageJsonPath = "/package.json";

export function addScriptPackageJson(tree: Tree, name: string, script: string): Tree {
    const buffer = tree.read(packageJsonPath);

    if (buffer === null) {
      throw new SchematicsException("Could not find package.json");
    }
    const packageJson: PackageJson = JSON.parse(buffer.toString());

    if (packageJson) {
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      if (packageJson.scripts[name]) {
        console.warn(name + " already exists");
      } else {
        packageJson.scripts[name] = script;
      }
    }

    tree.overwrite(packageJsonPath, JSON.stringify(packageJson, null, 2));
    return tree;
}
