import { CoordEgressoFormComponent } from './../components/coord/coord-egresso-form/coord-egresso-form.component';
import { MESSAGES } from './../const/messages';


export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

    // Para consultar as mensagens seguir o seguinte caminho : const/messages.ts

    const config = {
      'required': MESSAGES['M006'],
      'requiredSelected': MESSAGES['M007'],
      'invalidEmailAddress': MESSAGES['M001'],
      'invalidPassword': MESSAGES['M005'],
      'invalidCPF': MESSAGES['M003'],
      'senhasNaoConferem': MESSAGES['M012'],
      'invalidNomeCompleto': MESSAGES['M002'],
      'invalidSenha': MESSAGES['M005'],
      'invalidNomeSimples': MESSAGES['M017'],
      'invalidAno': MESSAGES['M023'],
      'invalidTempoMinForm': MESSAGES['M024']
    };

    return config[validatorName];
  }

  // Validação de Select - necessário selecionar um item do select para ser válido

  static selectedValidator(control) {

    if (control.value === '' || control.value === null || control.value === undefined) {
      return { 'requiredSelected': true };
    }
    return null;
  }

  // Validação de email - definido na documentação o padrão de email deve ser : a@a.aa

  static emailValidator(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    if (control.value === '' || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  // Validação de Nome de Pessoas - Precisa ter no mínimo cinco caracteres e no minímo duas palavras
  // Caracteres númericos ou especiais não são aceitos

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

  // Validação de nome de atuação profissional - necessita ter no mínimo 5 caracteres

  static nomeAtuacaoProfissionalCompleto(control) {
    // RFC 2822 compliant regex
    // tslint:disable-next-line:max-line-length
    const value: string = control.value;

    // Suporte internacional de nomes
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (value.trim().length < 5 || value.trim().length > 80 ||  !regex.test(value)) {
      return { 'invalidNomeSimples': true };
    } else {
      return null;
    }
  }

  // Validação de ano que comece com 1 ou 2
  static anoValildo(control) {

    const value = control.value;

    const d = new Date();
    const anoAtual = d.getFullYear();

    const regex = /^[12][0-9]{3}$/g;

    // regex.test(value) verifica se o ano informado está no padrao [1 ou 2] +(3 num [0-9])
    // (value > anoAtual) verifica se o ano informado é superior ao ano atual

      if (!regex.test(value) || (value > anoAtual) || ) {
        return { 'invalidAno': true };
      }

    return null;

  }

  // Validação para tempo mínimo de curso
  // A lógica é : o ano de conclusão deve ser maior
  // do que o (ano de ingresso + (tempo mínimo - 1))
  static tempoMinCurso(control) {

    const value: number = control.value;
    const tempMin = 4;        // valor será obtido da api, cada curso retornará o seu tempo minimo de conclusão/integralização
    const anoingresso = 1995; // valor será obtido do campo anoIngresso

    if (value < (anoingresso + (tempMin - 1))) {
      return { 'invalidTempoMinForm': true };
      // console.log(value);
    }
    return null;
  }


   // Validação de senha - aceita todos os tipos de caracteres,
   // obrigatório ter no mínimo 8 e no máximo 20 caracteres

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

  // Validação de CPF

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
