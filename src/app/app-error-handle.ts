import { MESSAGES } from './const/messages';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandle extends ErrorHandler {

  constructor(
    private _injector: Injector,
    private _zone: NgZone
  ) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {

      const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

      const toastr = this._injector.get(ToastrService);

      if (error.error_codigo !== undefined && MESSAGES[error.error_codigo]) {
        this._zone.run(() => {
          toastr.error(MESSAGES[error.error_codigo]);
        });
      }

    }

    super.handleError(errorResponse);
  }

}
