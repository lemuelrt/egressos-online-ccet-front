
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    const config = {
      'required': 'Campo obrigatório não preenchido.',
      'requiredSelected': 'Campo obrigatório não selecionado.',
      'invalidEmailAddress': 'E-mail inválido.',
      // tslint:disable-next-line:max-line-length
      'invalidPassword': 'Senha inválida. Este campo deve conter no mínimo 8 caracteres e no máximo 20. Os caracteres aceitos são:letras, números e caracteres especiais.',
      'minlength': `Comprimento mínimo de ${validatorValue.requiredLength}.`,
      'invalidCPF': 'CPF é inválido.',
      'senhasNaoConferem': 'As senhas não conferem.'
    };

    return config[validatorName];
  }

  static selectedValidator(control) {

    if (control.value === '' || control.value === null || control.value === undefined) {

      return { 'requiredSelected': true };

    }
    return null;
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value === '' || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static CPFValidator(control) {

    let cpf, add;

    cpf = control.value.replace(/[^\d]+/g, '');

    if (cpf === '') {
      return { 'invalidCPF': true };
    }

    if (cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999') {
      return { 'invalidCPF': true };
    }

    // Valida 1o digito
    add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i), 10) * (10 - i);
    }

    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.charAt(9), 10)) {
      return { 'invalidCPF': true };
    }

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i), 10) * (11 - i);
    }

    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.charAt(10), 10)) {
      return { 'invalidCPF': true };
    }
  }


}
