import Vue, {VNode,PluginObject} from 'vue'

// export type Toast = 'success' | 'warning' | 'info' | 'error'

/** Message Component */
export declare class KlToastComponent extends Vue {
  /** Close the Loading instance */
  close (): void
}

export interface CloseEventHandler {
  /**
   * Triggers when a message is being closed
   *
   * @param instance The message component that is being closed
   */
  (instance: KlToastComponent): void
}

/** Options used in Message */
export interface ElMessageOptions {
  /** Message text */
  message: string | VNode

  /** Message type */
  // type?: Toast


  /** Display duration, millisecond. If set to 0, it will not turn off automatically */
  duration?: number

  /** Whether to show a close button */
  // showClose?: boolean

  /** Whether to center the text */
  // center?: boolean

  /** Whether message is treated as HTML string */
  // dangerouslyUseHTMLString?: boolean

  /** Callback function when closed with the message instance as the parameter */
  onClose?: CloseEventHandler
  
  /** Set the distance to the top of viewport. Default is 20 px. */
  offset?: number
}

export interface KlToast {
  /** Show an info message */
  (text: string): KlToastComponent

  /** Show message */
  (options: ElMessageOptions): KlToastComponent

  /** Show a success message */
  // success (text: string): KlToastComponent
  
  /** Show a success message with options */
  // success (options: ElMessageOptions): KlToastComponent

  /** Show a warning message */
  // warning (text: string): KlToastComponent
  
  /** Show a warning message with options */
  // warning (options: ElMessageOptions): KlToastComponent

  /** Show an info message */
  // info (text: string): KlToastComponent
  
  /** Show an info message with options */
  // info (options: ElMessageOptions): KlToastComponent

  /** Show an error message */
  // error (text: string): KlToastComponent
  
  /** Show an error message with options */
  // error (options: ElMessageOptions): KlToastComponent
}



declare module 'vue/types/vue' {
  interface Vue {
  /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
    $toast: KlToast
  }
}

export interface ToastPluginObject extends PluginObject<ElMessageOptions> {}

declare var Toast: ToastPluginObject;
export default Toast;