import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigService {

  private isEditTaskVisible = new BehaviorSubject<boolean>(false);
  public isEditTaskVisible$ = this.isEditTaskVisible.asObservable();

  constructor(private remoteConfig: RemoteConfig) {
    this.initialize();
  }

  private async initialize() {
    try {
      this.remoteConfig.settings.minimumFetchIntervalMillis = 10000;

      await fetchAndActivate(this.remoteConfig);
      const flag = getValue(this.remoteConfig, 'task_edit_enabled');
      this.isEditTaskVisible.next(flag.asBoolean());

    } catch (err) {
      console.error('Remote Config failed', err);
    }
  }
}
