export class DynamicLocaleService extends String {
    private static locale = "ro-RO";

    public static setLocale(newLoc: string) {
        DynamicLocaleService.locale = newLoc;
    }

    public override toString() {
        return DynamicLocaleService.locale;
    }
}