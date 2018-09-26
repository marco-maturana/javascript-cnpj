declare namespace Cnpj {
  interface CnpjStatic {
    format(number: string): string;

    generate(formatted?: boolean): string;

    isValid(number: string, strict?: boolean): boolean;

    strip(number: string, strict?: boolean): string;
  }
}

declare var cnpj: Cnpj.CnpjStatic;

export = cnpj;