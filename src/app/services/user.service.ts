import {Observable} from 'rxjs/Observable';
 import 'rxjs/add/observable/of';


export class UserService {
  checkUserExists(name: string): Observable<boolean> {
    const exists = name == null ||
          name.toLowerCase() !== 'johnny incognito';
      return Observable.of(exists);//.delay(250);
  }
}
