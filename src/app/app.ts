import { Component, ViewChild, computed, signal } from '@angular/core';
import { SurfaceComponent, VisuallyJsModule } from '@visuallyjs/browser-ui-angular';
import { parse } from './data-adapter';
import rawData from './assets/dataset';
import renderOptions from './render-options';
import { createView } from './view-options';
import { Popup } from './popup';
import { neighbourhood, neighbourhoodKinds, NeighbourhoodKind } from './neighbourhood';

@Component({
    selector: 'app-root',
    imports: [VisuallyJsModule, Popup],
    templateUrl: './app.html'
})
export class App {
    @ViewChild(SurfaceComponent) surfaceComponent?: SurfaceComponent;
    readonly initialData = parse(rawData);
    readonly focusNodeId = signal(this.initialData.nodes[0].id);
    readonly hidden = signal<Record<NeighbourhoodKind, boolean>>({
        successors: false, predecessors: false, neighbours: false, siblings: false
    });
    readonly kinds = neighbourhoodKinds;
    readonly renderOptions = renderOptions;
    readonly viewOptions = createView(id => this.focusNode(id));
    readonly panels = computed(() => this.kinds.map(kind => ({
        kind, data: neighbourhood(this.initialData, this.focusNodeId(), kind)
    })));

    focusNode(id: string): void {
        this.focusNodeId.set(id);
        this.surfaceComponent?.surface.centerOn(id);
        this.surfaceComponent?.model.setSelection(id);
    }
    toggle(kind: NeighbourhoodKind): void {
        this.hidden.update(hidden => ({ ...hidden, [kind]: !hidden[kind] }));
    }
    setAll(hidden: boolean): void {
        this.hidden.set({ successors: hidden, predecessors: hidden, neighbours: hidden, siblings: hidden });
    }
}
