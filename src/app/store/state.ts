import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export class StateService<T> {
  /** Храним данные здесь */
  private state$: BehaviorSubject<T>;
  /** Геттер, для получения снимка состояния */
  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    /** Генерируем новый state с начальным состоянием */
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  /** Подписываемся на значения из state */
  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  /** Принимаем изменения в state */
  protected setState(newState: Partial<T>) {
    /** Меняем state */
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}
