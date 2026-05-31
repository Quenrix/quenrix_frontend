import { Injectable, ViewContainerRef, ComponentRef, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  component: any;
  data?: any;
  onClose?: (result?: any) => void;
  width?: string;
  height?: string;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState$ = new BehaviorSubject<ModalConfig | null>(null);
  private componentRef: ComponentRef<any> | null = null;
  private viewContainerRef: ViewContainerRef | null = null;

  constructor(private injector: Injector) {}

  /**
   * Open a modal with the specified component
   */
  open(config: ModalConfig): void {
    this.modalState$.next(config);
  }

  /**
   * Close the current modal
   */
  close(result?: any): void {
    const currentConfig = this.modalState$.value;
    if (currentConfig?.onClose) {
      currentConfig.onClose(result);
    }
    this.modalState$.next(null);
  }

  /**
   * Get the current modal state
   */
  getModalState(): Observable<ModalConfig | null> {
    return this.modalState$.asObservable();
  }

  /**
   * Check if a modal is currently open
   */
  isOpen(): boolean {
    return this.modalState$.value !== null;
  }
}
