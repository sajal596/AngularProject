import { HTTP_INTERCEPTORS } from '@angular/common/http';
import{HttpInterceptorService} from './http-interceptor.service';
import { MyInterceptor } from './my-interceptor';

export const httpInterceptProviders=[
    {provide:HTTP_INTERCEPTORS,
        useClass:MyInterceptor,multi:true}
]