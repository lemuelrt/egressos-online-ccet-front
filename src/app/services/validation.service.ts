
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    const config = {
      'required': 'Campo de preenchimento obrigatório.',
      'invalidEmailAddress': 'Endereço de email inválido.',
      'invalidPassword': 'Senha inválida. A senha deve ter pelo menos 6 caracteres e conter um número.',
      'minlength': `Comprimento mínimo de ${validatorValue.requiredLength}.`,
      'invalidCPF': 'CPF é inválido.',
      'senhasNaoConferem': 'As senhas não conferem.'
    };

    return config[validatorName];
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
