/**
 * IdleTask.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type {
  LabelableEventDOMObject,
  IndexedDOMObject,
  NamableDOMObject,
} from './_base/DomObjects';
import type { Application } from './Application';

/**
 * An attachable idle task, registered via {@link Application} to run
 * repeatedly whenever InDesign is idle.
 */
export interface IdleTask<M extends Mode = 'single'>
  extends LabelableEventDOMObject<Application, M>,
    IndexedDOMObject<Application, M>,
    NamableDOMObject<Application, M>, InDesignEdition.IdleTask<M>, InDesignPlugins.IdleTask<M> {
  /** Resolves the proxy into the individual {@link IdleTask} objects it stands for. */
  getElements(): IdleTask<'single'>[];

  /** The unique ID of the IdleTask. */
  readonly id: Read<M, number>;

  /**
   * The amount of time (in milliseconds) to sleep before this task is called
   * again. Setting this to `0` deletes the task.
   */
  get sleep(): Read<M, number>;
  set sleep(value: number);

  /** Deletes the IdleTask. */
  remove(): Read<M, void>;
}
