"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
class Transform {
    static transformDDMMYYYY(date) {
        return date
            .toLocaleTimeString('es-EC', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
            .replaceAll('/', '-');
    }
}
exports.Transform = Transform;
//# sourceMappingURL=transform.js.map