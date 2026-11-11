import { AngularViewOptions } from '@visuallyjs/browser-ui-angular';
import { BaseNode, FormulaNode } from './components';

export function createView(onNodeTap: (id: string) => void): AngularViewOptions {
    const events = { tap: (p: { obj: { id: string } }) => onNodeTap(p.obj.id) };
    return { nodes: {
        base: { component: BaseNode, events },
        formula: { component: FormulaNode, events }
    } };
}
