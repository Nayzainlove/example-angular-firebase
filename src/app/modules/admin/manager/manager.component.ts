import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit, OnDestroy {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                  variables                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnDestroy(): void {}
  ngOnInit(): void {}
  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                    logic                                   */
  /* -------------------------------------------------------------------------- */
  LOOP_TABLE: any = [
    { id: 'มกราคา', name: [1, 2, 3, 4, 5] },
    { id: 'ุกมราคา', name: [1, 2, 3, 4] },
  ];

  m: number[] = [1, 2, 3, 4, 5];
  m1: string[] = ['มกราคา', 'มกราคา'];


}
