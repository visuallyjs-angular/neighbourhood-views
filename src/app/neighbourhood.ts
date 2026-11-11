import { GraphData } from './data-adapter';

export const neighbourhoodKinds = ['successors', 'predecessors', 'neighbours', 'siblings'] as const;
export type NeighbourhoodKind = typeof neighbourhoodKinds[number];

export function neighbourhood(graph: GraphData, focus: string, kind: NeighbourhoodKind): GraphData {
    const ids = new Set([focus]);
    let edges: GraphData['edges'] = [];
    if (kind === 'successors') {
        const stack = [focus];
        while (stack.length) {
            const current = stack.pop()!;
            for (const edge of graph.edges.filter(e => e.source === current)) {
                edges.push(edge);
                if (!ids.has(edge.target)) { ids.add(edge.target); stack.push(edge.target); }
            }
        }
    } else if (kind === 'siblings') {
        const parent = graph.edges.find(e => e.target === focus)?.source;
        if (parent) {
            ids.add(parent);
            edges = graph.edges.filter(e => e.source === parent);
            edges.forEach(e => ids.add(e.target));
        }
    } else {
        edges = graph.edges.filter(e => e.target === focus || (kind === 'neighbours' && e.source === focus));
        edges.forEach(e => { ids.add(e.source); ids.add(e.target); });
    }
    return {
        nodes: graph.nodes.filter(n => ids.has(n.id)).map(n => ({ ...n })),
        edges: edges.map(e => ({ ...e }))
    };
}
