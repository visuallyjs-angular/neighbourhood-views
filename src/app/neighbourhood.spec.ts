import { describe, expect, it } from 'vitest';
import { neighbourhood } from './neighbourhood';
import { GraphData } from './data-adapter';

const graph: GraphData = {
    nodes: ['root', 'a', 'b', 'child', 'leaf'].map(id => ({ id, label: id, type: 'base' })),
    edges: [
        { source: 'root', target: 'a' }, { source: 'root', target: 'b' },
        { source: 'a', target: 'child' }, { source: 'child', target: 'leaf' }
    ]
};
const ids = (data: GraphData) => data.nodes.map(n => n.id).sort();

describe('linked neighbourhood views', () => {
    it('includes all descendants in successors, and only their connecting edges', () => {
        const result = neighbourhood(graph, 'a', 'successors');
        expect(ids(result)).toEqual(['a', 'child', 'leaf']);
        expect(result.edges).toEqual(graph.edges.slice(2));
    });
    it('includes only immediate parents in predecessors', () => {
        expect(ids(neighbourhood(graph, 'child', 'predecessors'))).toEqual(['a', 'child']);
    });
    it('includes immediate parents and children in neighbours', () => {
        expect(ids(neighbourhood(graph, 'a', 'neighbours'))).toEqual(['a', 'child', 'root']);
    });
    it('includes the parent and all siblings, with the focus node', () => {
        expect(ids(neighbourhood(graph, 'a', 'siblings'))).toEqual(['a', 'b', 'root']);
        expect(ids(neighbourhood(graph, 'root', 'siblings'))).toEqual(['root']);
    });
    it('isolates panel data from mutations by other diagram models', () => {
        const result = neighbourhood(graph, 'a', 'successors');
        result.nodes[0].label = 'Changed';
        result.edges[0].source = 'Changed';
        expect(graph.nodes[1].label).toBe('a');
        expect(graph.edges[2].source).toBe('a');
    });
    it('terminates successor traversal when a graph contains a cycle', () => {
        const cyclic = { ...graph, edges: [...graph.edges, { source: 'leaf', target: 'a' }] };
        expect(ids(neighbourhood(cyclic, 'a', 'successors'))).toEqual(['a', 'child', 'leaf']);
    });
});
