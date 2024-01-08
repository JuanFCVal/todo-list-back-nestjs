export class Transform {
  public static transformDDMMYYYY(date: Date): string {
    return date
      .toLocaleTimeString('es-EC', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replaceAll('/', '-')
  }
}
