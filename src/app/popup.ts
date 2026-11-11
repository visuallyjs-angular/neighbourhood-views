import { Component, computed, input, output } from '@angular/core';
import { AngularRenderOptions, VisuallyJsModule } from '@visuallyjs/browser-ui-angular';
import { HierarchyLayout } from '@visuallyjs/browser-ui';
import renderOptions from './render-options';
import { createView } from './view-options';
import { GraphData } from './data-adapter';
import { NeighbourhoodKind } from './neighbourhood';

@Component({
    selector: 'app-neighbourhood-popup',
    imports: [VisuallyJsModule],
    template: `<div [id]="kind()" class="popup" [attr.data-hidden]="hidden()">
        <div class="title" role="button" tabindex="0" [attr.aria-expanded]="!hidden()"
             (click)="toggle.emit()" (keydown.enter)="toggle.emit()"
             (keydown.space)="$event.preventDefault(); toggle.emit()">
            {{ kind() }}<div class="toggle-btn">{{ hidden() ? '+' : '_' }}</div>
        </div>
        @if (!hidden()) {
            <div class="content">
                @for (focus of [focusId()]; track focus) {
                    <vjs-paper [data]="data()" [renderOptions]="options()" [viewOptions]="viewOptions" />
                }
            </div>
        }
    </div>`
})
export class Popup {
    kind = input.required<NeighbourhoodKind>();
    focusId = input.required<string>();
    data = input.required<GraphData>();
    hidden = input(false);
    toggle = output<void>();
    nodeTap = output<string>();
    viewOptions = createView(id => this.nodeTap.emit(id));
    options = computed<AngularRenderOptions>(() => {
        const kind = this.kind();
        const focus = this.focusId();
        return {
            ...renderOptions,
            layout: kind === 'successors' || kind === 'predecessors'
                ? { type: HierarchyLayout.type, options: { invert: kind === 'predecessors', getRootNode: () => focus } }
                : renderOptions.layout,
            zoom: { wheel: false }, pan: { enabled: false }, zoomToFit: true
        };
    });
}
