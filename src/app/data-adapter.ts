import { uuid } from '@visuallyjs/browser-ui';

export interface Compound {
    label: string;
    formula?: string;
    children?: Record<string, Compound>;
}
export interface CompoundNode {
    id: string;
    label: string;
    type: string;
    formula?: string;
}
export interface GraphData {
    nodes: CompoundNode[];
    edges: { source: string; target: string }[];
}

export function parse(data: Record<string, Compound>): GraphData {
    const graph: GraphData = { nodes: [], edges: [] };
    function visit(compound: Compound): CompoundNode {
        const node = {
            id: uuid(), label: compound.label,
            type: compound.formula == null ? 'base' : 'formula',
            formula: compound.formula
        };
        graph.nodes.push(node);
        for (const child of Object.values(compound.children ?? {})) {
            graph.edges.push({ source: node.id, target: visit(child).id });
        }
        return node;
    }
    Object.values(data).forEach(visit);
    return graph;
}
