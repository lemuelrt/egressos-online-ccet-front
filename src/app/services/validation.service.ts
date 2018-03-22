import { MESSAGES } from './../const/messages';


export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    const config = {
      'required': MESSAGES['M006'],
      'requiredSelected': MESSAGES['M007'],
      'invalidEmailAddress': MESSAGES['M001'],
      'invalidPassword': MESSAGES['M005'],
      'invalidCPF': MESSAGES['M003'],
      'senhasNaoConferem': MESSAGES['M012'],
      'invalidNomeCompleto': MESSAGES['M020'],
      'invalidSenha': MESSAGES['M005'],
      'invalidNomeSimples': MESSAGES['M019'], // Colocar mensagem referente ao nome da atuação profissional
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

  static nomeCompleto(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    const value: string = control.value;

    // Support international names with super sweet unicode
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (value.trim().length < 5 ||
      value.trim().length > 80 || (value.trim().length >= 5 && value.trim().indexOf(' ') === -1 || !regex.test(value))) {
      return { 'invalidNomeCompleto': true };
    } else {
      return null;
    }
  }

  static nomeAtuacaoProfissionalCompleto(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    const value: string = control.value;

    // Support international names with super sweet unicode
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (value.trim().length < 5 || value.trim().length > 80 ||  !regex.test(value)) {
      return { 'invalidNomeCompleto': true };
    } else {
      return null;
    }
  }

  static senha(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length


    const value: string = control.value;

    if (value.length > 0) {
      const regex = /^[1-9a-zA-Z!@#$%&*]{8,20}$/g;

      if (!regex.test(value)) {
        return { 'invalidSenha': true };
      }
    }
    return null;

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
