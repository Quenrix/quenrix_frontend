import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalService, ModalConfig } from '../../services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  modalConfig: ModalConfig | null = null;
  isOpen: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private modalService: ModalService, private injector: Injector) {}

  ngOnInit(): void {
    this.modalService.getModalState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        this.modalConfig = config;
        this.isOpen = config !== null;
      });
  }

  closeModal(): void {
    this.modalService.close();
  }

  onBackdropClick(event: MouseEvent): void {
    // Only close if clicking on the backdrop itself, not on the modal content
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  getInjector(): Injector {
    return this.injector;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
