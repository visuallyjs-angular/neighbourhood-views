import { Component } from '@angular/core';
import { BaseNodeComponent } from '@visuallyjs/browser-ui-angular';

@Component({
    selector: 'app-base-node',
    template: `<div class="base">{{ data['label'] }}</div>`
})
export class BaseNode extends BaseNodeComponent {}

@Component({
    selector: 'app-formula-node',
    template: `<div class="formula">
        <div class="title">{{ data['label'] }}</div>
        <div class="formula-value">
            @for (part of parts; track $index) {
                @if (isNumber(part)) { <sub>{{ part }}</sub> }
                @else { <span [attr.data-c]="part">{{ part }}</span> }
            }
        </div>
    </div>`
})
export class FormulaNode extends BaseNodeComponent {
    get parts(): string[] { return (this.data['formula'] ?? '').match(/([A-Z]+)|([0-9]+)|-/g) ?? []; }
    isNumber(part: string): boolean { return /^\d+$/.test(part); }
}
