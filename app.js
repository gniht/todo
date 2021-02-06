import { isTSConstructSignatureDeclaration } from '@babel/types';
import Todo from './todo.js';

let catfood = new Todo(
  'get catfood',
  'run to the store and get some food for the cat', 
  'Friday', 
  'imperative'
);
