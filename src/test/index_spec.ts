import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('test', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('test', collectionPath);
    const tree = runner.runSchematic('test', {}, Tree.empty());

    expect(tree.files).toEqual(['/test']);
  });
});